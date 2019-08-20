import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProjectService } from '../services/project.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-template-project-add-discussion',
  templateUrl: './template-project-add-discussion.component.html',
  styleUrls: ['./template-project-add-discussion.component.css']
})
export class TemplateProjectAddDiscussionComponent implements OnInit {
  private _discussionfileuploadUrl = `${environment.api}/project_discussion_file_upload`;
  project_id:any;
    company_id:any;
	 project_company_id:any;
   pr_show = false;
  url:'';
  imageurl:any;
  discussionfileUrl:'';
  current_page:string;
  addtemplatediscussionFromData = {
    discussion_title : '',
    discussion_description : '',
    discussion_type: '',
	discussion_extension: '',
    discussion_file_url : '',
    discussion_project_id : '',
    
    
  };
  constructor( private _app: AppComponent,private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService) { }
  public uploader: FileUploader = new FileUploader({url:this._discussionfileuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'file'});
  ngOnInit() {
	  var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
       
      this.project_id = params['id'];
      this.addtemplatediscussionFromData.discussion_project_id = params['id'];
     
    });
	this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
          this.imageurl=JSON.parse(response);
          this.addtemplatediscussionFromData.discussion_file_url = this.imageurl.image_url;
          this.addtemplatediscussionFromData.discussion_extension = this.imageurl.extension;
          console.log(this.addtemplatediscussionFromData.discussion_extension);
          console.log(this.addtemplatediscussionFromData.discussion_file_url);	
          
       };
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
              this.project_company_id=res.project_id;
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
    this.addtemplatediscussionFromData.discussion_project_id = this.project_id;
  }
  add_template_discussion(){
    
    this._app.loading = true;
      this._ProjectService.add_template_discussion(this.addtemplatediscussionFromData)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigate([this.current_page+"/template-project-discussion/"+this.project_id]);
          
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
