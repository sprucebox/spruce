import { Component, OnInit } from '@angular/core';
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
const moment = (_moment as any).default ? (_moment as any).default : _moment;
export const MY_CUSTOM_FORMATS = {
  parseInput: 'l LT',
   fullPickerInput: localStorage.getItem('company_dateformat')+' hh:mm A',
   datePickerInput: localStorage.getItem('company_dateformat')+' hh:mm A',
   timePickerInput: 'LT',
   monthYearLabel: 'MMM YYYY',
   dateA11yLabel: 'LL',
   monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-project-task-archive',
  templateUrl: './project-task-archive.component.html',
  styleUrls: ['./project-task-archive.component.css'],
  providers: [
    {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
],

})
export class ProjectTaskArchiveComponent implements OnInit {

  /////////////hide//////////
	task_type:any;
	//////////////hide//////////////////
  
  BAG = "VAMPIRES";
  BAG1 = "VAMPIRE";
  task_title_list:any;
  searchText:string;
	subs = new Subscription();
  task_id:any;
  delete_title_id:any;
  modeldisplay2:any=false;
  modeldisplay3:any=false;
  applyback:any=false;
  showfilterbox:boolean=false;
  statusfilterarray:string[]=[];
  priorityfilterarray:string[]=[];
  private master_array_for_filter:any;
	task_status:any;
  showlist:any=true;
  showgrid:any=false;
  open_tasks:any;
  close_tasks:any;
  pending_tasks:any;
  datas:any;
  details:any;
  applicables:any;
  dropdownList = [];
  selectedItems = [];
  temparray = []
  dropdownSettings = {};
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
  TasksTypes : any;
  allTasks:any;
  allPublicTasks : any;
  project_id:any;
  Projectname:any;
  task_image_name:'';
  pr_show = false;
  url:'';
  status_list:any;
  addTaskFromData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '1',
    task_owner_ids : '',
    task_start_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_end_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_reminder_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_priority : '',
    source_type : 'project',
    source_id : '',
  };

  addTaskTypeFromData = {
    task_list_name : '',
    task_type_id : '',
    project_id : '',
  };

  editTaskTitleFormData = {
    task_list_name : '',
    task_list_id:''
  }
  constructor( private _router: Router,private _activatedroute: ActivatedRoute,private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private dragulaService: DragulaService,private toastr: ToastrService) {  

      this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG)
      .subscribe(({ name, el, source}) => {
        this.removeClass(el, 'ex-moved');
      })
    ));
    
	this.subs.add(dragulaService.drop(this.BAG)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG)
      .subscribe(({ name, el, source, target}) => {
		  this.addClass(el, 'ex-moved');

		 var id= el.getElementsByTagName("p")[0].getAttribute("id");
		
		var current_status = target.getAttribute("id");

		this.change_status(id,current_status);
		
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
      .subscribe(({ name, el, source}) => {
        this.removeClass(el, 'ex-moved');
      })
    ));
    
	this.subs.add(dragulaService.drop(this.BAG1)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG1)
      .subscribe(({ name, el, source, target}) => {
		  this.addClass(el, 'ex-moved');

		 var id1= el.getElementsByTagName("a")[0].getAttribute("id");
		
		var current_status1 = target.getAttribute("id");
console.log(current_status1);
		this.update_task_status(id1,current_status1);
		
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
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  private addClass(el: Element, name: string):void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }
  private removeClass(el: Element, name: string):void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }
private hasClass(el: any, name: string) {
  return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
}
    

  dobSettings = {
    bigBanner: false,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm',
    defaultOpen: false,
    closeOnSelect: true,
    rangepicker: false

}
public uploader: FileUploader = new FileUploader({url:this._taskimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
    ngOnInit() {
      this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
      });
      this.addTaskFromData.source_id = this.project_id;
      this.addTaskTypeFromData.project_id = this.project_id;
      this.get_project_by_id();
      this.get_all_task();
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
          response = JSON.parse(response);
          this.addTaskFromData.task_image_url = response.image_name;
          
       };
       //localStorage.setItem('fullPickerInput', 'D/M/YYYY hh:mm A');
       console.log(localStorage.getItem('company_dateformat'));
       console.log(MY_CUSTOM_FORMATS);
      // MY_CUSTOM_FORMATS.fullPickerInput='YYYY/M/D hh:mm A';
    }
//////////////////////////////hide data code//////////////////////////////////
private hideTask1: boolean = false;
private hideOwner2: boolean = false;
private hideStatus3: boolean = false;
private hidePriority4: boolean = false;
private hideStart5: boolean = false;
private hideDue6: boolean = false;

 toggleElement1(){
        if(this.hideTask1){
            this.hideTask1 = false;
        }
        else
        {
            this.hideTask1 = true;
    }
 }
