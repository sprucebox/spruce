import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-full-message',
  templateUrl: './full-message.component.html',
  styleUrls: ['./full-message.component.css']
})
export class FullMessageComponent implements OnInit {
notification:any;
alldate:any;
timedetail:any;
 remove_user_id:any;
  modeldisplay2:any=false;
  applyback:any=false;
 constructor(private _activatedroute: ActivatedRoute,private _router: Router,private _ProjectService:ProjectService, private _app: AppComponent) { }

  ngOnInit() {
	 this.get_user_message_detail(); 
	 this.timedetail=localStorage.getItem('timezonedata');
	 this.alldate=localStorage.getItem('company_dateformat');
  }
get_user_message_detail(){
   
   
        this._app.loading = true;
          this._ProjectService.get_user_message_detail()
          .subscribe(
            res => {
              console.log(res);
             
              
              this.notification=res.data;
              console.log( this.notification);
			   
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
	  
	  
  confirm_remove_user(id){

    this._app.loading = true;
    const data ={
      id:id,
     
    }
	console.log(data);
   this._ProjectService.remove_message_from_usernotification(data)
    .subscribe(
      res => {
        console.log(res);
      this.get_user_message_detail();
        this._app.loading = false;
        this.modeldisplay2=false;
        this.applyback=false;
        
      },
      err => console.log(err)
    );
  }
  
delete_all_notification(){
	this.modeldisplay2=true;
        this.applyback=false;
}
hidemole2()
{
	   this.modeldisplay2=false;
}
  remove_user(){

    this._app.loading = true;
    
	
   this._ProjectService.delete_all_notification()
    .subscribe(
      res => {
        console.log(res);
      this.get_user_message_detail();
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
