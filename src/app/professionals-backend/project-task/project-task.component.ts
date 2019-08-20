import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css'],

})
export class ProjectTaskComponent implements OnInit {

  ///moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  ///////

  // movies = [
  // 'Episode I - The Phantom Menace',
  // 'Episode II - Attack of the Clones',
  // 'Episode III - Revenge of the Sith',
  // 'Episode IV - A New Hope',
  // 'Episode V - The Empire Strikes Back',
  // 'Episode VI - Return of the Jedi',
  // 'Episode VII - The Force Awakens',
  // 'Episode VIII - The Last Jedi'
  // ];

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(event.previousIndex, event.currentIndex);
  //   alert(55555);
  // }

  /////////////hide//////////

  @ViewChild('divClick') divClick: ElementRef;
  @ViewChild('divClickT') divClickT: ElementRef;
  @ViewChild('inputFile') myInputVariable: ElementRef;


  class_task: any;
  newListItem: any;
  class_list: any;
  start: any;
  modeldisplay: boolean = false;
  modeldisplaytitle: boolean = false;
  pressed: any;
  startX: any;
  startWidth: any;
  isHidden: boolean = false;
  task_with_status: any;
  task_update_id: any;
  status_type: any;
  taskownerid: any;
  Tasksnames: any;
  min_width1: any;
  min_width2: any;
  min_width3: any;
  min_width4: any;
  min_width5: any;
  min_width6: any;
  min_width7: any;
  mayuritaskheadid: any;

  startdate: any;
  Priority_type: any;
  temp_start_date: Date = new Date();
  temp_due_date: Date = new Date();
  temp_reminder_date: Date = new Date();
  task_type: any;
  ownername: any;
  taskendid: any;
  select_permissions: any;
  //////////////hide//////////////////
  alldatetask: any;
  taskidchange: any;
  give_owner_name: boolean = false;
  taskfetchdate: any;
  give_start_date: boolean = false;
  give_end_date: boolean = false;
  enddate: any;

  project_title_sorting_popup = false;
  hideModal: boolean = false;

  delete_task_id: any;
  contentEditable: any;
  dateEditable: any;
  BAG = "VAMPIRES";
  BAG1 = "VAMPIRE";
  BAG2 = "VAMPIRESS";
  task_title_list: any;
  isDisabled = false;
  username: any;
  searchText: string;
  subs = new Subscription();
  task_id: any;
  // hideModal: boolean = false;
  delete_title_id: any;
  modeldisplay2: any = false;
  modeldisplay3: any = false;
  modeldisplay4: any = false;
  applyback: any = false;
  showfilterbox: boolean = false;
  show_task_owner: boolean = true;
  buttonDisabled: boolean = true;
  //IsChecked:boolean=false;
  statusfilterarray: string[] = [];
  priorityfilterarray: string[] = [];
  private master_array_for_filter: any;
  task_status: any;
  mayuri_in: any;
  showlist: any = true;
  showgrid: any = false;
  open_tasks: any;
  close_tasks: any;
  show_task_name: boolean = true;
  pending_tasks: any;
  datas: any;
  checkboxValue: any;
  details: any;
  project_userrole: any;
  applicables: any;
  get_list_id: any;
  dropdownList = [];
  selectedItems = [];
  temparray = []
  dropdownSettings = {};
  private _taskimageuploadUrl = `${environment.api}/upload_new_task_image`;
  TasksTypes: any;
  allTasks: any;
  timedetail: any;
  tasknames: any;
  timezonedata: any;
  template_task_id: any;
  role: any;
  allPublicTasks: any;
  project_id: any;
  project_company_id: any;
  company_id: any;
  project_id1: any;
  Projectname: any;
  task_image_name: '';
  pr_show = false;
  url: '';
  status_list: any;
  taskiddate: any;
  current_page: string;
  addTaskFromData = {
    template_task_id: '',
    task_name: '',
    task_description: '',
    task_image_url: '',
    task_list_id: '1',
    task_owner_ids: '',
    task_start_date: '',
    task_end_date: '',
    task_reminder_date: '',
    task_priority: '',
    is_private: false,
    hide_time: '',
    source_type: 'project',
    source_id: '',
    form_task: '1',
  };

