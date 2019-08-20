import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import { CreateaccountService } from '../../createaccount.service';
@Component({
  selector: 'app-pro-manage-role',
  templateUrl: './pro-manage-role.component.html',
  styleUrls: ['./pro-manage-role.component.css']
})
export class ProManageRoleComponent implements OnInit {
  userrolelist: any;
  usercount: any;
  modeldisplay2: any = false;
  remove_user_id: any;
  applyback: any = false;
  modeldisplay3: boolean = false;

  constructor(private _CreateaccountService: CreateaccountService, private _ProjectService: ProjectService, private _router: Router, private _app: AppComponent, private toastr: ToastrService) { }
  editRoleFromData = {
    role_id: '',
    role_name: '',
  };
  ngOnInit() {
    this.get_user_role_and_permissions();

  }
  get_user_role_and_permissions() {
    //this._app.loading = true;
    this._ProjectService.get_user_role_and_permissions()
      .subscribe(
        res => {
          console.log(res);
          this.userrolelist = res.roles;

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  edit_role(role_id, role_name) {
    this.editRoleFromData.role_id = role_id;
    this.editRoleFromData.role_name = role_name;
    this.modeldisplay3 = true;
    this.applyback = true;
  }
  hidemodel3() {
    this.modeldisplay3 = false;
    this.applyback = false;
  }

  update_role_name() {
    console.log(this.editRoleFromData);
    this._ProjectService.update_role_name(this.editRoleFromData)
      .subscribe(
        res => {
          this.modeldisplay3 = false;
          this.applyback = false;
          this.get_user_role_and_permissions();
          this.toastr.success('Role Updated', 'success');
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  delete_role(id) {
    console.log(this.remove_user_id);
    this.remove_user_id = id;
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  hidemodel2() { this.modeldisplay2 = false; }
  remove_role(id) {

    this._app.loading = true;
    const data = {
      id: id,

    }
    this._CreateaccountService.delete_role(data)
      .subscribe(
        res => {
          console.log(res);
          this.get_user_role_and_permissions();

          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ){
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

}
