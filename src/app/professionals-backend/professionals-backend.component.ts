import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-professionals-backend',
  templateUrl: './professionals-backend.component.html',
  styleUrls: ['./professionals-backend.component.css']
})
export class ProfessionalsBackendComponent implements OnInit {

  username:string;
  profile_image:string;
  select_permissions:any;
  constructor(private toastr: ToastrService,private _app: AppComponent,private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService,) { }

  ngOnInit() {
 this._ProjectService.Currentimageupload.subscribe(imageupdate => this.profile_image = imageupdate);
 console.log(this.profile_image);

      // this.username = localStorage.getItem("username");
      // this.profile_image = localStorage.getItem("profile_image");
      this.select_permissions = localStorage.getItem('permissions');
	  this.get_profile_data();
  }
  get_profile_data(){
  
   
        this._app.loading = true;
          this._ProjectService.get_profile_data()
          .subscribe(
            res => {
              console.log(res);
             this.username=res.data.fullname;
			 this.profile_image=res.data.profile_image;
             console.log(this.profile_image);
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
