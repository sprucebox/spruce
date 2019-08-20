import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ProjecteventService } from '../../services/projectevent.service';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-pro-calendar',
  templateUrl: './pro-calendar.component.html',
  styleUrls: ['./pro-calendar.component.css']
})
export class ProCalendarComponent implements OnInit {
  show_date_box: boolean = false;
  testdate: string = 'Due Date';
  testdate1: string = 'Start Date';
  testdate2: string = 'Remindar';
  meetingdate: string = 'meeting date';
  testdate4: any;
  testdate5: any;
  mayuri_checxk:any;
  testdate6: any;
  meetingdate1: any;
  eventdate: string = 'start date';
  eventdate1: string = 'end date';
  eventdate2: any;
  eventdate3: any;
  condition1: any;
  condition2: any;
  modeldisplay8: any = false;
  modeldisplay7: any = false;
  allProjects: any;
  allcheck: boolean = false;
  projects: any;
  alluser: any;
  project_id: any;
  url: '';
  calendarOptions: Options;
  displayEvent: any;
  pr_show = false;
  events = null;
  applyback = false;
  modeldisplay: any = false;
  modeldisplay2: any = false;
  modeldisplay3: any = false;
  modeldisplay4 = false;
  modeltask: any = false;
  modelmeeting: any = false;
  modelevent: any = false;
  filterdata: any;
  source_lists: any;
  source_lists2: any;
  dropdownList = [];
  selectedItems = [];
  temparray = []
  dropdownSettings = {};
  select_projects: string[] = [];
  select_users: string[] = [];
  TasksTypes: any;
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;

  addTaskFromData = {
    task_name: '',
    task_description: '',
    task_image_url: '',
    task_list_id: '',
    task_owner_ids: '',
    task_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_reminder_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_priority: '',
    source_type: '',
    source_id: '',
  };

  updateTaskFromData = {
    task_name: '',
    task_description: '',
    task_image_url: '',
    task_list_id: '',
    task_owner_ids: '',
    task_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_reminder_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    task_priority: '',
    source_type: '',
    source_id: '',
    event_id: '',
  };

  updateEventFromData = {
    event_title: '',
    event_description: '',
    event_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_id: '',
    source_type: '',
    source_id: '',
  };

  addEventFromData = {
    event_title: '',
    event_description: '',
    event_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    source_type: '',
    event_id: '',

    source_id: '',
  };

