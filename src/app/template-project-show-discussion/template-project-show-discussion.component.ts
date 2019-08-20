import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import {saveAs as importedSaveAs} from "file-saver";
@Component({
  selector: 'app-template-project-show-discussion',
  templateUrl: './template-project-show-discussion.component.html',
  styleUrls: ['./template-project-show-discussion.component.css']
})
export class TemplateProjectShowDiscussionComponent implements OnInit {
project_id:any;
discussion_id:any;
comments:any;
alldate:any;
CommentFormdata = {
    comment : '',
    discussion_id : '',
  };
  ReplyCommentFormdata = {
    comment : '',
    discussion_id : '',
    parent_comment_id : '',
  };
  hideme= {};
  discussion= {
    discussion_title : '',
    discussion_description : '',
    discussion_file_url : '',
    discussion_project_id : '',
	discussion_extension:'',
	discussion_type:'',
    created_at : '',
    firstname:'',
  };
  constructor(private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService,private _app : AppComponent) { }

  ngOnInit() {
	   this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
      this.discussion_id =params['did'];
	  this.CommentFormdata.discussion_id =params['did'];
      this.ReplyCommentFormdata.discussion_id =params['did'];
     
    });
	this.get_template_discussion_details();
	this.get_template_comments_by_discussion_id();
  }
  get_template_discussion_details(){
    const data = {
      discussion_id :this.discussion_id
    }
    
    this._ProjectService.get_template_discussion_details(data).subscribe(res => {
      
		  // this.alldate=localStorage.getItem('company_dateformat');
      this.discussion = res.data;
     
    });
  
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
  add_template_comment(){
    this._ProjectService.add_template_comment(this.CommentFormdata).subscribe(res => {
     console.log(res);
	 this.get_template_comments_by_discussion_id();
     });
  }
   reply_template_comment(comment_id){
    this.ReplyCommentFormdata.parent_comment_id = comment_id;
    this._ProjectService.reply_template_comment(this.ReplyCommentFormdata).subscribe(res => {
       this.get_template_comments_by_discussion_id();
     });
     this.showhide(comment_id);
  }
  get_template_comments_by_discussion_id(){
    const data = {
      discussion_id :this.discussion_id
    }

    this._ProjectService.get_template_project_discussion_comments(data).subscribe(res => {
      
      this.comments = res.data;
	  // this.allcomments = res.comment;
	  // console.log(this.allcomments);
      this.alldate=localStorage.getItem('company_dateformat');
    });

  }
  downloaddiscussionFile(filename){
    const data = {
      fileurl :filename
    }
    console.log(data);
    console.log(filename);
    this._ProjectService.downloaddiscussionFile(data).subscribe(blob => {
              importedSaveAs(blob, filename);


          }, err =>{
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