toggleElement2(){
        if(this.hideOwner2){
            this.hideOwner2 = false;
        }

        else
        {
            this.hideOwner2 = true;
    }
}
	toggleElement3(){
        if(this.hideStatus3){
            this.hideStatus3 = false;
        }
        else
        {
            this.hideStatus3 = true;
    }
}
	toggleElement4(){
        if(this.hidePriority4){
            this.hidePriority4 = false;
        }
        else
        {
            this.hidePriority4 = true;
    }
}
	toggleElement5(){
        if(this.hideStart5){
            this.hideStart5 = false;
        }
        else
        {
            this.hideStart5 = true;
    }
}
	toggleElement6(){
        if(this.hideDue6){
            this.hideDue6 = false;
        }
        else
        {
            this.hideDue6 = true;
    }
}
///////////////////////////////////////hide data///////////////////////////////////
 
    
    get_open_task(status){
     const data ={status:status,project_id:this.project_id}
      this._ProjectService.get_all_task_by_status(data).subscribe(res => {
      
        this.open_tasks =res.data;
      });
      
    }
    get_close_task(status){
      const data ={status:status,project_id:this.project_id}
       this._ProjectService.get_all_task_by_status(data).subscribe(res => {
       
         this.close_tasks =res.data;
       });
       
     }
     get_pending_task(status){
      const data ={status:status,project_id:this.project_id}
       this._ProjectService.get_all_task_by_status(data).subscribe(res => {
       
         this.pending_tasks =res.data;
       });
       
     }
    onItemSelect (item:any) {
      console.log(this.selectedItems);
    }
    onSelectAll (items: any) {
      console.log(items);
    }
    onItemDeSelect (items: any) {
      console.log(items);
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
          //this._app.loading = false;
        },
        err =>{ this._app.loading = false;
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
    update_task_status(id1,current_status1){
    console.log("mayuri");
    this._app.loading = true;
      const data = {
           id :id1 ,
       current_status:current_status1
         }
         console.log(data);
        this._ProjectService.update_task_statusdata(data).subscribe(res => {
          this._app.loading = false;
          this.toastr.success('Task Status Updated', 'success');
         console.log(res.data);
       });
     
       
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
      this.addTaskFromData.source_id = this.project_id;
    }

    add_new_task(){
      this._app.loading = true;
      for(let item of this.selectedItems){
        this.temparray.push(item.user_id);
      }
      this.addTaskFromData.task_owner_ids = this.temparray.join(",");
      this.addTaskFromData.task_start_date = this.datePipe.transform(this.addTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
      this.addTaskFromData.task_end_date = this.datePipe.transform(this.addTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
      this.addTaskFromData.task_reminder_date = this.datePipe.transform(this.addTaskFromData.task_reminder_date, 'yyyy-MM-dd HH:mm:ss');
     
      this._ProjectService.add_new_task(this.addTaskFromData)
      .subscribe(
        res => {
          this.get_all_task();
          this.toastr.success('Task Added', 'success');
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
      this.selectedItems = [];
    }

    get_all_task(){
      const data = {
        project_id :this.project_id
      }

      
    this._ProjectService.get_private_archive_task(data)
      .subscribe(
        res => {
          console.log(res);
          this.allTasks = res.response;
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

   

    change_status(task_id,status){
      this._app.loading = true;
      const data = {
        task_id : task_id,
        status  : status,
      }
      this._ProjectService.update_task_status(data)
      .subscribe(
        res => {
          this.get_all_task();
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
   

    change_priority(task_id,priority){
      this._app.loading = true;
      const data = {
        task_id : task_id,
        priority  : priority,
      }
      this._ProjectService.update_task_priority(data)
      .subscribe(
        res => {
          
          this.get_all_task();
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

    test(){
      this.addTaskFromData.task_list_id = '1';
      const data = {
        project_id :this.project_id
      }

      this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
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
      this._ProjectService.gat_task_type(data)
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

      
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'user_id',
        textField: 'user_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false,
      };
    }

    openDialog()
  {
    this.showlist=true;	
    this.showgrid=false;	
    this.get_all_task();
  }
  openDialog1()
  {
    
    this.showlist=false;	
    this.showgrid=true;
    this.get_open_task(0);
    this.get_close_task(2);
    this.get_pending_task(1);
  }

  add_new_task_type(){
    this._app.loading = true;
    this._ProjectService.add_new_task_type(this.addTaskTypeFromData)
      .subscribe(
        res => {
          this.toastr.success('Title Added', 'success');
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
  show_and_hide_filter_box(){
    this.showfilterbox = this.showfilterbox ? false : true;
  }

  addstatusfilter(status: string, isChecked: boolean) {
    if (isChecked) {
      this.statusfilterarray.push(status);
    } else {
      this.statusfilterarray.splice(this.statusfilterarray.indexOf(status), 1);
      
    }
    this.filter_the_data();
 }

  addpriorityfilter(priority: string, isChecked: boolean) {
    if (isChecked) {
      this.priorityfilterarray.push(priority);
    } else {
      this.priorityfilterarray.splice(this.priorityfilterarray.indexOf(priority), 1);
      
    }
    this.filter_the_data();
  }

  
  filter_the_data(){
      const data = {
        project_id :this.project_id
      }

      this._ProjectService.get_private_archive_task(data)
      .subscribe(
        res => {
          this.master_array_for_filter = res.response;
          if(this.statusfilterarray.length>0){
            var temparr1 =[];
            for(var i =0;i < this.master_array_for_filter.length; i++){
              var temparr =[];
                for(var j =0;j < this.master_array_for_filter[i].tasks.length; j++){
                  
                  if(!this.statusfilterarray.includes(this.master_array_for_filter[i].tasks[j].status)){
                    temparr.push(j);
                  }
                }
                
                for (var k = temparr.length -1; k >= 0; k--){
                this.master_array_for_filter[i].tasks.splice(temparr[k],1);
                } 
               if(this.master_array_for_filter[i].tasks.length<1){
                temparr1.push(i);
               }
                
            }
            for (var k = temparr1.length -1; k >= 0; k--){
              this.master_array_for_filter.splice(temparr1[k],1);
              } 
            if(this.priorityfilterarray.length>0){
              var temparr2 =[];
              for(var i =0;i < this.master_array_for_filter.length; i++){
                var temparr =[];
                  for(var j =0;j < this.master_array_for_filter[i].tasks.length; j++){
                    
                    if(!this.priorityfilterarray.includes(this.master_array_for_filter[i].tasks[j].task_priority)){
                      temparr.push(j);
                    }
                  }
                  
                  for (var k = temparr.length -1; k >= 0; k--){
                  this.master_array_for_filter[i].tasks.splice(temparr[k],1);
                  }
                  if(this.master_array_for_filter[i].tasks.length<1){
                    temparr2.push(i);
                   }
              }
              for (var k = temparr2.length -1; k >= 0; k--){
                this.master_array_for_filter.splice(temparr2[k],1);
                }
              this.allTasks = this.master_array_for_filter;
            }else{
              this.allTasks = this.master_array_for_filter;
            }
          }else{
            if(this.priorityfilterarray.length>0){
              var temparr2 =[];
              for(var i =0;i < this.master_array_for_filter.length; i++){
                var temparr =[];
                  for(var j =0;j < this.master_array_for_filter[i].tasks.length; j++){
                    
                    if(!this.priorityfilterarray.includes(this.master_array_for_filter[i].tasks[j].task_priority)){
                      temparr.push(j);
                    }
                  }
                  
                  for (var k = temparr.length -1; k >= 0; k--){
                  this.master_array_for_filter[i].tasks.splice(temparr[k],1);
                  }
                  if(this.master_array_for_filter[i].tasks.length<1){
                    temparr2.push(i);
                   }
              }
              for (var k = temparr2.length -1; k >= 0; k--){
                this.master_array_for_filter.splice(temparr2[k],1);
                }
              this.allTasks = this.master_array_for_filter;
            }else{
              this.allTasks = this.master_array_for_filter;
            }
          }
          
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
  
  get_task_title_list(){
    const data = {
      project_id :this.project_id
    }

    this._ProjectService.get_task_title_list(data)
    .subscribe(
      res => {
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

  edit_task_title(task_title_id,task_list_name){
    this.editTaskTitleFormData.task_list_id =task_title_id;
    this.editTaskTitleFormData.task_list_name =task_list_name;
  }

  update_task_title(){
    this._app.loading = true;
    this._ProjectService.update_task_title(this.editTaskTitleFormData)
      .subscribe(
        res => {
          this.get_task_title_list();
          this.toastr.success('Title Updated', 'success');
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
  delete_task_title(title_id){
    this.delete_title_id = title_id;
    const data={
      title_id:title_id
    }
    this._ProjectService.check_delete_task_title(data)
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
  delete_title(title_id){
    this._app.loading = true; 
    const data={
      title_id:title_id
    }
    this._ProjectService.delete_task_title(data)
      .subscribe(
        res => {
          this.get_task_title_list();
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
}

