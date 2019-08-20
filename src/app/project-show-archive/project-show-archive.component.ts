import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import * as $ from 'jquery';
@Component({
  selector: 'app-project-show-archive',
  templateUrl: './project-show-archive.component.html',
  styleUrls: ['./project-show-archive.component.css']
})
export class ProjectShowArchiveComponent implements OnInit {

  allProjects: any;
  select_permissions: any;
  showGrid: any;
  showList: any;
  viewgrid: boolean = true;
  viewlist: any;
  constructor(private _router: Router,
    private _app: AppComponent,
    private _ProjectService: ProjectService, ) { }

  ngOnInit() {
    this.showGrid = 'activelink';
    this.viewlist = false;
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(3) !== -1) {
      this.get_all_project_archive();
    }
    this._app.loading = false;
  }

  changeView(show) {
    if (show == '1') {
      this.showGrid = 'activelink';
      this.viewgrid = true;
      this.viewlist = false;
      this.showList = '';
    } else {
      this.showList = 'activelink';
      this.viewgrid = false;
      this.viewlist = true;
      this.showGrid = '';
    }
  }

  get_all_project_archive() {
    //this._app.loading = true;
    this._ProjectService.get_all_project_archive()
      .subscribe(
        res => {
          console.log(res.projects);
          this.allProjects = res.projects;
          //this._app.loading = false;
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
}
