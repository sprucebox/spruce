import { NgModule, Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import {saveAs as importedSaveAs} from "file-saver";
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  DropzoneModule, DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import { AppComponent } from '../app.component';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-template-edit-task',
  templateUrl: './template-edit-task.component.html',
  styleUrls: ['./template-edit-task.component.css']
})
export class TemplateEditTaskComponent implements OnInit {
	
	 uploadedFiles: any[] = [];
  upload_url = `${environment.api}/project_file_upload_for_web`;
	@ViewChild('drpzone') drpzone: DropzoneComponent;
  public config: DropzoneConfigInterface = {

    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  alltaskfiles:any;
	task_id:any;
	allcomments:any;
	 modeldisplay4:any;
  remove_user_id:any;
  applyback:any = false; 
  user_file_name:any;
	 show_date_box:boolean=false;
  show_task_name: boolean = true;
  show_task_desc: boolean = true;
  current_page:string;
updatetemplateTaskFromData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '',
   
    task_priority : '',
 
    task_work_hours : '',
   
    status:'',
    source_type : 'task',
   
    
    task_id:'',
    
  };
  TaskCommentFormData = {
    comment : '',
    task_id : '',
  }
  constructor(private _activatedroute: ActivatedRoute,private toastr: ToastrService,private _router: Router,private _app: AppComponent,private _ProjectService:ProjectService,private datePipe: DatePipe) { }

  ngOnInit() {
	   var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
      
      this.task_id =params['taskid'];
      
     });
	 this.TaskCommentFormData.task_id =this.task_id;
	  this.get_template_task_id();
	  this.get_template_comments();
	  this.get_template_task_files();
  }
  
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
    get_template_task_id(){
    const data = {task_id:this.task_id}
console.log(data);
    this._ProjectService.get_template_task_id(data).subscribe(
      res => {
      
        console.log(res);
        this.updatetemplateTaskFromData = {
          task_name : res.data.task_name,
          task_description : res.data.task_description,
          task_image_url : res.data.task_image_url,
          task_list_id : res.data.task_list_id,
          
          task_priority : res.data.task_priority,
         
          task_work_hours : res.data.task_work_hours,
          
          status : res.data.status,
          source_type : 'task',
          
          
          task_id : this.task_id
        };
            
  },
  err =>{
    this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }console.log("error!!!");
}
    

        );
  }
  onSending(data: any): void {

    const file = data[0];
    console.log(data[0]);
    const formData = data[2];
	console.log(data[2]);
    formData.append('token', localStorage.getItem("token"));
    formData.append('task_id', this.task_id);
    formData.append('folder_id', 0);
    formData.append('source_type', 'task_template_file');
	
	formData.append('upload_task', 'task');
    console.log(this.task_id);
  }
  get_template_task_files(){
    const data = {
      task_id : this.task_id
    }
  this._ProjectService.get_template_task_files(data)
    .subscribe(
      res => {
        this.alltaskfiles = res.data;
        console.log(res.data);
        //this._app.loading = false;
      },
      err =>{
       this._app.loading = false;
          console.log(err.error.message);
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
  uploadFiles() {
  
    this.drpzone.directiveRef.dropzone().processQueue();
    console.log("uploading...");
  }
  
   onSendingmultiple() {

  }

  onError(event) {

  }
  onSuccess(data) {
    console.log(data);
     this.get_template_task_files();
  }
   downloadFile(filename){
    console.log(filename);
    this._ProjectService.downloadFile(filename).subscribe(blob => {
              importedSaveAs(blob, filename);
          },err => console.log(err)
        );
    }
  update_template_by_id_detail()
    {
		this._app.loading = true;
    this._ProjectService.update_template_by_id_detail(this.updatetemplateTaskFromData)
        .subscribe(
          res => {
            this.toastr.success('Template Task Updated', 'success');
            this._router.navigate([this.current_page+'/template-setting/']);
            this._app.loading = false;
       },
       err =>{
      this._app.loading = false;
          console.log(err.error.message);
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
	addtemplatetaskComment(){
	
       console.log(this.TaskCommentFormData);
	   this._app.loading = true;
      this._ProjectService.addTemplateComment(this.TaskCommentFormData)
      .subscribe(
        res => {
          console.log(res);
          this.TaskCommentFormData.comment = '',
		   this._app.loading = false;
            this.get_template_comments();
        },
        err =>{
        this._app.loading = false;
          console.log(err.error.message);
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
get_template_comments(){
      const data = {
        task_id : this.task_id,
       
      }
      this._ProjectService.get_template_comments(data)
      .subscribe(
        res => {
          this.allcomments = res.data;
          console.log(res.data);
        },
        err =>{
          this._app.loading = false;
          console.log(err.error.message);
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
	deletetasktemplatefiles(file_id,file_name){
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
   console.log(file);
      this._ProjectService.deletetasktemplatefiles(file)
      .subscribe(
        res => {
          this.get_template_task_files();
          this._app.loading = false;
          this.modeldisplay4=false;
          this.applyback=false;
        },
        err =>{
           this._app.loading = false;
          console.log(err.error.message);
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
  	 onBeforeSend(event) {
		
    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
   
	 event.formData.append('token', localStorage.getItem("token"));
    //event.formData.append('source_id', this.project_id);
    event.formData.append('folder_id', 0);
    event.formData.append('task_id', this.task_id);
	 // formData.append('project_id', this.project_id);
	event.formData.append('upload_task', 'task');
    event.formData.append('source_type', 'task_template_file');
		  
  
	 this.get_template_task_files();
 }

 onUpload(event) {
	 console.log("mayuri");
	  this.get_template_task_files();
   console.log('rashmi');
    // event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
     // var obj = JSON.parse(event.xhr.response);
    
    console.log(event);
       for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
   console.log(event.files);
   
  this.get_template_task_files();
}
}
