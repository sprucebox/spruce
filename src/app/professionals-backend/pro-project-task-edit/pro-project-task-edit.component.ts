import { NgModule, Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import {saveAs as importedSaveAs} from "file-saver";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  DropzoneModule, DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment.prod';



import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
@Component({
  selector: 'app-pro-project-task-edit',
  templateUrl: './pro-project-task-edit.component.html',
  styleUrls: ['./pro-project-task-edit.component.css'],
  
 
})
export class ProProjectTaskEditComponent implements OnInit {
	
	uploadedFiles: any[] = [];
  upload_url = `${environment.api}/project_file_upload_for_web`;
  @ViewChild("gantt_here") ganttContainer: ElementRef;
  err_message : string='';
  project_company_id:any;
   yourCondition: boolean = false;
     message: any;
	 selectedFiles:any;
  project_userrole:any;
  company_id:any;
  cal_percentage:any;
  isDisabled = false;
alldatetask:any;
  status_list:any;
  Projectname:any;
   select_permissions:any;
  calendar:boolean=false;
   calendar_time:boolean=true;
hide_time_data:any;
  timedetail:any;
  contentEditable:any;
  modeldisplay4:any=false;
  projectiddata:any;
  dropdownList = [];
  selectedItems = [];
  temparray = [];
  tempstring = '';
  remove_user_id:any;
  user_file_name:any;
  dropdownSettings = {};
  current_page:string;
   modeldisplay2:any=false;
  applyback:any=false;
  project_id:any;
  dateEditable:any;
  project_id1:any;
  task_id:any;
  roletask:any;
  alltaskfiles:any;
  allcomments:any;
  testdate:string ='Due Date';
  testdate1 :string='Start Date';
  testdate4 :any;
  testdate5 :any;
  upload_file : 'task';
  show_date_box:boolean=false;
  show_task_name: boolean = true;
  show_task_desc: boolean = true;
  show_grantt: boolean = false;
  TaskCommentFormData = {
    comment : '',
    task_id : '',
  }
   temp_start_date:Date = new Date();
  temp_due_date:Date = new Date();
  updateTaskFromData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '',
    task_owner_ids : '',
     task_start_date :this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_end_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    
	
    task_priority : '',
    task_completion : '',
    task_work_hours : '',
    task_duration : '',
    task_done_by_id : '',
    task_vendor_id : '',
    status:'',
    source_type : 'project',
    source_id : '',
    event_id  : '',
    task_id:'',
    is_private:'',
	hide_time:'',
  };
  @ViewChild('drpzone') drpzone: DropzoneComponent;
  public config: DropzoneConfigInterface = {

    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  constructor(private _activatedroute: ActivatedRoute,private toastr: ToastrService,private _router: Router,private _app: AppComponent,private _ProjectService:ProjectService,private datePipe: DatePipe) { }
  dobSettings = {
    bigBanner: false,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm',
    defaultOpen: false,
    closeOnSelect: true,
    rangepicker: false

}
  ngOnInit() {
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
      this.task_id =params['taskid'];
      
     });
	 this.get_company_id_check();
	 this.timedetail=localStorage.getItem('timezonedata');
	 this.alldatetask=localStorage.getItem('company_dateformat');
     this._ProjectService.set_project_id(this.project_id );
this.select_permissions = localStorage.getItem('permissions');
////console.log(this._ProjectService.get_project_id(this.project_id));
////console.log("mayank");

     this.TaskCommentFormData.task_id =this.task_id;
     this.get_task_details_by_id();
     this.get_project_task_files();
	  this.get_project_by_id();
     this.get_all_task_comments();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    const data1 ={ project_id1 : this.project_id}
    //console.log(data1);
   

  }
  
  onItemSelect (item:any) {
    //console.log(this.selectedItems);
  }
  onSelectAll (items: any) {
    //console.log(items);
  }
    get_company_id_check(){
      const data = {
        project_id1:this.project_id
      } 
      //console.log(data);
          this._app.loading = true;
            this._ProjectService.get_company_id_check(data)
            .subscribe(
              res => {
                //console.log(res);
               
                this.company_id=localStorage.getItem('company_id');
				
				
                //console.log(this.company_id);
                this.project_company_id=res.project_id;
                //console.log(this.project_company_id);
				this.project_userrole=res.userrole;
                this._app.loading = false;
              },
              err =>{//console.log(err.error.message);
			  this._app.loading = false;
        if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
                }
            );
        }
  get_task_details_by_id(){
    const data = {task_id:this.task_id,project_id:this.project_id,}

    this._ProjectService.get_project_task_details(data).subscribe(
      res => {
       this.testdate4=res.data.task_start_date;
       this.testdate5=res.data.task_end_date;
      this.hide_time_data=res.data.hide_time;
	  //console.log(this.hide_time_data);
        //console.log(res.role.role);
        this.updateTaskFromData = {
          task_name : res.data.task_name,
          task_description : res.data.task_description,
          task_image_url : res.data.task_image_url,
          task_list_id : res.data.task_list_id,
         
           task_start_date : res.data.task_start_date,
           
          task_end_date : res.data.task_end_date,
          task_priority : res.data.task_priority,
          task_completion :res.data.task_completion,
          task_work_hours : res.data.task_work_hours,
          task_duration : res.data.task_duration,
          task_done_by_id : res.data.task_done_by_id,
          task_vendor_id : res.data.task_vendor_id,
          is_private: res.data.is_private,
		   hide_time: res.data.hide_time,
          status : res.data.status,
          source_type : 'project',
          source_id : this.project_id,
          event_id  : res.data.id,
          task_id : this.task_id,
		   task_owner_ids : ''
        };
        
		if (this.updateTaskFromData.hide_time=='1') 
  {
 
     this.calendar = true;
      this.calendar_time = false;
      
  }
      else 
      {
    
      this.calendar = false;
      this.calendar_time = true;
      }   
        if(this.updateTaskFromData.is_private=='1')
        {
          this.isDisabled = !this.isDisabled;
        }
        
    this.roletask = res.role.role;
    if(res.data.task_start_date!='0000-00-00 00:00:00'){
      this.testdate4 = new Date(this.datePipe.transform( res.data.task_start_date, 'M/d/yy, h:mm a'));
      this.show_date_box = true;
      this.testdate5 = new Date(this.datePipe.transform( res.data.task_end_date, 'M/d/yy, h:mm a'));
  
    }
        
        const data2 = {
          project_id :this.project_id,
          task_owner_ids :res.data.task_owner_ids,
        }

        this._ProjectService.get_project_user_for_task(data2)
		.subscribe(
          res => {
            this.dropdownList = res.data;
            this.selectedItems = res.selected_users;
            //console.log(res);
            //this._app.loading = false;
          },
          err =>{
             this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
            }
        );

     },
     err =>{
       this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }
    );

//console.log(this.testdate4);

  }
    get_project_by_id(){
      const data = {
        project_id :this.project_id
      }
      
    this._ProjectService.get_project_by_id(data)
      .subscribe(
        res => {
          
          this.Projectname = res.projects.project_name;
          this.status_list = res.task_status_list;
         // this.company_id=localStorage.getItem('company_id');
          // this.project_company_id=res.project_id;
          // this.username=res.users;
          //this._app.loading = false;
        },
        err =>{ this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );
    }
	
 
  confirm_move_archive(){
  
    this.modeldisplay2=true;
    this.applyback=true;
  }
  hidemodel2(){ this.modeldisplay2=false;}
  showhidebox(box){
    if(box=='task_name'){
      if(this.show_task_name){
        this.show_task_name=false;
      }else{
        this.show_task_name=true;
      }

    }else if(box=='task_description'){
      if(this.show_task_desc){
        this.show_task_desc=false;
      }else{
        this.show_task_desc=true;
      }
    }
  }


  check_calender(event) {
  if ( event.target.checked ) 
  {
	//  this.updateTaskFromData.hide_time='true';
	 //console.log(this.updateTaskFromData.hide_time);
      this.calendar = true;
      this.calendar_time = false;
  }
      else 
      {
		  // this.updateTaskFromData.hide_time='false';
      this.calendar = false;
      this.calendar_time = true;
      }
 
}
datetriggerEvent(event: any) {
  ////console.log(event);
  if ( event.target.checked) {
	  this.dateEditable = true;
   //console.log("true");
}

else 
{
	this.dateEditable = false;
	//console.log("false");
	
}

 
  return;
}
  onSending(data: any): void {

    const file = data[0];
    ////console.log(file);
    const formData = data[2];
    formData.append('token', localStorage.getItem("token"));
    formData.append('task_id', this.task_id);
    formData.append('folder_id', 0);
    formData.append('source_type', 'project_task_file');
	formData.append('source_id', this.project_id);
	formData.append('upload_task', 'task');
    //console.log(formData);
  }

  uploadFiles() {
    //this.drpzone.processQueue();
    this.drpzone.directiveRef.dropzone().processQueue();
    //console.log("uploading...");
  }

  deletefile(file_id,file_name){
    this.remove_user_id =file_id;
    this.user_file_name=file_name;
    this.modeldisplay4=true;
    this.applyback=true;
  }
  hidemodel5(){ this.modeldisplay4=false;}
  remove_user(file_id,file_name) {

    const file = {
      file_id :file_id,
      file_name:file_name
    };
   //console.log(file);
      this._ProjectService.deletefiles(file)
      .subscribe(
        res => {
          this.get_project_task_files();
          this._app.loading = false;
          this.modeldisplay4=false;
          this.applyback=false;
        },
        err =>{
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );
    
  }

  onSendingmultiple() {

  }

  onError(event) {

  }
  onSuccess(data) {
    //console.log(data);
    this.get_project_task_files();
  }

  downloadFile(filename,name){
  
	 const data = {
      fileurl :filename
    }
	//console.log(data);
    //console.log(filename);
	this._ProjectService.downloadFile(data).subscribe(blob => {
              importedSaveAs(blob,name);
   },  err =>{
             this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
            }
        );
    }

    addComment(){
      //console.log(this.TaskCommentFormData);
      this._ProjectService.addTaskComment(this.TaskCommentFormData)
      .subscribe(
        res => {
          //console.log(res);
          this.TaskCommentFormData.comment = '',
          this.get_all_task_comments();
        },
        err =>{
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );
    }
    get_all_task_comments(){
      const data = {
        task_id : this.task_id,
        project_id :this.project_id,
      }
      this._ProjectService.get_all_comments_by_task_id(data)
      .subscribe(
        res => {
          this.allcomments = res.data;
          //console.log(res.data);
        },
        err =>{
         this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );
    }

    // loadgantt(){

      // this.show_grantt=true;
    // }

    //triggerSomeEvent(event: any) {
      ////console.log(event);
      //if ( event.target.checked ) {
      //  this.contentEditable = true;
      //  //console.log(this.contentEditable);
      //  this.updateTaskFromData.is_private=this.contentEditable;
       // //console.log(this.updateTaskFromData.is_private);
        
   // }
   // this.isDisabled = !this.isDisabled;
   
      //return;
   // }

SomeEvent($event) {
	 if ( $event ) {
 this.updateTaskFromData.is_private=$event.target.checked;
     //console.log(this.updateTaskFromData.is_private);
}
this.isDisabled = !this.isDisabled;
     
      return;
}
    test() {
      var first=  this.testdate4 ;
	  // alert(first);
      var second= this.testdate5;
	  // alert(second);
       var date =  first.getTime();
	   // alert(date);

      var date2= second.getTime();
	  // alert(date2);

    if (date < date2)
    {

       this.err_message = "";
       //console.log("greater");
    }
    else
    {
       this.err_message = "start date should be Greater than end date";
       //console.log("less");
    }


    var one_day=1000*60*60*24

//Calculate difference btw the two dates, and convert to days
var c = Math.round(Math.abs((first.getTime()-second.getTime())/(one_day)))+"";
// alert(c);
    this.updateTaskFromData.task_duration=c;
	

    }
    onChange($event)
    {


    var s = this.testdate4;

    //console.log(s);

    var n = this.updateTaskFromData.task_duration;

    //console.log(n);
	if (n < '0')
	{
		this.updateTaskFromData.task_duration='0';
		
	}
	else if (n < '1')
	{
		this.testdate4;
		
	}
	else if(n >= '1')
	{
		
    var today= new Date(s);
    //console.log(today); //Today's Date
    var last=today.setDate(today.getDate() + parseInt(n));

    this.testdate5  = new Date(this.datePipe.transform(last, 'yyyy-MM-dd HH:mm:ss'));
	
	}
// if (last < 0 )
// {
	
	
// }

    }
    update_task_detail()
    {
    
      this._app.loading = true;
       for(let item of this.selectedItems){
            this.temparray.push(item.user_id);
          }
      this.updateTaskFromData.task_owner_ids = this.temparray.join(",");
	  // if(this.updateTaskFromData.hide_time=='false')
	  // {
		//   this.updateTaskFromData.hide_time == 0;
	  // }
	  // else if(this.updateTaskFromData.hide_time=='true')
	  // {
		//   this.updateTaskFromData.hide_time == 1;
	  // }
      if(this.show_date_box){
        if(this.testdate4!='0000-00-00 00:00:00'){
          this.updateTaskFromData.task_start_date = this.datePipe.transform(this.testdate4, 'yyyy-MM-dd HH:mm:ss');
        }
        if(this.testdate5!='0000-00-00 00:00:00'){
          this.updateTaskFromData.task_end_date = this.datePipe.transform(this.testdate5, 'yyyy-MM-dd HH:mm:ss');
        }
        
      }else{
        if(this.updateTaskFromData.task_start_date!='0000-00-00 00:00:00'){
          this.updateTaskFromData.task_start_date = this.datePipe.transform(this.updateTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
        }
        if(this.updateTaskFromData.task_end_date!='0000-00-00 00:00:00'){
          this.updateTaskFromData.task_end_date = this.datePipe.transform(this.updateTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
        }
        
      }
      //console.log(this.updateTaskFromData);
        this._ProjectService.update_task_detail(this.updateTaskFromData)
        .subscribe(
          res => {
			  //console.log(res);
            this.toastr.success('Task Updated', 'success');
            this._router.navigate([this.current_page+'/project-task/'+this.project_id]);
            this._app.loading = false;
       },
       err =>{
      this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }

        );
    this.selectedItems = [];
    }
	update_task_data(){
     const data = {task_id:this.task_id,project_id:this.project_id,}

   this._ProjectService.update_task_data(data)
    .subscribe(
      res => {
		   this.toastr.success('move to archive', 'success');
this._router.navigate(["/professionals/project-task/",this.project_id]);
     //console.log(res.data);
     
    });

  }
 onBeforeSend(event) {
		
    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
   
	 event.formData.append('token', localStorage.getItem("token"));
    event.formData.append('source_id', this.project_id);
    event.formData.append('folder_id', 0);
    event.formData.append('task_id', this.task_id);
	 // formData.append('project_id', this.project_id);
	event.formData.append('upload_file', 'task');
    event.formData.append('source_type', 'project_task_file');
		  
  
	 this.get_project_task_files();
 }

 onUpload(event) {
	 //console.log("mayuri");
	  this.get_project_task_files();
   //console.log('rashmi');
    // event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
     // var obj = JSON.parse(event.xhr.response);
    
    //console.log(event);
       for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
   //console.log(event.files);
   
  this.get_project_task_files();
}
  get_project_task_files(){
    const data = {
      task_id : this.task_id
    }
  this._ProjectService.get_project_task_files(data)
    .subscribe(
      res => {
        this.alltaskfiles = res.data;
        //console.log(res.data);
        //this._app.loading = false;
      },
      err =>{
        this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );

  }
  chooseFile(event) {
    var temp = 0;
    for (var size in event.files) {
      if (event.files[size]['size']) {
        temp += event.files[size]['size'];
      }
    }
    this.selectedFiles = temp;
    if (temp > 11000000) {
      this.message = "File should be less than 11 mb. Please remove some files.";
      this.get_project_task_files();
      this.yourCondition = false;
    }
    else {
      this.yourCondition = true;
    }
  }

  removeFile(event) {
    var temp = 0;
    this.selectedFiles-=event.file['size'];
    if (this.selectedFiles > 11000000) {
      this.message = "File should be less than 11 mb. Please remove some files.";
      this.get_project_task_files();
      this.yourCondition = false;
    }
    else {
      this.yourCondition = true;
      this.message = '';
    }
  }
}
