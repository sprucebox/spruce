import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { AppComponent } from '../../app.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pro-user-setting',
  templateUrl: './pro-user-setting.component.html',
  styleUrls: ['./pro-user-setting.component.css']
})
export class ProUserSettingComponent implements OnInit {
alluser:any;
allusernew:any;
role:any;
 remove_user_id:any;
 modeldisplay2:any=false;
  applyback:any=false;
searchText:string;
  constructor( private _ProjectService:ProjectService,private _activatedroute: ActivatedRoute,private _app : AppComponent,private toastr: ToastrService,private _router: Router) { }
  select_permissions:any;
  userid:any;
   showinternal: any = true;
  showexternal: any = false;
  ngOnInit() {
    this.get_all_company_user();
    this.select_permissions = localStorage.getItem('permissions');
	 this.userid = localStorage.getItem('userid');
	console.log(this.userid);
  }
 
  hidemodel2(){ this.modeldisplay2=false;}
  get_all_company_user(){

    this._ProjectService.get_all_company_user()
    .subscribe(
      res => {
        this.alluser = res.data;
        console.log(res);
    this.role = res.role;
    this.allusernew=res.allusernew;
		  console.log(res.role);
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );

  }
   openDialog() {
    this.showinternal = true;
    this.showexternal = false;
    this.get_all_company_user();
  }
  openDialog1() {

    this.showinternal = false;
    this.showexternal = true;
    this.get_all_company_user();
  }
confirm_remove_user(id){
    this.remove_user_id =id;
    this.modeldisplay2=true;
    this.applyback=true;
  }
  remove_user(id){

    this._app.loading = true;
    const data ={
      id:id,
     
    }
   this._ProjectService.remove_user_from_projectuser(data)
    .subscribe(
      res => {
        console.log(res);
      this.get_all_company_user();
        this._app.loading = false;
        this.modeldisplay2=false;
        this.applyback=false;
        
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }

  resend_invitaion(user_id){
    this._app.loading = true;
    const data = {
      user_id :user_id
    }
    this._ProjectService.resend_invitaion(data)
    .subscribe(
      res => {
        this._app.loading = false;
        this.toastr.success('Invitation Resend', 'success');
      },
      err =>{
         this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } 
          else if(err.error.code == "550")
          {			 
            alert(' email not sendemail notification will not sent due to Expected response code 354 but got code "550", with message "550 5.4.5 Daily user sending quota exceeded. 14sm66142279pfj.36 - gsmtp');
                     
                    }
          else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
}
