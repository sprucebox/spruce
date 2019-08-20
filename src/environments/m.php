<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Intervention\Image\ImageManagerStatic as Image;
use DB;

class ProjectController extends Controller
{
	public function create_project(Request $request){
	    try {
            $this->validate($request, [
                'project_name' => 'required|max:100',
               // 'project_owner_id' => 'required|max:150',
				'project_start_date' => 'required|max:150',
				'project_end_date' => 'required|max:50',
				'project_source_type' => 'required|max:10',
				//'project_source_id' => 'required|max:25',
				//'project_description' => 'required|max:200'
            ]);
        } catch (ValidationException $e) {
            return $e->getResponse();
        }
		
		$token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
		 $pr_count = \App\Project::where('company_id',$user->company_id)->count();
		 $pr_count = $pr_count+1;
		 if($pr_count>112){
			$pr_count = substr( $pr_count, -2 );
			
		 }
		 if($pr_count<1){
			$pr_count = $pr_count+1;
		}
		$color = DB::table('color_classes')->find($pr_count);
		$project = \App\Project::create([
			'project_name' 			=> $request->project_name,
			'project_image' 		=> $request->project_image_url,
			'project_owner_id' 		=> $request->project_owner,
			'project_start_date' 	=> $request->project_start_date,
			'project_end_date' 		=> $request->project_end_date,
			'project_source_type' 	=> $request->project_source_type,
			'project_source_id' 	=> $request->project_source_id,
			'company_id' 			=> $user->company_id,
			'company_type_id' 		=> $user->usertype,
			'project_description' 	=> $request->project_description,
			'project_color'			=> $color->color_class,
			
		]);
		$folder = \App\FileFolder::create([
				'project_id' 	=> $project->id,
				'folder_name' 	=> "internaltask",
				'folder_type_id'=> 1,
				'created_by'	=> $user->id,
				
			]);
			$folder1 = \App\FileFolder::create([
				'project_id' 	=> $project->id,
				'folder_name' 	=> "externaltask",
				'folder_type_id'=> 2,
				'created_by'	=> $user->id,
				
			]);
		
		if($request->project_owner != $user->id){
			\App\ProjectUser::create([
				'project_id' 	=> $project->id,
				'user_id' 		=> $user->id,
				'created_by'	=> $user->id,
				
			]);
		}
		\App\ProjectUser::create([
				'project_id' 	=> $project->id,
				'user_id' 		=> $request->project_owner,
				'created_by'	=> $user->id,
				
			]);
		return new JsonResponse([
            'status_code' => 200,
            'message' => 'project_created',
            'success' => true,
        ]);
   	
   }
   
   public function get_all_project(){
   $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
   $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
   $all_project_ids = \App\ProjectUser::select('project_id')->where('user_id',$user->id)->get();
  $temp_array = array();
   $i=0;
 foreach($all_project_ids as $all_project_id){
 $temp_data = \App\Project::select('project_name','id','project_description','project_image')->where('archive','=','0')->where('id',$all_project_id->project_id)->first();
 if($temp_data){ 
  $temp_array[$i] =$temp_data;
 $temp_array[$i]['profile_images'] = \App\ProjectUser::select('users.profile_image')->where('project_users.project_id',$all_project_id->project_id)->join

('users','users.id','=','project_users.user_id')->get();

 if($temp_array[$i]->project_image == '') { $temp_array[$i]['project_image'] = url('project_files').'/no_image.jpg';}

 $i++;
}
}



return new JsonResponse([
'status_code' => 200,
'message' => 'project_fecthed',
'projects' => $temp_array,
'role' => $user_role,
]);
}

public function update_projectedit_archive_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\Project::where('id',$request->project_id)->update([
			
			'archive' => 0
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
   public function get_all_project_for_calender(){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$all_project_ids = \App\ProjectUser::select('project_id')->where('user_id',$user->id)->get();
	$temp_array = array();
	$i=0;
	foreach($all_project_ids as $all_project_id){
	   $temp_array[$i] =  \App\Project::select('project_name','id','project_color as colour')->where('id',

$all_project_id->project_id)->first();
	   
	   
	   $i++;
	}
   
	
	
	return new JsonResponse([
		   'status_code' => 200,
		   'message' => 'project_fecthed',
		   'projects' =>  $temp_array,
	   ]);
  }
   
   public function get_project_by_id(Request $request){
	 $token = JWTAuth::getToken(); 
	 $user = JWTAuth::toUser($token);
    $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;	 
	 //$project = \App\Project::where('company_id',$user->company_id)->where('id',$request->project_id)->first();
          $project = \App\Project::where('id',$request->project_id)->first();
	  $task_status_list = DB::table('tasks_status_lists')->get();
	 if($project->project_image == '') { $project['project_image'] = url('project_files').'/no_image.jpg';}

	 return new JsonResponse([
            'status_code' => 200,
            'message' => 'project_fecthed',
			'projects' => $project,
			'task_status_list'=>$task_status_list,
			'role' => $user_role,
        ]);
   }
   
   public function check_test(Request $request){
	   $project = $request->all();
	   return new JsonResponse([
            'status_code' => 200,
            'message' => 'project_fecthed',
            'projects' => $project,
        ]);
	   
   }
   
   public function upload_new_task_image(Request $request) {
		if( $request->hasFile('photo')){
			$token = JWTAuth::getToken(); 
	  		$user = JWTAuth::toUser($token);
	  		
			$image = $request->file('photo'); 
			$fileName = 'task_image'.time() .'.'. $image->getClientOriginalExtension();
			$fileExtension = $image->getClientOriginalExtension();
			$destinationPath = base_path().'/public/project_files/';
			$img = Image::make($image);
			$img->fit(270, 250);
			$img->save('project_files/thumbs/'.$fileName);
			$image->move($destinationPath, $fileName);
			$img_name = url('project_files').'/'.$fileName;
			return new JsonResponse([
            'status_code' => 200,
            'image_name' => $img_name,
			
        	]); 
		
			 //\App\ProfessionalDetail::where('id', $user->company_id)->update(['logo'=>$img_name]);
		   	/*return new JsonResponse([
            'status_code' => 200,
            'image_name' => $fileName,
			
        	]);*/ 
		} else {
			return new JsonResponse([
            'status_code' => 400,
            'data' => 'No image was found',
			
        ]); 
		}
	}
	
	public function upload_project_image(Request $request) {
		if( $request->hasFile('photo')){
			$token = JWTAuth::getToken(); 
	  		$user = JWTAuth::toUser($token);
	  		
			$image = $request->file('photo'); 
			$fileName = 'project_image_'.time() .'.'. $image->getClientOriginalExtension();
			//$fileExtension = $image->getClientOriginalExtension();
			$img = Image::make($image);
			$img->fit(270, 250);
			$img->save('project_files/'.$fileName);
			//$destinationPath = base_path().'/public/project_files/';
			//$image->move($destinationPath, $fileName);
			$img_name = url('project_files').'/'.$fileName;
			 //\App\ProfessionalDetail::where('id', $user->company_id)->update(['logo'=>$img_name]);
		   	return new JsonResponse([
            'status_code' => 200,
            'image_name' => $img_name,
			
        	]); 
		} else {
			return new JsonResponse([
            'status_code' => 400,
            'data' => 'No image was found',
			
        ]); 
		}
	}
	
	public function add_new_task(Request $request){
		$token = JWTAuth::getToken(); 
		  $user = JWTAuth::toUser($token);
		  
	  $task = \App\Task::create(array_merge($request->all(), ['created_by' => $user->id,'company_id' => $user->company_id]));
	  
	  $task_owner_id=$request->task_owner_ids;
	  $task_name=$request->task_name;
	  $task_description=$request->task_description;
	  $task_start_date=$request->task_start_date;
	  $data=(explode(',', $task_owner_id));
	  $num_tags = count($data);
	 
	  $alltaskowner = array();
		
		
			for($i=0; $i<$num_tags; $i++)
			{
				if($data[$i] !=''){
				$alltaskowner[] = \App\User::select('users.email')->where('users.id','=',$data[$i])->first();
					
				}
			
			}
			foreach($alltaskowner as $taskl)
			{
			$email[]=$taskl->email;
			Mail::send('mail.task_detail',compact('task_name','task_description','task_start_date'), function ($message) use($email)
						{
							$message->to($email)->subject('Sprucebox: meeting');
							
						}); 
			}
		
	  \App\ProjectActivity::create([
			  'activity_details' => $user->firstname.' has created new task',
		   'source_type'	   => 'task',
		   'source_id'		   => $task->id,
		   'activity_project_id' => $request->source_id,
		   'created_by'		=> $user->id
	  
	  ]);
     
      
      $task_type_ids = \App\TaskList::select('task_type_id')->where('id',$request->task_list_id)->first();
        
    
    if($task_type_ids->task_type_id==1)
      {
      $folder = \App\FileFolder::select('id','folder_name','folder_type_id')->where('folder_name','internaltask')->where('folder_type_id','1')->where('project_id',$request->source_id)->first();
      }
      else if($task_type_ids->task_type_id==2)
      {
       $folder = \App\FileFolder::select('id','folder_name')->where('folder_name','externaltask')->where('folder_type_id','2')->where('project_id',$request->source_id)->first();
      }
	  
	if($request->task_image_url !=''){
		  $fileName = basename($request->task_image_url);
		  
		  $fileExtension = pathinfo($request->task_image_url, PATHINFO_EXTENSION);
		  if($fileExtension=='jpeg' || $fileExtension=='jpg' || $fileExtension=='png' ){
			   $thumb_img_name = url('project_files/thumbs').'/'.$fileName;
		   }else{
			   $thumb_img_name = '';
		   }
		   
		  $fileuploaded = \App\ProjectFile::create([
				'file_name' => $fileName,
			   'file_title'	=> 'No title',
			   'file_url'	=> $request->task_image_url,
			   'file_type'	=> $fileExtension,
			   'thumb_url' => $thumb_img_name,
			   'source_type'	=> 'project_file',
			   'source_id'	=> $request->source_id,
			   'folder_id'	=> $folder->id,
			   'created_by'	=> $user->id,
			   
			]);
	  
	  }
	  if($request->task_image_url !=''){
		  $fileName = basename($request->task_image_url);
		  
		  $fileExtension = pathinfo($request->task_image_url, PATHINFO_EXTENSION);
		  if($fileExtension=='jpeg' || $fileExtension=='jpg' || $fileExtension=='png' ){
			   $thumb_img_name = url('project_files/thumbs').'/'.$fileName;
		   }else{
			   $thumb_img_name = '';
		   }
		   
		  $fileuploaded = \App\ProjectFile::create([
				'file_name' => $fileName,
			   'file_title'	=> 'No title',
			   'file_url'	=> $request->task_image_url,
			   'file_type'	=> $fileExtension,
			   'thumb_url' => $thumb_img_name,
			   'source_type'	=> 'project_task_file',
			   'source_id'	=> $task->id,
			   'folder_id'	=> $folder->id,
			   'created_by'	=> $user->id,
			   
			]);
	  
	  }  
     
	 
	  return new JsonResponse([
		   'status_code' => 200,
		   'message' => 'New task Created',
		   'task_id' => $task->id,
		   'task_owner_id'=> $task_owner_id,
		   'data'=>$data,
		   'allowner'=>$alltaskowner,
		   'folder'=>$task_type_ids->task_type_id,
			'tak_listid'=>$folder
		   
	   ]);
	  
  }
   
   public function get_private_task(Request $request){

	 $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
 $data_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
   $data1_id=$data_id->company_id;
    $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
	  $roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
	$response = array();
	if ($user_roles_type==1 && $data1_id==$user->company_id)
	{
	   
	   $project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')
	   ->where(function ($query) use($project_id) {
    		$query->where('project_id',$project_id)
          	->orWhere('project_id', '=', 0);
		})->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names,tasks_status_lists.status as status_name,tasks_status_lists.color_class FROM `tasks` as t LEFT JOIN users 

AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) LEFT JOIN tasks_status_lists ON tasks_status_lists.id = t.status where `t`.`source_type`='project' and 

`t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." and  `t`.`archieve`='0' GROUP BY t.id") );
		   //if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'id'				=> $tasklist->id,
				'tasks'	=> $data
			   
			   ];
		   //}
		   
	   }
	    
	  
	}
	else 
	{
	  
	   $project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name','task_lists.task_type_id')->where

(function ($query) use($project_id) {
    $query->where('project_id',$project_id)
          ->orWhere('project_id', '=', 0);
})->where('task_lists.task_type_id','=',2)->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names,tasks_status_lists.status as status_name,tasks_status_lists.color_class FROM `tasks` as t LEFT JOIN users 

AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) LEFT JOIN tasks_status_lists ON tasks_status_lists.id = t.status where `t`.`source_type`='project' and 

`t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." and  ".$tasklist->task_type_id." = '2'  and  `t`.`archieve`='0' GROUP BY 

t.id") );
		   //if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'id'				=> $tasklist->id,
				'task_type_id'				=> $tasklist->task_type_id,
				'tasks'	=> $data
				
			   
			   ];
		   //}
		   
	   }
	    
	 
	}
	return new JsonResponse([
            'status_code' => 200,
			'message' => 'Get the task list',
                         'response' => $response,
			 'role' => $user_role,
			'company_id'=>$data1_id,
        ]);
   }
   public function get_private_archive_task(Request $request){
	   
	   $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
	  $roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
	if ($user_roles_type==1)
	{
	   $response = array();
	   $project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')->where(function ($query) use

($project_id) {
    $query->where('project_id',$project_id)
          ->orWhere('project_id', '=', 0);
})->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names,tasks_status_lists.status as status_name,tasks_status_lists.color_class FROM `tasks` as t LEFT JOIN users 

AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) LEFT JOIN tasks_status_lists ON tasks_status_lists.id = t.status where `t`.`source_type`='project' and 

