import { Component, OnInit, ViewChild } from '@angular/core';

import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { saveAs as importedSaveAs } from "file-saver";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {
  DropzoneModule, DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { DragulaService } from 'ng2-dragula';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-pro-project-files',
  templateUrl: './pro-project-files.component.html',
  styleUrls: ['./pro-project-files.component.css']
})
export class ProProjectFilesComponent implements OnInit {
  uploadedFiles: any;
  upload_url = `${environment.api}/project_file_upload_for_web`;
  file: any;
  message: any;
  disableShow: boolean = false;
  url: SafeResourceUrl;
  modalRef: BsModalRef;
  BAG1 = "VAMPIRE";
  upload_file: string = 'file';
  select_permissions: any;
  subs = new Subscription();
  remove_user_id: any;
  project_userrole: any;
  allfoldername: any;
  timedetail: any;
  filenamedata: any;
  user_file_name: any;
  newid: any;
  filedata: any;
  projectname: any;
  alldate: any;
  newstatus: any;
  err_message: boolean = true;
  disablebutton: boolean = false;
  disabled: boolean = false;
  yourCondition: boolean = false;
  selectedFiles: any;
  // err_message : string;
  task_type: any;
  folderid: any;
  file_id: any;
  iframeURL: any;
  fileurldata: any;
  project_id: any;
  project_id1: any;
  company_id1: any;
  //urlsafe: SafeResourceUrl;
  project_company_id: any;
  company_id: any;
  folder_id: any;
  folder_name: any;
  remove_folder_id: any;
  modeldisplay: any = false;
  modeldisplay1: any = false;
  modeldisplay2: any = false;
  modeldisplay3: any = false;
  modeldisplay4: any = false;
  modeldisplay5: any = false;
  modeldisplay6: any = false;
  applyback: any = false;
  applyback1: any = false;
  contentEditable: any;
  btnhide: any = false;
  allprojectfiles: any;
  allprojectfolders: any;
  usertype: any;
  addFolderFormData = {
    folder_name: '',
    folder_type_id: '',
    project_id: '',
    is_private: ''
  }

