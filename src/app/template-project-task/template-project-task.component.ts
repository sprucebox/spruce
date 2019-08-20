import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { NgForm } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-template-project-task',
  templateUrl: './template-project-task.component.html',
  styleUrls: ['./template-project-task.component.css']
})
export class TemplateProjectTaskComponent implements OnInit {
  project_title_sorting_popup:any;
  BAG = "VAMPIRES";
  BAG1 = "VAMPIRE";
  BAG2 = "VAMPIRESS";
  task_title_list: any;
 addTasktemplateData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '1',
    
    task_priority : '1',
   
    source_type : 'project',
    source_id : '',
  };
    addTasktypetemplateData = {
    task_list_name : '',
    task_type_id : '1',
    template_project_id : '',
  };
   edittemplateTaskTitleFormData = {
    task_list_name : '',
    task_list_id:'1',
    task_type_id:'',
  }
   delete_title_id:any;
    TasksTypes : any;
  allTasks:any;
   
  hideModal: boolean = false;
  pr_show = false;
  url:'';
  searchText:string;
  project_id:any;
  status_list:any;
   select_permissions:any;
   current_page:string;
  modeldisplay2:any=false;
  modeldisplay3:any=false;
  applyback:any=false;
  task_update_id: any;
  newListItem:any;
  buttonDisabled:boolean=true;
  subs = new Subscription();
   private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
   constructor( private _router: Router, private _activatedroute: ActivatedRoute, private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private dragulaService: DragulaService, private toastr: ToastrService) {

      this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG)
      .subscribe(({ name, el, source, target }) => {
        this.addClass(el, 'ex-moved');

  

      })
    );
    this.subs.add(dragulaService.over(this.BAG)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG1)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG1)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG1)
      .subscribe(({ name, el, source, target }) => {
        this.addClass(el, 'ex-moved');

        //var id1 = el.getElementsByTagName("a")[0].getAttribute("id");

       // var current_status1 = target.getAttribute("id");
        //console.log('project task id');
        //console.log(current_status1);
       

      })
    );
    this.subs.add(dragulaService.over(this.BAG1)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG1)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
    
    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG2)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG2)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG2)
      .subscribe(({ name, el, source, target }) => {

        this.addClass(el, 'ex-moved');

        var id2 = el.getElementsByTagName("td")[0].getAttribute("id");
      

        if(id2)
        {
        var ids = [];
       
        var pos = 1;
        $('#tableId tr td').each(function () {

          var $td = $(this);

          var id = $td.attr("id");
         
          ids.push({ 'id': id, 'position': pos });


          pos++;

        });
       
        this.task_update_id = ids;
        this.buttonDisabled = false;
        }
        else
        {
          
          this.buttonDisabled = true;
        }
      
        
      })
    );
    this.subs.add(dragulaService.over(this.BAG2)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG2)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }
  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }
public uploader: FileUploader = new FileUploader({url:this._taskimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
	    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	   this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
      });
	   this.get_all_template_task();
	   this.addTasktemplateData.source_id = this.project_id;
	   this.addTasktypetemplateData.template_project_id = this.project_id;
	 this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
          response = JSON.parse(response);
          this.addTasktemplateData.task_image_url = response.image_name;
          
       };
	  this.get_template_task_title_list();
	  this.select_permissions = localStorage.getItem('permissions');
		console.log(this.select_permissions);
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
      this.addTasktemplateData.source_id = this.project_id;
	  
    }
	    test(){
      this.addTasktemplateData.task_list_id = '1';
      const data = {
        project_id :this.project_id
      }

     console.log(data);
      this._ProjectService.gat_task_template_type(data)
      .subscribe(
        res => {
          this.TasksTypes = res.responce;
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
   add_template_task(form){
     
     
      this._ProjectService.add_template_task(this.addTasktemplateData)
      .subscribe(
        res => {
          this.get_all_template_task();	
		  console.log(form);
      form.reset();
		this.toastr.success('Template Task Added', 'success');	
		this._app.loading = false;
		 this._router.navigate([this.current_page+'/template-project-task/'+this.project_id]);
		// this.hideModal = true;	
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
	add_template_task_type(){
    this._app.loading = true;
    this._ProjectService.add_template_task_type(this.addTasktypetemplateData)
      .subscribe(
        res => {
         
         
          this.toastr.success('Template Title Added', 'success');
		   this.get_all_template_task();	
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
   get_template_task_title_list(){
    const data = {
      project_id :this.project_id
    }
console.log(data);
    this._ProjectService.get_template_task_title_list(data)
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
  
  edit_template_task_title(task_title_id,task_list_name,task_type_id){
    this.edittemplateTaskTitleFormData.task_list_id =task_title_id;
    this.edittemplateTaskTitleFormData.task_list_name =task_list_name;
    this.edittemplateTaskTitleFormData.task_type_id =task_type_id;
  }
  update_template_task_title(){
    this._app.loading = true;
    this._ProjectService.update_template_task_title(this.edittemplateTaskTitleFormData)
      .subscribe(
        res => {
          this.get_template_task_title_list();
          this.get_all_template_task();
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
  delete_template_task_title(title_id){
    this.delete_title_id = title_id;
    const data={
      title_id:title_id
    }
    this._ProjectService.check_delete_template_task_title(data)
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
   delete_template_title(title_id){
    this._app.loading = true; 
    const data={
      title_id:title_id
    }
    this._ProjectService.delete_template_task_title(data)
      .subscribe(
        res => {
          this.get_template_task_title_list();
          this.toastr.success('Title Deleted', 'success');
          this._app.loading = false;
          this.modeldisplay2=false;
          this.applyback=false;
        },
        err =>{
          this._app.loading = false;
          console.log(err);
          this._router.navigate(["/login"]);
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
get_all_template_task(){
      const data = {
        project_id :this.project_id
      }

      this._ProjectService.get_private_template_task(data)
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
      this._ProjectService.update_template_task_priority(data)
      .subscribe(
        res => {
          
          this.get_all_template_task();
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
      this._ProjectService.update_template_task_status(data)
      .subscribe(
        res => {
          this.get_all_template_task();
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
	
	  open_sorting_popup() {
    this.project_title_sorting_popup = true;
  }
  hidemodel7() {
    this.project_title_sorting_popup = false;
    this.applyback = false;
  }
  create_task_title_new(task_update_id) {
    const data = {
      ids: task_update_id,
      project_id: this.project_id,

    };
    console.log(data);
    //console.log(data);
    this._ProjectService.create_task_title_new(data)
      .subscribe(
        res => {
          console.log(res);
          this.newListItem= res;
          console.log(this.newListItem);
          this._app.loading = false;
          this.get_template_task_title_list();
          this.get_all_template_task();
          this.toastr.success('Task title  addeds', 'success');

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
}
