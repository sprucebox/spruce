import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.css']
})
export class EditnotesComponent implements OnInit {
  project_id:any;
  project_id1:any;
  project_company_id:any;
  company_id:any;
 select_permissions:any;
 contentEditable:any; 
  current_page:string;
id:any;
NoteData = {
    title : '',
    Description : '',
  is_internal:'',
  is_private:'',
    
  
 };
  constructor(private _CreateaccountService:CreateaccountService,private toastr: ToastrService,private _app: AppComponent,private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,) { }

  ngOnInit() {
	  	var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	 
	   this._activatedroute.params.subscribe(params => {
        
      this.id = params['noteid'];
	  this.project_id = params['id'];
     
    });
    this.get_company_id_check();
	this.edit_project_notes();
	this.select_permissions = localStorage.getItem('permissions');
  }
  
  checkValue(event: any){
    
    this.NoteData.is_internal=event;
    console.log(this.NoteData.is_internal);
  }

edit_project_notes(){
    const data = {
      id :this.id
    }
	console.log(data);
	
    this._ProjectService.edit_project_notes(data).subscribe(res => {
		console.log(res);
		console.log("mayuri");
      this.NoteData.title =res.data[0].title;
	     this.NoteData.Description =res.data[0].Description;
      this.NoteData.is_internal =res.data[0].is_internal;
      this.NoteData.is_private =res.data[0].is_private;
      console.log(res.data);
    });
    
  }
  //triggerSomeEvent(event: any) {
    //console.log(event);
    //if ( event.target.checked ) {
    //  this.contentEditable = true;
     // this.NoteData.is_private=this.contentEditable;
    // console.log(this.NoteData.is_private);
 // }

   
   // return;
 // }
  SomeEvent($event) {
 this.NoteData.is_private=$event.target.checked;
     console.log(this.NoteData.is_private);
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
              console.log(localStorage.getItem('company_id'));
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
  update_notes_detail()
  {
	  const data ={
      id :this.id,
	  detail1:this.NoteData.title,
	  decrption:this.NoteData.Description,
    is_internal:this.NoteData.is_internal,
    is_private:this.NoteData.is_private,
	  project_id:this.project_id,
    }
   
    console.log(data);
    
      this._CreateaccountService.update_notes_detail(data)
      .subscribe(
        res => {
			this._app.loading = false;
			     this._router.navigate([this.current_page+'/project-files/'+this.project_id]).then(() => {
        this._router.navigate([this.current_page+'/notes/'+this.project_id]);
    }); 
          this.toastr.success('Note updated', 'success');
         
          
          
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
