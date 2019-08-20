import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-pro-project-discussion',
  templateUrl: './pro-project-discussion.component.html',
  styleUrls: ['./pro-project-discussion.component.css']
})
export class ProProjectDiscussionComponent implements OnInit {
  project_id: any;
  timedetail: any;
  alldatetask: any;
  projectname: any;
  project_id1: any;
  project_company_id: any;
  company_id: any;
  roletype: any;
  select_permissions: any;
  role: any;
  remove_user_id: any;
  modeldisplay2: any = false;
  applyback: any = false;
  alldate: any;
  discussions: any;
  usertype: any;
  noImage: any = "../assets/no_image.jpg";

  constructor(private _router: Router, private _activatedroute: ActivatedRoute, private _ProjectService: ProjectService, private _app: AppComponent) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];

    });
    this.get_company_id_check();
   // this.get_project_discussion();
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(25) !== -1) {
      this.get_project_discussion();
    }
    this.timedetail = localStorage.getItem('timezonedata');
    this.alldatetask = localStorage.getItem('company_dateformat');
    this._app.loading = false;
  }

  get_project_discussion() {
    const data = {
      project_id: this.project_id
    }
    this._ProjectService.get_project_discussion(data).subscribe(res => {
      this.discussions = res.data;
     // this._app.loading = true;
      //console.log(res.data);
      this.alldate = localStorage.getItem('company_dateformat');
      this.role = res.role;
      this.usertype = res.type;
      this.projectname = res.project;
      //console.log(this.projectname);
      this.roletype = res.roletype;
      //console.log(this.usertype);
      //console.log(res.role);
    });

  }
  get_company_id_check() {
    const data = {
      project_id1: this.project_id
    }
    //console.log(data);
    this._app.loading = true;
    this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
          //console.log(res);

          this.company_id = localStorage.getItem('company_id');
          this.project_company_id = res.project_id;
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  confirm_remove_user(id) {
    this.remove_user_id = id;
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  hidemodel2() { this.modeldisplay2 = false; }
  remove_user(id) {

    this._app.loading = true;
    const data = {
      id: id,

    }
    this._ProjectService.remove_discussion_from_projectdiscussion(data)
      .subscribe(
        res => {
          //console.log(res);
          this.get_project_discussion();
          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

}
