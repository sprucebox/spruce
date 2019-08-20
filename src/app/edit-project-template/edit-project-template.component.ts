import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-project-template',
  templateUrl: './edit-project-template.component.html',
  styleUrls: ['./edit-project-template.component.css']
})
export class EditProjectTemplateComponent implements OnInit {
 projectUpdatetemplateData = {
    project_id : '',
    project_name : '',
   
    project_description : '',
   
    project_image_url:'',
    
  };
  remove_user_id:any;
  modeldisplay3:any=false;
 applyback:any=false;
  project_id:any;
   dropdownList = [];
  pr_show = false;
  url:'';
  temparray:any;
  current_page:string;
   private _projectimageuploadUrl = `${environment.api}/upload_project_image`;
   public uploader: FileUploader = new FileUploader({url:this._projectimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  constructor(private _router: Router,private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private datePipe: DatePipe,private toastr: ToastrService) { }

  ngOnInit() {
	    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	 this._activatedroute.params.subscribe(params => {
      
      this.project_id = params['id'];
    });
	 
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.pr_show = false;
        
        this.temparray =  JSON.parse(response);
        this.projectUpdatetemplateData.project_image_url = this.temparray.image_name;
     };
	 this.get_project_template_by_id();
  }
   onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { 
        let target: any = event.target; 
        
      }
      this.uploader.uploadAll();
    }
  
  }
  confirm_project_remove(id){
    console.log(id);
    this.remove_user_id =id;
     this.modeldisplay3=true;
     this.applyback=true;
   }
    hidemodel3(){ this.modeldisplay3=false;}
    remove_user(id){
 
     this._app.loading = true;
     const data ={
       id:id,
      
     }
    this._ProjectService.remove_template_project(data)
     .subscribe(
       res => {
         console.log(res);
         this._router.navigate([this.current_page+'/template-setting']);
     this._app.loading = false;
         this.modeldisplay3=false;
         this.applyback=false;
       // this._router.navigate([this.current_page+'/projects']);
         
         
       },
       err =>{
        this._app.loading = false;
        console.log(err);
        this._router.navigate(["/login"]);
        }
     );
   }
  get_project_template_by_id(){
    const data = {
      project_id :this.project_id
    }
    console.log(data);
    this._ProjectService.get_project_template_by_id(data)
    .subscribe(
      res => {
		  console.log(res);
		// this.role = res.role;
		  // console.log(res.role);  
        this.projectUpdatetemplateData.project_name = res.projects.project_name;
        this.projectUpdatetemplateData.project_id = res.projects.id;
        
        this.projectUpdatetemplateData.project_description = res.projects.project_description;
        this.projectUpdatetemplateData.project_image_url = res.projects.project_image;

        this._app.loading = false;
		 
      },
	 
        
      err =>{
        this._app.loading = false;
        console.log(err);
        this._router.navigate(["/login"]);
        }
    );
  }
  
  update_project_template(){
	  
    
    this._ProjectService.update_project_template(this.projectUpdatetemplateData)
    .subscribe(
      res => {
		  console.log(res);
            this.toastr.success('Project Template Updated', 'success');
             this._router.navigate([this.current_page+'/template-setting']);
            this._app.loading = false;
      },
      err =>{
        this._app.loading = false;
        console.log(err);
        this._router.navigate(["/login"]);
        }
    );
  }

}
