import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { InputTrimModule } from 'ng2-trim-directive';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
// import {trigger, state, style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-professionals-add-project',
  templateUrl: './professionals-add-project.component.html',
  styleUrls: ['./professionals-add-project.component.css'],
  
})
export class ProfessionalsAddProjectComponent implements OnInit {
	// state: string = 'default';
	image_file:any;
	angle:any;
	 public color4: string = '';
  projectPrimaryData = {
	  template_project_id:'',
    project_name : '',
    project_owner : '',
    project_start_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    project_end_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    project_description : '',
    project_source_type : '',
    project_source_id : '',
    project_image_url:'',
    project_color : '',
  };
  projectnames:any;
  noImage:any = "../assets/no_image.jpg";
  dropdownList = [];
  pr_show = false;
  message1:any;
  url:'';
  message:any;
  current_page:string;
  private _projectimageuploadUrl = `${environment.api}/upload_project_image`;
  
  constructor( private _router: Router,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private datePipe: DatePipe,private toastr: ToastrService, private cpService: ColorPickerService) { }
	public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
    dobSettings = {
      bigBanner: false,
      timePicker: true,
      format: 'dd-MM-yyyy hh:mm a',
      defaultOpen: false,
      closeOnSelect: true,
      rangepicker: false

  }
   public onChangeColor4(color4: string): Cmyk {
    const hsva2 = this.cpService.stringToHsva(color4);

    const rgba2 = this.cpService.hsvaToRgba(hsva2);


    console.log(color4);
     console.log(rgba2);

    return this.cpService.rgbaToCmyk(rgba2);
  }
  public uploader: FileUploader  = new FileUploader({url:this._projectimageuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
    var temp = this._router.url;
    this.current_page = temp.replace('/add-projects', '');
   this.get_all_users();
    console.log(this.projectPrimaryData.project_image_url);
   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       this.pr_show = false;
       response = JSON.parse(response);
     console.log(response);
     this.projectPrimaryData.project_image_url =response.image_name;
      
   
	   
    };
	this.get_templateproject_name();
	
  }
  get_all_users(){
    
    this._ProjectService.get_all_users()
    .subscribe(
      res => {
        this.dropdownList = res.data;
        console.log(res);
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
  get_templateproject_name(){
  this._ProjectService.get_templateproject_name()
      .subscribe(
        res => {
          this.projectnames = res.responce;
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
  on_project_select(id){
      const data = {
        template_project_id :id
      }
console.log(data);
console.log("mayuri");
      this._ProjectService.get_template_project_data(data)
      .subscribe(
        res => {
          console.log(res.data);
          this.projectPrimaryData.project_name=res.data[0].project_name;
		  console.log(res.data[0].project_name);
		  this.projectPrimaryData.project_description=res.data[0].project_description;
		  console.log(res.data[0].project_description);
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
  save_project_primary_details(){
    //this._app.loading = true;
    this.projectPrimaryData.project_start_date = this.datePipe.transform(this.projectPrimaryData.project_start_date, 'yyyy-MM-dd HH:mm:ss');
    this.projectPrimaryData.project_end_date = this.datePipe.transform(this.projectPrimaryData.project_end_date, 'yyyy-MM-dd HH:mm:ss');
	 this.projectPrimaryData.project_color = this.color4;
    console.log(this.color4);
    this._ProjectService.save_project(this.projectPrimaryData)
    .subscribe(
      res => {
        this.toastr.success('Project Created', 'success');
        this._router.navigate([this.current_page+'/projects']);
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
    console.log(event.target.files[0]);

    if (event.target.files[0].size > 10000000) {
      this.message = "Image size  should be less than 10 mb. ";
    }
   // else if(event.target.files[0].type != "image/jpeg")
   // {
    // this.message = "file type should be allow only jpg/jpeg/png ";
   // }
   // else if(event.target.files[0].type != "image/png")
   // {
	    // this.message = "file type should be allow only jpg/jpeg/png ";
   // }
   // else if(event.target.files[0].type != "image/jpg")
   // {
	    // this.message = "file type should be allow only jpg/jpeg/png ";
   // }
    else
    {
      this.message = '';
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
 
	
	
	
 // rotate_image(image,number)
  
  // {
	  
	  // const data = {
        // image_file :image,
		// angle:number
		
      // }
	  // console.log(data);
	  // this._ProjectService.rotate_image(data)
    // .subscribe(
      // res => {
        // console.log(res);
       
        // this._app.loading = false;
     // },
      // err =>{
         // this._app.loading = false;
           // this._router.navigate(["/login"]);
         
        // }
    // );
  // } 
}
