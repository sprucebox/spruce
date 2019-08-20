import { Component, OnInit,ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-project-archive-task-edit',
  templateUrl: './project-archive-task-edit.component.html',
  styleUrls: ['./project-archive-task-edit.component.css']
})
export class ProjectArchiveTaskEditComponent implements OnInit {

  err_message : string='';
  dropdownList = [];
  selectedItems = [];
  temparray = [];
  tempstring = '';
  dropdownSettings = {};
  current_page:string;
  modeldisplay2:any=false;
  applyback:any=false;
  project_id:any;
  role:any;
  task_id:any;
  alltaskfiles:any;
  allcomments:any;
  testdate:string ='Due Date';
  testdate1 :string='Start Date';
  testdate4 :any;
  testdate5 :any;
  show_date_box:boolean=false;
  show_task_name: boolean = true;
  show_task_desc: boolean = true;
  show_grantt: boolean = false;
  TaskCommentFormData = {
    comment : '',
    task_id : '',
  }
  updateTaskFromData = {
    task_name : '',
    task_description : '',
    task_image_url : '',
    task_list_id : '',
    task_owner_ids : '',
    task_start_date : '',
    task_end_date : '',
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
     this.TaskCommentFormData.task_id =this.task_id;
     this.get_task_details_by_id();
     this.get_project_task_files();
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
  }
  onItemSelect (item:any) {
    console.log(this.selectedItems);
  }
  onSelectAll (items: any) {
    console.log(items);
  }
  get_task_details_by_id(){
    const data = {task_id:this.task_id,project_id:this.project_id,}

    this._ProjectService.get_project_task_details(data).subscribe(
      res => {
        this.role = res.role;
        this.updateTaskFromData = {
          task_name : res.data.task_name,
          task_description : res.data.task_description,
          task_image_url : res.data.task_image_url,
          task_list_id : res.data.task_list_id,
          task_owner_ids : res.data.task_owner_ids,
          task_start_date : '',
          task_end_date : '',
          task_priority : res.data.task_priority,
          task_completion : res.data.task_completion,
          task_work_hours : res.data.task_work_hours,
          task_duration : res.data.task_duration,
          task_done_by_id : res.data.task_done_by_id,
          task_vendor_id : res.data.task_vendor_id,
          status : res.data.status,
          source_type : 'project',
          source_id : this.project_id,
          event_id  : res.data.id,
          task_id : this.task_id
        };
        if(res.data.task_start_date){
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
            console.log(res);
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

  get_project_task_files(){
    const data = {
      task_id : this.task_id
    }
  this._ProjectService.get_project_task_files(data)
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

  onSending(data: any): void {

    const file = data[0];
    //console.log(file);
    const formData = data[2];
    formData.append('token', localStorage.getItem("token"));
    formData.append('source_id', this.task_id);
    formData.append('source_type', 'project_task_file');
    //console.log(formData);
  }

  uploadFiles() {
    //this.drpzone.processQueue();
    this.drpzone.directiveRef.dropzone().processQueue();
    console.log("uploading...");
  }

  deletefile(file_id,file_name) {

    const file = {
      file_id :file_id,
      file_name:file_name
    };
    if(confirm('Are you sure to delete this file')){
      this._ProjectService.deletefiles(file)
      .subscribe(
        res => {
          this.get_project_task_files();
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

  onSendingmultiple() {

  }

  onError() {

  }
  onSuccess(data) {
    console.log(data);
    this.get_project_task_files();
  }

  downloadFile(filename){
    console.log(filename);
    this._ProjectService.downloadFile(filename).subscribe(blob => {
              importedSaveAs(blob, filename);
          },err => console.log(err)
        );
    }

    addComment(){
      console.log(this.TaskCommentFormData);
      this._ProjectService.addTaskComment(this.TaskCommentFormData)
      .subscribe(
        res => {
          console.log(res);
          this.TaskCommentFormData.comment = '',
          this.get_all_task_comments();
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
    get_all_task_comments(){
      const data = {
        task_id : this.task_id,
      }
      this._ProjectService.get_all_comments_by_task_id(data)
      .subscribe(
        res => {
          this.allcomments = res.data;
          console.log(res.data);
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

    loadgantt(){

      this.show_grantt=true;
    }




    test() {
      var first=  this.testdate4 ;
      var second= this.testdate5;
       var date =  first.getTime();

      var date2= second.getTime();

    if (date < date2)
    {

       this.err_message = "";
       console.log("greater");
    }
    else
    {
       this.err_message = "start date should be Greater than end date";
       console.log("less");
    }


    var one_day=1000*60*60*24

//Calculate difference btw the two dates, and convert to days
var c = Math.ceil((second.getTime()-first.getTime())/(one_day))+"";

    this.updateTaskFromData.task_duration=c;

    }
    onChange($event)
    {


    var s = this.testdate4;

    console.log(s);

    var n = this.updateTaskFromData.task_duration;

    console.log(n);
    var today= new Date(s);
    console.log(today); //Today's Date
    var last=today.setDate(today.getDate() + parseInt(n));

    this.testdate5  = new Date(this.datePipe.transform(last, 'yyyy-MM-dd HH:mm:ss'));

    }
    update_task_detail()
    {

      this._app.loading = true;
       for(let item of this.selectedItems){
            this.temparray.push(item.user_id);
          }
      this.updateTaskFromData.task_owner_ids = this.temparray.join(",");
      if(this.show_date_box){
        this.updateTaskFromData.task_start_date = this.datePipe.transform(this.testdate4, 'yyyy-MM-dd HH:mm:ss');
        this.updateTaskFromData.task_end_date = this.datePipe.transform(this.testdate5, 'yyyy-MM-dd HH:mm:ss');
      }else{
        this.updateTaskFromData.task_start_date = this.datePipe.transform(this.updateTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
        this.updateTaskFromData.task_end_date = this.datePipe.transform(this.updateTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
      }
      
        this._ProjectService.update_task_detail(this.updateTaskFromData)
        .subscribe(
          res => {
            this.toastr.success('Task Updated', 'success');
            this._router.navigate([this.current_page+'/project-task/'+this.project_id]);
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
	update_task_archive_data(){
     const data = {task_id:this.task_id,project_id:this.project_id,}

   this._ProjectService.update_task_archive_data(data)
    .subscribe(
      res => {
		  this.role = res.role;
		  this.toastr.success('Remove from archive', 'success');
      this._router.navigate(["/professionals/project-task/",this.project_id]);
     console.log(res.data);
     
    });

  }
}

