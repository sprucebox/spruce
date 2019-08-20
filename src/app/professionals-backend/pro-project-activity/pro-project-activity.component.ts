import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pro-project-activity',
  templateUrl: './pro-project-activity.component.html',
  styleUrls: ['./pro-project-activity.component.css']
})
export class ProProjectActivityComponent implements OnInit {
alldate:any;
project_id:any;
timedetail:any;
project_company_id:any;
company_id:any;
project_id1:any;
  projectname:any;
  activities:any;
  select_permissions:any;
  constructor(private _activatedroute: ActivatedRoute,private _router: Router,private _ProjectService:ProjectService, private _app: AppComponent) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
   });
	 this.timedetail=localStorage.getItem('timezonedata');
   this.get_company_id_check();
   //this.get_all_activity();
    this.select_permissions = localStorage.getItem('permissions');
	 if(this.select_permissions.indexOf(27) !== -1){
        this.get_all_activity();
    }
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
  get_all_activity(){
    const data = {
      project_id :this.project_id
    }

    this._ProjectService.get_all_project_activity(data)
    .subscribe(
      res => {
		  
        this.activities = res.data;
		console.log(res.data);
        this.projectname=res.project; 
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
  
}
