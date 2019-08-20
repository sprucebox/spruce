import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProjectService } from '../services/project.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-project-discussion-edit',
  templateUrl: './project-discussion-edit.component.html',
  styleUrls: ['./project-discussion-edit.component.css']
})
export class ProjectDiscussionEditComponent implements OnInit {

  private _discussionfileuploadUrl = `${environment.api}/project_discussion_file_upload`;
  project_id:any;
  id:any;
  noImage:any = "../assets/no_image.jpg";
  project_id1:any;
  project_company_id:any;
  company_id:any;
  pr_show = false;
  url:'';
  imageurl:any
  discussionfileUrl:'';
  current_page:string;
  adddiscussionFromData = {
    discussion_title : '',
    discussion_description : '',
    discussion_type: '',
    discussion_file_url : '',
    discussion_project_id : '',
  };
  updatediscussionFromData = {
    discussion_title : '',
    discussion_description : '',
    discussion_type: '',
    discussion_file_url : '',
    discussion_project_id : '',
	discussion_extension : '',
  };
  constructor( private _app: AppComponent,private _router: Router,private toastr: ToastrService,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService) { }

  public uploader: FileUploader = new FileUploader({url:this._discussionfileuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'file'});
  ngOnInit() {
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
       
      this.project_id = params['id'];
	   this.id = params['did'];
	 
      this.adddiscussionFromData.discussion_project_id = params['id'];
	  this.updatediscussionFromData.discussion_project_id = params['id'];
		
    });
		this.edit_project_discussion();
    console.log( this.project_id);
    this.get_company_id_check();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
		  console.log(response);
		    this.imageurl=JSON.parse(response);
		   console.log(this.imageurl)
//this.adddiscussionFromData.discussion_file_url = response;
         this.updatediscussionFromData.discussion_file_url = this.imageurl.image_url;
          this.updatediscussionFromData.discussion_extension = this.imageurl.extension;
          console.log(this.updatediscussionFromData.discussion_extension);
          console.log(this.updatediscussionFromData.discussion_file_url);	
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
    this.adddiscussionFromData.discussion_project_id = this.project_id;
	this.updatediscussionFromData.discussion_project_id = this.project_id;
  }

  add_new_discussion(){

    this._app.loading = true;
      this._ProjectService.add_new_discussion(this.adddiscussionFromData)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigate([this.current_page+"/project-discussion/"+this.project_id]);
          
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
  edit_project_discussion(){
    const data = {
      id :this.id
    }
	console.log(data);
	
    this._ProjectService.edit_project_discussion(data).subscribe(res => {
		console.log(res);
		console.log("mayuri");
      this.updatediscussionFromData.discussion_title =res.data[0].discussion_title;
	     this.updatediscussionFromData.discussion_description =res.data[0].discussion_description;
		  this.updatediscussionFromData.discussion_type =res.data[0].discussion_type;
		  this.updatediscussionFromData.discussion_extension =res.data[0].discussion_extension;
		    this.updatediscussionFromData.discussion_file_url =res.data[0].discussion_file_url;
      console.log(res.data);
    });
    
  }
  update_discussion_detail()
  {
	  const data ={
      id :this.id,
	  discussion_title:this.updatediscussionFromData.discussion_title,
	  discussion_description:this.updatediscussionFromData.discussion_description,
	  discussion_type:this.updatediscussionFromData.discussion_type,
	  discussion_file_url:this.updatediscussionFromData.discussion_file_url,
	  discussion_extension:this.updatediscussionFromData.discussion_extension,
	  
	  
	  project_id:this.project_id,
    }
   
    console.log(data);
    
      this._ProjectService.update_discussion_detail(data)
      .subscribe(
        res => {
			console.log(res);
          this.toastr.success('Date updated', 'success');
          this._router.navigate([this.current_page+"/project-discussion/"+this.project_id]);
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
  get_company_id_check(){
const data = {
  project_id1:this.project_id
} 
console.log(data);
    this._app.loading = true;
      this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
          console.log(res);
         
          this.company_id=localStorage.getItem('company_id');
          console.log(this.company_id);
          this.project_company_id=res.project_id;
          console.log(this.project_company_id);
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
}


