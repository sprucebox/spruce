import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import {saveAs as importedSaveAs} from "file-saver";
@Component({
  selector: 'app-pro-project-show-discussion',
  templateUrl: './pro-project-show-discussion.component.html',
  styleUrls: ['./pro-project-show-discussion.component.css']
})
export class ProProjectShowDiscussionComponent implements OnInit {

  constructor(private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService,private _app : AppComponent) { }
  project_id:any;
  fileurl:any;
  timedetail:any;
  allcomments:any;
    project_company_id:any;
  company_id:any;
   select_permissions:any;
  role:any;
   alldate:any;
  discussion_id:any;
  comments:any;
  remove_user_id:any;
  modeldisplay2:any=false;
  applyback:any=false;
  modeldisplay3:any=false;
 
  hideme= {};
  discussion= {
    discussion_title : '',
    discussion_description : '',
    discussion_file_url : '',
    discussion_project_id : '',
	discussion_type:'',
	discussion_extension:'',
    created_at : '',
    firstname:'',
  };

  CommentFormdata = {
    comment : '',
    discussion_id : '',
  };
  ReplyCommentFormdata = {
    comment : '',
    discussion_id : '',
    parent_comment_id : '',
  };
  ngOnInit() {
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
      this.discussion_id =params['did'];
      this.CommentFormdata.discussion_id =params['did'];
      this.ReplyCommentFormdata.discussion_id =params['did'];
    });
 this.get_company_id_check();
    this.get_discussion_details();
    this.get_all_comments_by_discussion_id();
	this.select_permissions = localStorage.getItem('permissions');
	this.timedetail=localStorage.getItem('timezonedata');
  }

  get_discussion_details(){
    const data = {
      discussion_id :this.discussion_id
    }
    
    this._ProjectService.get_project_discussion_details(data).subscribe(res => {
      this.role = res.role;
		  console.log(res.role); 
		  this.alldate=localStorage.getItem('company_dateformat');
      this.discussion = res.data;
     
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
				// this.project_userrole=res.userrole;
                this._app.loading = false;
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
  downloaddiscussionFile(filename){
    const data = {
      fileurl :filename
    }
    console.log(data);
    console.log(filename);
    this._ProjectService.downloaddiscussionFile(data).subscribe(blob => {
              importedSaveAs(blob, filename);
   },err =>{
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
  get_all_comments_by_discussion_id(){
    const data = {
      discussion_id :this.discussion_id
    }

    this._ProjectService.get_project_discussion_comments(data).subscribe(res => {
      
      this.comments = res.data;
	  // this.allcomments = res.comment;
	  // console.log(this.allcomments);
      this.alldate=localStorage.getItem('company_dateformat');
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

  add_new_comment(){
    this._ProjectService.add_new_comment(this.CommentFormdata).subscribe(res => {
      this.get_all_comments_by_discussion_id();
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

  reply_comment(comment_id){
    this.ReplyCommentFormdata.parent_comment_id = comment_id;
    this._ProjectService.reply_comment(this.ReplyCommentFormdata).subscribe(res => {
      this.get_all_comments_by_discussion_id();
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
     this.showhide(comment_id);
  }

  hideshow(item) {
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item] = true;
  }
  showhide(item) {
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = true;
    });
    this.hideme[item] = false;
  }
  update_discussion_data(){
    const data = {
      discussion_id1 :this.discussion_id
    }

   this._ProjectService.update_discussion_data(data)
    .subscribe(
      res => {
this.toastr.success('move to archive', 'success');
this._router.navigate(["/professionals/project-discussion/",this.project_id]);
     console.log(res.data);
     
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
  
    this.modeldisplay3=true;
    this.applyback=true;
  }
  hidemodel3(){ this.modeldisplay3=false;}
  confirm_remove_user(id){
    this.remove_user_id =id;
    console.log(this.remove_user_id);
    this.modeldisplay2=true;
    this.applyback=true;
  }
  hidemodel2(){ this.modeldisplay2=false;}
  remove_user(id){

    this._app.loading = true;
    const data ={
      id:id,
     
    }
    console.log(data);
   this._ProjectService.remove_discussion_from_projectdiscussion_comment(data)
    .subscribe(
      res => {
        console.log(res);
      this.get_all_comments_by_discussion_id();
        this._app.loading = false;
        this.modeldisplay2=false;
        this.applyback=false;
        
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