  updateFolderFormData = {
    file_id: '',
    folder_name: '',
    folder_type_id: '',
    project_id: '',
    is_private: ''

  }
  constructor(public sanitizer: DomSanitizer, private _router: Router, private _activatedroute: ActivatedRoute, private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private dragulaService: DragulaService, private toastr: ToastrService) {


    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG1)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved ');
      })
    ));


    this.subs.add(this.dragulaService.drop(this.BAG1)
      .subscribe(({ name, el, source, target }) => {
        this.addClass(el, 'ex-moved gu-hide');

        var id = source.getAttribute("id");

        var current_status = target.getAttribute("id");

        this.update_file_status(id, current_status);

      })
    );

  }

  @ViewChild('drpzone') drpzone: DropzoneComponent;
  public config: DropzoneConfigInterface = {

    autoReset: null,
    errorReset: null,
    cancelReset: null,
    clickable: true,
    // maxfilesexceeded: function(file) {
    // this.removeAllFiles();
    // },
    // maxfilesexceeded: function(file) {
    // this.removeAllFiles();
    // this.addFile(file);
    // },
    accept: function (file, done) {
      //console.log("uploaded");
      done();
    },
    // error: function (file, error) {
    // if (file && error) {
    // alert("error");
    // var msgEl = $(file.previewElement).find('.dz-error-message');
    // msgEl.text(error.message);
    // msgEl.show();
    // msgEl.css("opacity", 1);
    // }
    // },

    // init: function() {
    // //console.log('init');
    // this.on("maxfilesexceeded", function(file){
    // alert("No more files please!");
    // this.removeFile(file);
    // });
    // }
    // error: function(response, errorMessage, xhrObj) {
    // if(response.status === "error") {
    // $('div.dz-default.dz-message > span').show(); // Show message span
    // $('div.dz-default.dz-message').css({'opacity':1, 'background-image': 'none'});
    // $('.dropzone .dz-preview .dz-error-message').attr('style','display:block;opacity:1;top: 150px;background:#D44F4F;');
    // $('.dropzone .dz-preview .dz-error-message span').html('Error uploading image')
    // }
    // },
    // init: function() {

    // this.on("error", function(file, message) { 

    // $('.dropzone .dz-preview .dz-error-message span').html('File Size is Large ,upload another one image!');
    // alert("File Size is too Large ,Choose another one image!");

    // //console.log(file);
    // this.removeFile(file); 
    // });

    // }

  };


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

  ngOnInit() {
    // this.company_id=localStorage.getItem('company_id');
    this.uploadedFiles = [];
    this.selectedFiles = 0;
    $(document).ready(function () {

      $('ul.filter-view li a').click(function () {
        $('ul.filter-view li a').removeClass('activelink');
        $(this).addClass('activelink')
        var tab_id = $(this).attr('data-tab');
        $('.content').removeClass('current').addClass('hide');
        $("#" + tab_id).addClass('current').removeClass('hide');
      });
    });
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];
      this.addFolderFormData.project_id = params['id'];
      if (params['folder_id']) {
        this.folder_id = params['folder_id'];

      } else {
        this.folder_id = 0;
      }
    });

    console.log(this.folder_id);
    this.get_company_id_check();
   // this.get_project_files();
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(31) !== -1) {
      this.get_project_files();
    }
    this.timedetail = localStorage.getItem('timezonedata');
    this._app.loading = false;
  }

  update_file_status(id, current_status) {

    this._app.loading = true;
    const data = {
      newid: id,
      newstatus: current_status
    }

    this._ProjectService.update_file_status(data).subscribe(res => {

      this._app.loading = false;
      this.toastr.success('Task Status Updated', 'success');
      //console.log(res.data);
    });


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


    //this.get_project_files();
  }

  onUpload(event) {
    
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.get_project_files();
	 
  }

  chooseFile(event) {
	  console.log(this.uploadedFiles);
	 
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

  onError(event) {

  }

  get_company_id_check() {
    const data = {
      project_id1: this.project_id,

    }
    //console.log(data);
    this._app.loading = true;
    this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
          //console.log(res);

          this.company_id = localStorage.getItem('company_id');
          //console.log(this.company_id);
          this.project_company_id = res.project_id;
          this.project_userrole = res.userrole;
          //console.log(this.project_userrole);
          //console.log(this.project_company_id);
          this._app.loading = false;
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

  onUploadError(args: any) {
    //console.log('onUploadError:', args);
  }

  onUploadSuccess(args: any) {
    //console.log('onUploadSuccess:', args);
  }
  get_project_files() {
    const data = {
      project_id: this.project_id,
      folder_id: this.folder_id
    }

    this._ProjectService.get_project_files(data)
      .subscribe(
        res => {
         // this._app.loading = true;
          this.allprojectfiles = res.data;
          this.allfoldername = res.folder_name;
          this.allprojectfolders = res.folders;
          console.log(this.allprojectfolders);
          this.projectname = res.project;
          this.usertype = res.type;
          //console.log(this.projectname);
          this.alldate = localStorage.getItem('company_dateformat');
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

  onSending(data: any): void {

    const file = data[0];
    // //console.log(this.folder_id);
    const formData = data[2];
    //console.log(data[2]);
    formData.append('token', localStorage.getItem("token"));
    formData.append('source_id', this.project_id);
    formData.append('folder_id', this.folder_id);
    formData.append('task_id', 0);
    // formData.append('project_id', this.project_id);
    formData.append('upload_file', 'file');
    formData.append('source_type', 'project_file');
    //console.log(formData);
    //console.log(data);
  }

  uploadFiles() {
    //this.drpzone.processQueue();
    this.drpzone.directiveRef.dropzone().processQueue();
    //console.log("uploading...");
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
    //console.log(file);
    this._ProjectService.deletefiles(file)
      .subscribe(
        res => {
          this.get_project_files();
          this._app.loading = false;
          this.modeldisplay4 = false;
          this.applyback = false;
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
  viewfile(file_url) {
    //console.log(file_url);
    this.modeldisplay5 = true;
    this.applyback = true;
    this.filenamedata = file_url;
    this.filedata = 'https://view.officeapps.live.com/op/embed.aspx?src=' + this.filenamedata + '&chrome=false&embedded=true';
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.filedata);
    this.iframeURL = this.url
    //console.log(this.url);
  }
  hidemodel6() { this.modeldisplay5 = false; }
  onSendingmultiple() {

  }
  viewpdffile(file_url) {

    this.modeldisplay5 = true;
    this.applyback = true;
    this.filenamedata = file_url;
    this.filedata = this.filenamedata;
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.filedata);  
    // this.iframeURL = this.url
    //console.log(this.url);
  }


  // onError() {

  // }
  onSuccess(data) {
    //console.log(data);
    this.get_project_files();
  }

  downloadFile(filename, name) {

    const data = {
      fileurl: filename
    }
    //console.log(data);
    //console.log(filename);
    this._ProjectService.downloadFile(data).subscribe(blob => {
      importedSaveAs(blob, name);
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
  showmodel() {
    this.modeldisplay = true;
    this.applyback = true;
  }
  onselect(file_url) {
    this.modeldisplay3 = true;
    this.applyback = true;
    this.fileurldata = file_url;
    //console.log(this.fileurldata);
  }
  showmodel1() {
    this.modeldisplay1 = true;
    this.applyback = true;
  }
  hidemodel() {
    this.modeldisplay = false;
    this.applyback = false;
  }
  hidemodel3() {
    this.modeldisplay3 = false;
    this.applyback = false;
  }
  showmodel2() {
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  hidemodel2() {
    this.modeldisplay2 = false;
    this.applyback = false;
  }
  hidemodel1() {
    this.modeldisplay1 = false;
    this.applyback = false;
  }
  create_new_folder() {
    this._ProjectService.create_new_folder(this.addFolderFormData)
      .subscribe(
        res => {
          this.hidemodel();
          this.get_project_files();
          this.modeldisplay = false;
          this.applyback = false;
          this.toastr.success('Folder created', 'success');

        },
        err => {
          this.err_message = err.error.message;
          this._app.loading = false;
          // //console.log(err);
        },
      );

  }
  triggerSomeEvent(event: any) {
    ////console.log(event);
    if (event.target.checked) {
      this.contentEditable = true;
      this.addFolderFormData.is_private = this.contentEditable;
      //this.updateFolderFormData.is_private=this.contentEditable;
      //console.log(this.addFolderFormData.is_private);
    }
    else {

      this.contentEditable = false;
      this.addFolderFormData.is_private = this.contentEditable;
      //console.log(this.addFolderFormData.is_private);
    }



    return;
  }
  SomeEvent($event) {
    this.updateFolderFormData.is_private = $event.target.checked;
    //console.log(this.updateFolderFormData.is_private);
  }
  on_project_select(id) {
    const data = {
      folder_id: id,

    }
    //console.log(data);
    this._ProjectService.get_project_filesdata(data)
      .subscribe(
        res => {

          //console.log(res);
          this.updateFolderFormData.folder_name = res.folders[0].folder_name;
          this.updateFolderFormData.folder_type_id = res.folders[0].folder_type_id;
          this.updateFolderFormData.file_id = res.folders[0].id;
          this.updateFolderFormData.is_private = res.folders[0].is_private;

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

  on_select_data(file_id) {
    this.file_id = file_id;
    //console.log(this.file_id);
  }
  on_move_data(id) {
    this.folderid = id;
    //console.log(this.folderid);
  }
  movefiles() {
    const data = {
      file_id: this.file_id,

      folder_id: this.folderid,


    }

    //console.log(data);
    this._ProjectService.movefiles(data)
      .subscribe(
        res => {
          //console.log(res);
          this.hidemodel2();
          this.toastr.success('File updated', 'success');
          this.get_project_files();
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
  on_select(id) {
    this.remove_folder_id = id;

    this.modeldisplay6 = true;
    this.applyback = true;
  }
  hidemodel7() { this.modeldisplay6 = false; }
  remove_folder(id) {
    const data = {
      folder_id: id,

    }
    //console.log(data);
    this._ProjectService.deletefilesdata(data)
      .subscribe(
        res => {
          this.get_project_files();
          this.modeldisplay6 = false;
          this.applyback = false;
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


  check_unique_folder_name($event) {
    const data = {
      folder_name: this.addFolderFormData.folder_name,
      project_id: this.project_id,
    }
    //console.log(data);
    this.addFolderFormData.folder_name;
    //console.log(this.addFolderFormData.folder_name);
    this._ProjectService.check_unique_folder_name(data)
      .subscribe(
        res => {
          //console.log(res);
          if (res.check) {

            this.err_message = true;
            this.disablebutton = false;
          }
          else {

            this.err_message = false;
            this.disablebutton = true;
          }


        },
        err => console.log(err)

      );
  }
  check_unique_folder_edit_name($event) {
    const data = {
      folder_name: this.updateFolderFormData.folder_name,
      project_id: this.project_id,
    }
    //console.log(data);
    this.updateFolderFormData.folder_name;
    //console.log(this.updateFolderFormData.folder_name);
    this._ProjectService.check_unique_folder_edit_name(data)
      .subscribe(
        res => {
          //console.log(res);
          if (res.check) {
            //console.log("1");
            this.err_message = true;
            this.disablebutton = false;
          }
          else {
            //console.log("2");
            this.err_message = false;
            this.disablebutton = true;
          }


        },
        err => console.log(err)

      );
  }
  update_new_folder() {
    const data = {
      folder_name: this.updateFolderFormData.folder_name,
      folder_type_id: this.updateFolderFormData.folder_type_id,
      file_id: this.updateFolderFormData.file_id,

      is_private: this.updateFolderFormData.is_private,

    }
    //console.log(data);
    this._ProjectService.update_new_folder(data)
      .subscribe(
        res => {
          //console.log(res);
          this.hidemodel1();
          this.toastr.success('Folder updated', 'success');
          this.get_project_files();
        },
        err => {
          this.err_message = err.error.message;
          this._app.loading = false;
          // //console.log(err);
        },
      );

  }
}
