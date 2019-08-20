<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Exception\HttpResponseException;

class AuthController extends Controller
{
    /**
     * Handle a login request to the application.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function postLogin(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|max:255',
                'password' => 'required',
				
            ]);
        } catch (ValidationException $e) {
            return $e->getResponse();
        }

        try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt(
                $this->getCredentials($request)
            )) {
                return $this->onUnauthorized();
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return $this->onJwtGenerationError();
        }

        // All good so return the token
		$user = JWTAuth::toUser($token);
		if ($user->is_active == 0) {
                return new JsonResponse([
            'status_code' => 401,
            'message' => "Your account is Inactive"
        ], Response::HTTP_UNAUTHORIZED);
            }
        $company =  \App\Companysetting::select('company_dateformat')->where('company_id',$user->company_id)->first();
        if($company){
            $company_dateformat = $company->company_dateformat;
        }else{
            $company_dateformat = 'D/M/YYYY';
        }
        $permissions = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$user->userrole)->first();
        if($permissions){
            $user_permissions = $permissions->permission_ids;
        }else{
            $user_permissions = '';
        }
        $username = $user->firstname.' '.$user->lastname;
        return $this->onAuthorized($token,$user->usertype,$username,$user->profile_image,$company_dateformat,$user_permissions);
    }

     /**
     * Handle a Registration.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function postRegister(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email|max:255',
                'password' => 'required',
				'usertype' => 'required',
                'firstname'=> 'required|max:20',
				'lastname'=> 'required|max:20'
            ]);
        } catch (ValidationException $e) {
            return $e->getResponse();
			
        }
		$check_email = \App\User::where('email',$request->email)->count();
		if($check_email > 0){
			return response()->json([
                'success' => false,
                
                'message' => 'The email has already been taken.',
				
            ], 400);
		}
		if($request->usertype==1){
			$company = \App\HomeOwnerDetail::create();
		}else if($request->usertype==2){
			$company = \App\ProfessionalDetail::create();
		}
        $img_name = url('userprofile/user.jpg');
        $color = \DB::table('color_classes')->find(1);
        $user = \App\User::create([
			'email' => $request->email,
			'password' => $request->password,
			'usertype' => $request->usertype,
			'firstname'=> $request->firstname,
			'lastname'=> $request->lastname,
			'profile_image' => $img_name,
            'company_id'=>	$company->id,
            'user_color'	=> $color->color_class,
		
        ]);
        $roles = ['Administrator','Manager','Employee','Home-Owner'];
        $permissions = ['1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36','1,2,3,6,8,9,11','1,2,3,4,6','5,6,7,8,9,10,12'];
		//print_r($permissions);die;
        for($i=0;$i<4;$i++){
			 if($roles[$i] =='Home-Owner'){
                $is_internal =2;
            }else{
                $is_internal =1;
           }

            $user_roles = \App\UserRole::create([
                
                     'role' => $roles[$i],
                     'usertype' => $request->usertype,
                     'is_internal' =>$is_internal,
                     'company_id'=>	$company->id
                ]);

             $permissions = \App\RoleHasPermission::create([
                     'role_id' => $user_roles->id,
                     'permission_ids' => $permissions[$i]
                ]);
            if($i==0){
                \App\User::where('id', $user->id)->update(['userrole'=>$user_roles->id]);
            }

        }
	
		$userdetails = \App\UserDetail::create([
			'user_id' => $user->id,
		]);

        try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt(
                $this->getCredentials($request)
            )) {
                return $this->onUnauthorized();
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return $this->onJwtGenerationError();
        }

        //return $this->onAuthorized($token,$user->usertype);
        $username = $user->firstname.' '.$user->lastname;
        $company =  \App\Companysetting::select('company_dateformat')->where('company_id',$user->company_id)->first();
        if($company){
            $company_dateformat = $company->company_dateformat;
        }else{
            $company_dateformat = 'D/M/YYYY';
        }
        $permissions = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$user->userrole)->first();
        if($permissions){
            $user_permissions = $permissions->permission_ids;
        }else{
            $user_permissions = '';
        }
		return $this->onAuthorized($token,$request->usertype,$username,$user->profile_image,$company_dateformat,$user_permissions);
        
    }

    /**
     * What response should be returned on invalid credentials.
     *
     * @return JsonResponse
     */
    protected function onUnauthorized()
    {
        return new JsonResponse([
            'status_code' => 401,
            'message' => "Email Address and Password do not match, or email address not in the system"
        ], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * What response should be returned on error while generate JWT.
     *
     * @return JsonResponse
     */
    protected function onJwtGenerationError()
    {
        return new JsonResponse([
            'message' => 'could_not_create_token'
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * What response should be returned on authorized.
     *
     * @return JsonResponse
     */
    protected function onAuthorized($token,$usertype,$username,$profile_image,$company_dateformat,$user_permissions)
    {
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'token_generated',
            'data' => [
                'token' => $token,
				'usertype'	=>	$usertype,
				'username'	=>$username,
                'profile_image'	=>$profile_image,
                'company_dateformat'   => $company_dateformat,
                'user_permissions'   => $user_permissions,
            ]
        ]);
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    protected function getCredentials(Request $request)
    {
        return $request->only('email','password');
    }

    /**
     * Invalidate a token.
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteInvalidate()
    {
        $token = JWTAuth::parseToken();

        $token->invalidate();

        return new JsonResponse(['message' => 'token_invalidated']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\Response
     */
    public function patchRefresh()
    {
        $token = JWTAuth::parseToken();

        $newToken = $token->refresh();

        return new JsonResponse([
            'status_code' => 200,
            'message' => 'token_refreshed',
            'data' => [
                'token' => $newToken
            ]
        ]);
    }

    /**
     * Get authenticated user.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUser()
    {
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'authenticated_user',
            'data' => JWTAuth::parseToken()->authenticate()
        ]);
    }
	
	public function get_user_type()
    {
		$data = \App\UserType::select('id','type')->get();
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_type_fetched',
            'data' => $data
        ]);
    }
	public function get_user_role()
    {
        $token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
		$data = \App\UserRole::select('id','role')->where('usertype',$user->usertype)->where('company_id',$user->company_id)->where('usertype',$user->usertype)->get();
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_role_fetched',
            'data' => $data,
			'role'=>$user->usertype,
        ]);
    }
public function get_user_role_company_id()
    {
        $token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
		$data = \App\UserRole::select('id','role','usertype')->where('company_id',$user->company_id)->get();
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_role_fetched',
            'data' => $data,
			'role'=>$user->usertype,
        ]);
    }
    public function get_user_role_and_permissions()
    {
        $token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
        $roles = \App\UserRole::select('id','role')->where('company_id',$user->company_id)->get();
        $permission_groups = \DB::table('permission_groups')->select('group_name','id')->get();
        $permissions = array();
        foreach($permission_groups as $permission_group){
            $data = \DB::table('permissions')->select('id','name')->where('group_id',$permission_group->id)->get();
            $response[] = [
				'group_name' => $permission_group->group_name,
				'permissions'	=> $data,
			    
			   ];
        }

        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_role_fetched',
            'roles' => $roles,
            'permissions'  => $response,
            'select_permissions'    => [1,2,3]
        ]);
    }
    public function get_selected_roles_permissions(Request $request)
    {
        $data = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$request->role_id)->get();
        if( count($data)<1 ){
            $select_permissions = '';
        }else{
            $select_permissions = $data[0]->permission_ids;
        }
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_role_fetched',
            'select_permissions'    => $select_permissions,
        ]);
    }
    public function update_permissions(Request $request){
        $permission_ids = implode(",",$request->select_permissions);
        $data = \DB::table('role_has_permissions')->where('role_id',$request->role_id)->update(['permission_ids' => $permission_ids]);
       
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_role_updated',
        ]);
    }
	public function get_user_profile_details()
    {
		$token = JWTAuth::getToken(); 
	   $user = JWTAuth::toUser($token);
				 $data = \App\UserDetail::select('user_details.contact','user_details.suit','user_details.street','user_details.city','users.firstname','users.id','users.lastname','users.email','user_details.state_id','user_details.zipcode','user_details.country_id')->where('user_details.user_id',$user->id)->join('users','users.id','=','user_details.user_id')->get();
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'user_profile_fetched',
            'data' => $data
        ]);
    }
	public function get_company_details()
    {
		$token = JWTAuth::getToken(); 
	   	$user = JWTAuth::toUser($token);
		$company = \App\ProfessionalDetail::where('id',$user->company_id)->get();
		if($company[0]->logo==''){
			   $company[0]->logo = url('project_files').'/no_image.jpg';
		   }
		$size = array(['size'=>'10'],['size'=>'20'],['size'=>'30'],['size'=>'40'],['size'=>'50'],['size'=>'60'],['size'=>'70'],['size'=>'80'],['size'=>'90'],['size'=>'100']);
		$earliest_year = 1999; 
	  	$latest_year = date('Y'); 
		$year = array();
		$j = 0;
		foreach ( range( $latest_year, $earliest_year ) as $i ) {
    		$year[$j]['year'] = $i;
			$j++; 
  		}
        return new JsonResponse([
            'status_code' => 200,
            'message' => 'company_details_fetched',
            'company' => $company,
			'size' => $size,
			'year' => $year,
        ]);
    }
	
	public function update_user_profile(Request $request)
    {
		$token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
		\App\UserDetail::where('user_id', $user->id)->update([
			'contact' => $request->contact,
			'suit' => $request->suit,
			'street' => $request->street,
			'city' => $request->city,
			'state_id' => $request->state_id,
			'zipcode' => $request->zipcode,
			'country_id' => $request->country_id
		
		]);
		\App\User::where('id', $user->id)->update([
			'firstname' => $request->firstname,
			'lastname' => $request->lastname,
			
		]);
		return new JsonResponse([
            'status_code' => 200,
            'message' => 'User profile Updated',
            'success' => true,
        ]);
    }
	
	public function update_company_details_for_mobile(Request $request)
    {
		$token = JWTAuth::getToken(); 
	  	$user = JWTAuth::toUser($token);
		\App\ProfessionalDetail::where('id', $user->company_id)->update([
			'company_name' => $request->company_name,
			'company_website' => $request->company_website,
			'est_year' => $request->est_year,
			'company_size' => $request->company_size
		
		]);
		
		return new JsonResponse([
            'status_code' => 200,
            'message' => 'Company Details Updated',
            'success' => true,
        ]);
    }
	
	public function get_user_by_secret(Request $request)
    {
		try {
    			$user_id = Crypt::decrypt($request->secret);
				$user = \App\User::find($user_id);
				if(count($user)>0 && $user->password ==''){
					return new JsonResponse([
						'status_code' => 200,
						'result' => true,
						'data' => $user,
					]);
				}else{
					return new JsonResponse([
						'status_code' => 200,
						'result' => false,
					]);
				}
		
		
			} catch (DecryptException $e) {
				return new JsonResponse([
					'status_code' => 200,
					'result' => false,
				]);
			}
	}
	
	
	public function update_invite_user(Request $request)
    {
		$hashedPassword = (new BcryptHasher)->make($request->password);
		$update_user = \App\User::where('id', $request->user_id)->update([
			'password' => $hashedPassword,
			'firstname'=> $request->firstname,
			'lastname'=> $request->lastname,
		
		]);
		$user = \App\User::select('email')->where('id', $request->user_id)->first();
		
		try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt(['email'=>$user->email,'password'=>$request->password])) {
                return $this->onUnauthorized();
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return $this->onJwtGenerationError();
        }

        // All good so return the token
		$user = JWTAuth::toUser($token);
        $username = $user->firstname.' '.$user->lastname;
        $company =  \App\Companysetting::select('company_dateformat')->where('company_id',$user->company_id)->first();
        if($company){
            $company_dateformat = $company->company_dateformat;
        }else{
            $company_dateformat = 'D/M/YYYY';
        }
        $permissions = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$user->userrole)->first();
        if($permissions){
            $user_permissions = $permissions->permission_ids;
        }else{
            $user_permissions = '';
        }
        return $this->onAuthorized($token,$request->usertype,$username,$user->profile_image,$company_dateformat,$user_permissions);
        
 
    }
	
	
	public function social_register_user(Request $request)
    {
       
		$check_email = \App\User::where('email',$request->email)->count();
		if($check_email > 0){
			return response()->json([
                'success' => false,
                
                'message' => 'The email has already been taken.',
				
            ], 400);
		}
		if($request->usertype==1){
			$company = \App\HomeOwnerDetail::create();
		}else if($request->usertype==2){
			$company = \App\ProfessionalDetail::create();
		}
		
		if($request->provider == 'FACEBOOK'){
			$facebook_id = $request->socailId;
			$google_id	 = '';
		}else{
			$facebook_id = '';
			$google_id	 = $request->socailId;
		}
        $img_name = url('userprofile/user.jpg');
        
        $color = \DB::table('color_classes')->find(1);
        $user = \App\User::create([
			'email' => $request->email,
			'password' => '',
			'usertype' => $request->usertype,
			'firstname'=> $request->firstName,
			'lastname'=> $request->lastName,
			'profile_image' => $request->photoUrl,
			'facebook_id'	=>	$facebook_id,
			'google_id'		=>	$google_id,
			'social_login_type'	=>$request->provider,
            'company_id'=>	$company->id,
            'user_color'	=> $color->color_class,
		
		]);
        $roles = ['Administrator','Manager','Employee','Home-Owner'];
        $permissions = ['1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36','1,2,3,6,8,9,11','1,2,3,4,6','5,6,7,8,9,10,12'];
		//print_r($permissions);die;
        for($i=0;$i<4;$i++){
			 if($roles[$i] =='Home-Owner'){
                $is_internal =2;
            }else{
                $is_internal =1;
           }

            $user_roles = \App\UserRole::create([
                
                     'role' => $roles[$i],
                     'usertype' => $request->usertype,
                     'is_internal' =>$is_internal,
                     'company_id'=>	$company->id
                ]);

             $permissions = \App\RoleHasPermission::create([
                     'role_id' => $user_roles->id,
                     'permission_ids' => $permissions[$i]
                ]);
            if($i==0){
                \App\User::where('id', $user->id)->update(['userrole'=>$user_roles->id]);
            }

        }
	
		$userdetails = \App\UserDetail::create([
			'user_id' => $user->id,
		]);
 
        try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token=JWTAuth::fromUser($user)) {
            return $this->onUnauthorized();
        	}


        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return $this->onJwtGenerationError();
        }

        //return $this->onAuthorized($token,$user->usertype);
        $username = $user->firstname.' '.$user->lastname;
        $company =  \App\Companysetting::select('company_dateformat')->where('company_id',$user->company_id)->first();
        if($company){
            $company_dateformat = $company->company_dateformat;
        }else{
            $company_dateformat = 'D/M/YYYY';
        }
        $permissions = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$user->userrole)->first();
        if($permissions){
            $user_permissions = $permissions->permission_ids;
        }else{
            $user_permissions = '';
        }
        return $this->onAuthorized($token,$request->usertype,$username,$user->profile_image,$company_dateformat,$user_permissions);
        
    }
	
	
	
	public function social_login_user(Request $request)
    {
       	$user=\App\User::where('email',$request->email)->first();
	   	if($user){
			try {
				// Attempt to verify the credentials and create a token for the user
				if (!$token=JWTAuth::fromUser($user)) {
				return response()->json(['error' => 'invalid_credentials'], 401);
			}
	
			} catch (JWTException $e) {
				// Something went wrong whilst attempting to encode the token
				return $this->onJwtGenerationError();
			}
	
			
			if ($user->is_active == 0) {
					return new JsonResponse([
				'status_code' => 401,
				'message' => "Your account is Inactive"
			], Response::HTTP_UNAUTHORIZED);
				}
            $username = $user->firstname.' '.$user->lastname;
            $company =  \App\Companysetting::select('company_dateformat')->where('company_id',$user->company_id)->first();
            if($company){
                $company_dateformat = $company->company_dateformat;
            }else{
                $company_dateformat = 'D/M/YYYY';
            }
            $permissions = \DB::table('role_has_permissions')->select('permission_ids')->where('role_id',$user->userrole)->first();
            if($permissions){
                $user_permissions = $permissions->permission_ids;
            }else{
                $user_permissions = '';
            }
            return $this->onAuthorized($token,$request->usertype,$username,$user->profile_image,$company_dateformat,$user_permissions);
        
		}else{
			return response()->json([
                'success' => false,
                'message' => 'user not register, please signup first',
				
            ], 400);
		}
    }
}
