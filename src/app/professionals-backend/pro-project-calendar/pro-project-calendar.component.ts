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
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, DateTimeAdapter, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as moment from 'moment';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' },
};
@Component({
  selector: 'app-pro-project-calendar',
  templateUrl: './pro-project-calendar.component.html',
  styleUrls: ['./pro-project-calendar.component.css'],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ],


})
export class ProProjectCalendarComponent implements OnInit {
  rashmi: any;
  en: any;
  startdatetoday: any;

  alldate: any;
  calendar_show: any = 3;
  show_date_box: boolean = false;
  projectname: any;
  select_permissions: any;
  testdate: string = 'Due Date';
  testdate1: string = 'Start Date';
  testdate2: string = 'Remindar';
  meetingdate: string = 'meeting date';
  testdate4: any;
  testdate5: any;
  testdate6: any;
  meetingdate1: any;
  eventdate: string = 'start date';
  eventdate1: string = 'end date';
  eventdate2: any;
  eventdate3: any;
  dropdownList = [];
  selectedItems = [];
  temparray = []
  TasksTypes: any;
  dropdownSettings = {};
  project_id: any;
  project_company_id: any;
  company_id: any;
  project_id1: any;
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
  model_eventtype: any;
  model_eventid: any;
  model_eventstart: '';
  model_eventend: '';
  project_event_id: any;
  project_meeting_id: any;
  delete_event_id: any;
  delete_meeting_id: any;
  modeldisplaydeleteevent: any = false;
  modeldisplaydeletemeeting: any = false;
  modeldisplaydropsetting: any = false;
  taskcheck: any;
  filterdata: any;
  color_test = 'rgba(19,239,11,0.58)';
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
  public startAt = new Date(2019, 2, 15, 20, 30);
  addTaskFromData = {
    task_name: '',
    task_description: '',
    task_image_url: '',
    task_list_id: '',
    task_owner_ids: '',
    task_start_date: '',
    task_end_date: '',
    task_reminder_date: '',
    task_priority: '0',
    source_type: 'project',
    source_id: '',
    task_completion: '',
    task_work_hours: '',
    task_duration: '',
    form_task: '0',
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
    source_type: 'project',
    source_id: '',
    event_id: '',

  };

  updateEventFromData = {
    event_title: '',
    event_description: '',
    event_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    source_type: 'project',
    source_id: '',
    event_id: '',

  };

  addEventFromData = {
    event_title: '',
    event_description: '',
    event_start_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_end_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    source_type: 'project',
    source_id: '',
    form_event: '0',
  };

  addMeetingFromData = {
    meeting_name: '',
    meeting_description: '',
    attendees_email: '',
    meeting_subject: '',
    source_type: 'project',
    source_id: '',
    form_meeting: '0',
    meeting_date: this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm:ss'),
  };

  updateMeetingFromData = {
    meeting_name: '',
    meeting_description: '',
    attendees_email: '',
    meeting_subject: '',
    source_type: 'project',
    source_id: '',
    meeting_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    event_id: '',

  };



  constructor(dateTimeAdapter: DateTimeAdapter<any>, private _router: Router, private _activatedroute: ActivatedRoute,
    private _app: AppComponent, protected projecteventService: ProjecteventService,
    private _ProjectService: ProjectService, private datePipe: DatePipe, private toastr: ToastrService) {

  }
  dobSettings = {
    bigBanner: false,
    timePicker: true,
    format: 'yyyy-MM-dd hh:mm',
    defaultOpen: false,
    closeOnSelect: true,
    rangepicker: false

  }
  public uploader: FileUploader = new FileUploader({
    url: this._taskimageuploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  ngOnInit() {
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
    });
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
    this.alldate = localStorage.getItem('company_dateformat');
    this.addEventFromData.source_id = this.project_id;
    this.addMeetingFromData.source_id = this.project_id;
    this.calendarLoad();
    this.get_company_id_check();
    this.addTaskFromData.source_id = this.project_id;

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show = false;
      response = JSON.parse(response);
      this.addTaskFromData.task_image_url = response.image_name;
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      // limitSelection:100,
      allowSearchFilter: false
    };
    this.test();
    this.loadevents(this.project_id);
    this.select_permissions = localStorage.getItem('permissions');
    this._app.loading = false;

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
          this.toastr.success('New Event Added', 'success');
          this._app.loading = false;
          this.modeldisplay3 = false;
          this.applyback = false;

