import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { saveAs as importedSaveAs } from "file-saver";
import {
  DropzoneModule, DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { DragulaService } from 'ng2-dragula';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-template-project-file',
  templateUrl: './template-project-file.component.html',
  styleUrls: ['./template-project-file.component.css']
})
export class TemplateProjectFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  select_permissions: any;
  upload_url = `${environment.api}/project_file_upload_for_web`;
  file: any;
  yourCondition: boolean = false;
     message: any;
	 selectedFiles:any;
  modalRef: BsModalRef;
  allprojectfolders: any;
  upload_file: string = 'file';
  allprojectfiles: any;
  project_id: any;
  folder_id: any;
  folderid: any;
  filenamedata: any;
  user_file_name: any;
  file_id: any;
  url: SafeResourceUrl;
  iframeURL: any;
  fileurldata: any;
  folder_name: any;
  alldate: any;
  timedetail: any;
  filedata: any;
  subs = new Subscription();
  remove_user_id: any;

  modeldisplay: any = false;
  modeldisplay4: any = false;
  modeldisplay1: any = false;
  modeldisplay2: any = false;
  modeldisplay5: any = false;
  modeldisplay6: any = false;
  modeldisplay7: any = false;
  remove_file_id: any = false;
  applyback: any = false;
  addTemplateFolderData = {
    folder_name: '',
    folder_type_id: '',
    project_id: '',

  }
  updateTemplateFolderFormData = {
    file_id: '',
    folder_name: '',
    folder_type_id: '',
    project_id: '',

  }
  current_page: string;
  @ViewChild('drpzone') drpzone: DropzoneComponent;
  @ViewChild('divClick') divClick: ElementRef;
  public config: DropzoneConfigInterface = {

    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  constructor(public sanitizer: DomSanitizer, private _router: Router, private _activatedroute: ActivatedRoute, private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private dragulaService: DragulaService, private toastr: ToastrService) { }

  ngOnInit() {
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
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
      this.addTemplateFolderData.project_id = params['id'];
      this.updateTemplateFolderFormData.project_id = params['id'];
      if (params['folder_id']) {
        this.folder_id = params['folder_id'];

      } else {
        this.folder_id = 0;
      }
      this.get_template_project_files();
      this.timedetail = localStorage.getItem('timezonedata');
    });
    this.select_permissions = localStorage.getItem('permissions');
    console.log(this.select_permissions);
  }
  showmodel() {
    this.modeldisplay = true;
    this.applyback = true;
  }
  hidemodel() {
    this.modeldisplay = false;
    this.applyback = false;
  }
  create_template_folder() {
    
    this._ProjectService.create_template_folder(this.addTemplateFolderData)
      .subscribe(
        res => {
          this.divClick.nativeElement.click();
          this.get_template_project_files();
          this.toastr.success('Template Folder created', 'success');
          this._app.loading = false;
          this._router.navigate([this.current_page + '/template-project-file/' + this.project_id]);


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
  onselect(file_url) {
    this.modeldisplay7 = true;
    this.applyback = true;
    this.fileurldata = file_url;
    console.log(this.fileurldata);
  }
  hidemodel8() {
    this.modeldisplay7 = false;
    this.applyback = false;
  }
  viewfile(file_url) {

    this.modeldisplay6 = true;
    this.applyback = true;
    this.filenamedata = file_url;
    this.filedata = 'https://view.officeapps.live.com/op/embed.aspx?src=' + this.filenamedata + '&chrome=false&embedded=true';
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.filedata);
    this.iframeURL = this.url
    console.log(this.url);
  }
  hidemodel7() { this.modeldisplay6 = false; }
  get_template_project_files() {
    const data = {
      project_id: this.project_id,
      folder_id: this.folder_id
    }
    console.log(data);
    this._ProjectService.get_template_project_files(data)
      .subscribe(
        res => {
          console.log(res);
          this.allprojectfiles = res.data;
          this.allprojectfolders = res.folders;
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
  onSending(data: any): void {

    const file = data[0];
    console.log(this.folder_id);
    const formData = data[2];
    formData.append('token', localStorage.getItem("token"));
    formData.append('source_id', this.project_id);
    formData.append('folder_id', this.folder_id);
    formData.append('task_id', 0);
    // formData.append('project_id', this.project_id);
    formData.append('upload_file', 'file');
    formData.append('source_type', 'template_project_file');
    //console.log(formData);
  }
  uploadFiles() {
    //this.drpzone.processQueue();
    this.drpzone.directiveRef.dropzone().processQueue();
    console.log("uploading...");
  }
  onSendingmultiple() {

  }
  onSuccess(data) {
    console.log(data);
    this.get_template_project_files();
  }


  on_project_select(id) {
    const data = {
      folder_id: id,

    }
    console.log(data);
    this._ProjectService.get_project_template_filesdata(data)
      .subscribe(
        res => {

          console.log(res);
          this.updateTemplateFolderFormData.folder_name = res.folders[0].folder_name;
          this.updateTemplateFolderFormData.folder_type_id = res.folders[0].folder_type_id;
          this.updateTemplateFolderFormData.file_id = res.folders[0].id;

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
  hidemodel1() {
    this.modeldisplay1 = false;
    this.applyback = false;
  }
  showmodel1() {
    this.modeldisplay1 = true;
    this.applyback = true;
  }
  update_template_folder() {

    this._ProjectService.update_template_folder(this.updateTemplateFolderFormData)
      .subscribe(
        res => {
          console.log(res);
          this.hidemodel1();
          this.toastr.success('Folder updated', 'success');
          this.get_template_project_files();
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
  on_select(id) {
    this.remove_file_id = id;

    this.modeldisplay5 = true;
    this.applyback = true;
  }
  hidemodel6() { this.modeldisplay5 = false; }

  remove_file(id) {
    const data = {
      folder_id: id,

    }
    console.log(data);

    this._ProjectService.deletetemplatefilesdata(data)
      .subscribe(
        res => {
          this.get_template_project_files();
          this._app.loading = false;
          this.modeldisplay5 = false;
          this.applyback = false;
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
  downloadFile(filename) {
    console.log(filename);
    this._ProjectService.downloadFile(filename).subscribe(blob => {
      importedSaveAs(blob, filename);
    }, err => console.log(err)
    );
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
    console.log(file);
    this._ProjectService.deletetemplatefiles(file)
      .subscribe(
        res => {
          this.get_template_project_files();
          this._app.loading = false;
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
  on_select_data(file_id) {
    this.file_id = file_id;
    console.log(this.file_id);
  }
  on_move_data(id) {
    this.folderid = id;
    console.log(this.folderid);
  }
  showmodel2() {
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  hidemodel2() {
    this.modeldisplay2 = false;
    this.applyback = false;
  }


  onError($event) {
    console.log($event);
  }
  movetemplatefiles() {
    const data = {
      file_id: this.file_id,
      folder_id: this.folderid,
    }

    console.log(data);
    this._ProjectService.movetemplatefiles(data)
      .subscribe(
        res => {
          console.log(res);
          this.hidemodel2();
          this.toastr.success('File Move', 'success');
          this.get_template_project_files();
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
  onBeforeSend(event) {

    event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

    event.formData.append('token', localStorage.getItem("token"));
    event.formData.append('source_id', this.project_id);
    event.formData.append('folder_id', this.folder_id);
    event.formData.append('task_id', 0);
    // formData.append('project_id', this.project_id);
    event.formData.append('upload_file', 'file');
    event.formData.append('source_type', 'template_project_file');

    this.get_template_project_files();
  }

  onUpload(event) {
    console.log("mayuri");
    this.get_template_project_files();
    console.log('rashmi');
    // event.xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    // var obj = JSON.parse(event.xhr.response);

    console.log(event);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(event.files);

    this.get_template_project_files();
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
      this.get_template_project_files();
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
      this.get_template_project_files();
      this.yourCondition = false;
    }
    else {
      this.yourCondition = true;
      this.message = '';
    }
  }
}