`t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." and  `t`.`archieve`='1' GROUP BY t.id") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'id'				=> $tasklist->id,
				'tasks'	=> $data
			   
			   ];
		   }
		   
	   }
	    
	   return new JsonResponse([
            'status_code' => 200,
			'message' => 'Get the task list',
            'response' => $response,
        ]);
	}
	else if ($user_roles_type==2)
	{
	   $response = array();
	   $project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name','task_lists.task_type_id')->where

(function ($query) use($project_id) {
    $query->where('project_id',$project_id)
          ->orWhere('project_id', '=', 0);
})->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names,tasks_status_lists.status as status_name,tasks_status_lists.color_class FROM `tasks` as t LEFT JOIN users 

AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) LEFT JOIN tasks_status_lists ON tasks_status_lists.id = t.status where `t`.`source_type`='project' and 

`t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." and  ".$tasklist->task_type_id." = '2'  and  `t`.`archieve`='1' GROUP BY 

t.id") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'id'				=> $tasklist->id,
				'task_type_id'				=> $tasklist->task_type_id,
				'tasks'	=> $data
			   
			   ];
		   }
		   
	   }
	    
	   return new JsonResponse([
            'status_code' => 200,
			'message' => 'Get the task list',
            'response' => $response,
        ]);
	}
   
   }
   public function update_projectedit_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\Project::where('id',$request->project_id)->update([
			
			'archive' => 1
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
   public function get_private_task_overview(Request $request){
	   
	   $data = \App\Task::where('source_type','project')->where('source_id',$request->project_id)->where('task_list_id',2)->take(2)->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   public function get_private_task_overview_new(Request $request){

		$token = JWTAuth::getToken();
 
   		$user = JWTAuth::toUser($token);
   
		$data_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
   
		$data1_id=$data_id->company_id;
  
	 	$roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	 
		$user_roles_type = $roletype->is_internal;
	   
	   //$data = \App\Task::where('source_type','project')->where('source_id',$request->project_id)->where('task_list_id',2)->get();
	   $response = array();
      if ($user_roles_type==1 && $data1_id==$user->company_id )
	
	{
	   $project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')->where(function ($query) use

($project_id) {
    $query->where('project_id',$project_id)
          ->orWhere('project_id', '=', 0);
})->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where 

`t`.`source_type`='project' and `t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." GROUP BY t.id ORDER BY t.id DESC LIMIT 2") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'tasks'	=> $data
			   
			   ];
		   }
		   
	   }
	}
	else
	{

		$project_id = $request->project_id;
	   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')->where(function ($query) use

		($project_id) {
    		$query->where('project_id',$project_id)
         	 ->orWhere('project_id', '=', 0);
		})->where('task_lists.task_type_id','=',2)->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
	   	foreach($tasklists as $tasklist){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

	t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where 

	`t`.`source_type`='project' and `t`.`source_id`='$request->project_id' and `t`.`task_list_id`=".$tasklist->id." GROUP BY t.id ORDER BY t.id DESC LIMIT 2") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $tasklist->task_list_name,
				'task_list_type'	=> $tasklist->task_type_name,
				'tasks'	=> $data
			   
			   ];
		   }

	}
}
	    
	   return new JsonResponse([
            'status_code' => 200,
	'message' => 'Get the task list',
            'response' => $response,
        ]);
   }
   
    public function get_public_task_overview(Request $request){
	   $data = \App\Task::where('source_type','project')->where('source_id',$request->project_id)->where('task_list_id',1)->take(2)->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_project_files(Request $request){
	   $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
$company_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
   $company_project_id=$company_id->company_id;
	  $roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
	if ($user_roles_type==1 && $company_project_id==$user->company_id)
	{
	   if($request->folder_id=='0'){
		   $folders = \App\FileFolder::where('project_id',$request->project_id)->get();
		   $folder_name='';
	   }else{
			$folders = [];  
			$folderde = \App\FileFolder::select('folder_name')->where('id',$request->folder_id)->first(); 
			$folder_name =$folderde->folder_name;
	   }
	   $data = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type',DB::raw('count(file_comments.id) as comment_count'))->where('project_files.source_id',

$request->project_id)->where('project_files.folder_id',$request->folder_id)->where('project_files.source_type','=','project_file')
				  ->join('users','users.id','=','project_files.created_by')->leftjoin

('file_comments','project_files.id','=','file_comments.file_id')->groupBy('project_files.id')->get();
		
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'folders'	=>$folders,
			'folder_name'=>$folder_name,
			'name'=>$request->all(),
			
        ]);
	}
	else 
	{
	   if($request->folder_id=='0'){
		   $folders = \App\FileFolder::where('project_id',$request->project_id)->where('folder_type_id',2)->get();
		   $folder_name='';
	   }else{
			$folders = [];  
			$folderde = \App\FileFolder::select('folder_name')->where('id',$request->folder_id)->first(); 
			$folder_name =$folderde->folder_name;
	   }
	   $data = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type',DB::raw('count(file_comments.id) as comment_count'))->where('project_files.source_id',

$request->project_id)->where('project_files.folder_id',$request->folder_id)->Where('project_files.source_type','=','project_file')->join

('users','users.id','=','project_files.created_by')->leftjoin('file_comments','project_files.id','=','file_comments.file_id')->groupBy('project_files.id')->get();

	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'folders'	=>$folders,
			'folder_name'=>$folder_name,
			'name'=>$request->all(),
			'company_id' =>$company_project_id
			
        ]);
	}
   }

   public function get_project_files_for_mobile(Request $request){
	$data =array();
	if($request->folder_id=='0'){
		$folders = \App\FileFolder::where('project_id',$request->project_id)->get();
		$folder_name='';
	}else{
		 $folders = [];  
		 $folderde = \App\FileFolder::select('folder_name')->where('id',$request->folder_id)->first(); 
		 $folder_name =$folderde->folder_name;
	}
	$images = ['jpg','jpeg','png'];
	$document = ['pdf','doc','csv','txt','html'];
	$media = ['mp4','mp3','mpeg'];
	$imagesdata = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type',DB::raw('count(file_comments.id) as comment_count'))->where('project_files.source_id',

$request->project_id)->where('project_files.folder_id',$request->folder_id)->whereIn('project_files.file_type',$images)->Where

('project_files.source_type','=','project_file')->join('users','users.id','=','project_files.created_by')->leftjoin

('file_comments','project_files.id','=','file_comments.file_id')->groupBy('project_files.id')->get();
	$documentdata = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type',DB::raw('count(file_comments.id) as comment_count'))->where('project_files.source_id',

$request->project_id)->where('project_files.folder_id',$request->folder_id)->whereIn('project_files.file_type',$document)->Where

('project_files.source_type','=','project_file')->join('users','users.id','=','project_files.created_by')->leftjoin

('file_comments','project_files.id','=','file_comments.file_id')->groupBy('project_files.id')->get();
	$mediadata = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type',DB::raw('count(file_comments.id) as comment_count'))->where('project_files.source_id',

$request->project_id)->where('project_files.folder_id',$request->folder_id)->whereIn('project_files.file_type',$media)->Where

('project_files.source_type','=','project_file')->join('users','users.id','=','project_files.created_by')->leftjoin

('file_comments','project_files.id','=','file_comments.file_id')->groupBy('project_files.id')->get();
	
		if(count($imagesdata) > 0){
			$data[]=array('name'=>'images','type'=>'files','files'=>$imagesdata);
		}
		if(count($documentdata) > 0){
			$data[]=array('name'=>'document','type'=>'files','files'=>$documentdata);
		}
		 if(count($mediadata) > 0){
			$data[]=array('name'=>'media','type'=>'files','files'=>$mediadata);
		}
		 if(count($folders) > 0){
			$data[]=array('name'=>'folders','type'=>'folders','files'=>$folders);
		}
	
	//$data = array(['name'=>'images','type'=>'files','files'=>$imagesdata],['name'=>'document','type'=>'files','files'=>$documentdata],['name'=>'media','type'=>'files','files'=>$mediadata],['name'=>'folders','type'=>'folders','files'=>$folders]);
	return new JsonResponse([
		 'status_code' => 200,
		 'data' => $data,
		 'folder_name'=>$folder_name,
		 'message' => 'Files fetched',
		 
	 ]);
}

 public function get_project_filesdata(Request $request){
       
         
            $folderde = \App\FileFolder::where('id',$request->folder_id)->get(); 
            
      
      
       return new JsonResponse([
            'status_code' => 200,
            'folders'   =>$folderde,
            
        ]);
   }
   
    public function get_project_files_overview(Request $request){
	   
	   $data = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.file_name','project_files.thumb_url','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type')->where('project_files.source_id',$request->project_id)->where

('project_files.source_type','project_file')->join('users','users.id','=','project_files.created_by')->take(8)->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_project_task_files(Request $request){
	   $data = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type')->where('project_files.source_id',$request->task_id)->where

('project_files.source_type','project_task_file')->join('users','users.id','=','project_files.created_by')->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function delete_project_files(Request $request){
	   \App\ProjectFile::where('id',$request->file_id)->delete();
	   unlink(base_path().'/public/project_files/'.$request->file_name );
	   return new JsonResponse([
		'status_code' => 200,
		'message' => 'File Deleted',
		
	]);
   }
   public function delete_task_files(Request $request){
	\App\ProjectFile::where('id',$request->file_id)->delete();
	  unlink(base_path().'/public/project_files/'.$request->file_name );
	   return new JsonResponse([
            'status_code' => 200,
            'message' => 'File Deleted',
            
        ]);
   }
   
   public function delete_project_filesdata(Request $request){
       \App\FileFolder::where('id',$request->folder_id)->delete();
       
   }

   public function delete_project_folder(Request $request){
	\App\FileFolder::where('id',$request->folder_id)->delete();
	return new JsonResponse([
		'status_code' => 200,
		'message' =>'Folder deleted',
		
	]);
	
}
    public function move_project_files(Request $request){
    
      $data = \App\ProjectFile::where('id',$request->file_id)->update([
            'folder_id' => $request->folder_id,
            
        ]);
        return new JsonResponse([
            'status_code' => 200,
            'message' =>'File Moved',
            
        ]);
   }
   
  public function get_project_discussion(Request $request){
	   $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
 $company_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
   $company_project_id=$company_id->company_id;
   $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
	$roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
           $data = array();
	if ($user_roles_type==1 && $company_project_id==$user->company_id)
	{
$discusstions = \App\ProjectDiscussion::select('project_discussions.id','project_discussions.discussion_description','project_discussions.created_at','project_discussions.discussion_title','project_discussions.discussion_file_url','project_discussions.discussion_type','users.profile_image',DB::raw('CASE WHEN users.firstname = "" THEN users.email ELSE concat(firstname, " ", lastname) END AS `user_name`'))->where('discussion_project_id',$request->project_id)->where('archive','=',0)->join('users','users.id','=','project_discussions.created_by')->get();
	  
	   foreach($discusstions as $discusstion)
	 {
		 $discusstion_id=$discusstion->id;
		 $userscommnt = DB::table('project_discussion_comments')->select(DB::raw('COUNT(project_discussion_comments.comment)as comments'),DB::raw('group_concat(DISTINCT project_discussion_comments.created_by) as user_id'))->where('project_discussion_id',$discusstion_id)->get();
		
		$user_id=$userscommnt[0]->user_id;
		$user_data=explode(",", $user_id);
		$users = DB::table('users')->select('profile_image')->whereIn('id',$user_data)->get();
		$data[] = array(
				'discussion_title' => $discusstion->discussion_title,
				'id' => $discusstion->id,
				'discussion_description'=>$discusstion->discussion_description,
				'discussion_file_url' =>$discusstion->discussion_file_url,
                                    'discussion_type' =>$discusstion->discussion_type,
				'created_by' =>$discusstion->user_name,
				'created_at' => $discusstion->created_at,
				'images' =>$users,
				'comments'=>$userscommnt[0]->comments,
				
			);
			
		  
	 }
	 
	}
	else 
	{
		$discusstions = \App\ProjectDiscussion::select('project_discussions.id','project_discussions.discussion_description','project_discussions.created_at','project_discussions.discussion_title','project_discussions.discussion_file_url','project_discussions.discussion_type','users.profile_image',DB::raw('CASE
         WHEN users.firstname = "" THEN users.email ELSE concat(firstname, " ", lastname) END AS `user_name`'))->where('discussion_project_id',$request->project_id)->where('archive','=',0)->where('project_discussions.discussion_type','=','2')->join('users','users.id','=','project_discussions.created_by')->get();
	   
	   foreach($discusstions as $discusstion)
	 {
		 $discusstion_id=$discusstion->id;
		 $userscommnt = DB::table('project_discussion_comments')->select(DB::raw('COUNT(project_discussion_comments.comment)as comments'),DB::raw

('group_concat(DISTINCT project_discussion_comments.created_by) as user_id'))->where('project_discussion_id',$discusstion_id)->get();
		
		$user_id=$userscommnt[0]->user_id;
		$user_data=explode(",", $user_id);
		$users = DB::table('users')->select('profile_image')->whereIn('id',$user_data)->get();
		$data[] = array(
				'discussion_title' => $discusstion->discussion_title,
				'id' => $discusstion->id,
				'discussion_description'=>$discusstion->discussion_description,
				'discussion_file_url' =>$discusstion->discussion_file_url,
                               'discussion_type' =>$discusstion->discussion_type,
				'created_by' =>$discusstion->user_name,
				'created_at' => $discusstion->created_at,
				'images' =>$users,
				'comments'=>$userscommnt[0]->comments,
				
			);
			
		  
	 }
	  
	}
	 return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'roletype'=>$user_roles_type,
			'role' => $user_role,
			'message' =>'Get all discussion',
        ]); 
	   
   }
    public function get_project_discussion_archive(Request $request){
	  $token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
	$roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
	if ($user_roles_type==1)
	{
		    $discusstions = \App\ProjectDiscussion::select

('project_discussions.id','project_discussions.discussion_description','project_discussions.created_at','project_discussions.discussion_title','project_discu

ssions.discussion_file_url','users.profile_image',DB::raw('CASE
         WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'))->where('discussion_project_id',$request->project_id)->where('archive','=',1)->join

('users','users.id','=','project_discussions.created_by')->get();
	   $data = array();
	   foreach($discusstions as $discusstion)
	 {
		 $discusstion_id=$discusstion->id;
		 $userscommnt = DB::table('project_discussion_comments')->select(DB::raw('COUNT(project_discussion_comments.comment)as comments'),DB::raw

('group_concat(DISTINCT project_discussion_comments.created_by) as user_id'))->where('project_discussion_id',$discusstion_id)->get();
		
		$user_id=$userscommnt[0]->user_id;
		$user_data=explode(",", $user_id);
		$users = DB::table('users')->select('profile_image')->whereIn('id',$user_data)->get();
		$data[] = array(
				'discussion_title' => $discusstion->discussion_title,
				'id' => $discusstion->id,
				'discussion_description'=>$discusstion->discussion_description,
				'discussion_file_url' =>$discusstion->discussion_file_url,
				'created_by' =>$discusstion->user_name,
				'created_at' => $discusstion->created_at,
				'images' =>$users,
				'comments'=>$userscommnt[0]->comments,
				
			);
			
		  
	 }
	  return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'roletype'=>$user_roles_type
        ]);
	}
	else if ($user_roles_type==2)
	{
		$discusstions = \App\ProjectDiscussion::select

('project_discussions.id','project_discussions.discussion_description','project_discussions.created_at','project_discussions.discussion_title','project_discu

ssions.discussion_file_url','users.profile_image',DB::raw('CASE
         WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'))->where('discussion_project_id',$request->project_id)->where('archive','=',1)->where

('project_discussions.discussion_type','=','2')->join('users','users.id','=','project_discussions.created_by')->get();
	   $data = array();
	   foreach($discusstions as $discusstion)
	 {
		 $discusstion_id=$discusstion->id;
		 $userscommnt = DB::table('project_discussion_comments')->select(DB::raw('COUNT(project_discussion_comments.comment)as comments'),DB::raw

('group_concat(DISTINCT project_discussion_comments.created_by) as user_id'))->where('project_discussion_id',$discusstion_id)->get();
		
		$user_id=$userscommnt[0]->user_id;
		$user_data=explode(",", $user_id);
		$users = DB::table('users')->select('profile_image')->whereIn('id',$user_data)->get();
		$data[] = array(
				'discussion_title' => $discusstion->discussion_title,
				'id' => $discusstion->id,
				'discussion_description'=>$discusstion->discussion_description,
				'discussion_file_url' =>$discusstion->discussion_file_url,
				'created_by' =>$discusstion->user_name,
				'created_at' => $discusstion->created_at,
				'images' =>$users,
				'comments'=>$userscommnt[0]->comments,
				
			);
			
		  
	 }
	  return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'roletype'=>$user_roles_type
        ]);
	}
   }
   public function get_project_notes(Request $request){
	$token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
 $data_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
  
 $data1_id=$data_id->company_id;
$role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		
$user_role = $role->role;
 $roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	
$user_roles_type = $roletype->is_internal;
if ($user_roles_type==1 && $data1_id==$user->company_id )
{
   $data = DB::table('notes')->select(DB::raw('*'))->where('project_id',$request->project_id)->get();

}
else
{
$data = DB::table('notes')->select(DB::raw('*'))->where('project_id',$request->project_id)->where('is_internal','=','2')->get();
}

   return new JsonResponse([
		'status_code' => 200,
		'data' => $data,
		
	]);
}
public function edit_project_notes(Request $request){
	$token = JWTAuth::getToken(); 
   $user = JWTAuth::toUser($token);
   $data = DB::table('notes')->select(DB::raw('*'))->where('id',$request->id)->get();
   return new JsonResponse([
		'status_code' => 200,
		'data' => $data,
		
	]);
}

public function edit_project_discussion(Request $request){
	
     $token = JWTAuth::getToken(); 
   
     $user = JWTAuth::toUser($token);
   
     $data = DB::table('project_discussions')->select(DB::raw('*'))->where('id',$request->id)->get();
   
     return new JsonResponse([
		
    'status_code' => 200,
		
       'data' =>$data,
		
	
          ]);

}

public function update_discussion_detail(Request $request){
		
		$token = JWTAuth::getToken(); 
		
		$user = JWTAuth::toUser($token);
  
	 
			 
		$data1 = \App\ProjectDiscussion::where('id',$request->id)->update([
				
		'discussion_description'=> $request->discussion_description,
		  
		'discussion_title'=> $request->discussion_title,
		  
		'discussion_type'=> $request->discussion_type,
		 
 		'discussion_file_url'=>$request->discussion_file_url,
		
 		]);
			
			
		return new JsonResponse([
			 
		 'status_code' => 200,
			
 		'data' =>$request->discussion_file_url,
			
  		'message'=>'data update',
		  
			]); 
	
		
  
		 
	
		 }

    public function add_project_discussion(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	  
	   $data = \App\ProjectDiscussion::create([
			'discussion_title' 			=> $request->discussion_title,
     			'discussion_description' 		=> $request->discussion_description,
			'discussion_type'   => $request->discussion_type ?: url('discussion_file').'/no_image.jpg',
			'discussion_file_url' 	=> $request->discussion_file_url,
			'discussion_project_id' 		=> $request->discussion_project_id,
			'created_by' 	=> $user->id,
			
			
		]);
		
	   
	   \App\ProjectActivity::create([
	   		'activity_details' => $user->firstname.' has created new Discussion',
			'source_type'	   => 'discussion',
			'source_id'		   => $data->id,
			'activity_project_id' => $request->discussion_project_id,
			'created_by'		=> $user->id
	   
	   ]);
	  
	   return new JsonResponse([
            'status_code' => 200,
            'message' => 'New Discussion Created',
        ]);
	   
   }

   public function get_company_id_check(Request $request)
{
	
   $token = JWTAuth::getToken(); 
   
   $user = JWTAuth::toUser($token);
		   
   $data_id=\App\Project::select('company_id')->where('id',$request->project_id1)->first();
		  
		 
  $data1_id=$data_id->company_id;
		

  
   return new JsonResponse([
		
   'status_code' => 200,
		
  'project_id' =>$data_id->company_id,
		
	
     ]);

         }
  

 public function get_project_eventdata(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);  
	
   $events = \DB::table('events')
			   ->select(\DB::raw("events.event_title as title, events.event_start_date as start,events.event_end_date as end,'events' as 

event_type,events.id as event_id,projects.project_color as className "))
			   ->where('events.source_type','project')->join('projects','projects.id','=','events.source_id')
			   ->whereIn('events.source_id',$request->project_ids);

   $tasks  = \DB::table('tasks')
				->select(\DB::raw("tasks.task_name as title, tasks.task_start_date as start,tasks.task_end_date as end,'tasks' as 

event_type,tasks.id as event_id,projects.project_color as className" ))
			   ->where('tasks.source_type','project')->join('projects','projects.id','=','tasks.source_id')
			   ->whereIn('tasks.source_id',$request->project_ids);
			   
   $meetings  = \DB::table('meetings')
				->select(\DB::raw("meetings.meeting_name as title, meetings.meeting_date as start,meetings.meeting_date as end,'meetings' as 

event_type,meetings.id as event_id,projects.project_color as className  "))
			   ->where('meetings.source_type','project')->join('projects','projects.id','=','meetings.source_id')
			   ->whereIn('meetings.source_id',$request->project_ids);

$results = $events->union($tasks)->union($meetings)->get();


	  
	  
	return new JsonResponse([
		   'status_code' => 200,
		   'message' => 'project_event_fecthed',
		   'projects' => $results,
	   ]);
  }
  public function get_user_eventdata(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);  
	
   $events = \DB::table('events')
			   ->select(\DB::raw("event_title as title, event_start_date as start,event_end_date as end,'events' as event_type,id as 

event_id,'bg-success' as className "))->whereIn('created_by', $request->userids);;

   $tasks  = \DB::table('tasks')
				->select(\DB::raw("task_name as title, task_start_date as start,task_end_date as end,'tasks' as event_type,id as 

event_id,'bg-warning' as className "))->where(function ($query) use($request) {
	$query->whereIn('task_owner_ids', $request->userids, 'or')
		 ->whereIn('created_by', $request->userids, 'or');
});
			   
   $meetings  = \DB::table('meetings')
				->select(\DB::raw("meeting_name as title, meeting_date as start,meeting_date as end,'meetings' as event_type,id as 

event_id,'bg-purple' as className "))
				->whereIn('created_by', $request->userids);

$results = $events->union($tasks)->union($meetings)->get();


	  
	  
	return new JsonResponse([
		   'status_code' => 200,
		   'message' => 'project_event_fecthed',
		   'projects' => $results,
	   ]);
  }
   public function get_project_discussion_detail(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
        $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
	    $data = \App\ProjectDiscussion::select('project_discussions.id','project_discussions.discussion_title','project_discussions.discussion_description','project_discussions.discussion_file_url','project_discussions.discussion_type','users.firstname','users.id as user_id','project_discussions.created_at','project_discussions.discussion_project_id')->where('project_discussions.id',$request->discussion_id)->join('users','users.id','=','project_discussions.created_by')->first();
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'role' => $user_role,
			'message' => 'Discussion detail Fetch',
        ]);
   }

  
   public function save_project_event(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\Event::create(array_merge($request->all(), ['created_by' => $user->id]));
	   
	   return new JsonResponse([
            'status_code' => 200,
			'data' => $data,
			'message' => 'Event Added Successfully',
        ]);
   }
   
   public function update_project_event(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\Event::where('id',$request->event_id)->update([
			'event_title' 			=> $request->event_title,
			'event_description' 		=> $request->event_description,
			'event_start_date' 		=> $request->event_start_date,
			'event_end_date' 	=> $request->event_end_date,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   
   public function get_project_event(Request $request){
    $token = JWTAuth::getToken(); 
    $user = JWTAuth::toUser($token);  
    $data2 = \App\Companysetting::select('eventcolor','taskcolor','meetingcolor')->where('company_id',$user->company_id)->first();
   $events = \DB::table('events')->select(\DB::raw("event_title as title, event_start_date as start,event_end_date as end,'events' as event_type,id as event_id,'$data2->eventcolor' as color "))->where('source_type','project')->where('source_id',$request->event_project_id);

   $tasks  = \DB::table('tasks')->select(\DB::raw("task_name as title, task_start_date as start,task_end_date as end,'tasks' as event_type,id as event_id,'$data2->taskcolor' as color "))->where('source_type','project')->where('source_id',$request->event_project_id);
               
   $meetings  = \DB::table('meetings')->select(\DB::raw("meeting_name as title, meeting_date as start,meeting_date as end,'meetings' as event_type,id as event_id,'$data2->meetingcolor' as color "))->where('source_type','project')->where('source_id',$request->event_project_id);

$results = $events->union($tasks)->union($meetings)->get();

    return new JsonResponse([
           'status_code' => 200,
           'message' => 'project_event_fecthed',
           'projects' => $results,
       ]);
  }
   
   
   public function get_user_event(){
	 $token = JWTAuth::getToken(); 
	 $user = JWTAuth::toUser($token);  
	 
	$events = \DB::table('events')
                ->select(\DB::raw("event_title as title, event_start_date as start,event_end_date as end,'events' as event_type,id as event_id,'bg-success' 

as className "))->where('created_by',$user->id);

	$tasks  = \DB::table('tasks')
                 ->select(\DB::raw("task_name as title, task_start_date as start,task_end_date as end,'tasks' as event_type,id as event_id,'bg-warning' as 

className "))->where(function ($query) use($user) {
    $query->whereRaw("FIND_IN_SET('$user->id',task_owner_ids)")
          ->orWhere('created_by', '=', $user->id);
});
				
	$meetings  = \DB::table('meetings')
                 ->select(\DB::raw("meeting_name as title, meeting_date as start,meeting_date as end,'meetings' as event_type,id as event_id,'bg-purple' as 

className "))
                ->where('created_by', $user->id);

$results = $events->union($tasks)->union($meetings)->get();


	   
	   
	 return new JsonResponse([
            'status_code' => 200,
            'message' => 'project_event_fecthed',
            'projects' => $results,
        ]);
   }
	
   public function add_project_discussion_comment(Request $request){
	 $token = JWTAuth::getToken(); 
	 $user = JWTAuth::toUser($token);
	 $data = \App\ProjectDiscussionComment::create([
			'comment' 			=> $request->comment,
			'project_discussion_id' 		=> $request->discussion_id,
			'created_by' 	=> $user->id,
			
		]);
		return new JsonResponse([
            'status_code' => 200,
            'message' => 'Comment_save',
        ]);
   }
   
   public function get_project_discussion_comment(Request $request){
	   $data = array();
	   
	   
	   $comments = \App\ProjectDiscussionComment::select('project_discussion_comments.id','project_discussion_comments.comment','project_discussion_comments.project_discussion_id','project_discussion_comments.parent_comment_id','users.firstname','users.id as user_id','project_discussion_comments.created_at','users.profile_image')->where('project_discussion_comments.project_discussion_id',$request->discussion_id)->where('project_discussion_comments.parent_comment_id','0')->leftjoin('users','users.id','=','project_discussion_comments.created_by')->leftjoin('professional_details','professional_details.id','=','users.company_id')->get();
	   
	   foreach($comments as $comment){
		  
		    $child_comments = \App\ProjectDiscussionComment::select('project_discussion_comments.id','project_discussion_comments.comment','project_discussion_comments.project_discussion_id','project_discussion_comments.parent_comment_id','users.firstname','users.id as user_id','project_discussion_comments.created_at','users.profile_image')->where('project_discussion_comments.parent_comment_id',$comment->id)->leftjoin('users','users.id','=','project_discussion_comments.created_by')->leftjoin('professional_details','professional_details.id','=','users.company_id')->get();
		   
			$data[] = array(
				'comment_id' => $comment->id,
				'comment' 	 => $comment->comment,
				'comment_date' =>$comment->created_at->format('Y-m-d H:i:s'),
				'user_name' => $comment->firstname,
				'user_image' => $comment->profile_image,
				'child_comments' => $child_comments,
			);
	   }
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'message' => 'Comments fetch',
        ]);
   }
	
	public function reply_project_discussion_comment(Request $request){
	 $token = JWTAuth::getToken(); 
	 $user = JWTAuth::toUser($token);
	 $comment = \App\ProjectDiscussionComment::create([
			'comment' 			=> $request->comment,
			'project_discussion_id' 		=> $request->discussion_id,
			'parent_comment_id'	=>$request->parent_comment_id,
			'created_by' 	=> $user->id,
			
		]);
		$child_comments = \App\ProjectDiscussionComment::select('project_discussion_comments.id','project_discussion_comments.comment','project_discussion_comments.project_discussion_id','project_discussion_comments.parent_comment_id','users.firstname','users.id as user_id','project_discussion_comments.created_at','users.profile_image')->where('project_discussion_comments.parent_comment_id',$request->parent_comment_id)->leftjoin('users','users.id','=','project_discussion_comments.created_by')->leftjoin('professional_details','professional_details.id','=','users.company_id')->get();
		return new JsonResponse([
            'status_code' => 200,
			'message' => 'Comment_save',
			'data'	=>	$child_comments,
        ]);
   }
   
   public function download_project_file($filename){
	   header('Access-Control-Allow-Origin: *');  
	   $file = '../public/project_files/'.$filename;
	   
         header('Content-Type: application/octet-stream');
    header("Content-Transfer-Encoding: Binary"); 
    header("Content-disposition: attachment; filename=\"".$filename."\""); 
    echo file_get_contents($file);
   }
   
   public function get_project_activity(Request $request){
	   
		 $data =\App\ProjectActivity::where('activity_project_id',$request->project_id)->take(5)->orderby('id','desc')->get();
		 
		 return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'message' => 'Get Activity',
        ]);
   }
   
   public function get_all_project_activity(Request $request){
	   
		 
		 
		  $data = \App\ProjectActivity::select('project_activities.id as activity_id','project_activities.activity_details','project_activities.source_type','project_activities.source_id','users.firstname','users.profile_image','users.id as user_id','project_activities.created_at','project_activities.activity_project_id')->where('project_activities.activity_project_id',$request->project_id)->join('users','users.id','=','project_activities.created_by')->orderby('project_activities.id','desc')->get();
		 
		 return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'message' => 'Get Activity',
        ]);
   }
	
	public function add_new_meeting(Request $request){
		 $token = JWTAuth::getToken(); 
	  	 $user = JWTAuth::toUser($token);
	   $meeting = \App\Meeting::create(array_merge($request->all(), ['created_by' => $user->id]));
	  $user1=$meeting->attendees_email;
	  $description=$request->meeting_description;
	  $title=$request->meeting_name;
	  $date=$request->meeting_date;
	  $data=(explode(',', $user1));
	   $num_tags = count($data);
	   $alluser = array();
	 for($i=0; $i<$num_tags; $i++)
	 {
	   $alluser[] = \App\User::select('users.email')->where('users.id','=',$data[$i])->first();
	   
	 }
 
foreach($alluser as $mayuri)
{
	$email[]=$mayuri->email;
	Mail::send('mail.meetingdetail',compact('description','title','date'), function ($message) use($email)
				{
				 $message->to($email)->subject('Sprucebox: meeting');
				 
				}); 
}
	  
	   return new JsonResponse([
            'status_code' => 200,
			'meeting'=>$meeting,
			'temp'=>$data,
			'user' =>$email,
             'data' => $alluser,
			'mail' =>$num_tags,
			'message' => 'Meeting Added Successfully',
			
			
			
			
			
			]);
	}
	
	public function update_task_statusdata(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\Task::where('id',$request->id)->update([
			'task_list_id' 			=> $request->current_status,
			'updated_by' 	=> $user->id,
		]);
		
		 return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	public function get_event_by_id(Request $request){
	
	 $data = \App\Event::where('source_type',$request->source_type)->where('id',$request->event_id)->first();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	public function get_meeting_by_id(Request $request){
	
	 $data = \App\Meeting::where('source_type',$request->source_type)->where('id',$request->event_id)->first();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	public function get_meeting_by_id1(Request $request){
		  $token = JWTAuth::getToken(); 
	      $user = JWTAuth::toUser($token);
		 $data = \App\Meeting::where('source_type',$request->source_type)->where('id',$request->event_id)->first();
		
		   return new JsonResponse([
				'status_code' => 200,
				'data' => $data,
			]);
		}
	public function update_meeting(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\Meeting::where('id',$request->event_id)->update([
			'meeting_name' 			=> $request->meeting_name,
			
			'attendees_email' 		=> $request->attendees_email,
			'meeting_subject' 		=> $request->meeting_subject,
			'meeting_date' 	=> $request->meeting_date,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $request->all(),
        ]);
   }
	public function get_task_by_id(Request $request){
	
	 $data = \App\Task::where('id',$request->event_id)->first();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	
	public function update_file_status(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\ProjectFile::where('id',$request->newid)->update([
			'folder_id' 			=> $request->newstatus,
			'updated_by' 	=> $user->id,
		]);
		
		 return new JsonResponse([
            'status_code' => 200,
            'data' =>$data,
        ]);
	}
	public function get_project_task_details(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
	 $data = \App\Task::where('source_type','project')->where('id',$request->task_id)->first();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'role' => $role,
        ]);
	}
	
	public function update_task_status(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\Task::where('id',$request->task_id)->update([
			'status' 			=> $request->status,
			'updated_by' 	=> $user->id,
		]);
		
		 return new JsonResponse([
            'status_code' => 200,
            'data' => $request->all(),
        ]);
	}
	
	public function update_task_prority(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\Task::where('id',$request->task_id)->update([
			'task_priority' 			=> $request->priority,
			'updated_by' 	=> $user->id,
		]);
		
		 return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	
	
	public function update_event_start_by_id(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		 $data = \App\Event::where('id',$request->event_id)->update([
			
			'event_start_date' 		=> $request->event_start_date,
			'event_end_date' 	=> $request->event_end_date,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	
	public function update_task_start_by_id(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		 $data = \App\Task::where('id',$request->task_id)->update([
			
			'task_start_date' 		=> $request->task_start_date,
			'task_end_date' 	=> $request->task_end_date,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	}
	
	public function update_meeting_start_by_id(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\Meeting::where('id',$request->event_id)->update([
			
			'meeting_date' 	=> $request->meeting_date,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   
   public function add_task_comment(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	    $data = \App\ProjectTaskComment::create([
			'comments' 			=> $request->comment,
			'task_id' 		=> $request->task_id,
			'created_by' 	=> $user->id
			
		]);
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $request->all(),
        ]);
   }
   
   public function get_all_comments_by_task_id(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\ProjectTaskComment::select('project_task_comments.id as 

comment_id','project_task_comments.comments','users.firstname','users.profile_image','users.id as user_id','project_task_comments.created_at')->where

('project_task_comments.task_id',$request->task_id)->join('users','users.id','=','project_task_comments.created_by')->orderby

('project_task_comments.id','desc')->get();
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
    public function get_task_for_chart_by_project_id(Request $request){
	  $data = array(["id"=> 1, "text"=> "Task #1123", "start_date"=> "2017-04-15 00:00", "duration"=> 3, "progress"=> 0.6],["id"=> 2, "text"=> "Task #2", 

"start_date"=> "2017-04-18 00:00", "duration"=> 3, "progress"=> 0.4],["id"=> 3, "text"=> "Task #3", "start_date"=> "2017-05-18 00:00", "duration"=> 13, 

"progress"=> 0.4]);
	   
	   return new JsonResponse($data);
   }
   
   public function add_user_in_project(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   
	   $email = $request->email;
	   
	   $users = \App\User::select('id')->where('email',  $request->email)->get();

if(count($users) > 0)
{
	
	
   for($i=0;$i<count($request->select_projects);$i++){
		   \App\ProjectUser::create([
				'project_id' 	=> $request->select_projects[$i],
				'user_id' 		=> $users[0]->id,
				'created_by'	=> $user->id,
				
			]);
	   }
}
else
{
	   $pr_count = \App\User::where('company_id',$user->company_id)->count();
		 $pr_count = $pr_count+1;
		 if($pr_count>112){
			$pr_count = substr( $pr_count, -2 );
			
		 }
		 if($pr_count<1){
			$pr_count = $pr_count+1;
		}
		$color = DB::table('color_classes')->find($pr_count);
	   $img_name = url('userprofile/user.jpg');
	   $newuser = \App\User::create([
			'email' => $request->email,
			'usertype' => $user->usertype,
			'userrole' => $request->userrole,
			'profile_image' => $img_name,
			'company_id'=>	$user->company_id,
			'user_color'	=> $color->color_class,
		
		]);
		
		$secret = Crypt::encrypt($newuser->id);
		$userdetails = \App\UserDetail::create([
			'user_id' => $newuser->id,
		]);
		for($i=0;$i<count($request->select_projects);$i++){
		   \App\ProjectUser::create([
				'project_id' 	=> $request->select_projects[$i],
				'user_id' 		=> $newuser->id,
				'created_by'	=> $user->id,
				
			]);
	   }
		
		 Mail::send('mail.send_invitation',compact('email','secret'), function ($message) use($email)
    {
     $message->to($email)->subject('Sprucebox: invitation');
	 
    }); 
}
		return new JsonResponse([
            'status_code' => 200,
            'data' => $users,
        ]);
   }
   
   public function get_all_company_user(){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	    $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
		$data=array();
		
$datauser=\DB::table('user_news')->select('user_id')->where('professional_company_id',$user->company_id)->get();
		
foreach($datauser as  $datausers)
		
{
			
$data[]=$datausers->user_id;
		
}
 $allusernew = \App\User::select(DB::raw('CASE
         WHEN users.password = "" THEN "pending"
         ELSE "active"
       END AS `status`'),'users.profile_image','users.is_active','users.id','users.firstname','users.user_color','users.lastname','users.email','user_roles.role')->whereIn('users.id',$data)->where('users.is_active', '!=' ,'0')->join('user_roles','users.userrole','=','user_roles.id')->orderby('users.id','desc')->get();
	   $alluser = \App\User::select(DB::raw('CASE
         WHEN users.password = "" THEN "pending"
         ELSE "active"
       END AS 

`status`'),'users.profile_image','users.is_active','users.id','users.firstname','users.user_color','users.lastname','users.email','user_roles.role')->where

('users.company_id',$user->company_id)->where('users.usertype',$user->usertype)->where('users.is_active', '!=' ,'0')->join

('user_roles','users.userrole','=','user_roles.id')->orderby('users.id','desc')->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $alluser,
			'role' => $user_role,
			'userall'=>$data,
			
		'allusernew'=>$allusernew
        ]);
   }
   public function get_all_company_user_archive(){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);

	$datauser=\DB::table('user_news')->select('user_id')->where('professional_company_id',$user->company_id)->get();
		
foreach($datauser as  $datausers)
		
{
			
$data[]=$datausers->user_id;
		
}
		 
 $allusernew = \App\User::select(DB::raw('CASE
 WHEN users.password = "" THEN "pending"
  ELSE "active"
 END AS `status`'),'users.profile_image','users.is_active','users.id','users.firstname','users.user_color','users.lastname','users.email','user_roles.role')->whereIn('users.id',$data)->where('users.is_active', '=' ,'0')->join('user_roles','users.userrole','=','user_roles.id')->orderby('users.id','desc')->get();
	   $alluser = \App\User::select

('users.profile_image','users.is_active','users.id','users.firstname','users.user_color','users.lastname','users.email','user_roles.role')->where

('users.company_id',$user->company_id)->where('users.usertype',$user->usertype)->where('users.is_active',0)->join

('user_roles','users.userrole','=','user_roles.id')->orderby('users.id','desc')->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $alluser,
           'allusernew'=>$allusernew
        ]);
   }
   
   public function get_all_company_user_by_project_id(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $alluser = \App\ProjectUser::where('project_id',$request->project_id)->orderby('id','desc')->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $alluser,
        ]);
   }
   
   public function get_all_users_with_project_id(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $alluser = \App\User::where('company_id',$user->company_id)->where('users.is_active', '=' ,'1')->whereNotIn('id', function($query) use($request){
        $query->select('user_id')
              ->from('project_users')->where('project_id',$request->project_id);
    })->orderby('id','desc')->get();
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $alluser,
        ]);
   }
   public function remove_user_from_projectuser(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $delete=\App\User::where('id',$request->id)->delete();
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $delete,
			'message'=>'user delete sucessfully',
        ]);
   }

	public function remove_user_from_projectuser_new(Request $request){
	   
	$token = JWTAuth::getToken(); 
	   
	$user = JWTAuth::toUser($token);
	  

 	$delete=\App\ProjectUser::where('user_id',$request->id)->delete();
	   
 	$delete1=\DB::table('user_news')->where('user_id',$request->id)->delete();
	  
 	return new JsonResponse([
            
	'status_code' => 200,
            
	'data' => $delete,
			
	'data' => $delete1,
			
	'message'=>'user delete sucessfully',
      
 	 ]);
  
 	}
   public function add_user_by_project_id(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   for($i=0;$i<count($request->userids);$i++){
		   \App\ProjectUser::create([
				'project_id' 	=> $request->project_id,
				'user_id' 		=> $request->userids[$i],
				'created_by'	=> $user->id,
				
			]);
	   }
	   
	   $data = \App\ProjectUser::select('project_users.id','users.firstname','users.lastname','users.profile_image','users.email','users.id as 

user_id')->where('project_users.project_id',$request->project_id)->join('users','users.id','=','project_users.user_id')->orderby('project_users.id','desc')->get();
	   return new JsonResponse([
            'status_code' => 200,
			'data' => $data,
            'message' => 'User added',
        ]);
   }
 
  public function get_all_project_users(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\ProjectUser::select('project_users.id','users.firstname','users.lastname','users.profile_image','users.email','users.id as 

user_id','user_roles.role')->where('project_users.project_id',$request->project_id)->join('users','users.id','=','project_users.user_id')->join

('user_roles','users.userrole','=','user_roles.id')->orderby('project_users.id','desc')->get();
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'message' => 'User Fetched',
        ]);
   }
   
   public function remove_user_from_project(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   \App\ProjectUser::destroy($request->id);
	   $data = \App\ProjectUser::select('project_users.id','users.firstname','users.lastname','users.profile_image','users.email','users.id as 

user_id')->where('project_users.project_id',$request->project_id)->join('users','users.id','=','project_users.user_id')->orderby('project_users.id','desc')->get();
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_project_user_for_task(Request $request){
	   
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\ProjectUser::select(DB::raw('CASE
         WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'),'users.id as user_id')->where('project_users.project_id',$request->project_id)->join

('users','users.id','=','project_users.user_id')->orderby('project_users.id','desc')->get();
	   if($request->has('task_owner_ids')){
	   $ids = explode(',',$request->task_owner_ids);
	   $data2 = \App\User::select(DB::raw('CASE
         WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'),'id as user_id')->whereIn('id', $ids)->get();
	   }else{
		   $data2=array();
	   }
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
			'selected_users'  => $data2,
			'message' => 'User list Fetched',
        ]);
   }
   
    public function get_project_user_for_meeting(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data1 = \App\ProjectUser::select(DB::raw('CASE
         WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'),'users.id as user_id')->where('project_users.project_id',$request->project_id)->join

('users','users.id','=','project_users.user_id')->orderby('project_users.id','desc')->get();
	   if($request->has('attendees_email')){
	   $ids = explode(',',$request->attendees_email);
	   $data3 = \App\User::select(DB::raw('CASE WHEN users.firstname = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'),'id as user_id')->whereIn('id', $ids)->get();
	   }else{
		   $data3=array();
	   }
	   
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data1,
			'selected_users'  => $data3,
        ]);
   }
   public function get_project_user_for_meeting1(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$data1 = \App\ProjectUser::select(DB::raw('CASE
	  WHEN users.firstname = "" THEN users.email
	  ELSE concat(firstname, " ", lastname)
	END AS `user_name`'),'users.id as user_id')->where('company_id',$user->company_id)->join('users','users.id','=','project_users.user_id')->orderby

('project_users.id','desc')->get();
   
	
	
	return new JsonResponse([
		 'status_code' => 200,
		 'data' => $data1,
		 
	 ]);
}
   public function get_all_task_by_status(Request $request){
	
	$taskdetail = \App\Task::where('status', $request->status)->where('source_type','project')->where('source_id',$request->project_id)->get();
	
	   return new JsonResponse([
            'status_code' => 200,
            'message' => 'Tasks Fetched',
			'data' => $taskdetail,
			
        ]);	
	}
	public function get_all_tasks(){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		

$taskdetail = DB::select( DB::raw("SELECT t.*, cr.firstname as creater , GROUP_CONCAT(u.firstname) as names FROM `tasks` as t JOIN users AS u ON FIND_IN_SET

(u.id, t.`task_owner_ids`) JOIN users AS cr ON cr.id = t.created_by where `t`.`created_by`='$user->id' and `t`.`company_id`='$user->company_id' GROUP BY 

t.id") );


		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'Tasks Fetched',
				'data' => $taskdetail,
				
			]);	
	}
	public function get_all_tasksnew(){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		

$taskdetail = DB::select( DB::raw("SELECT t.*, cr.firstname as creater , GROUP_CONCAT(u.firstname) as names ,status FROM `tasks` as t JOIN users AS u ON 

FIND_IN_SET(u.id, t.`task_owner_ids`) JOIN users AS cr ON cr.id = t.created_by where `t`.`created_by`='$user->id' and `t`.`company_id`='$user->company_id'  

and `t`.`status` != '2'  GROUP BY t.id") );


		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'Tasks Fetched',
				'data' => $taskdetail,
				
				
			]);	
	}

	public function update_task_statuss(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\Task::where('id',$request->task_id)->update([
			
			'status' => 2
		]);
return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);			
	}
public function update_discussion_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\ProjectDiscussion::where('id',$request->discussion_id1)->update([
			
			'archive' => 1
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
	public function update_discussion_archive_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\ProjectDiscussion::where('id',$request->discussion_id1)->update([
			
			'archive' => 0
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
	public function update_task_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\Task::where('id',$request->task_id)->where('source_type','project')->update([
			
			'archieve' => 1
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
	public function update_users_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\User::where('id',$request->user_id)->update([
			
			'archieve' => 1
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
	public function update_users_archive_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
 $status = \App\User::where('id',$request->user_id)->update([
			
			'archieve' => 0
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				
				
			]);	
	}
	public function update_task_archive_data(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		$role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
 $status = \App\Task::where('id',$request->task_id)->where('source_type','project')->update([
			
			'archieve' => 0
		]);
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'update status',
				'data' => $status,
				'role'=> $role,
				
				
			]);	
	}
	public function get_all_task_status_by_project_id(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		if($request->reoprt_type=='Task Status'){
		
			$taskdetails = \App\Task::select('status', DB::raw('count(*) as total'))
					 ->groupBy('status')->where('source_type','project')->where('source_id',$request->project_id)->get();
			$taskarray=array();
			foreach($taskdetails as $taskdetail){
				if($taskdetail->status==0){
					$status = 'Open';
				}else if($taskdetail->status==1){
					$status = 'Pending';
				}else{
					$status = 'Close';
				}
				$taskarray[]=array(
					'y' => $taskdetail->total,
					'label' => $status,	
				);
			}
		}else if($request->reoprt_type=='Task Priority'){
			$taskdetails = \App\Task::select('task_priority', DB::raw('count(*) as total'))
                 ->groupBy('task_priority')->where('source_type','project')->where('source_id',$request->project_id)->get();
		$taskarray=array();
			foreach($taskdetails as $taskdetail){
				if($taskdetail->task_priority==1){
					$status = 'High';
				}else if($taskdetail->task_priority==2){
					$status = 'Medium';
				}else{
					$status = 'Low';
				}
				$taskarray[]=array(
					'y' => $taskdetail->total,
					'label' => $status,	
				);
			}
		}else if($request->reoprt_type=='Task Completion'){
			$taskdetails = \App\Task::select('task_completion', DB::raw('count(*) as total'))->groupBy('task_completion')->where

('source_type','project')->where('source_id',$request->project_id)->get();
		$taskarray=array();
			foreach($taskdetails as $taskdetail){
				
				$taskarray[]=array(
					'y' => $taskdetail->total,
					'label' => $taskdetail->task_completion.'%',	
				);
			}
		}else if($request->reoprt_type=='Task Owner'){
			$p_id = $request->project_id;
			$taskdetails = DB::select( DB::raw("SELECT count(t.id) as total, u.firstname,u.lastname FROM `tasks` as t JOIN users AS u ON 

FIND_IN_SET(u.id, t.`task_owner_ids`) where `source_type`='project' and `source_id`='$p_id' GROUP BY u.id") );
			
		$taskarray=array();
			foreach($taskdetails as $taskdetail){
				
				$taskarray[]=array(
					'y' => $taskdetail->total,
					'label' => $taskdetail->firstname.' '.$taskdetail->lastname,	
				);
			}
		}
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'Completion Tasks Fetched',
				'data' => $taskarray,
				
			]);	
	}
	
	public function get_all_task_priority_by_project_id(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
		$taskdetails = \App\Task::select('task_priority', DB::raw('count(*) as total'))
                 ->groupBy('task_priority')->where('source_type','project')->where('source_id',$request->project_id)->get();
		$taskarray=array();
		foreach($taskdetails as $taskdetail){
			if($taskdetail->task_priority==1){
				$status = 'High';
			}else if($taskdetail->task_priority==2){
				$status = 'Medium';
			}else{
				$status = 'Low';
			}
			$taskarray[]=array(
				'y' => $taskdetail->total,
				'label' => $status,	
			);
		}
		   return new JsonResponse([
				'status_code' => 200,
				'message' => 'priority Fetched',
				'data' => $taskarray,
				
			]);	
	}
	
	public function get_home_discussion(Request $request){
		$token = JWTAuth::getToken(); 
	 	$user = JWTAuth::toUser($token);
	
		$discusstions = \App\ProjectDiscussion::select('project_discussions.id','project_discussions.discussion_project_id','project_discussions.discussion_description','project_discussions.created_at','project_discussions.discussion_title','project_discussions.discussion_file_url','users.profile_image',DB::raw('CASE WHEN users.firstname = "" THEN users.email ELSE concat(firstname, " ", lastname)END AS `user_name`'))->join('users','users.id','=','project_discussions.created_by')->join('project_users','project_users.project_id','=','project_discussions.discussion_project_id')->where('project_users.user_id',$user->id)->take(5)->get();
	   $data =array();
	   foreach($discusstions as $discusstion)
	 {
		 $discusstion_id=$discusstion->id;
		 $userscommnt = DB::table('project_discussion_comments')->select(DB::raw('COUNT(project_discussion_comments.comment)as comments'),DB::raw

('group_concat(DISTINCT project_discussion_comments.created_by) as user_id'))->where('project_discussion_id',$discusstion_id)->get();
		
		$user_id=$userscommnt[0]->user_id;
		$user_data=explode(",", $user_id);
		$users = DB::table('users')->select('profile_image')->whereIn('id',$user_data)->get();
		$data[] = array(
				'discussion_title' => $discusstion->discussion_title,
				'project_id'	=> $discusstion->discussion_project_id,
				'id' => $discusstion->id,
				'discussion_description'=>$discusstion->discussion_description,
				'discussion_file_url' =>$discusstion->discussion_file_url,
				'created_by' =>$discusstion->user_name,
				'created_at' => $discusstion->created_at,
				'images' =>$users,
				'comments'=>$userscommnt[0]->comments,
				
			);
			
		  
	 }
	  return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
	   
   }
   
   public function get_project_data(Request $request){
	 $token = JWTAuth::getToken(); 
	 $user = JWTAuth::toUser($token);
	 $all_project_ids = \App\ProjectUser::select('project_id')->where('user_id',$user->id)->take(5)->get();
	 $temp_array = array();
	 $i=0;
	 foreach($all_project_ids as $all_project_id){
 $temp_data = \App\Project::select('project_name','id','project_description','project_image')->where('archive','=','0')->where('id',$all_project_id->project_id)->first();
 if($temp_data){ 
  $temp_array[$i] =$temp_data;
 $temp_array[$i]['profile_images'] = \App\ProjectUser::select('users.profile_image')->where('project_users.project_id',$all_project_id->project_id)->join

('users','users.id','=','project_users.user_id')->get();

 if($temp_array[$i]->project_image == '') { $temp_array[$i]['project_image'] = url('project_files').'/no_image.jpg';}

 $i++;
}

}
	
	 
	 
	 return new JsonResponse([
            'status_code' => 200,
            'message' => 'project_fecthed',
            'data' =>  $temp_array,
        ]);
   }
   
   public function get_all_timezone(){
   
	$timezone = \DB::table('timezone')
				 ->select('id','timezone_name')->get();
				 
		 return new JsonResponse([
			 'status_code' => 200,
			 'message' => 'timezone',
			 'data' => $timezone,
		 ]);
	}
	public function get_datetime_detail(){
		$token = JWTAuth::getToken(); 
			$user = JWTAuth::toUser($token);
		 $data2 = \App\Companysetting::select('company_timezone','company_dateformat','is_monday_firstday')->where('company_id',$user->company_id)->get();
		 return new JsonResponse([
				  'status_code' => 200,
				  'message'=>'getdata',
				  'data'=>$data2,
				  
			  ]);  
	}
	
	public function update_datetime_detail(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
  
	  
		$data2 = \App\Companysetting::where('company_id',$user->company_id)->count();
		if ($data2 >0)
		{
		   $data1 = \App\Companysetting::where('company_id',$user->company_id)->update([
		  'company_timezone'=> $request->company_timezone,
		  'company_dateformat'=> $request->company_dateformat,
		  'is_monday_firstday'=>$request->is_monday_firstday,
		  
		 ]);
  return new JsonResponse([
			  'status_code' => 200,
			  'message'=>'data update',
		  ]);  
		}
		else{
	  
	  
			 \App\Companysetting::insert([
				'company_timezone'=> $request->company_timezone,
		  'company_dateformat'=> $request->company_dateformat,
		  'is_monday_firstday'=>$request->is_monday_firstday,
			  'company_id' => $user->company_id,
			  
			]);
			return new JsonResponse([
			  'status_code' => 200,
			 'data' =>'test',
			  'message'=>'data insert',
		  ]); 
		}
	}

	public function add_notes_detail(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
  
	 
			 $notes=\App\Note::create([
				'title'=> $request->detail1,
		  'Description'=> $request->decrption,
		  'project_id' => $request->project_id,
		  'is_internal'=> $request->input('is_internal') ?: 2,
		  
			  
			]);
			
			\App\ProjectActivity::create([
	   		'activity_details' => $user->firstname.' has created new note',
			'source_type'	   => 'note',
			'source_id'		   => $notes->id,
			'activity_project_id' => $request->project_id,
			'created_by'		=> $user->id
	   
	   ]);
			return new JsonResponse([
			  'status_code' => 200,
			 'data' =>'test',
			  'message'=>'data insert',
			  'note'=>$request->input('is_internal') ?: 2,
			  
		  ]); 
	
		
  
		 
	 }
	  public function create_new_status(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
				$check = \App\Tasks_status_list::where('company_id',$user->company_id)->orWhere('company_id', '=', 0)->count();
		
	 
			 $status=\App\Tasks_status_list::insert([
				'status'=> $request->status,
		  'color_class'=> $request->color,
		  'company_id' => $user->company_id,
			  
			]);
			return new JsonResponse([
			  'status_code' => 200,
			 'data' =>'test',
			  'message'=>'data insert',
		  ]); 
	
		
  
		 
	 }
	 
	  public function update_notes_detail(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
  
	 
			 $data1 = \App\Note::where('id',$request->id)->update([
				'title'=> $request->detail1,
		  'Description'=> $request->decrption,
		  'is_internal'=> $request->input('is_internal') ?: 2,
		 
			  
			]);
			\App\ProjectActivity::create([
	   		'activity_details' => $user->firstname.' has created update note',
			'source_type'	   => 'note',
			'source_id'		   =>  $request->id,
			'activity_project_id' => $request->project_id,
			'created_by'		=> $user->id
	   
	   ]);
			return new JsonResponse([
			  'status_code' => 200,
			 'data' =>$data1,
			  'message'=>'data update',
		  ]); 
	
		
  
		 
	 }
	 public function delete_notes_data(Request $request){
		 $token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
       \App\note::where('id',$request->id)->delete();
       
   }

   public function get_home_files_overview(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data2 = \App\ProjectFile::join('project_users','project_users.project_id','=','project_files.source_id')->where

('project_files.source_type','project_file')->where('project_users.user_id',$user->id)->take(8)->get();
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data2,
		
        ]);
   }
   public function get_source_list(Request $request){
	     $token = JWTAuth::getToken(); 
		 $user = JWTAuth::toUser($token);
	   if($request->source_type=='project'){
		    $data = \App\Project::select('id','project_name as name')->where('company_id',$user->company_id)->get();
	   }else{
		   $data =array();
	   }
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_due_task(Request $request){
	    $data = DB::select( DB::raw("SELECT t.*, GROUP_CONCAT(u.firstname) as names FROM `tasks` as t JOIN users AS u ON FIND_IN_SET(u.id, 

t.`task_owner_ids`) where `t`.`source_type`='project' and `t`.`source_id`='$request->project_id' and Date(`t`.`task_end_date`) = CURDATE() GROUP BY t.id") );
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_all_users(){
	   $token = JWTAuth::getToken(); 
	  $user = JWTAuth::toUser($token);
	  
	   
	   $data2 = \App\User::select(DB::raw('CASE
         WHEN users.firstname  = "" THEN users.email
         ELSE concat(firstname, " ", lastname)
       END AS `user_name`'),'id as user_id','is_active')->where('users.is_active', '=' ,'1')->where('company_id', $user->company_id)->orderby('id','desc')->get();
	      
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data2,
        ]);
   }
   public function get_all_countries(){
   
   $countries = \DB::table('countries')
                ->select('id','name')->get();
				
		return new JsonResponse([
            'status_code' => 200,
			'message' => 'countries',
            'data' => $countries,
        ]);
   }
   public function get_all_state_by_country_id(Request $request){
   
   $states = \DB::table('states')
                ->select('id','name')->where('country_id',$request->country_id)->get();
				
		return new JsonResponse([
            'status_code' => 200,
			'message' => 'states',
            'data' => $states,
        ]);
   }
   public function update_task_detail(Request $request){
	 
	  $data1 = \App\Task::where('id',$request->task_id)->update([
		'task_name'=> $request->task_name,
		'task_description'=> $request->task_description,
		'task_image_url'=> $request->task_image_url,
		'task_list_id'=> $request->task_list_id,
		'task_owner_ids'=> $request->task_owner_ids,
		'task_start_date'=> $request->task_start_date,
		'task_end_date'=> $request->task_end_date,
		'task_priority'=> $request->task_priority,
		//'task_done_by_id'=> $request->task_done_by_id,
		//'task_vendor_id'=> $request->task_vendor_id,
		'status'=> $request->status,
		'task_work_hours'=> $request->task_work_hours,
		'task_duration'=> $request->task_duration,
		'task_completion'=> $request->task_completion
 
  ]);
	   return new JsonResponse([
            'status_code' => 200,
			'data' => $data1,
			'message' => 'task updated',
        ]);
   }
   
   public function update_task(Request $request){
	   $token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
	   $data = \App\Task::where('id',$request->event_id)->update([
			'task_name' 			=> $request->task_name,
			'task_description' 		=> $request->task_description,
			'task_list_id' 		=> $request->task_list_id,
			'task_image_url' 	=> $request->task_image_url,
			'task_owner_ids' 	=> $request->task_owner_ids,
			'task_start_date' 	=> $request->task_start_date,
			'task_end_date' 	=> $request->task_end_date,
			'task_reminder_date' 	=> $request->task_reminder_date,
			'task_priority' 	=> $request->task_priority,
			'updated_by' 	=> $user->id,
		]);
	   
	   return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
    public function check_email_exist(Request $request){
		$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		$data = \App\User::select('user_types.type','users.id','users.company_id')->where('email',$request->email)->join('user_types','user_types.id','=','users.usertype')->first();
		$datanew = \App\User::select('user_types.type','users.id','users.company_id')->where('email',$request->email)->join('user_types','user_types.id','=','users.usertype')->get();
		if($data)  {
$user_id=\DB::table('user_news')->select('user_id')->where('professional_company_id','=',$user->company_id)->where('user_id','=',$data->id)->get();
			
			if($data->type =='Home Owner'){
          if( count($datanew) == count($user_id))			
               {
				
				
           return new JsonResponse([
				
             'status_code' => 200,
				
          'check' => false,
				
        	
                  ]);
			
			}
                 else{
	$data1 = \App\UserRole::select('user_roles.id')->where('user_roles.role','=','Home-Owner')->where('user_roles.company_id','=',$user->company_id)->first();
	
$userdata = \DB::table('user_news')->insert(
[
			
'user_id' => $data->id,
			
'professional_company_id' =>$user->company_id,
			
'homeowner_company_id' =>$data->company_id,
				
]);
return new JsonResponse([
	 'status_code' => 200,
		'check' => true,
	'response' =>$data->type,
	'data1'=>$data1->id,
        'insert'=>$userdata,
'y'=>$data,
'z'=>$user_id
			   ]);
}
            }
            else if( $data->type !='Home Owner'){
                return new JsonResponse([
                   'status_code' => 200,
                   'check' => false,
               ]);
           }
			
		}
		else{
			return new JsonResponse([
				'status_code' => 200,
				'check' => true,
				'response'=>'',
				
        	]);
		}
		
	}
	
	public function add_new_task_type(Request $request){
		$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		$task = \App\TaskList::create(array_merge($request->all(), ['created_by' => $user->id]));
			 return new JsonResponse([
				'status_code' => 200,
				'message' => 'Task Type Created',
        	]);
		
	}
	
   public function gat_task_type(Request $request){
	  
 		$token = JWTAuth::getToken(); 
  
		 $user = JWTAuth::toUser($token);
  
		 $project_id = $request->project_id; 
		$data_id=\App\Project::select('company_id')->where('id',$request->project_id)->first();
   
		$data1_id=$data_id->company_id;
           $roletype= \DB::table('user_roles')->select('is_internal')->where('id',$user->userrole)->first();
	$user_roles_type = $roletype->is_internal;
	   

	   $responce = array();
      if ($user_roles_type==1 && $data1_id==$user->company_id )
	
               {
               $task_list_types = DB::table('task_list_types')->select('task_type_name','id')->get();
		foreach($task_list_types as $task_list_type){
		   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id')->where(function ($query) use($project_id) {
			$query->where('project_id',$project_id)
				  ->orWhere('project_id', '=', 0);
		})->where('task_type_id',$task_list_type->id)->get();
			$responce[] = [
				'task_list_type' =>$task_list_type->task_type_name,
				'tasklists'	=> $tasklists,
			];
		}
              return new JsonResponse([
				'status_code' => 200,
				'responce' => $responce,
				
				'message' => 'Task Title list Fetched',
        	]);
}
     else
         {
                 
              $task_list_types = DB::table('task_list_types')->select('task_type_name','id')->where('id','=','2')->get();
                           foreach($task_list_types as $task_list_type){
		   $tasklists = \App\TaskList::select('task_lists.task_list_name','task_lists.id')->where(function ($query) use($project_id) {
			$query->where('project_id',$project_id)
				  ->orWhere('project_id', '=', 0);
		})->where('task_lists.task_type_id','=','2')->where('task_type_id',$task_list_type->id)->get();
			$responce[] = [
				'task_list_type' =>$task_list_type->task_type_name,
				'tasklists'	=> $tasklists,
			];
		}
                  return new JsonResponse([
				'status_code' => 200,
				'responce' => $responce,
		 		'message' => 'Task Title list Fetched',
        	 ]);
}
	
   }
   
   
   public function get_the_projects_name(){
		$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		$project = \App\Project::select('id','project_name')->where('company_id',$user->company_id)->get();
			 return new JsonResponse([
				'status_code' => 200,
				'data' => $project,
        	]);
		
	}
	
	
	 public function update_project_details(Request $request){
	   $project_id = $request->project_id;
	   $project = \App\Project::where('id',$project_id)->update([
			'project_name' 			=> $request->project_name,
			'project_image' 		=> $request->project_image_url,
			'project_owner_id' 		=> $request->project_owner_id,
			'project_start_date' 	=> $request->project_start_date,
			'project_end_date' 		=> $request->project_end_date,
			'project_description' 	=> $request->project_description
			
		]);
	 return new JsonResponse([
				'status_code' => 200,
				'responce' => $project,
				'message' => 'Project Updated Successfully',
        	]);
   }
   
   public function resend_invitaion(Request $request){
	   	$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
	   
		$newuser = 	\App\User::find($request->user_id);
		$secret = 	Crypt::encrypt($newuser->id);
		$email	=	$newuser->email;
		
		Mail::send('mail.send_invitation',compact('email','secret'), function ($message) use($email)
    {
     $message->to($email)->subject('Sprucebox: invitation');
	 
    }); 
		return new JsonResponse([
            'status_code' => 200,
            'data' => 1,
        ]);
   }
   
   public function get_user_for_edit(Request $request){
	   	$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		 $role= \DB::table('user_roles')->select('role')->where('id',$user->userrole)->first();
		$user_role = $role->role;
		$newuser = \App\User::select(DB::raw('CASE
         WHEN users.password = "" THEN "pending"
         ELSE "active"
       END AS `status`'),'users.is_active','users.id','users.firstname','users.lastname','users.email','users.userrole')->where('id',$request->user_id)->first();
	   	$selected_project = \App\ProjectUser::select(DB::raw("(GROUP_CONCAT(project_id)) as `projects`"))->where('user_id',$request->user_id)->get();
		
		return new JsonResponse([
            'status_code' => 200,
			'data' => $newuser,
			'selected_project'	=> $selected_project,
			'role' => $user_role,
        ]);
   }
   
    public function update_user_details(Request $request){
	   	$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
	   	$edituser = 	\App\User::find($request->user_id);
		
		if($edituser->password){
			\App\User::where('id',$request->user_id)->update([
				'firstname'	=>$request->firstname,
				'lastname'	=>$request->lastname,
				'userrole'	=>$request->userrole,
				'is_active'	=>$request->status,
				]);
		}else{
			\App\User::where('id',$request->user_id)->update([
				'firstname'	=>	$request->firstname,
				'lastname'	=>	$request->lastname,
				'userrole'	=>$request->userrole,
				'is_active'	=>	$request->status,
				'email'		=>	$request->email,
				]);	
				
				$secret = 	Crypt::encrypt($request->user_id);
				$email	=	$request->email;
		
				Mail::send('mail.send_invitation',compact('email','secret'), function ($message) use($email)
				{
				 $message->to($email)->subject('Sprucebox: invitation');
				 
				}); 
		}
		\App\ProjectUser::where('user_id',$request->user_id)->delete();
		for($i=0;$i<count($request->select_projects);$i++){
			\App\ProjectUser::create([
				 'project_id' 	=> $request->select_projects[$i],
				 'user_id' 		=> $request->user_id,
				 'created_by'	=> $user->id,
				 
			 ]);
			}
		return new JsonResponse([
            'status_code' => 200,
            'message' => 'User Updated',
        ]);
   }
   
    public function get_task_title_list(Request $request){
	   	
	   	$tasklists = \App\TaskList::select('task_list_name','task_type_id','id')->where('project_id',$request->project_id)->get();
		return new JsonResponse([
            'status_code' => 200,
            'data' => $tasklists,
        ]);
   }
   
   
   public function update_task_title(Request $request){
	   	
	   	$data = \App\TaskList::where('id',$request->task_list_id)->update(['task_list_name'=>$request->task_list_name]);
		return new JsonResponse([
            'status_code' => 200,
            'data' => $data,
        ]);
   }
   
   public function get_task_list_for_mobile(Request $request){
	   $response = array();
	   $searchtext = $request->searchtext;
	   if($request->has('orderby')) {
		  
		   if($request->orderby =='id_desc'){
		   		$orderby ='id DESC';
		   }else{
			    $orderby	=	$request->orderby;
		   }
	   }else{
		   $orderby = 'id';
	   }
	   if($request->has('groupby')){
		   $groupby = $request->groupby;
	   }else{
		   $groupby = 'tasklist';
	   }
	   $project_id = $request->project_id;
	   $column = '';
	  if($groupby=='status'){
		  $column = 'status';
		  $groupbylists = array(
					  array(
						"id" => 0,
						"task_list_name" => "open",
						"task_type_name" => ''
					  ),
					  array(
						"id" => 1,
						"task_list_name" => "pending",
						"task_type_name" => ''
					  ),
					  array(
						"id" => 2,
						"task_list_name" => "close",
						"task_type_name" => ''
					  )
					);
	  }else if($groupby=='tasklist'){
		  $column = 'task_list_id';
		   $groupbylists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')->where(function 

($query) use($project_id) {
    $query->where('project_id',$project_id)
          ->orWhere('project_id', '=', 0);
})->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();

	  }else if($groupby=='priority'){
		  $column = 'task_priority';
		  $groupbylists = array(
					  array(
						"id" => 1,
						"task_list_name" => "high",
						"task_type_name" => ''
					  ),
					  array(
						"id" => 2,
						"task_list_name" => "medium",
						"task_type_name" => ''
					  ),
					  array(
						"id" => 3,
						"task_list_name" => "low",
						"task_type_name" => ''
					  )
					);
	  }
	  if($groupby=='none'){
		  $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where 

`t`.`source_type`='project' and `t`.`source_id`='$request->project_id'  and `t`.`task_name` LIKE '%$searchtext%' GROUP BY `t`.`id` ORDER BY `t`.".

$orderby."") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> '',
				'task_list_type'	=> '',
				'tasks'	=> $data
			   
			   ];
		   }
	  }else{
	   foreach($groupbylists as $groupbylist){
		 
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where 

`t`.`source_type`='project' and `t`.`source_id`='$request->project_id' and `t`.".$column."=".$groupbylist['id']." and `t`.`task_name` LIKE '%$searchtext%' 

GROUP BY `t`.`id` ORDER BY `t`.".$orderby."") );
		   if(count($data)>0){
			   $response[] = [
				'task_list_name'	=> $groupbylist['task_list_name'],
				'task_list_type'	=> $groupbylist['task_type_name'],
				'tasks'	=> $data
			   
			   ];
		   }
		}
	  }
	  $task_status_list = DB::table('tasks_status_lists')->get();
	   return new JsonResponse([
            'status_code' => 200,
			'message' => 'Get the task list',
			'response' => $response,
			'task_status_list'	=> $task_status_list,
        ]);
   }
   
   public function create_new_folder(Request $request){
	   $token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		
	   $folder=\App\FileFolder::create([
				'project_id' 	=> $request->project_id,
				'folder_name' 	=> $request->folder_name,
				'folder_type_id'=> $request->folder_type_id,
				'created_by'	=> $user->id,
				
			]);
			
			
			\App\ProjectActivity::create([
	   		'activity_details' => $user->firstname.' has created new folder',
			'source_type'	   => 'folder',
			'source_id'		   =>  $folder->id,
			'activity_project_id' => $request->project_id,
			'created_by'		=> $user->id,
	   
	   ]);
		return new JsonResponse([
            'status_code' => 200,
			'message' => 'Folder Created',
        ]);
	   
   }
   public function update_new_folder(Request $request){
       $token = JWTAuth::getToken(); 
        $user = JWTAuth::toUser($token);
    $mayuri=   \App\FileFolder::where('id',$request->file_id 
)->update([
                'folder_name'   => $request->folder_name,
                'folder_type_id'=> $request->folder_type_id,
            ]);
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'Folder Updated' ,
        ]);
       
   }
    public function delete_task_title(Request $request){
		
   	\App\TaskList::where('id',$request->title_id)->delete();
	return new JsonResponse([
            'status_code' => 200,
			'message' => 'Title deleted',
        ]);
	}
	
	public function check_delete_task_title(Request $request){
	
	$count = \App\Task::where('task_list_id',$request->title_id)->count();
		if($count>0){
			return new JsonResponse([
				'status_code' => 200,
				'result' => '0',
			]);
		}else{
			return new JsonResponse([
				'status_code' => 200,
				'result' => '1',
			]);
		}
	
	}
	
	public function get_file_comments(Request $request){
	
	$data = \App\FileComment::select('users.profile_image','users.firstname','file_comments.id','file_comments.comment','file_comments.created_at')->where('file_comments.file_id',$request->file_id)->join('users','users.id','=','file_comments.created_by')->get();
	
			return new JsonResponse([
				'status_code' => 200,
				'data' => $data,
			]);
	
	}
	
	public function add_file_comments(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$data = \App\FileComment::create([
			'file_id'=>$request->file_id,
			'comment'=>$request->comment,
			'created_by'	=> $user->id,
			]);
		
			return new JsonResponse([
				'status_code' => 200,
				'data' => $data,
			]);
	
	}
	
	public function task_file_upload(Request $request) {
		
		if( $request->hasFile('task_file')){
			
			try {
			$image = $request->file('task_file'); 
			$number = mt_rand(1000000000, 9999999999);
			$fileExtension = $image->getClientOriginalExtension();
			$fileName = 'project_task_files_'.time().$number.'.'.$fileExtension;
			$destinationPath = base_path().'/public/project_files/';
			$image->move($destinationPath, $fileName);
			$img_name = url('project_files').'/'.$fileName;
			
			 return new JsonResponse([
				'status_code' => 200,
				'message' => 'file uploaded',
				'file_url' =>	$img_name,
			
				]); 
			} catch (Exception $e) {
				return new JsonResponse([
					'status_code' => 400,
					'message' => 'unable to handle the Image',
					
				]); 
			}
		  
		} else {
			return new JsonResponse([
            'status_code' => 400,
            'message' => 'Image Not Updated',
			
        ]); 
		}
	}
	
	 public function test(){
	   
	$img = Image::make(url('test.jpeg'));
	$img->fit(200, 200);

// save image
$img->save('bar.png');
	// and you are ready to go ...
	//$image = Image::make('public/foo.jpg')->resize(300, 200);
	print_r($img);
   }
   
   public function test2(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$data  = \App\ProjectActivity::where('created_by',$user->id)->orderBy('id', 'desc')->first();;
	echo date('Y-m-d H:i:s');
	
   }
	
   public function get_unselected_project_users(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);

			$data = \App\User::select('users.firstname','users.lastname','users.profile_image','users.email','users.id as 

user_id','user_roles.role')->where('users.company_id',$user->company_id)->whereNotIn('users.id', function($query) use ($request) {
				$query->select('project_users.user_id')
						->from('project_users')
						->whereRaw('project_users.user_id', 'users.id')
						->whereRaw('project_users.project_id = '.$request->project_id);
			})->join('user_roles','users.userrole','=','user_roles.id')->get();

			return new JsonResponse([
				'status_code' => 200,
				'message' => 'get all users',
				'data'	=>	$data,
				
			]); 
   }

   public function add_new_selected_project_users(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	if($request->has('selected_users')){
		$users = explode(",",$request->selected_users);
		for($i=0;$i<count($users);$i++){
			$count_user = \App\ProjectUser::where('project_id' , $request->project_id)->where('user_id' , $users[$i])->count();
			if($count_user==0){
				\App\ProjectUser::create([
					'project_id' 	=> $request->project_id,
					'user_id' 		=> $users[$i],
					'created_by'	=> $user->id,
					
				]);
			}
		}
	}else{
		return new JsonResponse([
			'status_code' => 400,
			'message' => 'selected user missing',
			
		]); 
	}
	

	return new JsonResponse([
		'status_code' => 200,
		'message' => 'All user Add successfully',
		
	]); 
   }

   public function remove_selected_project_users(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$users = explode(",",$request->selected_users);
	for($i=0;$i<count($users);$i++){
		
		\App\ProjectUser::where('user_id', $users[$i])->where('project_id',$request->project_id)->delete();
	}

	return new JsonResponse([
		'status_code' => 200,
		'message' => 'All user remove successfully',
		
	]); 
   }

   
   public function add_new_role(Request $request){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	
	$newuser = \App\UserRole::create([
			'role' => $request->role_name,
			'is_internal' => $request->role_type,
	]);
	$permissions = \DB::table('role_has_permissions')->insert(
		[
			'role_id' => $newuser->id,
			'permission_ids' => '',
		]);
	return new JsonResponse([
		'status_code' => 200,
		'message' => 'All Role successfully',
		
	]); 
   }

   public function get_task_details_and_files_by_task_id(Request $request){
	//$files = \App\ProjectFile::select('project_files.id as file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as user_id','project_files.created_at','project_files.file_type')->where('project_files.source_id',$request->task_id)->where('project_files.source_type','project_task_file')->join('users','users.id','=','project_files.created_by')->get();
	$task = \App\Task::where('source_type','project')->where('id',$request->task_id)->first();
$idsArr1 = explode(',',$task->task_list_id); 
$tasklists = \App\TaskList::select('task_list_name','task_lists.id')->whereIn('id',$idsArr1)->get();
$idsArr = explode(',',$task->task_owner_ids);  
$users = \App\User::select(DB::raw('CASE
	WHEN users.firstname = "" THEN users.email
	ELSE concat(firstname, " ", lastname)
  END AS `user_name`'),'users.id as user_id')->whereIn('users.id',$idsArr)->get();
  $task->task_owner_ids = $users;
  $task->task_list_id =	$tasklists;
  $task_status_list = DB::table('tasks_status_lists')->get();
	return new JsonResponse([
		 'status_code' => 200,
		 'task_details' => $task,
		 'task_status_list'	=> $task_status_list,
		// 'files'		=> $files,
		 'message' => 'get task details for edit',
	 ]);
   }

   
   public function update_role_name(Request $request){
	
	$newuser = \App\UserRole::where('id',$request->role_id)->update([
		'role' => $request->role_name,
	]);
	
	
	return new JsonResponse([
		'status_code' => 200,
		'message' => 'Update Role successfully',
		
	]); 
   }

   public function get_files_by_task_id(Request $request){
		$files = \App\ProjectFile::select('project_files.id as 

file_id','project_files.file_url','project_files.thumb_url','project_files.file_name','project_files.file_title','users.firstname','users.id as 

user_id','project_files.created_at','project_files.file_type')->where('project_files.source_id',$request->task_id)->where

('project_files.source_type','project_task_file')->leftjoin('users','users.id','=','project_files.created_by')->get();
		return new JsonResponse([
			'status_code' => 200,
		    'files'		=> $files,
			'message' => 'get files details',
		]);
	}

	public function update_task_status_priority_duedate(Request $request){

		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\Task::where('id',$request->task_id)->update([
			$request->column		=> $request->value,
			'updated_by' 	=> $user->id,
		]);
		
		return new JsonResponse([
		'status_code' => 200,
		'message' => 'Task '.$request->column.' Updated',
		]);
	}

	public function get_my_task_list_for_mobile(Request $request){
		$response = array();
		$searchtext = $request->searchtext;
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		$user_id =$user->id;
		if($request->has('orderby')) {
		   
			if($request->orderby =='id_desc'){
					$orderby ='id DESC';
			}else{
				 $orderby	=	$request->orderby;
			}
		}else{
			$orderby = 'id';
		}
		if($request->has('groupby')){
			$groupby = $request->groupby;
		}else{
			$groupby = 'tasklist';
		}
	
		$column = '';
	   if($groupby=='status'){
		   $column = 'status';
		   $groupbylists = array(
					   array(
						 "id" => 0,
						 "task_list_name" => "open",
						 "task_type_name" => ''
					   ),
					   array(
						 "id" => 1,
						 "task_list_name" => "pending",
						 "task_type_name" => ''
					   ),
					   array(
						 "id" => 2,
						 "task_list_name" => "close",
						 "task_type_name" => ''
					   )
					 );
	   }else if($groupby=='tasklist'){
		   $column = 'task_list_id';
		   
			$groupbylists = \App\TaskList::select('task_lists.task_list_name','task_lists.id','task_list_types.task_type_name')->where(function 

($query) use($user_id) {
	 $query ->whereIn('project_id',function($query) use($user_id){
		$query->select('project_id')->from('project_users')->where('user_id',$user_id);
	 })
		   ->orWhere('project_id', '=', 0);
 })->join('task_list_types','task_list_types.id','=','task_lists.task_type_id')->get();
 
	   }else if($groupby=='priority'){
		   $column = 'task_priority';
		   $groupbylists = array(
					   array(
						 "id" => 1,
						 "task_list_name" => "high",
						 "task_type_name" => ''
					   ),
					   array(
						 "id" => 2,
						 "task_list_name" => "medium",
						 "task_type_name" => ''
					   ),
					   array(
						 "id" => 3,
						 "task_list_name" => "low",
						 "task_type_name" => ''
					   )
					 );
	   }
	   if($groupby=='none'){
		   $data = DB::select( DB::raw("SELECT t.task_name,t.id,t.status,t.task_priority,t.task_start_date,t.task_end_date, 

t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where FIND_IN_SET

($user_id, t.`task_owner_ids`)  `t`.`task_name` LIKE '%$searchtext%' GROUP BY `t`.`id` ORDER BY `t`.".$orderby."") );
			if(count($data)>0){
				$response[] = [
				 'task_list_name'	=> '',
				 'task_list_type'	=> '',
				 'tasks'	=> $data
				
				];
			}
	   }else{
		foreach($groupbylists as $groupbylist){
		  
			$data = DB::select( DB::raw("SELECT t.task_name,t.id,t.source_id as 

project_id,t.status,t.task_priority,t.task_start_date,t.task_end_date, t.task_image_url,GROUP_CONCAT(u.firstname) as names FROM `tasks` as t LEFT JOIN users 

AS u ON FIND_IN_SET(u.id, t.`task_owner_ids`) where FIND_IN_SET($user_id, t.`task_owner_ids`) and `t`.".$column."=".$groupbylist['id']." and `t`.`task_name` 

LIKE '%$searchtext%' GROUP BY `t`.`id` ORDER BY `t`.".$orderby."") );
			if(count($data)>0){
				$response[] = [
				 'task_list_name'	=> $groupbylist['task_list_name'],
				 'task_list_type'	=> $groupbylist['task_type_name'],
				 'tasks'	=> $data
				
				];
			}
		 }
	   }
		 
	   $task_status_list = DB::table('tasks_status_lists')->get();
	   return new JsonResponse([
            'status_code' => 200,
			'message' => 'Get the task list',
			'response' => $response,
			'task_status_list'	=> $task_status_list,
        ]);
	}


	public function update_color_detail(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
  
	  
		$data2 = \App\Companysetting::where('company_id',$user->company_id)->count();
		if ($data2 >0)
		{
		   $data1 = \App\Companysetting::where('company_id',$user->company_id)->update([
			'taskcolor'=> $request->taskcolor,
			'eventcolor'=> $request->eventcolor,
			'meetingcolor'=>$request->meetingcolor,
		 ]);
			return new JsonResponse([
				'status_code' => 200,
				'message'=>'data update',
			]);  
		}
		else{
	  
	  
			 \App\Companysetting::insert([
				'taskcolor'=> $request->taskcolor,
		  'eventcolor'=> $request->eventcolor,
		  'meetingcolor'=>$request->meetingcolor,
			  'company_id' => $user->company_id,
			  
			]);
			return new JsonResponse([
			  'status_code' => 200,
			 'data' =>'test',
			  'message'=>'data insert',
		  ]); 
		}
		
  
		 
	}
	 
	public function get_color_data(Request $request){
		
	   	$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		$responce = array();
	   $data2 = \App\Companysetting::select('taskcolor','eventcolor','meetingcolor','company_id')->where('company_id',$user->company_id)->get();
	   
		return new JsonResponse([
            'status_code' => 200,
            'data' => $data2,
        ]);
	}

	public function get_project_details_by_project_id(Request $request){
		
	
	$data = \App\Project::select('project_name','id','project_description','project_image')->where('id',$request->project_id)->first();
	
	 return new JsonResponse([
		 'status_code' => 200,
		 'data' => $data,
		 'message'=>'Project Details ',
	 ]);
 }
 public function check_unique_task_status(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
		
			$check = \App\Tasks_status_list::where('status',$request->status)->count();
		
			if($check>0){
			 return new JsonResponse([
				'status_code' => 200,
				'check' => false,
        	]);
		}else{
			return new JsonResponse([
				'status_code' => 200,
				'check' => true,
        	]);
		}
	
		}
		public function check_unique_folder_name(Request $request){
		$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
		
			$check = \App\FileFolder::where('folder_name',$request->folder_name)->where('project_id',$request->project_id)->count();
		
			if($check>0){
			 return new JsonResponse([
				'status_code' => 200,
				'check' => false,
        	]);
		}else{
			return new JsonResponse([
				'status_code' => 200,
				'check' => true,
        	]);
		}
	
		}
		
		
	public function get_status_data(Request $request){
		
	   	$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
	   $data2 = \App\Tasks_status_list::select('*')->where('company_id',$user->company_id)->orWhere('company_id', '=', 0)->get();
	   
		return new JsonResponse([
            'status_code' => 200,
            'data' => $data2,
        ]);
   }
   public function get_statusname_data(Request $request){
		
	   	$token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
		
	   $data3 = \App\Tasks_status_list::select('status','color_class')->where('id',$request->id)->get();
	   
		return new JsonResponse([
            'status_code' => 200,
            'data' =>$data3,
        ]);
   }
   public function update_new_statusname(Request $request){
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
		$data = \App\Tasks_status_list::where('id',$request->id)->update([
			'status'=> $request->status,
			'color_class' 	=> $request->color,
		]);
		
		 return new JsonResponse([
            'status_code' => 200,
            'data' =>$user->id,
        ]);
	}
	 public function delete_status_data(Request $request){
		 $token = JWTAuth::getToken(); 
		$user = JWTAuth::toUser($token);
       \App\Tasks_status_list::where('id',$request->id)->delete();
       
   }
   
   public function get_all_project_archive(){
	$token = JWTAuth::getToken(); 
	$user = JWTAuth::toUser($token);
	$all_project_ids = \App\ProjectUser::select('project_id')->where('user_id',$user->id)->get();
   $temp_array = array();
	$i=0;
  foreach($all_project_ids as $all_project_id){
  $temp_data = \App\Project::select('project_name','id','project_description','project_image')->where('archive',1)->where('id',$all_project_id->project_id)->first();
  if($temp_data){ 
   $temp_array[$i] =$temp_data;
  $temp_array[$i]['profile_images'] = \App\ProjectUser::select('users.profile_image')->where('project_users.project_id',$all_project_id->project_id)->join

('users','users.id','=','project_users.user_id')->get();
 
  if($temp_array[$i]->project_image == '') { $temp_array[$i]['project_image'] = url('project_files').'/no_image.jpg';}
 
  $i++;
 }
 }
 
 
 
 return new JsonResponse([
 'status_code' => 200,
 'message' => 'project_fecthed',
 'projects' => $temp_array,
 ]);
 }
}