import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
@Component({
  selector: 'app-project-edit-archive-detail',
  templateUrl: './project-edit-archive-detail.component.html',
  styleUrls: ['./project-edit-archive-detail.component.css']
})
export class ProjectEditArchiveDetailComponent implements OnInit {
role:any;
  project_id:'';
  show_date_box:boolean=false;
  color4:'';
  testdate:string ='Due Date';
  testdate1 :string='Start Date';
  testdate4 :any;
  testdate5 :any;
  modeldisplay2:any=false;
  applyback:any=false;
  projectUpdateFormData = {
    project_id : '',
    project_name : '',
    project_owner_id : '',
    project_start_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    project_end_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    project_description : '',
    project_source_type : '',
    project_source_id : '',
    project_image_url:'',
	project_color : '',
    
  };
  dropdownList = [];
  pr_show = false;
  url:'';
  current_page:string
  temparray:any;
  private _projectimageuploadUrl = `${environment.api}/upload_project_image`;
  constructor(private _router: Router,private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private cpService: ColorPickerService,private datePipe: DatePipe,private toastr: ToastrService) { }
    dobSettings = {
      bigBanner: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false,
      closeOnSelect: true,
      rangepicker: false

  }
  public uploader: FileUploader = new FileUploader({url:this._projectimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this.get_all_users();
    this._activatedroute.params.subscribe(params => {
      
      this.project_id = params['id'];
    });
    
    this.get_project_by_id();

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.pr_show = false;
        
        this.temparray =  JSON.parse(response);
        this.projectUpdateFormData.project_image_url = this.temparray.image_name;
     };
  }

  get_all_users(){
    
    this._ProjectService.get_all_users()
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

  }
  public onChangeColor4(color4: string): Cmyk {
    const hsva2 = this.cpService.stringToHsva(color4);

    const rgba2 = this.cpService.hsvaToRgba(hsva2);


    console.log(color4);
     console.log(rgba2);

    return this.cpService.rgbaToCmyk(rgba2);
  }
  get_project_by_id(){
    const data = {
      project_id :this.project_id
    }
    
    this._ProjectService.get_project_by_id(data)
    .subscribe(
      res => {
		   this.role = res.role;
		  console.log(res.role);
        this.projectUpdateFormData.project_name = res.projects.project_name;
        this.projectUpdateFormData.project_id = res.projects.id;
        this.projectUpdateFormData.project_owner_id = res.projects.project_owner_id;
        this.projectUpdateFormData.project_start_date = res.projects.project_start_date;
        this.projectUpdateFormData.project_end_date = res.projects.project_end_date;
        this.projectUpdateFormData.project_description = res.projects.project_description;
        this.projectUpdateFormData.project_image_url = res.projects.project_image;
		 this.color4 = res.projects.project_color;
     if(res.projects.project_start_date){
      this.testdate4 = new Date(this.datePipe.transform(res.projects.project_start_date, 'yyyy-MM-dd HH:mm:ss'));
      this.show_date_box = true;
      this.testdate5 = new Date(this.datePipe.transform( res.projects.project_end_date, 'yyyy-MM-dd HH:mm:ss'));
  
    }
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

  update_project_details(){
    console.log("mayuri");
    if(this.show_date_box){
      this.projectUpdateFormData.project_start_date = this.datePipe.transform(this.testdate4, 'yyyy-MM-dd HH:mm:ss');
      this.projectUpdateFormData.project_end_date = this.datePipe.transform(this.testdate5, 'yyyy-MM-dd HH:mm:ss');
    }else{
      this.projectUpdateFormData.project_start_date = this.datePipe.transform(this.projectUpdateFormData.project_start_date, 'yyyy-MM-dd HH:mm:ss');
  this.projectUpdateFormData.project_end_date = this.datePipe.transform(this.projectUpdateFormData.project_end_date, 'yyyy-MM-dd HH:mm:ss');
    }
  console.log(this.projectUpdateFormData.project_start_date = this.datePipe.transform(this.testdate4, 'yyyy-MM-dd HH:mm:ss'));
 console.log(this.projectUpdateFormData.project_end_date = this.datePipe.transform(this.testdate5, 'yyyy-MM-dd HH:mm:ss'));
	  console.log(this.projectUpdateFormData);
   
	console.log(this.projectUpdateFormData);
	this.projectUpdateFormData.project_color = this.color4;
    this._ProjectService.update_project_details(this.projectUpdateFormData)
    .subscribe(
      res => {
		  //console.log(this.projectUpdateFormData);
            this.toastr.success('Project Updated', 'success');
            this._router.navigate([this.current_page+'/project-show-archive']);
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
  confirm_Restore_archive(){
  
    this.modeldisplay2=true;
    this.applyback=true;
  }
  hidemodel2(){ this.modeldisplay2=false;}
 update_projectedit_archive_data(){
    const data = {
      project_id :this.project_id
    }

   this._ProjectService.update_projectedit_archive_data(data)
    .subscribe(
      res => {
this.toastr.success('Remove From archive', 'success');
// this._router.navigate([this.current_page + '/project-task/' + this.project_id]).then(() => {
           // this._router.navigate([this.current_page + '/professionals/projects']);
           // });
this._router.navigate(["/professionals/projects"]);
     console.log(res.data);
     
    });

  }
   
}