  addMeetingFromData = {
    meeting_name: '',
    attendees_email: '',
    meeting_subject: '',
    meeting_description: '',
    meeting_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'
    ),
    source_type: '',
    event_id: '',
    source_id: '',
  };

  updateMeetingFromData = {
    meeting_name: '',
    attendees_email: '',
    meeting_subject: '',
    meeting_description: '',
    meeting_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'
    ),
    event_id: '',
    source_type: '',
    source_id: '',
  };

  select_permissions: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private _router: Router, private _activatedroute: ActivatedRoute,
    private _app: AppComponent, protected projecteventService: ProjecteventService,
    private _ProjectService: ProjectService, private datePipe: DatePipe, private toastr: ToastrService) { }
  dobSettings = {
    bigBanner: false,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm a',
    defaultOpen: false,
    closeOnSelect: true,
    rangepicker: false

  }
  public uploader: FileUploader = new FileUploader({
    url: this._taskimageuploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  ngOnInit() {
    this.mayuri_checxk=false;
    this.select_permissions = localStorage.getItem('permissions');
    this.calendarLoad();
    //this.loadevents();
    this.get_all_projects();
    this.get_all_company_user();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show = false;
      response = JSON.parse(response);
      this.addTaskFromData.task_image_url = response.image_name;
      console.log(response);
    };
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
    this.showmodel1();
  }

  onDateSelect(date: any) {
    console.log(date);
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
  add_new_event() { // console.log('hello');
    this._app.loading = true;
    this.addEventFromData.event_start_date = this.datePipe.transform(this.addEventFromData.event_start_date, 'yyyy-MM-dd HH:mm:ss');
    this.addEventFromData.event_end_date = this.datePipe.transform(this.addEventFromData.event_end_date, 'yyyy-MM-dd HH:mm:ss');
    this.projecteventService.save_project_event(this.addEventFromData)
      .subscribe(
        res => {
          console.log(res);
          this.project_id=res.data.source_id;
          this._app.loading = false;
          this.modeldisplay3 = false;
          this.applyback = false;
          this.toastr.success('New Event Added', 'success');
          this.calendarLoad();
          this.onselectproject(this.project_id, true);

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

  update_project_event() {
    this._app.loading = true;
    console.log(this.updateEventFromData);
    if (this.show_date_box) {

      this.updateEventFromData.event_start_date = this.datePipe.transform(this.eventdate2, 'yyyy-MM-dd HH:mm:ss');
      this.updateEventFromData.event_end_date = this.datePipe.transform(this.eventdate3, 'yyyy-MM-dd HH:mm:ss');
    } else {
      this.updateEventFromData.event_start_date = this.datePipe.transform(this.updateEventFromData.event_start_date, 'yyyy-MM-dd HH:mm:ss');
      this.updateEventFromData.event_end_date = this.datePipe.transform(this.updateEventFromData.event_end_date, 'yyyy-MM-dd HH:mm:ss');
    }


    this.projecteventService.update_project_event(this.updateEventFromData)
      .subscribe(
        res => {
          console.log(res);
          // this.get_all_task();
          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;
          this.toastr.success('Event Updated', 'success');
          this.calendarLoad();
          this.loadevents();

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

  get_all_company_user() {

    this._ProjectService.get_all_company_user()
      .subscribe(
        res => {
          this.alluser = res.data;
          console.log(res);
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


  calendarLoad() {
    this.calendarOptions = {
      editable: true,
      eventLimit: 3,
      displayEventTime: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.events,

    };
  }
  on_select(id) {
    const filterdata1 = { projectid: id }
    //  this.projecteventService.getEvents()
    this.projecteventService.getEventdata(filterdata1).subscribe(data => {
      this.events = data.projects;
      console.log('yash');
      data.projects.find(function (element) {
        console.log(new Date(element.end));
        //temp_date.setDate(temp_date.getDate() + 1);
        //element.end = temp_date;
      });
      console.log(data.projects);
    });
  }



  loadevents() {
    //const filterdata={event_project_id:data}
    //  this.projecteventService.getEvents()
    this.projecteventService.getUserEvents().subscribe(data => {
      this.events = data.projects;
      data.projects.find(function (element) {
        const temp_date = new Date(element.end);
        temp_date.setDate(temp_date.getDate() + 1);
        element.end = temp_date;
      });
      console.log(data.projects);
    });
  }
  clickButton(model: any) {  ///alert('hello1');
    this.displayEvent = model;
  }
  dayClick(model: any) {
    model.date._ambigTime = false;
    model.date._isUTC = true;
    if (this.select_permissions.indexOf(6) !== -1) {
      this.addEventFromData.event_start_date = model.date.format(),
        this.addEventFromData.event_end_date = model.date.format(),
        this.addMeetingFromData.meeting_date = model.date.format(),
        this.addTaskFromData.task_start_date = model.date.format(),
        this.addTaskFromData.task_end_date = model.date.format(),
        this.addTaskFromData.task_reminder_date = model.date.format(),
        this.modeldisplay3 = true;
      this.modeltask = true;
      this.applyback = true;
    }
  }
  showfullmodal() {
    this.selectedItems = [];
    this.dropdownList = [];
    this.modeldisplay3 = true;
    this.modeltask = true;
    this.applyback = true;
  }

  clickonradio(type) {
    if (type == 'task') {
      this.modeltask = true;
      this.modelmeeting = false;
      this.modelevent = false;
    } else if (type == 'meeting') {
      this.modeltask = false;
      this.modelmeeting = true;
      this.modelevent = false;
    } else if (type == 'event') {
      this.modeltask = false;
      this.modelmeeting = false;
      this.modelevent = true;
    }
  }

  eventClick(model: any) {

    console.log(model);
    if (model.event.event_type == 'meetings') {
      console.log('this is meetings');
      const meetingfetchdata = {
        event_id: model.event.event_id,
        source_type: 'project'
      }

      console.log(meetingfetchdata);
      this.projecteventService.get_meeting_by_id(meetingfetchdata)
        .subscribe(

          res => {
            this.updateMeetingFromData.source_type = res.data.source_type;
            this.get_source_list_meeting('update');
            this.updateMeetingFromData = {
              meeting_name: res.data.meeting_name,
              attendees_email: res.data.attendees_email,
              meeting_subject: res.data.meeting_subject,
              meeting_description: res.data.meeting_description,
              meeting_date: res.data.meeting_date,
              event_id: res.data.id,
              source_type: 'project',
              source_id: res.data.source_id,
            };
            if (res.data.meeting_date) {
              this.meetingdate1 = new Date(this.datePipe.transform(res.data.meeting_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;

            }
            const data2 = {
              project_id: res.data.source_id,
              attendees_email: res.data.attendees_email,
            }

            this._ProjectService.get_project_user_for_meeting(data2)
              .subscribe(
                res => {
                  this.dropdownList = res.data;
                  this.selectedItems = res.selected_users;
                  console.log(this.dropdownList);
                  console.log(res.selected_users);
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
            this._ProjectService.get_project_user_for_meeting1()
              .subscribe(
                res => {
                  this.dropdownList = res.data;

                  //this._app.loading = false;
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


            this.dropdownSettings = {
              singleSelection: false,
              idField: 'user_id',
              textField: 'user_name',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 3,
              allowSearchFilter: true
            };


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


      this.modeldisplay = true;
      this.applyback = true;
    }
    else if (model.event.event_type == 'tasks') {

      const taskfetchdata = {
        event_id: model.event.event_id

      }

      this.projecteventService.get_task_by_id(taskfetchdata)
        .subscribe(
          res => {
            this.updateTaskFromData.source_type = res.data.source_type;
            this.get_source_list('update');


            this.updateTaskFromData = {
              task_name: res.data.task_name,
              task_description: res.data.task_description,
              task_image_url: res.data.task_image_url,
              task_list_id: res.data.task_list_id,
              task_owner_ids: res.data.task_owner_ids,
              task_start_date: res.data.task_start_date,
              task_end_date: res.data.task_end_date,
              task_reminder_date: res.data.task_reminder_date,
              task_priority: res.data.task_priority,
              source_type: res.data.source_type,
              source_id: res.data.source_id,
              event_id: res.data.id,
            };
            if (res.data.task_start_date) {
              this.testdate4 = new Date(this.datePipe.transform(res.data.task_start_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;
              this.testdate5 = new Date(this.datePipe.transform(res.data.task_end_date, 'M/d/yy, h:mm a'));
              this.testdate6 = new Date(this.datePipe.transform(res.data.task_reminder_date, 'M/d/yy, h:mm a'));
            }
            const data3 = {
              project_id: res.data.source_id,
              task_owner_ids: res.data.task_owner_ids,
            }
            this.selectedItems = [];
            this._ProjectService.get_project_user_for_task(data3)
              .subscribe(
                res => {
                  this.dropdownList = res.data;
                  this.selectedItems = res.selected_users;

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

            const data = {
              project_id: res.data.source_id
            }
            this._ProjectService.gat_task_type(data)
              .subscribe(
                res => {
                  this.TasksTypes = res.responce;
                },
                err => console.log(err)
              );
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


      this.modeldisplay4 = true;
      this.applyback = true;
    } else if (model.event.event_type == 'events') {
      console.log('this is events');
      const eventdata = {
        event_id: model.event.event_id,
        source_type: 'project'
      }
      console.log(eventdata);
      this.projecteventService.get_event_by_id(eventdata)
        .subscribe(
          res => {
            this.updateEventFromData.source_type = res.data.source_type;
            this.get_source_list_event('update');
            console.log(res);
            this.updateEventFromData = {
              event_title: res.data.event_title,
              event_description: res.data.event_description,
              event_start_date: res.data.event_start_date,
              event_end_date: res.data.event_end_date,
              event_id: res.data.id,
              source_id: res.data.source_id,
              source_type: 'project',
            };
            if (res.data.event_start_date) {
              this.eventdate2 = new Date(this.datePipe.transform(res.data.event_start_date, 'M/d/yy, h:mm a'));
              this.eventdate3 = new Date(this.datePipe.transform(res.data.event_end_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;

            }
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
      this.modeldisplay2 = true;
      this.applyback = true;
    }


  }


  updateEvent(model: any) {
    if (model.event.event_type == 'events') {
      console.log(model.event.event_id);
      const data = {
        event_id: model.event.event_id,
        event_start_date: model.event.start,
        event_end_date: model.event.end,
      }

      this.projecteventService.update_event_start_by_id(data)
        .subscribe(
          res => {
            this.toastr.success('Event Updated', 'success');
          },
          err => console.log(err)
        );

    } else if (model.event.event_type == 'meetings') {
      const data = {
        event_id: model.event.event_id,
        meeting_date: model.event.start,
      }

      this.projecteventService.update_meeting_start_by_id(data)
        .subscribe(
          res => {
            this.toastr.success('Meeting Updated', 'success');
          },
          err => console.log(err)
        );
    } else if (model.event.event_type == 'tasks') {

      const data = {
        task_id: model.event.event_id,
        task_start_date: model.event.start,
        task_end_date: model.event.end,
      }

      this.projecteventService.update_task_start_by_id(data)
        .subscribe(
          res => {
            this.toastr.success('Task Updated', 'success');
          },
          err => console.log(err)
        );
    }
  }

  hidemodel() { this.modeldisplay = false; }
  hidemodel2() { this.modeldisplay2 = false; }
  hidemodel3() {
  this.modeldisplay3 = false; this.modeltask = true;
    this.modelmeeting = false;
    this.modelevent = false;
  }
  hidemodel4() { this.modeldisplay4 = false; }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        let target: any = event.target;
        this.url = target.result;
      }
      this.uploader.uploadAll();
    }
    this.addTaskFromData.source_id = this.project_id;
    this.addMeetingFromData.source_id = this.project_id;
    this.addEventFromData.source_id = this.project_id;

  }
  add_new_task() {
    this._app.loading = true;
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
 
    this.addTaskFromData.task_owner_ids = this.temparray.join(",");
    this.addTaskFromData.task_start_date = this.datePipe.transform(this.addTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_end_date = this.datePipe.transform(this.addTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_reminder_date = this.datePipe.transform(this.addTaskFromData.task_reminder_date, 'yyyy-MM-dd HH:mm:ss');
    console.log(this.addTaskFromData);
    this._ProjectService.add_new_task(this.addTaskFromData)
      .subscribe(
        res => {
          console.log(res.task.source_id);
          this.project_id=res.task.source_id;
          
          console.log(this.project_id);
          this.toastr.success('Add New Task', 'success');
          this.calendarLoad();
         this.mayuri_checxk = this.project_id;
          this.onselectproject(this.project_id, true);
          this._app.loading = false;
          this.modeldisplay3 = false;

        },
        err => console.log(err)
      );
    this.selectedItems = [];
    this.temparray = [];

  }
  add_new_meeting() {
    this._app.loading = true;
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.addMeetingFromData.attendees_email = this.temparray.join(",");
    this.addMeetingFromData.meeting_date = this.datePipe.transform(this.addMeetingFromData.meeting_date, 'yyyy-MM-dd HH:mm:ss');
    this._ProjectService.add_new_meeting(this.addMeetingFromData)
      .subscribe(
        res => {
          console.log(res);
          this.project_id=res.meeting.source_id;
          this.toastr.success('Add New Meeting', 'success');
          this.calendarLoad();
          this.onselectproject(this.project_id, true);
          this._app.loading = false;
          this.modeldisplay3 = false;

        },
        err => console.log(err)
      );
    this.selectedItems = [];
    this.temparray = [];
  }

  update_meeting_event() {
    console.log(this.updateMeetingFromData);
    this._app.loading = true;
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.updateMeetingFromData.attendees_email = this.temparray.join(",");
    if (this.show_date_box) {

      this.updateMeetingFromData.meeting_date = this.datePipe.transform(this.meetingdate1, 'yyyy-MM-dd HH:mm:ss');
    } else {
      this.updateMeetingFromData.meeting_date = this.datePipe.transform(this.updateMeetingFromData.meeting_date, 'yyyy-MM-dd HH:mm:ss');
    }

    this._ProjectService.update_meeting(this.updateMeetingFromData)
      .subscribe(
        res => {
          this.toastr.success('Meeting Updated', 'success');
          this.calendarLoad();
          this.loadevents();
          this._app.loading = false;
          this.modeldisplay = false;

        },
        err => console.log(err)
      );
    this.selectedItems = [];
    this.temparray = [];
  }

  get_source_list(type) {
    if (type == 'add') {
      const data = {
        source_type: this.addTaskFromData.source_type,

      }

      this._ProjectService.get_source_list(data)
        .subscribe(
          res => {
            this.addTaskFromData.source_id = '';
            this.source_lists = res.data;
          },
          err => console.log(err)
        );
    } else {
      const data = {
        source_type: this.updateTaskFromData.source_type,
      }
      this._ProjectService.get_source_list(data)
        .subscribe(
          res => {
            //this.updateTaskFromData.source_id = '';
            this.source_lists2 = res.data;
          },
          err => console.log(err)
        );
    }
  }
  get_source_list_event(type) {
    if (type == 'add') {
      const data = {
        source_type: this.addEventFromData.source_type,

      }

      this._ProjectService.get_source_list_event(data)
        .subscribe(
          res => {
            this.addTaskFromData.source_id = '';
            this.source_lists = res.data;
          },
          err => console.log(err)
        );
    } else {
      const data = {
        source_type: this.updateEventFromData.source_type,
      }
      this._ProjectService.get_source_list_event(data)
        .subscribe(
          res => {
            this.updateTaskFromData.source_id = '';
            this.source_lists2 = res.data;
          },
          err => console.log(err)
        );
    }
  }
  get_source_list_meeting(type) {
    if (type == 'add') {
      const data = {
        source_type: this.addMeetingFromData.source_type,

      }

      this._ProjectService.get_source_list_meeting(data)
        .subscribe(

          res => {
            this.addTaskFromData.source_id = '';
            this.source_lists = res.data;
            console.log(this.source_lists);
          },
          err => console.log(err)
        );
    } else {
      const data = {
        source_type: this.updateMeetingFromData.source_type,
      }
      this._ProjectService.get_source_list_meeting(data)
        .subscribe(
          res => {
            this.updateTaskFromData.source_id = '';
            this.source_lists2 = res.data;
            console.log(this.source_lists2);
          },
          err => console.log(err)
        );
    }
  }
  on_project_select(project_id) {
    const data = {
      project_id: project_id
    }

    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
          //this._app.loading = false;
        },
        err => console.log(err)
      );
    this._ProjectService.gat_task_type(data)
      .subscribe(
        res => {
          this.TasksTypes = res.responce;
        },
        err => console.log(err)
      );
  }
  get_all_projects() {
    console.log("mayuri");
    this._ProjectService.get_all_project_for_calender()
      .subscribe(
        res => {

          console.log("mayuri");
          console.log(res.projects);
          this.allProjects = res.projects;
          //this._app.loading = false;
        },
        err => console.log(err)
      );
  }
  update_task_event() {

    this._app.loading = true;
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.updateTaskFromData.task_owner_ids = this.temparray.join(",");
    if (this.show_date_box) {
      this.updateTaskFromData.task_start_date = this.datePipe.transform(this.testdate4, 'yyyy-MM-dd HH:mm:ss');
      this.updateTaskFromData.task_end_date = this.datePipe.transform(this.testdate5, 'yyyy-MM-dd HH:mm:ss');
      this.updateTaskFromData.task_reminder_date = this.datePipe.transform(this.testdate6, 'yyyy-MM-dd HH:mm:ss');
    } else {
      this.updateTaskFromData.task_start_date = this.datePipe.transform(this.updateTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
      this.updateTaskFromData.task_end_date = this.datePipe.transform(this.updateTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
      this.updateTaskFromData.task_reminder_date = this.datePipe.transform(this.updateTaskFromData.task_reminder_date, 'yyyy-MM-dd HH:mm:ss');
    }


    this._ProjectService.update_task(this.updateTaskFromData)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Task Updated', 'success');
          this.calendarLoad();
          this.loadevents();
          this._app.loading = false;
          this.modeldisplay4 = false;

        },
        err => console.log(err)
      );
    this.selectedItems = [];
    this.temparray = [];
  }
  showmodel1() {
    this.modeldisplay8 = true;
    this.modeldisplay7 = false;
    this.applyback = true;
    this.condition1 = true;
    this.condition2 = false;
  }
  showmodel2() {
    this.modeldisplay7 = true;
    this.modeldisplay8 = false;
    this.applyback = true;
    this.condition2 = true;
    this.condition1 = false;
  }
  onselectproject(projectid: string, isChecked: boolean) {
    console.log(this.select_projects);
    this._app.loading = true;
    if (isChecked) {
      this.select_projects.push(projectid);
      if (this.select_projects.length == this.allProjects.length) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
    } else {
      this.select_projects.splice(this.select_projects.indexOf(projectid), 1);
      this.allcheck = false;
    }
    const data = { project_ids: this.select_projects };
    console.log(this.select_projects);

    this.projecteventService.getEventdata(data).subscribe(res => {
      this.events = res.projects;
      this._app.loading = false;
      console.log('yash');
      res.projects.find(function (element) {
        const temp_date = new Date(element.end);
        temp_date.setDate(temp_date.getDate() + 1);
        element.end = temp_date;
        console.log(element.className);
      
      });
      
      console.log(res.projects);
    });
  }

  on_selectuser(projectid: string, isChecked: boolean) {
    this._app.loading = true;
    if (isChecked) {
      this.select_users.push(projectid);

    } else {
      this.select_users.splice(this.select_users.indexOf(projectid), 1);

    }
    const userdata = { userids: this.select_users }

    console.log(userdata);
    this.projecteventService.getUserEventdata(userdata).subscribe(data => {
      this.events = data.projects;
      this._app.loading = false;
      console.log(data.projects);
    });

  }
  test() {

    this._ProjectService.get_project_user_for_meeting1()
      .subscribe(
        res => {
          this.dropdownList = res.data;

          //this._app.loading = false;
        },
        err => console.log(err)
      );


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }
  
  //print(): void {
	
    //var headerElements = document.getElementsByClassName('fc-header');

	//.style.display = 'none';
  // for(var i = 0, length = headerElements.length; i < length; i++) {
    // headerElements[i].style.display = 'none';
  // }
  //var toPrint = document.getElementById('print-section');

  // for(var i = 0, length = headerElements.length; i < length; i++) {
        // headerElements[i].style.display = '';
  // }

//   var linkElements = document.getElementsByTagName('link');
//   var link = '';
//   for(var i = 0, length = linkElements.length; i < length; i++) {
//     link = link + linkElements[i].outerHTML;
//   }

//   var styleElements = document.getElementsByTagName('style');
//   var styles = '';
//   for(var i = 0, length = styleElements.length; i < length; i++) {
//     styles = styles + styleElements[i].innerHTML;

//    }

//   var popupWin = window.open('', '_blank');
//   popupWin.document.open();
//   popupWin.document.write('<html><title>Schedule Preview</title>'+link
//  +'<style>'+styles+'</style></head><body">')
//   popupWin.document.write(toPrint.innerHTML);
//   popupWin.document.write('</html>');
//   popupWin.document.close();

//   setTimeout(popupWin.print(), 20000);
	

	
// }
}
