import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-project-user-archive',
  templateUrl: './project-user-archive.component.html',
  styleUrls: ['./project-user-archive.component.css']
})
export class ProjectUserArchiveComponent implements OnInit {
 remove_user_id:any;
 remove_user_id_new:any;
    showinternal: any = true;
  showexternal: any = false;
 allusernew:any;
 modeldisplay2:any=false;
 modeldisplay3:any=false;
  applyback:any=false;
 alluser:any;
searchText:string;
  constructor( private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private _app : AppComponent,private toastr: ToastrService) { }
  select_permissions:any;
  ngOnInit() {
    this.get_all_company_user();
    this.select_permissions = localStorage.getItem('permissions');
  }
hidemodel2(){ this.modeldisplay2=false;}
hidemodel3(){ this.modeldisplay3=false;}
  get_all_company_user(){

    this._ProjectService.get_all_company_user_archive()
    .subscribe(
      res => {
        this.alluser = res.data;
        this.allusernew = res.allusernew;
        console.log(res);
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
  remove_user_new(id){

    this._app.loading = true;
    const data ={
      id:id,
     
    }
   this._ProjectService.remove_user_from_projectuser_new(data)
    .subscribe(
      res => {
        console.log(res);
      this.get_all_company_user();
        this._app.loading = false;
        this.modeldisplay3=false;
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
confirm_remove_user(id){
    this.remove_user_id =id;
    this.modeldisplay2=true;
    this.applyback=true;
  }
  confirm_remove_user_new(id){
    this.remove_user_id_new =id;
    this.modeldisplay3=true;
    this.applyback=true;
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

