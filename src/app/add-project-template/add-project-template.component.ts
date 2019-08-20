import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project-template',
  templateUrl: './add-project-template.component.html',
  styleUrls: ['./add-project-template.component.css']
})
export class AddProjectTemplateComponent implements OnInit {
 projecttemplateData = {
    project_name : '',
   
    project_description : '',
  
    project_image_url:'',
    
  };
  dropdownList = [];
   url:'';
    noImage:any = "../assets/no_image.jpg";
   pr_show = false;
  current_page:string;
 select_permissions:any;
   private _projectimageuploadUrl = `${environment.api}/upload_project_image`;
  constructor( private _router: Router,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private datePipe: DatePipe,private toastr: ToastrService) { }
    public uploader: FileUploader = new FileUploader({url:this._projectimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
	  var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       this.pr_show = false;
       response = JSON.parse(response)
       this.projecttemplateData.project_image_url = response.image_name;
    };
	 this.select_permissions = localStorage.getItem('permissions');
		console.log(this.select_permissions);
  }
save_project_template_details(){
    //this._app.loading = true;
    
    this._ProjectService.save_template_project(this.projecttemplateData)
    .subscribe(
      res => {
        this.toastr.success('Template Project Created', 'success');
        this._router.navigate([this.current_page+'/template-setting']);
        //this._app.loading = false;
      },
      err =>{
        this._app.loading = false;
        console.log(err);
        this._router.navigate(["/login"]);
        }
    );
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
}