  addTaskstartdate = {
    start_date: '',
    end_date: '',

  };
  addTaskTypeFromData = {
    task_list_name: '',
    task_type_id: '1',
    project_id: '',
  };
  editTaskTitleFormData = {
    task_list_name: '',
    task_list_id: '',
    task_type_id: '',
    project_id: '',
  }
  constructor(public renderer: Renderer, private _router: Router, private _activatedroute: ActivatedRoute, private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService: ProjectService, private dragulaService: DragulaService, private toastr: ToastrService) {

    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG)
      .subscribe(({ name, el, source, target }) => {
        this.addClass(el, 'ex-moved');

        var id = el.getElementsByTagName("p")[0].getAttribute("id");

        var current_status = target.getAttribute("id");
        var thid = '';
        this.change_status(id, current_status, thid);

      })
    );
    this.subs.add(dragulaService.over(this.BAG)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG1)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG1)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG1)
      .subscribe(({ name, el, source, target }) => {
        this.addClass(el, 'ex-moved');

        var id1 = el.getElementsByTagName("a")[0].getAttribute("id");

        var current_status1 = target.getAttribute("id");
        //console.log('project task id');
        //console.log(current_status1);
        this.update_task_status(id1, current_status1);

      })
    );
    this.subs.add(dragulaService.over(this.BAG1)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG1)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
    this.subs.add(this.subs.add(this.dragulaService.drag(this.BAG2)
      .subscribe(({ name, el, source }) => {
        this.removeClass(el, 'ex-moved');
      })
    ));

    this.subs.add(dragulaService.drop(this.BAG2)
      .subscribe(({ el }) => {
        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(this.dragulaService.drop(this.BAG2)
      .subscribe(({ name, el, source, target }) => {

        this.addClass(el, 'ex-moved');

        var id2 = el.getElementsByTagName("td")[0].getAttribute("id");

        if (id2) {

          var ids = [];

          var pos = 1;
          $('#tableId tr td').each(function () {

            var $td = $(this);

            var id = $td.attr("id");
            ids.push({ 'id': id, 'position': pos });


            pos++;

          });
          this.task_update_id = ids;
          this.buttonDisabled = false;
        }
        else {
          console.log("2");
          this.buttonDisabled = true;
        }

        //console.log(this.task_update_id);
        // this.create_task_title_new(ids);
        // var current_status2 = target.getAttribute("id");
        // //console.log(current_status2);
        // this.update_task_status(id1,current_status1);

      })
    );
    this.subs.add(dragulaService.over(this.BAG2)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.BAG2)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }
  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }


  // dobSettings = {
  // bigBanner: false,
  // timePicker: true,
  // format: 'dd-MM-yyyy hh:mm',
  // defaultOpen: false,
  // closeOnSelect: true,
  // rangepicker: false

  // }


  public uploader: FileUploader = new FileUploader({
    url: this._taskimageuploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  ngOnInit() {
    var $: any;
    this.class_task = " ";
    this.mayuri_in = " ";
    this.mayuritaskheadid = 0;
    this.class_list = "activelink";
    this.modeldisplay = false;
    this.columnFixMinWidth();
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
    });
    this.selectedItems = [];
    this.addTaskFromData.source_id = this.project_id;
    this.addTaskTypeFromData.project_id = this.project_id;
    this.get_project_by_id();
    this.get_all_task();
    this.get_company_id_check();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show = false;
      response = JSON.parse(response);
      this.addTaskFromData.task_image_url = response.image_name;

    };
    //localStorage.setItem('fullPickerInput', 'D/M/YYYY hh:mm A');
    this.select_permissions = localStorage.getItem('permissions');
    if (this.select_permissions.indexOf(28) !== -1) {
      this.get_all_task();
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

      allowSearchFilter: false,
    };

    //this.get_all_task_with_dynamic_status_name();
    this._app.loading = false;
    // MY_CUSTOM_FORMATS.fullPickerInput='YYYY/M/D hh:mm A';
  }

  ngAfterViewInit() {
    // loading templates js after dom render
    $(document).click(function (event) {
      //hide all our dropdowns

      if ($(event.target).hasClass('select_status')) {

      } else {
        $('.dropdown-menu[data-parent]').hide();
      }
      //$('.dropdown-menu[data-parent]').hide();

    });
    $(document).on('click', '.table-responsive [data-toggle="dropdown"]', function () {
      // if the button is inside a modal


      var buttonGroup = $(this).parent();
      if (!buttonGroup.attr('data-attachedUl')) {
        var ts = +new Date;
        var ul = $(this).siblings('ul');
        ul.attr('data-parent', ts);
        buttonGroup.attr('data-attachedUl', ts);
        $(window).resize(function () {
          ul.css('display', 'none').data('top');
        });
      } else {
        ul = $('[data-parent=' + buttonGroup.attr('data-attachedUl') + ']');
      }
      if (!buttonGroup.hasClass('open')) {
        ul.css('display', 'none');
        return;
      }
      dropDownFixPosition($(this).parent(), ul);
      function dropDownFixPosition(button, dropdown) {
        var dropDownTop = button.offset().top + button.outerHeight();
        dropdown.css('top', dropDownTop + "px");
        dropdown.css('left', button.offset().left + "px");
        dropdown.css('position', "absolute");

        dropdown.css('width', dropdown.width());
        dropdown.css('heigt', dropdown.height());
        dropdown.css('display', 'block');
        dropdown.appendTo('body');
      }
    });
  }
  //////////////////////////////hide data code//////////////////////////////////
  private hideTask1: boolean = false;
  private hideOwner2: boolean = false;
  private hideStatus3: boolean = false;
  private hidePriority4: boolean = false;
  private hideStart5: boolean = false;
  private hideDue6: boolean = false;
  private hideDescription7: boolean = false;
  private hideaction8: boolean = false;
  private hidetasklist: boolean = false;
  public hideprintbutton: boolean = false;
  toggleElement1() {
    if (this.hideTask1) {
      this.hideTask1 = false;
    }
    else {
      this.hideTask1 = true;
    }
  }
  toggleElement2() {
    if (this.hideOwner2) {
      this.hideOwner2 = false;
    }

    else {
      this.hideOwner2 = true;
    }
  }

  toggleElement3() {
    if (this.hideStatus3) {
      this.hideStatus3 = false;
    }
    else {
      this.hideStatus3 = true;
    }
  }
  toggleElement4() {
    if (this.hidePriority4) {
      this.hidePriority4 = false;
    }
    else {
      this.hidePriority4 = true;
    }
  }
  toggleElement5() {
    if (this.hideStart5) {
      this.hideStart5 = false;
    }
    else {
      this.hideStart5 = true;
    }
  }
  toggleElement6() {
    if (this.hideDue6) {
      this.hideDue6 = false;
    }
    else {
      this.hideDue6 = true;
    }
  }
  toggleElement7() {
    if (this.hideDescription7) {
      this.hideDescription7 = false;
    }
    else {
      this.hideDescription7 = true;
    }
  }

  toggleElement8() {
    if (this.hideaction8) {
      this.hideaction8 = false;
    }
    else {
      this.hideaction8 = true;
    }
  }
  toggleElement15(i) {
    console.log(i);
    if (this.hidetasklist[i]) {
      this.hidetasklist[i] = false;
    }
    else {
      this.hidetasklist[i] = true;
    }
  }
  columnFixMinWidth() {
    if (localStorage.getItem('width1')) {
      this.min_width1 = localStorage.getItem('width1') + 'px';
    } else {
      this.min_width1 = '0px';
    }
    if (localStorage.getItem('width2')) {
      this.min_width2 = localStorage.getItem('width2') + 'px';
    } else {
      this.min_width2 = '0px';
    }
    if (localStorage.getItem('width3')) {
      this.min_width3 = localStorage.getItem('width3') + 'px';
    } else {
      this.min_width3 = '0px';
    }
    if (localStorage.getItem('width4')) {
      this.min_width4 = localStorage.getItem('width4') + 'px';
    } else {
      this.min_width4 = '0px';
    }
    if (localStorage.getItem('width5')) {
      this.min_width5 = localStorage.getItem('width5') + 'px';
    } else {
      this.min_width5 = '0px';
    }
    if (localStorage.getItem('width6')) {
      this.min_width6 = localStorage.getItem('width6') + 'px';
    } else {
      this.min_width6 = '0px';
    }
    if (localStorage.getItem('width7')) {
      this.min_width7 = localStorage.getItem('width7') + 'px';
    } else {
      this.min_width7 = '0px';
    }
  }
  ///////////////////////////////////////hide data///////////////////////////////////

  triggerSomeEvent(event: any) {
    ////console.log(event);
    if (event.target.checked) {
      this.contentEditable = true;
      this.addTaskFromData.is_private = this.contentEditable;
      //console.log(this.addTaskFromData.is_private);
    }

    else {
      this.contentEditable = false;
      this.addTaskFromData.is_private = this.contentEditable;
      //console.log(this.addTaskFromData.is_private);
    }
    this.selectedItems = this.username;
    this.isDisabled = !this.isDisabled;

    return;
  }
  checkValue(event: any) {

    this.addTaskFromData.hide_time = event;

    //console.log(this.addTaskFromData.hide_time);
  }
  datetriggerEvent(event: any) {
    ////console.log(event);
    if (event.target.checked) {
      this.dateEditable = true;
      this.addTaskFromData.hide_time = event;
      console.log(this.addTaskFromData.hide_time);
    }

    else {
      this.dateEditable = false;
      this.addTaskFromData.hide_time = event;
      console.log(this.addTaskFromData.hide_time);

    }


    return;
  }
  get_open_task(status) {
    const data = { status: status, project_id: this.project_id }
    this._ProjectService.get_all_task_by_status(data).subscribe(res => {

      this.open_tasks = res.data;
    },

      err => {
        this._app.loading = false;
        //console.log(err.error.message);
        if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
          localStorage.clear();
          //  this._app.loading = false;
          this._router.navigate(["/login"]);
        } else {
          alert('Something Went Wrong!!');
        }
      }
    );

  }
  get_close_task(status) {
    const data = { status: status, project_id: this.project_id }
    this._ProjectService.get_all_task_by_status(data).subscribe(res => {

      this.close_tasks = res.data;
    },
      err => {
        this._app.loading = false;
        //console.log(err.error.message);
        if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
          localStorage.clear();
          //  this._app.loading = false;
          this._router.navigate(["/login"]);
        } else {
          alert('Something Went Wrong!!');
        }
      }
    );

  }
  get_pending_task(status) {
    const data = { status: status, project_id: this.project_id }
    this._ProjectService.get_all_task_by_status(data).subscribe(res => {

      this.pending_tasks = res.data;
    },
      err => {
        this._app.loading = false;
        //console.log(err.error.message);
        if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
          localStorage.clear();
          //  this._app.loading = false;
          this._router.navigate(["/login"]);
        } else {
          alert('Something Went Wrong!!');
        }
      }
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
  get_project_by_id() {
    this._app.loading = true;
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_project_by_id(data)
      .subscribe(
        res => {

          this.Projectname = res.projects.project_name;
          this.status_list = res.task_status_list;
          // this.company_id=localStorage.getItem('company_id');
          //this.project_company_id=res.project_id;
          this.username = res.users;
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }




  get_all_task_with_dynamic_status_name() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_all_task_with_dynamic_status_name(data).subscribe(res => {
      this.task_with_status = res.all_task_array;
      //this.pending_tasks =res.data;
    },
      err => {
        this._app.loading = false;
        //console.log(err.error.message);
        if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
          localStorage.clear();
          //  this._app.loading = false;
          this._router.navigate(["/login"]);
        } else {
          alert('Something Went Wrong!!');
        }
      }
    );
  }

  get_company_id_check() {
    this._app.loading = true;
    const data = {
      project_id1: this.project_id
    }
    this._app.loading = true;
    this._ProjectService.get_company_id_check(data)
      .subscribe(
        res => {
          this.company_id = localStorage.getItem('company_id');
          this.project_company_id = res.project_id;
          this.project_userrole = res.userrole;
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  enter_owner_name(id, owner_id, thid) {
    this.give_owner_name = true;
    this.taskidchange = id;
    this.taskownerid = owner_id;
    this.mayuritaskheadid = thid;
    this.selectedItems=[];
  }
  enter_start_date(id, date, thid) {
    this.give_start_date = true;
    this.taskiddate = id;
    this.taskfetchdate = date;
    this.mayuritaskheadid = thid;
  }

  update_task_start_date(mayuritaskheadid) {

    this.addTaskstartdate.start_date = this.datePipe.transform(this.addTaskstartdate.start_date, 'yyyy-MM-dd HH:mm:ss');
    const data = {
      startdate: this.addTaskstartdate.start_date,
      taskiddate: this.taskiddate,
    }
    //console.log(data);
    this._ProjectService.update_task_start_date(data)
      .subscribe(
        res => {
          this.give_start_date = false;
          this.get_all_task();
          this.mayuritaskheadid = mayuritaskheadid;
          console.log(this.mayuritaskheadid);
          this.mayuri_in = 'in';
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;

          // this._router.navigate([this.current_page + '/project-files/' + this.project_id]).then(() => {
          // this._router.navigate([this.current_page + '/project-task/' + this.project_id]);
          // });
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  enter_end_date(id, thid) {

    this.give_end_date = true;
    //console.log(this.give_end_date);
    this.taskendid = id;
    this.mayuritaskheadid = thid;
    console.log(this.mayuritaskheadid);
    //console.log(this.taskendid);

  }
  update_task_end_date(mayuritaskheadid) {
    this.addTaskstartdate.end_date = this.datePipe.transform(this.addTaskstartdate.end_date, 'yyyy-MM-dd HH:mm:ss');

    const data = {
      enddate: this.addTaskstartdate.end_date,
      taskendid: this.taskendid,
    }
    //console.log(data);
    this._ProjectService.update_task_end_date(data)
      .subscribe(
        res => {
          this.give_end_date = false;
          this.get_all_task();
          this.mayuritaskheadid = mayuritaskheadid;
          console.log(this.mayuritaskheadid);
          this.mayuri_in = 'in';
          this.toastr.success('Task Date Updated', 'Success!');
          this._app.loading = false;
          // this._router.navigate([this.current_page + '/project-files/' + this.project_id]).then(() => {
          // this._router.navigate([this.current_page + '/project-task/' + this.project_id]);
          // });
        },
        err => {
          // this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  get_owner_name() {
    const data = {
      project_id: this.project_id,
      task_owner_ids: this.taskownerid,
    }
    //console.log(data);
    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
          this.selectedItems = res.selected_users;
          console.log(this.selectedItems);
        },
        err => {
          //this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

      this.selectedItems=[];
      this.temparray = [];
  }

  update_task_owner_name(mayuritaskheadid) {

    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    this.ownername = this.temparray.join(",");
    const data = {
      ownername: this.ownername,
      taskidchange: this.taskidchange,
    }
    //console.log(data);
    this._ProjectService.update_task_owner_name(data)
      .subscribe(
        res => {
          this.get_all_task();
          this.toastr.success('Owner Name Updated', 'Success!');
          this._app.loading = false;
          this.mayuritaskheadid = mayuritaskheadid;
          this.mayuri_in = 'in';
          // this._router.navigate([this.current_page + '/project-files/' + this.project_id]).then(() => {
          // this._router.navigate([this.current_page + '/project-task/' + this.project_id]);
          // });
        },
        err => {
          // this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
  }
  update_task_status(id1, current_status1) {
    //console.log("mayuri");
    this._app.loading = true;
    const data = {
      id: id1,
      current_status: current_status1
    }
    //console.log(data);
    this._ProjectService.update_task_statusdata(data).subscribe(res => {
      this._app.loading = false;
      this.toastr.success('Task Status Updated', 'success');
      //console.log(res.data);
    },
      err => {
        this._app.loading = false;
        //console.log(err.error.message);
        if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
          localStorage.clear();
          //  this._app.loading = false;
          this._router.navigate(["/login"]);
        } else {
          alert('Something Went Wrong!!');
        }
      }

    );


  }

  showhidebox(box) {
    if (box == 'names') {
      if (this.show_task_name) {
        this.show_task_name = false;
      } else {
        this.show_task_name = true;
      }

    }
  }
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




  add_new_task(form) {
    console.log(this.addTaskFromData);
    for (let item of this.selectedItems) {
      this.temparray.push(item.user_id);
    }
    const taskidmayuri = this.addTaskFromData.task_list_id;
    this.addTaskFromData.task_owner_ids = this.temparray.join(",");
    this.addTaskFromData.task_start_date = this.datePipe.transform(this.addTaskFromData.task_start_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_end_date = this.datePipe.transform(this.addTaskFromData.task_end_date, 'yyyy-MM-dd HH:mm:ss');
    this.addTaskFromData.task_reminder_date = this.datePipe.transform(this.addTaskFromData.task_reminder_date, 'yyyy-MM-dd HH:mm:ss');
    this._ProjectService.add_new_task(this.addTaskFromData)
      .subscribe(
        res => {
          // console.log(taskidmayuri);

          this.divClick.nativeElement.click();
          this.get_all_task();
          this.mayuritaskheadid = taskidmayuri;
          this.mayuri_in = 'in';
          // this.ngOnInit();
          this._app.loading = false;
          this.filter_the_data();
          this.toastr.success('Task Added', 'success');
        },
        err => {
          //  this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
    this.selectedItems = [];
  }

  get_all_task() {
    this._app.loading = true;
    const data = {
      project_id: this.project_id
    }
    this._ProjectService.get_private_task(data)
      .subscribe(
        res => {

          console.log(res.response);
          this.allTasks = res.response;
          this.alldatetask = localStorage.getItem('company_dateformat');
          this.timedetail = localStorage.getItem('timezonedata');
          this._app.loading = false;
          this.role = res.role;
        },
        err => {
          //this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  change_status(task_id, status, thid) {
    this.mayuritaskheadid = thid;
    console.log(this.mayuritaskheadid);
    this._app.loading = true;
    const data = {
      task_id: task_id,
      status: status,

    }
    this._ProjectService.update_task_status(data)
      .subscribe(
        res => {
          this.get_all_task();
          this.mayuritaskheadid = this.mayuritaskheadid;
          console.log(this.mayuritaskheadid);
          this.mayuri_in = 'in';
          this._app.loading = false;
          this.get_all_task_with_dynamic_status_name();
          this.toastr.success('Task Status Updated', 'success');
        },
        err => {
          // this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }


  change_priority(task_id, priority, thid) {
    this.mayuritaskheadid = thid;
    console.log(this.mayuritaskheadid);
    this._app.loading = true;
    const data = {
      task_id: task_id,
      priority: priority,
    }
    this._ProjectService.update_task_priority(data)
      .subscribe(
        res => {
          this.mayuritaskheadid = this.mayuritaskheadid;
          console.log(this.mayuritaskheadid);
          this.mayuri_in = 'in';
          this.get_all_task();
          this._app.loading = false;
          this.toastr.success('Task Priority Updated', 'success');
        },
        err => {
          //this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  test(thid) {

    const data = {
      project_id: this.project_id
    }
    $("#file-upload").val('');
    //console.log(mayuri);
    this.mayuritaskheadid = thid;
    this.modeldisplay = true;
    this.addTaskFromData.template_task_id = "select";
    this.addTaskFromData.task_image_url = '';
    this.uploader.queue.pop();
    this._ProjectService.get_project_user_for_task(data)
      .subscribe(
        res => {
          this.dropdownList = res.data;
        },
        err => console.log(err.error.message)
      );
    this._ProjectService.gat_task_type(data)
      .subscribe(
        res => {
          this.TasksTypes = res.responce;
        },
        err => console.log(err.error.message)
      );
    this._ProjectService.gat_task_name()
      .subscribe(
        res => {
          this.Tasksnames = res.responce;
        },
        err => {
          // this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            // localStorage.clear();
            //this._app.loading = false;
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
      allowSearchFilter: false,
    };
  }


  get_tasklist_id(id) {
    this.addTaskFromData.task_list_id = id;
    console.log(this.addTaskFromData.task_list_id);
  }
  on_task_select(task_id) {
    const data = {
      template_task_id: task_id
    }
    //console.log(data);
    //console.log("mayuri");
    if (task_id != "select") {
      this._ProjectService.get_template_task_data(data)
        .subscribe(
          res => {

            this.addTaskFromData.task_name = res.data[0].task_name;

            this.addTaskFromData.task_description = res.data[0].task_description;

          },
          err => {
            this._app.loading = false;

            if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
              localStorage.clear();
              //  this._app.loading = false;
              this._router.navigate(["/login"]);
            } else {
              alert('Something Went Wrong!!');
            }
          }
        );
    }

  }
  openDialog() {
    this.showlist = true;
    this.showgrid = false;
    this.hideprintbutton = false;
    this.class_list = "activelink";
    this.class_task = " ";
    this.columnFixMinWidth();
    this.get_all_task();

  }
  openDialog1() {
    this.hideprintbutton = true;
    this.showlist = false;
    this.showgrid = true;
    this.class_task = "activelink";
    this.class_list = " ";
    this.get_open_task(0);
    this.get_close_task(2);
    this.get_pending_task(1);
    this.get_all_task_with_dynamic_status_name();
  }

  add_new_task_type() {
    this._app.loading = true;
    this.addTaskTypeFromData.project_id = this.project_id;

    this._ProjectService.add_new_task_type(this.addTaskTypeFromData)
      .subscribe(
        res => {
          console.log(res);
          this.get_task_title_list();
          this.get_all_task();
          this.divClickT.nativeElement.click();
          this.toastr.success('Title Added', 'success');
          this._router.navigate(["/project-task"]);
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  show_and_hide_filter_box() {
    this.showfilterbox = this.showfilterbox ? false : true;
  }

  addstatusfilter(status: string, isChecked: boolean) {
    if (isChecked) {
      this.statusfilterarray.push(status);
    } else {
      this.statusfilterarray.splice(this.statusfilterarray.indexOf(status), 1);

    }
    this.filter_the_data();
  }

  addpriorityfilter(priority, isChecked: boolean) {
    if (isChecked) {
      this.priorityfilterarray.push(priority);
    } else {
      this.priorityfilterarray.splice(this.priorityfilterarray.indexOf(priority), 1);
    }
    this.filter_the_data();
  }


  filter_the_data() {
    const data = {
      project_id: this.project_id
    }
    //console.log(this.priorityfilterarray);
    this._ProjectService.get_private_task(data)
      .subscribe(
        res => {
          //console.log(res);
          this.master_array_for_filter = res['response'];
          //console.log('before priority filter:');
          //console.log(this.master_array_for_filter.length);
          if (this.statusfilterarray.length > 0) {
            //console.log('status in');
            var temparr1 = [];
            for (var i = 0; i < this.master_array_for_filter.length; i++) {
              var temparr = [];
              for (var j = 0; j < this.master_array_for_filter[i].tasks.length; j++) {

                if (!this.statusfilterarray.includes(this.master_array_for_filter[i].tasks[j].status)) {
                  temparr.push(j);
                }
              }

              for (var k = temparr.length - 1; k >= 0; k--) {
                this.master_array_for_filter[i].tasks.splice(temparr[k], 1);
              }
              if (this.master_array_for_filter[i].tasks.length < 1) {
                temparr1.push(i);
              }

            }
            for (var k = temparr1.length - 1; k >= 0; k--) {
              this.master_array_for_filter.splice(temparr1[k], 1);
            }

          } else {
          }
          if (this.priorityfilterarray.length > 0) {
            //console.log('yash');
            var temparr2 = [];
            //console.log(this.master_array_for_filter.length);
            for (var i = 0; i < this.master_array_for_filter.length; i++) {

              var temparr = [];
              //console.log('user selected Priority Array:');
              //console.log(this.priorityfilterarray);
              for (var j = 0; j < this.master_array_for_filter[i].tasks.length; j++) {
                //console.log('Master Filter Priority Array:');
                //console.log(this.master_array_for_filter[i].tasks[j].task_priority);
                if (!this.priorityfilterarray.includes(this.master_array_for_filter[i].tasks[j].task_priority)) {
                  //console.log('when matches priority');
                  temparr.push(j);
                  //console.log(temparr);
                }
              }
              //console.log('after removing');
              for (var k = temparr.length - 1; k >= 0; k--) {
                this.master_array_for_filter[i].tasks.splice(temparr[k], 1);
                //console.log(this.master_array_for_filter[i].tasks);
              }


              if (this.master_array_for_filter[i].tasks.length < 1) {
                temparr2.push(i);
              }
            }
            for (var k = temparr2.length - 1; k >= 0; k--) {
              this.master_array_for_filter.splice(temparr2[k], 1);
            }
            this.allTasks = this.master_array_for_filter;
          } else {
            this.allTasks = this.master_array_for_filter;
          }

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  get_task_title_list() {
    const data = {
      project_id: this.project_id
    }

    this._ProjectService.get_task_title_list(data)
      .subscribe(
        res => {
          // console.log(res.data);
          this.task_title_list = res.data;
          // this.addTaskTypeFromData = {
          //   task_list_name: '',
          //   task_type_id: '1',
          //   project_id: '',
          // };
          //this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  openAddTitle() {
    this.modeldisplaytitle = true;
    this.addTaskTypeFromData.task_list_name = '';
    this.get_task_title_list();
  }

  edit_task_title(task_title_id, task_list_name, task_type_id, form: NgForm) {
    console.log(task_type_id);
    //form.reset();
    this.editTaskTitleFormData.task_list_id = task_title_id;
    this.editTaskTitleFormData.task_list_name = task_list_name;

    this.editTaskTitleFormData.task_type_id = task_type_id;
    console.log(this.editTaskTitleFormData.task_type_id);
    console.log(this.editTaskTitleFormData.task_list_name);
  }

  update_task_title() {
    this._app.loading = true;
    console.log(this.editTaskTitleFormData);
    this._ProjectService.update_task_title(this.editTaskTitleFormData)
      .subscribe(
        res => {
          console.log(this.editTaskTitleFormData);
          console.log(res);
          this.get_task_title_list();
          this.get_all_task();
          this.toastr.success('Title Updated', 'success');
          this._app.loading = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  delete_task_title(title_id) {
    this.delete_title_id = title_id;
    const data = {
      title_id: title_id
    }
    this._ProjectService.check_delete_task_title(data)
      .subscribe(
        res => {
          if (res.result == 1) {
            this.modeldisplay2 = true;
            this.applyback = true;
          } else {
            this.modeldisplay3 = true;
            this.applyback = true;
          }

          this._app.loading = false;

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  delete_title(title_id) {
    this._app.loading = true;
    const data = {
      title_id: title_id
    }
    this._ProjectService.delete_task_title(data)
      .subscribe(
        res => {
          this.get_task_title_list();
          this.get_all_task();
          this.toastr.success('Title Deleted', 'success');
          this._app.loading = false;
          this.modeldisplay2 = false;
          this.applyback = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  delete_task_data(id, thid) {
    this.delete_task_id = id;
    this.mayuritaskheadid = thid;

    this.modeldisplay4 = true;
    this.applyback = true;
  }
  delete_task(taskid, mayuritaskheadid) {

    const data = {
      task_id: taskid,

    };
    //console.log(data);
    this._ProjectService.delete_task(data)
      .subscribe(
        res => {
          this.mayuritaskheadid = mayuritaskheadid;
          this.mayuri_in = 'in';
          this.get_all_task();
          this.toastr.success('Task Deleted', 'success');
          this._app.loading = false;
          this.modeldisplay4 = false;
          this.applyback = false;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }
  hidemodel() {
    this.modeldisplay = false;
  }
  hidemodel2() {
    this.modeldisplay2 = false;
    this.applyback = false;
  }
  hidemodel3() {
    this.modeldisplay3 = false;
    this.applyback = false;
  }
  hidemodel4() {
    this.modeldisplay4 = false;
    this.applyback = false;
  }

  open_sorting_popup() {
    this.project_title_sorting_popup = true;
  }
  hidemodel7() {
    this.project_title_sorting_popup = false;
    this.applyback = false;
  }
  create_task_title_new(task_update_id) {
    const data = {
      ids: task_update_id,
      project_id: this.project_id,

    };
    console.log(data);
    //console.log(data);
    this._ProjectService.create_task_title_new(data)
      .subscribe(
        res => {
          console.log(res);
          this.newListItem = res;
          console.log(this.newListItem);
          this._app.loading = false;
          this.get_task_title_list();
          this.get_all_task();
          this.divClickT.nativeElement.click();
          this.toastr.success('Task title  addeds', 'success');

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if (err.error.message == "A token is required" || err.error.message == "Token has expired") {
            localStorage.clear();
            //  this._app.loading = false;
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );

  }

  editPageNavigate(pid, tid) {
    this._router.navigate(["/professionals/project-task-edit/" + pid + "/" + tid]);
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  private onMouseDown(event, id) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = $(this.start).parent().width();
    this.initResizableColumns(id);
    this.columnFixMinWidth();
  }
  private initResizableColumns(id) {
    var or = id;
    this.renderer.listenGlobal('body', 'mousemove', (event) => {
      if (this.pressed) {
        let width = this.startWidth + (event.x - this.startX);
        $(this.start).parent().css({ 'min-width': width, 'max-   width': width });
        let index = $(this.start).parent().index() + 1;
        $('.glowTableBody tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
        if (index == 1) { localStorage.setItem('width1', width); }
        else if (index == 2) { localStorage.setItem('width2', width); }
        else if (index == 3) { localStorage.setItem('width3', width); }
        else if (index == 4) { localStorage.setItem('width4', width); }
        else if (index == 5) { localStorage.setItem('width5', width); }
        else if (index == 6) { localStorage.setItem('width6', width); }
        else if (index == 7) { localStorage.setItem('width7', width); }
      }
    });
    this.renderer.listenGlobal('body', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
      }
    });
  }


}
