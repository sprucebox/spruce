import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  project_id: any;
  project_company_id: any;
  company_id: any;
  project_id1: any;
  projectname: any;
  select_permissions: any;
  notes: any;
  remove_user_id: any;
  usertype: any;
  modeldisplay2: any = false;
  applyback: any = false;
  constructor(private _CreateaccountService: CreateaccountService, private toastr: ToastrService, private _app: AppComponent, private _router: Router, private _activatedroute: ActivatedRoute, private _ProjectService: ProjectService, ) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];

    });
    this.get_company_id_check();
    this.get_project_notes();
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(36) !== -1) {
      this.get_project_notes();
    }
    this._app.loading = false;
  }
  delete(id) {
    this.remove_user_id = id;
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  hidemodel2() { this.modeldisplay2 = false; }
  get_project_notes() {
    const data = {
      project_id: this.project_id
    }
    //console.log(data);

    this._ProjectService.get_project_notes(data).subscribe(res => {
      //console.log(res);
      //this._app.loading = true;
      this.projectname = res.project;
      this.usertype = res.type;
      //console.log(this.projectname);
      this.notes = res.data;
      //console.log(res.data);
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
  remove_user(id) {
    const data = {
      id: id,

    }
    //console.log(data);

    this._ProjectService.delete_notes_data(data)
      .subscribe(
        res => {
          this.get_project_notes();
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
