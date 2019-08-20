import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AppComponent } from '../../app.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pro-project-users',
  templateUrl: './pro-project-users.component.html',
  styleUrls: ['./pro-project-users.component.css']
})
export class ProProjectUsersComponent implements OnInit {
  project_id: any;
  showinternal: any = true;
  showexternal: any = false;
  project_users_external: any;
  project_users_external_new: any;
  project_company_id: any;
  company_id: any;
  projectlist: any;
  project_id1: any;
  projectname: any;
  remove_user_id: any;
  select_permissions: any;
  project_users: any;
  not_in_project_users: any;
  modeldisplay: any = false;
  modeldisplay2: any = false;
  applyback: any = false;
  myForm: FormGroup;
  usertype: any;
  role: any;
  constructor(private fb: FormBuilder, private _app: AppComponent, private _router: Router, private _activatedroute: ActivatedRoute, private _ProjectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];

    });
    this.get_company_id_check();
   // this.get_all_project_users();
    this.myForm = this.fb.group({
      usereid: this.fb.array([])
    });
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(33) !== -1) {
      this.get_all_project_users();
    }
    this._app.loading = false;
  }
  openDialog() {
    this.showinternal = true;
    this.showexternal = false;
    this.get_all_project_users();
  }
  openDialog1() {

    this.showinternal = false;
    this.showexternal = true;
    this.get_all_project_users();
  }
  get_all_project_users() {
    //this._app.loading = true;
    const data = {
      project_id: this.project_id,
    }
    this._ProjectService.get_all_project_users(data)
      .subscribe(
        res => {
         // this._app.loading = true;
          //console.log(res);
          this.project_users = res.internal;
          this.usertype = res.type;
          this.project_users_external = res.allusernew;
          this.project_users_external_new = res.external;
          this.projectname = res.project;
          this.role = res.role;
          //console.log(this.role);
          //this._app.loading = false;


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
          //console.log(this.company_id);
          this.project_company_id = res.project_id;
          //console.log(this.project_company_id);
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
  add_user_button_click() { // //console.log('hello');
    this._app.loading = true;
    const data = {
      project_id: this.project_id,
    }
    this._ProjectService.get_all_users_with_project_id(data)
      .subscribe(
        res => {
          //console.log(res);
          this.not_in_project_users = res.data;
          this.projectlist = res.project;
          this._app.loading = false;
          this.modeldisplay = true;
          this.applyback = true;

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

  hidemodel() { this.modeldisplay = false; }
  hidemodel2() { this.modeldisplay2 = false; }

  onChecked(usereid: string, isChecked: boolean) {

    const usereidFormArray = <FormArray>this.myForm.controls.usereid;

    if (isChecked) {

      usereidFormArray.push(new FormControl(usereid));

    } else {
      let index = usereidFormArray.controls.findIndex(x => x.value == usereid)
      usereidFormArray.removeAt(index);
    }
  }

  add_user_in_project() {
    this._app.loading = true;
    const data = {
      project_id: this.project_id,
      userids: this.myForm.value.usereid
    }
    //console.log(data);
    this.myForm = this.fb.group({
      usereid: this.fb.array([])
    });
    //console.log(this.myForm);

    this._ProjectService.add_user_by_project_id(data)
      .subscribe(
        res => {

          //console.log("mayuri");
          //console.log(res);

          this.project_users = res.data;
          this.get_all_project_users();
          this.toastr.success('Add user sucessfully', 'success');

          this._app.loading = false;
          this.modeldisplay = false;
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

  confirm_remove_user(id) {
    this.remove_user_id = id;
    this.modeldisplay2 = true;
    this.applyback = true;
  }

  remove_user(id) {

    this._app.loading = true;
    const data = {
      id: id,
      project_id: this.project_id,
    }
    //console.log(data);
    this._ProjectService.remove_user_from_project(data)
      .subscribe(
        res => {
          //console.log(res);
          this.get_all_project_users();
          this.project_users = res.data;
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
