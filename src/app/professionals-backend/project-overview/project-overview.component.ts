import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { saveAs as importedSaveAs } from "file-saver";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import {
  DropzoneModule, DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})


export class ProjectOverviewComponent implements OnInit {
  give_start_date: boolean = false;
  uploadedFiles: any[] = [];
  dateEditable:any;
  upload_url = `${environment.api}/project_file_upload_for_web`;
  alldate: any;
    taskidchange: any;
  give_owner_name: boolean = false;
    taskownerid: any;
    yourCondition: boolean = false;
     message: any;
     ownername:any;
	 selectedFiles:any;
  taskendid: any;
  folder_id: any;
  urlfile: SafeResourceUrl;
  status_list: any;
  taskiddate: any;
  taskfetchdate: any;
  give_end_date: boolean = false;
  filenamedata: any;
  iframeURL: any;
  filedata: any;
  fileurldata: any;
  modeldisplay3: any = false;
  modeldisplay5: any = false;
  remove_user_id: any;
  user_file_name: any;
  allTasks: any;
  allPublicTasks: any;
  allprojectfiles: any;
  select_permissions: any;
  project_id: any;
  project_company_id: any;
  company_id: any;
  modeldisplay4: any = false;

  project_id1: any;
  Projectname: any;
  project_owner_firstname: any;
  project_owner_lastname: any;
  project_owner_email: any;
  project_owner_contact: any;
  project_owner_city: any;
  project_description: any;
  project_start_date: any;
  activity: any;
  timedetail: any;
  discussions: any;
  modeldisplay2: any = false;
  noImage: any = "../assets/no_image.jpg";
  applyback: any = false;
  dropdownSettings = {};
  TasksTypes: any;
  pr_show: any;
  items: any;
  url: '';
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
  dropdownList = [];
  selectedItems = [];
  temparray = []
  addTaskFromData = {
    task_name: '',
    task_description: '',
    task_image_url: '',
    task_list_id: '1',
    task_owner_ids: '',
    task_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_reminder_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_priority: '',
    source_type: 'project',
    source_id: '',
    hide_time:''
  };
  dobSettings = {
    bigBanner: false,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm',
    defaultOpen: false,
    closeOnSelect: true,
    rangepicker: false

  }
  addTaskstartdate = {
    start_date: '',
    end_date: '',

  };
  @ViewChild('drpzone') drpzone: DropzoneComponent;
  public config: DropzoneConfigInterface = {

    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  usertype: any;
  constructor(public sanitizer: DomSanitizer, private _router: Router, private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private http: HttpClient, private datePipe: DatePipe, private toastr: ToastrService) { }

  public uploader: FileUploader = new FileUploader({
    url: this._taskimageuploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  ngOnInit() {
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
    });
	  this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

      allowSearchFilter: false,
    };
    this.addTaskFromData.source_id = this.project_id;
    this.get_project_by_id();
    this.get_all_task();
    this.get_project_files();
    this.get_company_id_check();
    this.get_activity();
    this.get_project_discussion();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show = false;
      response = JSON.parse(response);
      this.addTaskFromData.task_image_url = response.image_name;
    };
    this.select_permissions = localStorage.getItem('permissions');
    this.timedetail = localStorage.getItem('timezonedata');
    this._app.loading = false;
  }
  ngAfterViewInit() {
    // loading templates js after dom render
    $(document).click(function (event) {
      //hide all our dropdowns

      if ($(event.target).hasClass('select_status')) {

      } else {
        $('.dropdown-menu[data-parent]').hide();
      }
      //$('.dropdown-menu[data-parent]').hide();

    });
    $(document).on('click', '.table-responsive [data-toggle="dropdown"]', function () {
      // if the button is inside a modal


      var buttonGroup = $(this).parent();
      if (!buttonGroup.attr('data-attachedUl')) {
        var ts = +new Date;
        var ul = $(this).siblings('ul');
        ul.attr('data-parent', ts);
        buttonGroup.attr('data-attachedUl', ts);
        $(window).resize(function () {
          ul.css('display', 'none').data('top');
        });
      } else {
        ul = $('[data-parent=' + buttonGroup.attr('data-attachedUl') + ']');
      }
      if (!buttonGroup.hasClass('open')) {
        ul.css('display', 'none');
        return;
      }
      dropDownFixPosition($(this).parent(), ul);
      function dropDownFixPosition(button, dropdown) {
        var dropDownTop = button.offset().top + button.outerHeight();
        dropdown.css('top', dropDownTop + "px");
        dropdown.css('left', button.offset().left + "px");
        dropdown.css('position', "absolute");

        dropdown.css('width', dropdown.width());
        dropdown.css('heigt', dropdown.height());
        dropdown.css('display', 'block');
        dropdown.appendTo('body');
      }
    });
  }
  onSending(data: any): void {
    const file = data[0];
    const formData = data[2];
    formData.append('token', localStorage.getItem("token"));
    formData.append('source_id', this.project_id);
    formData.append('task_id', 0);
    formData.append('folder_id', 0);
    formData.append('source_type', 'project_file');
  }

  uploadFiles() {
    this.drpzone.directiveRef.dropzone().processQueue();
    console.log("uploading...");
  }
  onselect(file_url) {
    this.modeldisplay3 = true;
    this.applyback = true;
    this.fileurldata = file_url;
  }
  hidemodel3() {
    this.modeldisplay3 = false;
    this.applyback = false;
  }
  deletefile(file_id, file_name) {
    this.remove_user_id = file_id;
    this.user_file_name = file_name;
    this.modeldisplay4 = true;
    this.applyback = true;
  }
  hidemodel5() { this.modeldisplay4 = false; }
  remove_user(file_id, file_name) {

    const file = {
      file_id: file_id,
      file_name: file_name
    };
    this._ProjectService.deletefiles(file)
      .subscribe(
        res => {
          this.get_project_files();
          this.modeldisplay4 = false;
          this.applyback = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ){
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  get_company_id_check() {
    const data = {
      project_id1: this.project_id
    }
    this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
         
          this.company_id = localStorage.getItem('company_id');
          this.project_company_id = res.project_id;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  onSuccess(data) {
    this.get_project_files();
  }
  get_project_by_id() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_by_id(data)
      .subscribe(
        res => {
          
          this.Projectname = res.projects.project_name;
          this.status_list = res.task_status_list;
          this.items = res.projects;
          this.project_owner_firstname = res.user.firstname;
          this.project_owner_lastname = res.user.lastname;
          this.project_owner_email = res.user.email;
          this.project_owner_contact = res.user.contact;
          this.project_owner_city = res.user.city;
          this.project_description = res.projects.project_description;
          this.project_start_date = res.projects.created_at;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  get_all_task() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_private_task_overview_new(data)
      .subscribe(
        res => {
        
          this.allTasks = res.response;
          this.alldate = localStorage.getItem('company_dateformat');
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );



  }

  get_project_files() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_files_overview(data)
      .subscribe(
        res => {
         
          this.allprojectfiles = res.data;
          this.alldate = localStorage.getItem('company_dateformat');
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  viewfile(file_url) {

    this.modeldisplay5 = true;
    this.applyback = true;
    this.filenamedata = file_url;
    this.filedata = 'https://view.officeapps.live.com/op/embed.aspx?src=' + this.filenamedata + '&chrome=false&embedded=true';
    this.urlfile = this.sanitizer.bypassSecurityTrustResourceUrl(this.filedata);
    this.iframeURL = this.urlfile
  }
  viewpdffile(file_url) {
    this.modeldisplay5 = true;
    this.applyback = true;
    this.filenamedata = file_url;
    this.filedata = this.filenamedata;
  }
  hidemodel6() { this.modeldisplay5 = false; }
  onSendingmultiple() {

  }
  downloadFile(filename, name) {

    const data = {
      fileurl: filename
    }
    this._ProjectService.downloadFile(data).subscribe(blob => {
      importedSaveAs(blob, name);
    },    err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }

  get_activity() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_activity(data)
      .subscribe(
        res => {
          this.activity = res.data;
          this.alldate = localStorage.getItem('company_dateformat');
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  change_status(task_id, status) {
    this._app.loading = true;
    const data = {
      task_id: task_id,
      status: status,
    }
    this._ProjectService.update_task_status(data)
      .subscribe(
        res => {
          this.get_all_task();
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ){
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  change_priority(task_id, priority) {
    this._app.loading = true;
    const data = {
      task_id: task_id,
      priority: priority,
    }
    this._ProjectService.update_task_priority(data)
      .subscribe(
        res => {
          this.get_all_task();
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  get_project_discussion() {
    const data = {
      project_id: this.project_id
    }
    this._ProjectService.get_project_discussion(data).subscribe(res => {
      this.discussions = res.data;
      this.usertype = res.type;
      this.alldate = localStorage.getItem('company_dateformat');
    },
	    err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
	);

  }
  test() {
    this.addTaskFromData.task_list_id = '1';
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
          //this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
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
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
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
  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  onItemDeSelect(items: any) {

  }

  onUpload(event) {
    this.get_project_files();
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.get_project_files();
  }
  onBeforeSend(event) {

    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

    event.formData.append('token', localStorage.getItem("token"));
    event.formData.append('source_id', this.project_id);
    event.formData.append('folder_id', this.folder_id);
    event.formData.append('task_id', 0);
    // formData.append('project_id', this.project_id);
    event.formData.append('upload_file', 'file');
    event.formData.append('source_type', 'project_file');


    this.get_project_files();
  }

  onError($event) {

  }
  add_new_task() {
    this._app.loading = true;
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.addTaskFromData.task_owner_ids = this.temparray.join(",");
    this.addTaskFromData.task_start_date = this.datePipe.transform(this.addTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_end_date = this.datePipe.transform(this.addTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_reminder_date = this.datePipe.transform(this.addTaskFromData.task_reminder_date, 'yyyy-MM-dd HH:mm:ss');
    //console.log(this.addTaskFromData);
    this._ProjectService.add_new_task(this.addTaskFromData)
      .subscribe(
        res => {
          this.get_all_task();
          this.toastr.success('Task Added', 'success');
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
  }

  enter_start_date(id, date) {
    this.give_start_date = true;
    this.taskiddate = id;
    this.taskfetchdate = date;
  }

  update_task_start_date() {

    this.addTaskstartdate.start_date = this.datePipe.transform(this.addTaskstartdate.start_date, 'yyyy-MM-dd HH:mm:ss');
    const data = {
      startdate: this.addTaskstartdate.start_date,
      taskiddate: this.taskiddate,
    }
    this._ProjectService.update_task_start_date(data)
      .subscribe(
        res => {
          this.give_start_date = false;
          this.get_all_task();
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;
        },
           err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
   enter_owner_name(id, owner_id) {
    this.give_owner_name = true;
    this.taskidchange = id;
    this.taskownerid = owner_id;
    
  }
   get_owner_name() {
    const data = {
      project_id: this.project_id,
      task_owner_ids: this.taskownerid,
    }
    //console.log(data);
    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
          this.selectedItems = res.selected_users;
        },
        err => {
          //this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );


  }
    update_task_owner_name() {

    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.ownername = this.temparray.join(",");
    const data = {
      ownername: this.ownername,
      taskidchange: this.taskidchange,
    }
 
    this._ProjectService.update_task_owner_name(data)
      .subscribe(
        res => {
			this.give_owner_name = false;
          this.get_all_task();
          this.toastr.success('Owner Name Updated', 'Success!');
          this._app.loading = false;
         
        },
        err => {
        
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
           
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
  }
  enter_end_date(id) {
    this.give_end_date = true;
    this.taskendid = id;
  }
  update_task_end_date() {
    this.addTaskstartdate.end_date = this.datePipe.transform(this.addTaskstartdate.end_date, 'yyyy-MM-dd HH:mm:ss');
    const data = {
      enddate: this.addTaskstartdate.end_date,
      taskendid: this.taskendid,
    }
    this._ProjectService.update_task_end_date(data)
      .subscribe(
        res => {
          this.give_end_date = false;
          this.get_all_task();
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;
          // this._router.navigate([this.current_page + '/project-files/' + this.project_id]).then(() => {
          // this._router.navigate([this.current_page + '/project-task/' + this.project_id]);
          // });
        },
          err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
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
      this.get_project_files();
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
      this.get_project_files();
      this.yourCondition = false;
    }
    else {
      this.yourCondition = true;
      this.message = '';
    }
  }
  checkValue(event: any) {

    this.addTaskFromData.hide_time = event;

    //console.log(this.addTaskFromData.hide_time);
  }
  datetriggerEvent(event: any) {
    ////console.log(event);
    if (event.target.checked) {
      this.dateEditable = true;
      this.addTaskFromData.hide_time = event;
      console.log(this.addTaskFromData.hide_time);
    }

    else {
      this.dateEditable = false;
      this.addTaskFromData.hide_time = event;
      console.log(this.addTaskFromData.hide_time);

    }


    return;
  }
  
}
