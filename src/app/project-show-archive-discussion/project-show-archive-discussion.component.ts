import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-project-show-archive-discussion',
  templateUrl: './project-show-archive-discussion.component.html',
  styleUrls: ['./project-show-archive-discussion.component.css']
})
export class ProjectShowArchiveDiscussionComponent implements OnInit {

 constructor(private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService) { }
  project_id:any;
  discussion_id:any;
  modeldisplay3:any=false;
  applyback:any=false;
  role:any;
  comments:any;
  hideme= {};
  discussion= {
    discussion_title : '',
    discussion_description : '',
    discussion_file_url : '',
    discussion_project_id : '',
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

    this.get_discussion_details();
    this.get_all_comments_by_discussion_id();
  }
 get_discussion_details(){
    const data = {
      discussion_id :this.discussion_id
    }
    
    this._ProjectService.get_project_discussion_details(data).subscribe(res => {
      
      this.discussion = res.data;
	   this.role = res.role;
		  console.log(res.role); 
     
    });
  }

  get_all_comments_by_discussion_id(){
    const data = {
      discussion_id :this.discussion_id
    }

    this._ProjectService.get_project_discussion_comments(data).subscribe(res => {
      
      this.comments = res.data;
     
    });

  }

  add_new_comment(){
    this._ProjectService.add_new_comment(this.CommentFormdata).subscribe(res => {
      this.get_all_comments_by_discussion_id();
     });
  }

  reply_comment(comment_id){
    this.ReplyCommentFormdata.parent_comment_id = comment_id;
    this._ProjectService.reply_comment(this.ReplyCommentFormdata).subscribe(res => {
      this.get_all_comments_by_discussion_id();
     });
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
  confirm_move_archive(){
  
    this.modeldisplay3=true;
    this.applyback=true;
  }
  hidemodel3(){ this.modeldisplay3=false;}
 update_discussion_archive_data(){
    const data = {
      discussion_id1 :this.discussion_id
    }

   this._ProjectService.update_discussion_archive_data(data)
    .subscribe(
      res => {
		    console.log(res.data);
    this.toastr.success('Restore', 'success');
    this._router.navigate(["/professionals/project-discussion/",this.project_id]);
     
     
    });

  }

}