          this.calendarLoad();
          this.loadevents(this.project_id);

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
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
    this._app.loading = true;
    this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
          this.company_id = localStorage.getItem('company_id');
          this.project_company_id = res.project_id;
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
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
          this.toastr.success('Event Updated', 'success');
          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;

          this.calendarLoad();
          this.loadevents(this.project_id);

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
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
      eventLimit: false,
      displayEventTime: true,
      
      timezone : 'local',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.events,
      
     
      
    };
    
  }
 
  loadevents(data) {
    const filterdata = { event_project_id: data }
   
    this.projecteventService.getEvents(filterdata).subscribe(data => {

      this.events = data.projects;
      data.projects.find(function (element) {
          console.log(element.end);
       // if (element.eventtype== 1) {
       const temp_date = new Date(element.end);
         // var gh = temp_date.getHours();
          temp_date.setDate(temp_date.getDate() +1);
          element.end = temp_date;
          console.log(temp_date);
         
   
      });
    //}
    });
  }
  clickButton(model: any) {  ///alert('hello1');
    this.displayEvent = model;
  }

  dayClick(model: any) {
   // var d = model.date.format();
    model.date._ambigTime = false;
 
      //console.log(model.date.format('LT'));
    //    model.date._fullCalendar= true;
    model.date._isUTC = true;
    // console.log(model.date._isUTC);
     //.log(model);
     //console.log(moment.utc().utcOffset(new Date().getTimezoneOffset()).format('YYYY/MM/DD 00:00'));
    // console.log(moment.utc().utcOffset(model.date._d.getTimezoneOffset()).format('YYYY/MM/DD 00:00'));
    // console.log(moment.utc());
    // var date = model.date._d;
    // var mm = moment().utc( date );
    // console.log( mm.valueOf() );
    // console.log( mm.format('DD-MM-YYYY') );
    // console.log(moment.utc( model.date.format()).toDate().toUTCString());

    // console.log(moment.utc(model.date._d).toDate().toUTCString());
    // console.log(moment(model.date._d).format());
    // console.log(moment(model.date._d).format());

    if (this.select_permissions.indexOf(21) !== -1) {
      this.selectedItems = [];
      this.temparray = [];

      //  this.datePipe.transform(model.date._d, 'yyyy-MM-dd');
      //   const tomorrow = model.date._d;
      //   const tomorrowFormate =  tomorrow.setDate(tomorrow.getDate() + 1)
      //   var CurrentFormate = new Date(tomorrowFormate);


      this.addEventFromData.event_end_date = model.date.format();
      this.addEventFromData.event_start_date = model.date.format();
      this.addMeetingFromData.meeting_date = model.date.format();

      this.addTaskFromData.task_start_date = model.date.format();

      this.addTaskFromData.task_end_date = model.date.format();
      this.addTaskFromData.task_reminder_date = model.date.format();
      this.modeldisplay3 = true;
      this.modeltask = true;
      this.applyback = true;

    }
  }
  showfullmodal() {
    this.selectedItems = [];
    this.temparray = [];
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
   
    this.selectedItems = [];
    this.temparray = [];
    if (model.event.event_type == 'meetings') {
      
      this.project_meeting_id = model.event.event_id;
      const meetingfetchdata = {
        event_id: model.event.event_id,
        source_type: 'project'
      }

      this.projecteventService.get_meeting_by_id(meetingfetchdata)
        .subscribe(
          res => {
            this.updateMeetingFromData = {
              meeting_name: res.data.meeting_name,
              meeting_description: res.data.meeting_description,
              attendees_email: res.data.attendees_email,
              meeting_subject: res.data.meeting_subject,
              source_type: 'project',
              source_id: this.project_id,
              meeting_date: res.data.meeting_date,
              event_id: res.data.id,
            };
            if (res.data.meeting_date) {
              this.meetingdate1 = new Date(this.datePipe.transform(res.data.meeting_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;

            }
            console.log(res.data.meeting_date);
            console.log(this.meetingdate1);
            const data2 = {
              project_id: this.project_id,
              attendees_email: res.data.attendees_email,
            }

            this._ProjectService.get_project_user_for_meeting(data2)
              .subscribe(
                res => {
                  this.dropdownList = res.data;
                  this.selectedItems = res.selected_users;
                  //this._app.loading = false;
                },
                err => console.log(err)
              );
          },
          err => console.log(err)
        );
      this.modeldisplay = true;
      this.applyback = true;
    } else if (model.event.event_type == 'tasks') {
      const taskfetchdata = {
        event_id: model.event.event_id,
        source_type: 'project'
      }

      this.projecteventService.get_task_by_id(taskfetchdata)
        .subscribe(
          res => {
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
              source_type: 'project',
              source_id: this.project_id,
              event_id: res.data.id,
            };
            if (res.data.task_start_date != '0000-00-00 00:00:00') {

              this.testdate4 = new Date(this.datePipe.transform(res.data.task_start_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;
              this.testdate5 = new Date(this.datePipe.transform(res.data.task_end_date, 'M/d/yy, h:mm a'));

              this.testdate6 = new Date(this.datePipe.transform(res.data.task_reminder_date, 'M/d/yy, h:mm a'))
            }
            console.log(res.data.task_end_date);
              console.log(this.testdate5);
            const data3 = {
              project_id: this.project_id,
              task_owner_ids: res.data.task_owner_ids,
            }

            this._ProjectService.get_project_user_for_task(data3)
              .subscribe(
                res => {
                  this.dropdownList = res.data;
                  this.selectedItems = res.selected_users;
                  //this._app.loading = false;
                },
                err => console.log(err)
              );
          },
          err => console.log(err)
        );
      this.modeldisplay4 = true;
      this.applyback = true;
    } else if (model.event.event_type == 'events') {
      this.project_event_id = model.event.event_id;
      const eventdata = {
        event_id: model.event.event_id,
        source_type: 'project'
      }
      this.projecteventService.get_event_by_id(eventdata)
        .subscribe(
          res => {
            this.updateEventFromData = {
              event_title: res.data.event_title,
              event_description: res.data.event_description,
              event_start_date: res.data.event_start_date,
              event_end_date: res.data.event_end_date,
              source_type: 'project',
              source_id: this.project_id,
              event_id: res.data.id,
            };
            if (res.data.event_start_date ! ='0000-00-00 00:00:00') {
              this.eventdate2 = new Date(this.datePipe.transform(res.data.event_start_date, 'M/d/yy, h:mm a'));
              this.eventdate3 = new Date(this.datePipe.transform(res.data.event_end_date, 'M/d/yy, h:mm a'));
              this.show_date_box = true;

            }
          },
          err => console.log(err)
        );
      this.modeldisplay2 = true;
      this.applyback = true;
    }


  }

  delete_project_event() {
    this.modeldisplaydeleteevent = true;
    this.delete_event_id = this.project_event_id;
  }

  delete_event(deleteeventid) {
    const data = {
      event_id: deleteeventid,
    }
    this.projecteventService.delete_event(data)
      .subscribe(
        res => {
          if (res.message == 'Event Deleted Sucessfully') {
            this.modeldisplaydeleteevent = false;
            this.modeldisplay2 = false;
            this.toastr.success('Event Deleted', 'success');
            this.calendarLoad();
            this.loadevents(this.project_id);
          }
          else {
            alert('Something Went Wrong!!');
          }
        },
        err => console.log(err)
      );
  }

  delete_project_meeting() {
    this.modeldisplaydeletemeeting = true;
    this.delete_meeting_id = this.project_meeting_id;

  }

  delete_meeting(deletemeetingid) {

    const data = {
      meeting_id: deletemeetingid,
    }
    this.projecteventService.delete_meeting(data)
      .subscribe(
        res => {
          if (res.message == 'Meeting Deleted Sucessfully') {
            this.modeldisplaydeletemeeting = false;
            this.modeldisplay = false;
            this.toastr.success('Meeting Deleted', 'success');
            this.calendarLoad();
            this.loadevents(this.project_id);
          }
          else {
            alert('Something Went Wrong!!');
          }
        },
        err => console.log(err)
      );
  }

  close_delete_popup() {
    this.modeldisplaydeleteevent = false;
    this.modeldisplaydeletemeeting = false;
    this.modeldisplaydropsetting = false;
  }


  updateEvent(model: any) {
 console.log( model.event.start);
 console.log(model.event.end);
    this.modeldisplaydropsetting = true;
    this.model_eventtype = model.event.event_type;
    this.model_eventid = model.event.event_id;
    this.model_eventstart = model.event.start;
    this.model_eventend = model.event.end;

  }
  Drop_event(model: any) {
   
    if (this.model_eventtype == 'events') {

      const data = {
        event_id: this.model_eventid,
        event_start_date: this.model_eventstart,
        event_end_date: this.model_eventend,
      }

      this.projecteventService.update_event_start_by_id(data)
        .subscribe(
          res => {
            this.modeldisplaydropsetting = false;
            this.toastr.success('Event Updated', 'success');
          },
          err => console.log(err)
        );

    } else if (this.model_eventtype == 'meetings') {
      const data = {
        event_id: this.model_eventid,
        meeting_date: this.model_eventstart,
      }

      this.projecteventService.update_meeting_start_by_id(data)
        .subscribe(
          res => {
            this.modeldisplaydropsetting = false;
            this.toastr.success('Meeting Updated', 'success');
          },
          err => console.log(err)
        );
    } else if (this.model_eventtype == 'tasks') {


      const data = {
        task_id: this.model_eventid,
        task_start_date: this.model_eventstart,
        task_end_date: this.model_eventend,
      }
console.log(data);
      this.projecteventService.update_task_start_by_id(data)
        .subscribe(
          res => {
            this.modeldisplaydropsetting = false;
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
    this._ProjectService.add_new_task(this.addTaskFromData)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('New Task Added', 'success');
          this.calendarLoad();
          this.loadevents(this.project_id);
          this._app.loading = false;
          this.modeldisplay3 = false;

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
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
          this.toastr.success('New Meeting Added', 'success');
          this.calendarLoad();
          this.loadevents(this.project_id);
          this._app.loading = false;
          this.modeldisplay3 = false;

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
    this.temparray = [];
  }

  update_meeting_event() {
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
          this.loadevents(this.project_id);
          this._app.loading = false;
          this.modeldisplay = false;

        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
    this.temparray = [];
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
          this.toastr.success('Task Updated', 'success');
          this.calendarLoad();
          this.loadevents(this.project_id);
          this._app.loading = false;
          this.modeldisplay4 = false;


        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
    this.temparray = [];
  }

  test123() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
          //this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
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
      // limitSelection:100,
      allowSearchFilter: true
    };
  }

  test() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.gat_task_type(data)
      .subscribe(
        res => {
          this.TasksTypes = res.responce;
          this.projectname = res.project;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );


    this._ProjectService.get_project_user_for_meeting(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;

          //this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
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
      // limitSelection:100,
      allowSearchFilter: true
    };


  }
  onChange(data) {
    alert("Triggered" + data);
    console.log("Triggered", data);
  }
  print(): void {

    var headerElements = document.getElementsByClassName('fc-header');

    var toPrint = document.getElementById('print-section');



    var linkElements = document.getElementsByTagName('link');
    var link = '';
    for (var i = 0, length = linkElements.length; i < length; i++) {
      link = link + linkElements[i].outerHTML;
    }

    var styleElements = document.getElementsByTagName('style');
    var styles = '';
    for (var i = 0, length = styleElements.length; i < length; i++) {
      styles = styles + styleElements[i].innerHTML;

    }

    var popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write('<html><title>Schedule Preview</title>' + link
      + '<style>' + styles + '</style></head><body">')
    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write('</html>');
    popupWin.document.close();
    //popupWin.print()
    //setTimeout(popupWin.print(), 20000);


    setTimeout(function () { popupWin.print(); }, 2000);



  }


}
