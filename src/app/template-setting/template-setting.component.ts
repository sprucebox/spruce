import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-template-setting',
  templateUrl: './template-setting.component.html',
  styleUrls: ['./template-setting.component.css']
})
export class TemplateSettingComponent implements OnInit {
 showinternal:any=true;
  delete_title_id:any;
  
 addTasktemplateData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '1',
    
    task_priority : '0',
   
    source_type : 'task',
   
  };
   addTasktypetemplateData = {
    task_list_name : '',
    task_type_id : '1',
    
  };
edittemplateTaskTitleFormData = {
    task_list_name : '',
    task_list_id:'1',
    task_type_id: '',
  }  
  allTasks:any;
  status_list:any;
   current_page:string;
     modeldisplay2:any=false;
  modeldisplay3:any=false;
  applyback:any=false;
  TasksTypes : any;
  task_title_list:any;
 allProjects:any;
  showexternal:any=false;
    pr_show = false;
url:any;
  project_id:any;
  select_permissions:any;
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
   constructor(private fb: FormBuilder,private _app: AppComponent,private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService) { }
public uploader: FileUploader = new FileUploader({url:this._taskimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
	  this.get_all_projects_template();
	   this.get_template_task();
	  this.get_template_title_list();
	   this.select_permissions = localStorage.getItem('permissions');
	   console.log(this.select_permissions);
	   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
          response = JSON.parse(response);
          this.addTasktemplateData.task_image_url = response.image_name;
            
       };
	  
	  }
openDialog()
  {
    this.showinternal=true;	
    this.showexternal=false;	
    
  }
  openDialog1()
  {
    
    this.showinternal=false;	
    this.showexternal=true;
   
  }
  onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { 
          let target: any = event.target; 
          this.url = target.result;
        }
        this.uploader.uploadAll();
      }
     
	  
    }
  get_all_projects_template(){
    //this._app.loading = true;
    this._ProjectService.get_all_projects_template()
    .subscribe(
      res => {
        console.log(res.projects);
		// this.role = res.role;
		// console.log(res.role);
        this.allProjects = res.projects;
        // this.company_id=localStorage.getItem('company_id');
        
        //this._app.loading = false;
      },
      err =>{
         this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
  
  
  add_template_new_task(form){
     
     this.addTasktemplateData.source_type='task';
      this._ProjectService.add_template_new_task(this.addTasktemplateData)
      .subscribe(
        res => {
          // this.get_all_template_task();	
		  console.log(form);
      form.reset();
		this.toastr.success('New Template Task Added', 'success');	
		 this.get_template_task();
		this._app.loading = false;
		 
		// this.hideModal = true;	
        },
        err =>{
          this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );
      
    }
	test123(){
     
     
      this._ProjectService.gat_template_type()
      .subscribe(
        res => {
          this.TasksTypes = res.responce;
        },
        err =>{
         this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
          }
      );

      
     
    }
	
	add_tile_task_type(){
    this._app.loading = true;
    this._ProjectService.add_tile_task_type(this.addTasktypetemplateData)
      .subscribe(
        res => {
              this.toastr.success('Template Title Added', 'success');
		    this.get_template_task();	
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
  edit_template_title(task_title_id,task_list_name,task_type_id){
    this.edittemplateTaskTitleFormData.task_list_id =task_title_id;
    this.edittemplateTaskTitleFormData.task_list_name =task_list_name;
    this.edittemplateTaskTitleFormData.task_type_id =task_type_id;
  }
  get_template_title_list(){
    

    this._ProjectService.get_template_title_list()
    .subscribe(
      res => {
		  console.log(res);
        this.task_title_list = res.data;
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
  update_template_title(){
    this._app.loading = true;
    this._ProjectService.update_template_title(this.edittemplateTaskTitleFormData)
      .subscribe(
        res => {
           this.get_template_title_list();
           this.get_template_task();	
          this.toastr.success('template Title Updated', 'success');
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
  delete_template_tasktitle(title_id){
    this.delete_title_id = title_id;
    const data={
      title_id:title_id
    }
    this._ProjectService.check_delete_template_title(data)
      .subscribe(
        res => {
          if(res.result==1){
            this.modeldisplay2=true;
            this.applyback=true;
          }else{
            this.modeldisplay3=true;
            this.applyback=true;
          }
          
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
   delete_template_titletask(title_id){
    this._app.loading = true; 
    const data={
      title_id:title_id
    }
    this._ProjectService.delete_template_titletask(data)
      .subscribe(
        res => {
          this.get_template_title_list();
          this.toastr.success('Title Deleted', 'success');
          this._app.loading = false;
          this.modeldisplay2=false;
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
  hidemodel2(){
    this.modeldisplay2=false;
    this.applyback=false;
  }
  hidemodel3(){
    this.modeldisplay3=false;
    this.applyback=false;
  }
  
  
  get_template_task(){
      
      this._ProjectService.get_template_task()
      .subscribe(
        res => {
          console.log(res);
          this.allTasks = res.response;
		 
		this.status_list = res.task_status_list;
        
       
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
	change_priority(task_id,priority){
      this._app.loading = true;
      const data = {
        task_id : task_id,
        priority  : priority,
      }
      this._ProjectService.update_template_priority(data)
      .subscribe(
        res => {
          
          this.get_template_task();
          this._app.loading = false;
          this.toastr.success('Task Priority Updated', 'success');
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
	change_status(task_id,status){
      this._app.loading = true;
      const data = {
        task_id : task_id,
        status  : status,
      }
      this._ProjectService.update_template_status(data)
      .subscribe(
        res => {
           this.get_template_task();
          this._app.loading = false;
          this.toastr.success('Task Status Updated', 'success');
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
}
