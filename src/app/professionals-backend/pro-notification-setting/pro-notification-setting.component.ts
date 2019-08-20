import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pro-notification-setting',
  templateUrl: './pro-notification-setting.component.html',
  styleUrls: ['./pro-notification-setting.component.css']
})
export class ProNotificationSettingComponent implements OnInit {
  NotificationData = {
    assigned_icreated : '',
    assigned_iamassigned : '',
    updated_icreated:'',
    update_iamassigned:'',
    complete_icreated:'',
    complete_iamassigned:'',
    comment_icreated:'',
    comment_iamassigned:'',
    processor_icreated:'',
    processor_iamassigned:'',
    whenamessagepostedondiscussion:'',
    when_a_new_doucment_is_uploaded:'',
    notimy_all_activites:'',
    

  };
  constructor(private _CreateaccountService:CreateaccountService,private _router: Router,private toastr: ToastrService,private _app: AppComponent,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService) { }
  select_permissions:any;
  ngOnInit() {
    this.select_permissions = localStorage.getItem('permissions');
    this.get_project_notifications();
  }
 

  add_notifications_detail()
  {
	  const data ={
     
      assigned_icreated:this.NotificationData.assigned_icreated,
      assigned_iamassigned:this.NotificationData.assigned_iamassigned,
      updated_icreated:this.NotificationData.updated_icreated,
      update_iamassigned:this.NotificationData.update_iamassigned,
      complete_icreated:this.NotificationData.complete_icreated,
  
      complete_iamassigned:this.NotificationData.complete_iamassigned,
      comment_icreated:this.NotificationData.comment_icreated,
      comment_iamassigned:this.NotificationData.comment_iamassigned,
      processor_icreated: this.NotificationData.processor_icreated,
      processor_iamassigned: this.NotificationData.processor_iamassigned,
      whenamessagepostedondiscussion:this.NotificationData.whenamessagepostedondiscussion,
      when_a_new_doucment_is_uploaded: this.NotificationData.when_a_new_doucment_is_uploaded,
        notimy_all_activites:this.NotificationData.notimy_all_activites,
    
    }
    
    console.log(data);
    
      this._ProjectService.add_notifications_detail(data)
      .subscribe(
        res => {
			console.log(res);
          this.toastr.success('Date inserted', 'success');
         
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
  get_project_notifications(){
    
    this._ProjectService.get_project_notifications()
    .subscribe(
      res => {
        
       
        this.NotificationData.assigned_icreated=res.data.assigned_icreated;
      
        this.NotificationData.assigned_iamassigned=res.data.assigned_iamassigned;
        this.NotificationData.updated_icreated=res.data.updated_icreated;
        this.NotificationData.update_iamassigned=res.data.update_iamassigned;
      this.NotificationData.complete_icreated=res.data.complete_icreated;
  
      this.NotificationData.complete_iamassigned=res.data.complete_iamassigned;
      this.NotificationData.comment_icreated=res.data.comment_icreated;
    this.NotificationData.comment_iamassigned=res.data.comment_iamassigned;
      this.NotificationData.processor_icreated=res.data.processor_icreated;
      this.NotificationData.processor_iamassigned=res.data.processor_iamassigned;
    this.NotificationData.whenamessagepostedondiscussion=res.data.whenamessagepostedondiscussion;
      this.NotificationData.when_a_new_doucment_is_uploaded=res.data.when_a_new_doucment_is_uploaded;
  this.NotificationData.notimy_all_activites=res.data.notimy_all_activites;

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
