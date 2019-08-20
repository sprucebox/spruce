import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-template-project-discussion',
  templateUrl: './template-project-discussion.component.html',
  styleUrls: ['./template-project-discussion.component.css']
})
export class TemplateProjectDiscussionComponent implements OnInit {
  project_id: any;
  select_permissions: any;
  noImage: any = "../assets/no_image.jpg";
  discussions: any;
  alldate: any;
  timedetail: any;
  remove_user_id: any;
  modeldisplay2: any = false;
  applyback: any = false;
  constructor(private _router: Router, private _activatedroute: ActivatedRoute, private _ProjectService: ProjectService, private _app: AppComponent) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];

    });
    this.get_project_template_discussion();
    this.timedetail = localStorage.getItem('timezonedata');
  }
  get_project_template_discussion() {
    const data = {
      project_id: this.project_id
    }
    this._ProjectService.get_project_template_discussion(data).subscribe(res => {
      this.discussions = res.data;
      this.alldate = localStorage.getItem('company_dateformat');
      console.log(res.data);

    });
    this.select_permissions = localStorage.getItem('permissions');
    console.log(this.select_permissions);

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
    this._ProjectService.remove_template_discussion_from_projectdiscussion(data)
      .subscribe(
        res => {
          console.log(res);
          this.get_project_template_discussion();
          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;

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
