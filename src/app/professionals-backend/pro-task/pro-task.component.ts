import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ToastrService } from 'ngx-toastr';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
@Component({
  selector: 'app-pro-task',
  templateUrl: './pro-task.component.html',
  styleUrls: ['./pro-task.component.css']
})
export class ProTaskComponent implements OnInit {
  All_tasks: any;
  alldate: any;
  All_tasks_hold: any = [];
  task_type: any;
  taskfetchdate: any;
  give_start_date: boolean = false;
  give_end_date: boolean = false;
  taskendid: any;
  taskiddate: any;
  All_tasks_status: any;
  dropdownList: any;
  taskidchange: any;
  ownername: any;
  selectedItems: any;
  give_owner_name: boolean = false;
  taskownerid: any;
  // dropdownList = [];
  // selectedItems = [];
  temparray = []
  dropdownSettings = {};
  task_id: any;
  // Projectname:any;
  status_list: any;
  username: any;
  timedetail: any;
  task_id1: any;
  constructor(private _app: AppComponent, private _ProjectService: ProjectService, private _router: Router, private toastr: ToastrService, private datePipe: DatePipe) { }
  ////////////////////////hide/////////////////////////////////////////////////
  hideTask1: boolean = false;
  hideSource2: boolean = false;
  hideOwner3: boolean = false;
  hideCreated4: boolean = false;
  hideStatus5: boolean = false;
  hideStart6: boolean = false;
  modeldisplay: any = false;
  modeldisplay2: any = false;
  applyback: any = false;
  hideDue7: boolean = false;
  addTaskstartdate = {
    start_date: '',
    end_date: '',

  };
  toggleElement1() {
    if (this.hideTask1) {
      this.hideTask1 = false;
    }
    else {
      this.hideTask1 = true;
    }
  }
  toggleElement2() {
    if (this.hideSource2) {
      this.hideSource2 = false;
    }

    else {
      this.hideSource2 = true;
    }
  }
  toggleElement3() {
    if (this.hideOwner3) {
      this.hideOwner3 = false;
    }
    else {
      this.hideOwner3 = true;
    }
  }
  toggleElement4() {
    if (this.hideCreated4) {
      this.hideCreated4 = false;
    }
    else {
      this.hideCreated4 = true;
    }
  }
  toggleElement5() {
    if (this.hideStatus5) {
      this.hideStatus5 = false;
    }
    else {
      this.hideStatus5 = true;
    }
  }
  toggleElement6() {
    if (this.hideStart6) {
      this.hideStart6 = false;
    }
    else {
      this.hideStart6 = true;
    }
  }
  toggleElement7() {
    if (this.hideDue7) {
      this.hideDue7 = false;
    }
    else {
      this.hideDue7 = true;
    }
  }
  ////////////////////////////////Hide////////////////////////////////////
  hidemodel() { this.modeldisplay = false; }
  hidemodel2() { this.modeldisplay2 = false; }
  ngOnInit() {
    this.get_all_tasksnew();
    this.get_companytask_by_id();
    this.timedetail = localStorage.getItem('timezonedata');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

      allowSearchFilter: false,
    };
  }
  get_companytask_by_id() {


    this._ProjectService.get_companytask_by_id()
      .subscribe(
        res => {

          // this.Projectname = res.projects.project_name;
          this.status_list = res.task_status_list;
          // this.company_id=localStorage.getItem('company_id');
          //this.project_company_id=res.project_id;
          // this.username=res.users;
          //this._app.loading = false;
        },
        err => {
          console.log(err.error.message);
          this._app.loading = false;
          if (err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  get_all_tasksnew() {
    this._ProjectService.get_all_tasksnew()
      .subscribe(
        res => {
          this.All_tasks = res.data;
          this.All_tasks_hold = res.data;
          this.alldate = localStorage.getItem('company_dateformat');
          console.log(this.alldate);
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  enter_owner_name(id, owner_id) {
    console.log(id);
    this.give_owner_name = true;
    console.log(this.give_owner_name);
    this.taskidchange = id;
    this.taskownerid = owner_id;
    console.log(this.taskidchange);
    console.log(this.taskownerid);
  }
  get_owner_name() {
    const data = {
      // project_id :this.project_id,
      task_owner_ids: this.taskownerid,
    }
    console.log(data);
    this._ProjectService.get_company_user_for_task(data)
      .subscribe(
        res => {
          console.log(res);
          this.dropdownList = res.data;
          this.selectedItems = res.selected_users;
        },
        err => console.log(err.error.message)
      );


  }
  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(items: any) {
    console.log(items);
  }
  update_task_owner_name() {

    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.ownername = this.temparray.join(",");
    const data = {
      ownername: this.ownername,
      taskidchange: this.taskidchange,
    }
    console.log(data);
    this._ProjectService.update_task_owner_name(data)
      .subscribe(
        res => {
          console.log(res);
          this.get_all_tasksnew();

          this._app.loading = false;

        },
        err => {
          console.log(err.error.message);
        }
      );
    this.selectedItems = [];
  }

  //////////////////////////////////select data//////////////////////
  onChange(val, data) {
    this.All_tasks = data;
    if (val == 1) {
      this.All_tasks = this.All_tasks.filter(res => res.task_list_id == 1);
      console.log(this.All_tasks);
    } else if (val == 2) {
      this.All_tasks = this.All_tasks.filter(res => res.task_list_id == 2);
      console.log(this.All_tasks);
    } else {
      this.All_tasks = data;
      console.log(this.All_tasks);
    }


  }

  confirm_Change_status(id) {

    this.task_id = id;


    console.log(this.task_id);
    this.modeldisplay2 = true;
    this.applyback = true;
  }
  Change_status() {
    const data = {
      task_id: this.task_id,

    }
    console.log(data);
    this._ProjectService.update_task_statuss(data)
      .subscribe(
        res => {

          console.log(res.data);
          this.get_all_tasksnew();
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  change_status_new(task_id, status) {
    this._app.loading = true;
    const data = {
      task_id: task_id,
      status: status,
    }
    this._ProjectService.update_task_status(data)
      .subscribe(
        res => {
          this.get_all_tasksnew();
          this._app.loading = false;

          this.toastr.success('Task Status Updated', 'success');
        },
        err => {
          this.get_all_tasksnew();
          this._app.loading = false;

          console.log(err.error.message);
          this._router.navigate(["/login"]);
        }
      );
  }
  enter_start_date(id, date) {

    this.give_start_date = true;
    console.log(this.give_start_date);
    this.taskiddate = id;
    this.taskfetchdate = date;
    console.log(this.taskfetchdate);
    console.log(this.taskiddate);

  }
  update_task_start_date() {

    this.addTaskstartdate.start_date = this.datePipe.transform(this.addTaskstartdate.start_date, 'yyyy-MM-dd HH:mm:ss');
    const data = {
      startdate: this.addTaskstartdate.start_date,
      taskiddate: this.taskiddate,
    }
    console.log(data);
    this._ProjectService.update_task_start_date(data)
      .subscribe(
        res => {
          this.give_start_date = false;
          this.get_all_tasksnew();
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;

        },
        err => {
          console.log(err.error.message);
        }
      );

  }
  enter_end_date(id) {

    this.give_end_date = true;
    console.log(this.give_end_date);
    this.taskendid = id;
    console.log(this.taskendid);

  }
  update_task_end_date() {
    this.addTaskstartdate.end_date = this.datePipe.transform(this.addTaskstartdate.end_date, 'yyyy-MM-dd HH:mm:ss');

    const data = {
      enddate: this.addTaskstartdate.end_date,
      taskendid: this.taskendid,
    }
    console.log(data);
    this._ProjectService.update_task_end_date(data)
      .subscribe(
        res => {
          this.give_end_date = false;
          this.get_all_tasksnew();
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;

        },
        err => {
          console.log(err.error.message);
        }
      );

  }
  //////////////////////////select/////////////////////////////////////// 
}
