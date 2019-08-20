import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { saveAs as importedSaveAs } from "file-saver";

@Component({
  selector: 'app-professionals-home',
  templateUrl: './professionals-home.component.html',
  styleUrls: ['./professionals-home.component.css']
})
export class ProfessionalsHomeComponent implements OnInit {
  alldate: any;
  project_id: any;
  remove_user_id: any;
  user_file_name: any;
  showGrid: any;
  showList: any;
  viewgrid: boolean = true;
  viewlist: any;
  modeldisplay4: any = false;
  applyback: any = false;
  homes: any;
  discussions: any;
  allhomefiles: any;
  records: any;
  noImage: any = "../assets/no_image.jpg";
  constructor(private _router: Router, private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService: ProjectService, ) { }

  ngOnInit() {
    this._activatedroute.params.subscribe(params => {

      this.project_id = params['id'];

    });
    this.showGrid = 'activelink';
    this.viewlist = false;
    this.get_project_data();
    this.get_home_discussion();
    this.get_home_files_overview();
    this.alldate = localStorage.getItem('company_dateformat');
    
    this._app.loading = false;
  }
  changeView(show){
    if(show == '1'){
      this.showGrid = 'activelink';
      this.viewgrid = true;
      this.viewlist = false;
      this.showList = '';
    }else{
      this.showList = 'activelink';
      this.viewgrid = false;
      this.viewlist = true;
      this.showGrid = '';
    }
  }
  get_project_data() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_data(data)
      .subscribe(
        res => {
          this.homes = res.data;
          //console.log(res.data);

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
  get_home_discussion() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_home_discussion(data)
      .subscribe(
        res => {
          this.discussions = res.data;
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
  get_home_files_overview() {
    const data = {
      project_id: this.project_id
    }
    //console.log(data);
    this._ProjectService.get_home_files_overview(data)
      .subscribe(
        res => {
          this.allhomefiles = res.data;
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
  downloadFile(filename, name) {

    const data = {
      fileurl: filename
    }
    //console.log(data);
    //console.log(filename);
    this._ProjectService.downloadFile(data).subscribe(blob => {
      importedSaveAs(blob, name);
    }, err => console.log(err)
    );
  }




}
