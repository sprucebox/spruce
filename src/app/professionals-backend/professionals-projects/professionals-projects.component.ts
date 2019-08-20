import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-professionals-projects',
  templateUrl: './professionals-projects.component.html',
  styleUrls: ['./professionals-projects.component.css']
})
export class ProfessionalsProjectsComponent implements OnInit {
  allProjects: any;
  private isAscendic: boolean = true;

  namesearch: any;
  project_id: any;
  company_id:any;
  userroletype:any;
  role: any;
  list_type: any;
  select_permissions: any;
  constructor(private _router: Router,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private _activatedroute: ActivatedRoute) { }

  ngOnInit() {

    this.userroletype = localStorage.getItem('userroletype');
    $(document).ready(function () {

      $('ul.filter-view li a').click(function () {
        $('ul.filter-view li a').removeClass('activelink');
        $(this).addClass('activelink');
        var tab_id = $(this).attr('data-tab');
        $('.content').removeClass('current').addClass('hide');
        $("#" + tab_id).addClass('current').removeClass('hide');
      });
    });
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(3) !== -1) {
      this.get_all_projects('asc');
      this.list_type = 'asc';
    }
    this._app.loading = false;
  }

  sorting_in_list(listtype) {
    this.list_type = listtype;
    this.get_all_projects(listtype);
  }

  get_all_projects(listtype) {
    const data = {
      list_type: listtype,
    }
    // alert(data.list_type);
    //this._app.loading = true;
    this._ProjectService.get_all_project(data)
      .subscribe(
        res => {
          //console.log(res.projects);
          this.role = res.role;
          //console.log(res.role);
          this.allProjects = res.projects;
          this.company_id = localStorage.getItem('company_id');

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


}
