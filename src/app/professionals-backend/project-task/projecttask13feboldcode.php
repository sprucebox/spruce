<section>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <nav class="pos-relative">
                        <ul class="nav navbar-nav">
                            <li><a routerLink="../../project-overview/{{project_id}}">Overview</a></li>
                            <li *ngIf="select_permissions.indexOf(28) !== -1"><a routerLink="../../project-task/{{project_id}}" class="active">Task</a></li>
                            <li><a routerLink="../../project-calendar/{{project_id}}">Calendar</a></li>
                            <li><a routerLink="../../project-activity/{{project_id}}">Activity</a></li>
                            <li *ngIf="project_company_id===company_id"><a routerLink="../../project-reports/{{project_id}}">Reports</a></li>
                            <li><a routerLink="../../project-discussion/{{project_id}}">Discussion</a></li>
                            <li><a routerLink="../../project-files/{{project_id}}">Files</a></li>
                            <li><a routerLink="../../project-users/{{project_id}}">Users</a></li>
							<li><a routerLink="../../notes/{{project_id}}" >Notes</a></li>
                        </ul>
                        <ul class="filter-box pull-right" style="padding: 8px 15px 0px 15px;">
                            <li>
                                <div class="col-sm-12">
                                    <div class="search_box pull-right p0">
                                        <input placeholder="Search" type="text" [(ngModel)]="searchText">
                                    </div>
                                </div>
                            </li>
                            <!-- <li> <a href="javascript:void('0');" class="filter btn btn-default" (click)="show_and_hide_filter_box();" -->
                                    <!-- title="Filter" id="filter-btn"><i class="fa fa-filter"></i></a> </li> -->
                        </ul>
                        <!-- <div class="filter-area" *ngIf="showfilterbox" style="display: block;"> -->
                            <!-- <div class="col-md-2"> -->
                                <!-- <h4>Status</h4> -->
                                <!-- <div class="form-check" *ngFor="let status of status_list"> -->
                                    <!-- <label> -->
                                        <!-- <input name="check" [checked]="statusfilterarray.indexOf(status.id) !== -1" class="checkBoxClass" -->
                                            <!-- type="checkbox" (change)="addstatusfilter(status.id, $event.target.checked)"> -->
                                        <!-- <span class="label-text"></span> {{status.status}}</label> -->
                                <!-- </div> -->
                                
                            <!-- </div> -->
    
                            <!-- <div class="col-md-2"> -->
                                <!-- <h4>Priority</h4> -->
                                <!-- <div class="form-check"> -->
                                    <!-- <label> -->
                                        <!-- <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(1) !== -1" -->
                                            <!-- (change)="addpriorityfilter(1, $event.target.checked)" type="checkbox"> -->
                                        <!-- <span class="label-text"></span> High</label> -->
                                <!-- </div> -->
                                <!-- <div class="form-check"> -->
                                    <!-- <label> -->
                                        <!-- <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(2) !== -1" -->
                                            <!-- (change)="addpriorityfilter(2, $event.target.checked)" type="checkbox"> -->
                                        <!-- <span class="label-text"></span> Medium</label> -->
                                <!-- </div> -->
                                <!-- <div class="form-check"> -->
                                    <!-- <label> -->
                                        <!-- <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(3) !== -1" -->
                                            <!-- (change)="addpriorityfilter(3, $event.target.checked)" type="checkbox"> -->
                                        <!-- <span class="label-text"></span> Low</label> -->
                                <!-- </div> -->
                            <!-- </div> -->
                            <!-- <div class="clearfix"></div> -->
    
                        <!-- </div> -->
                    </nav>
                </div>
            </div>
    
            <div class="card-box">
                <div class="table-rep-plugin">
                    
<div class="button-list pull-left mb-15">
               
                <h4 style="display: inline; text-transform: uppercase">{{Projectname}}</h4>
                            <ul class="float-btn float-btn-left">
                                <li>
                                    <div class="dropdown text-left mb-10">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-tasks" aria-hidden="true"></i>
                            </button>
                            <div class="dropdown-menu task" aria-labelledby="dropdownMenuButton">
                                <ul class="task_width">
                                    <li><a [className]="task_type=='task' ? 'active dropdown-item' : 'dropdown-item'">
                                            <label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement1()" checked>
                                                <span class="label-text"></span> </label>
                                            Task</a></li>
                                    <li> <a [className]="task_type=='source' ? 'active dropdown-item' : 'dropdown-item'"><label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement2()" checked>
                                                <span class="label-text"></span> </label>Owner</a></li>
                                    <li> <a [className]="task_type=='owner' ? 'active dropdown-item' : 'dropdown-item'"><label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement3()" checked>
                                                <span class="label-text"></span> </label>Status</a></li>
                                    <li> <a [className]="task_type=='owner' ? 'active dropdown-item' : 'dropdown-item'"><label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement4()" checked>
                                                <span class="label-text"></span> </label>Priority</a></li>
                                    <li> <a [className]="task_type=='owner' ? 'active dropdown-item' : 'dropdown-item'"><label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement5()" checked>
                                                <span class="label-text"></span> </label>Start Date</a></li>
                                    <li> <a [className]="task_type=='owner' ? 'active dropdown-item' : 'dropdown-item'"><label>
                                                <input name="check" type="checkbox" class="checkBoxClass1" (click)="toggleElement6()" checked >
                                                <span class="label-text"></span> </label>Due Date</a></li>
    
                                </ul>
                            </div>

							
									
                        </div>
                                    
                                </li>
								
								<li>
								<div class="dropdown text-left mb-10">
                                 <button class="btn btn-secondary dropdown-toggle" type="button"  id="dropdownMenuButton1"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                
                            Sort by Status</button>
							  <div class="dropdown-menu status" aria-labelledby="dropdownMenuButton1">
							  <ul class="task_width">
                              
                                <h4>Status</h4>
                                <div class="form-check" *ngFor="let status of status_list">
								<li><a [className]="status_type=='status' ? 'active dropdown-item' : 'dropdown-item'">
                                    <label>
                                        <input name="check" [checked]="statusfilterarray.indexOf(status.id) !== -1" class="checkBoxClass"
                                            type="checkbox" (change)="addstatusfilter(status.id, $event.target.checked)">
                                        <span class="label-text"></span> </label>{{status.status}}</a></li>
                                </div>
								
                            </ul>
							</div> 
                                 </div>   
                                </li>
								<li>
                                 <div class="dropdown text-left mb-10">  	
						<button class="btn btn-secondary dropdown-toggle" type="button"  id="dropdownMenuButton2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                
                            Sort by Priority </button>
							  <div class="dropdown-menu Priority" aria-labelledby="dropdownMenuButton2">
                              
                              <ul class="task_width">
                                <h4>Priority</h4>
                                <div class="form-check">
								<li><a [className]="Priority_type=='Priority' ? 'active dropdown-item' : 'dropdown-item'">
                                    <label>
                                        <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(1) !== -1"
                                            (change)="addpriorityfilter(1, $event.target.checked)" type="checkbox">
                                        <span class="label-text"></span> </label>High</a></li>                                </div>
                                <div class="form-check">
								<li><a [className]="Priority_type=='Priority' ? 'active dropdown-item' : 'dropdown-item'">
                                    <label>
                                        <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(2) !== -1"
                                            (change)="addpriorityfilter(2, $event.target.checked)" type="checkbox">
                                        <span class="label-text"></span> </label>Medium</a></li>
                                </div>
                                <div class="form-check">
								<li><a [className]="Priority_type=='Priority' ? 'active dropdown-item' : 'dropdown-item'">
                                    <label>
                                        <input name="check" class="checkBoxClass" [checked]="priorityfilterarray.indexOf(3) !== -1"
                                            (change)="addpriorityfilter(3, $event.target.checked)" type="checkbox">
                                        <span class="label-text"></span> </label>Low</a></li>
                                </div>
</ul>
                            
							</div>
                     </div>
                                    
                                </li>
                            </ul>
                        </div>

                    <div class="button-list pull-right mb-15">
                        <ul class="float-btn float-btn-left">
                            <li>
                                <ul class="filter-view pull-right">
                                    <li><a data-tab="tab-1" class="activelink" title="List View" (click)="openDialog()"><i
                                                class="fa fa-th-list"></i></a></li>
                                    <li><a data-tab="tab-2" (click)="openDialog1()" title="Grid View"><i class="fa fa-th"></i></a></li>
                                </ul>
                            </li>
                            <li> <a class="btn btn-info waves-effect waves-light" *ngIf="select_permissions.indexOf(18) !== -1" (click)="addTaskForm.reset();test()"
                                    data-toggle="modal" data-target="#addTask"><i class="fa fa-plus"></i> Add Task</a> </li>
                            <li> <a class="btn btn-info waves-effect waves-light" *ngIf="select_permissions.indexOf(19) !== -1" (click)="addTaskTypeForm.reset();get_task_title_list();"
                                    data-toggle="modal" data-target="#addTitle"><i class="fa fa-plus"></i> Add Title</a>
                            </li>
							
							<div *ngIf="role == 'Administrator'&& project_company_id===company_id">
							<li> <a class="btn btn-info waves-effect waves-light" routerLink="../../project-task-archive/{{project_id}}"> Show Archive</a> </li>
							</div>
						
							
                        </ul>
						 
        
        
                    </div>
                </div>
    
                <div *ngIf="showlist" class="content current">
                    <div class="table-responsive">
                        <div  *ngFor="let Taskhead of allTasks ">
                                <p colspan="6" >{{Taskhead.task_list_name}} ( {{Taskhead.task_list_type}} )</p>
    
                            <table class="table" >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th [hidden]="hideTask1">Task</th>
                                        <th [hidden]="hideOwner2">Owner</th>
                                        <th [hidden]="hideStatus3">Status</th>
                                        <th [hidden]="hidePriority4">Priority</th>
                                        <th [hidden]="hideStart5">Start Date</th>
                                        <th [hidden]="hideDue6">Due Date</th>
                                    </tr>
                                </thead>
                              
                                <tbody class="container ex-over"  dragula="VAMPIRE" id="{{Taskhead.id}}" *ngFor="let Tasks of Taskhead.tasks | grdFilter: {task_name: searchText, names:searchText};" >
                                       
                                               
                                   
                                   
                                    <tr >
                                    
                                        <td>
                                            <div class="form-check">
                                                <label>
                                                    <input name="check" type="checkbox" class="checkBoxClass">
                                                    <span class="label-text"></span> </label>
                                            </div>
                                        </td>
    
                                        <td [hidden]="hideTask1"><a routerLink="../../project-task-edit/{{project_id}}/{{Tasks.id}}"
                                                id="{{Tasks.id}}">{{Tasks.task_name}} </a></td>
    
                                        <td [hidden]="hideOwner2">{{Tasks.names}}</td>
    
                                        <td [hidden]="hideStatus3">
                                            <div class="btn-group"><a class="btn btn-xs {{Tasks.color_class}}" style="color:#fff;" [style.background] = "Tasks.color_class"
                                                    type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="true">
    
                                                    {{Tasks.status_name}}
                                                    <span class="caret caret-search"></span>
                                                </a>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                                    <li *ngFor="let status of status_list"><a (click)="change_status(Tasks.id,status.id)" >{{status.status}}</a></li>
                                                    
    
                                                </ul>
                                            </div>
                                        </td>
                                        <td [hidden]="hidePriority4">
                                            <div class="btn-group"><a class="btn btn-xs" [ngClass]="Tasks.task_priority == 1 ? 'btn-danger' : Tasks.task_priority == 2 ? 'btn-warning' : 'btn-success'"
                                                    type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="true">
													<ng-template [ngIf]="Tasks.task_priority == 0">None</ng-template>
                                                    <ng-template [ngIf]="Tasks.task_priority == 1">High</ng-template>
                                                    <ng-template [ngIf]="Tasks.task_priority == 2">Medium</ng-template>
                                                    <ng-template [ngIf]="Tasks.task_priority == 3">Low</ng-template>
                                                    <span class="caret caret-search"></span>
                                                </a>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
												<li><a (click)="change_priority(Tasks.id,0)">None</a></li>
                                                    <li><a (click)="change_priority(Tasks.id,1)">High</a></li>
                                                    <li><a (click)="change_priority(Tasks.id,2)">Medium</a></li>
                                                    <li><a (click)="change_priority(Tasks.id,3)">Low</a></li>
                                                </ul>
                                            </div>
    
                                        </td>
										
                                        <td *ngIf="Tasks.task_start_date !='0000-00-00 00:00:00'" [hidden]="hideStart5">{{Tasks.task_start_date | date:alldatetask}}		
                                            <br><small>{{Tasks.task_start_date | date:'shortTime'}}  </small> </td>		
                                        <td *ngIf="Tasks.task_start_date =='0000-00-00 00:00:00'"></td>        		
                                        <td *ngIf="Tasks.task_end_date !='0000-00-00 00:00:00'" [hidden]="hideDue6">{{Tasks.task_end_date | date:alldatetask}}		
                                             <br><small> {{Tasks.task_end_date | date:'shortTime'}}</small> </td>		
                                        <td *ngIf="Tasks.task_end_date =='0000-00-00 00:00:00'"></td> 
                                      
                                    </tr>
                                    
                                </tbody>
                               
                            </table>
                            
                        </div>
                       
                    </div>
                </div>
                <div class="clearfix"></div>
                <div *ngIf="showgrid" class=" container">
                    <div class="wrapper dd">
                        <div class="kanban ">
                            <h4> Open </h4>
                            <div class=" ex-over col-md-12 " dragula="VAMPIRES" id="0" style="min-height: 200px;">
                                <div *ngFor="let open of open_tasks" class="dd-item">
                                    <p id="{{open.id}}">{{open.task_name}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="kanban ">
                            <h4> Pending </h4>
                            <div class=" ex-over col-md-12" dragula="VAMPIRES" id="1" style="min-height: 200px;">
                                <div *ngFor="let pending of pending_tasks" class="dd-item">
                                    <p id="{{pending.id}}">{{pending.task_name}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="kanban ">
                            <h4> Close </h4>
                            <div class=" ex-over col-md-12 " dragula="VAMPIRES" [(dragulaModel)]="ConfirmedDate" style="min-height: 200px;"
                                id="2">
    
                                <div *ngFor="let close of close_tasks" class="dd-item">
                                    <p id="{{close.id}}">{{close.task_name}}</p>
    
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade"  [hidden]="hideModal" id="addTask" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog bright-modal-style">
                <div class="modal-content">
                    <form class="w-100" role="form" #addTaskForm="ngForm" style="background-color: white">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                                    class="sr-only">Close</span></button>
                            <h3 class="modal-title" id="lineModalLabel">New Task</h3>
                        </div>
                        <div class="modal-body">
    
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Task Name</label>
    
                                    <input type="text" class="form-control" [class.is-invalid]="task_name.invalid && task_name.touched"
                                        [(ngModel)]="addTaskFromData.task_name" #task_name="ngModel" maxlength="100" name="task_name"
                                        placeholder="Task Name" required>
                                    <small class="text-danger" [class.d-none]="task_name.valid || task_name.untouched">Description
                                        is required</small>
    
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Description</label>
                                    <textarea name="" [class.is-invalid]="task_description.invalid && task_description.touched"
                                        [(ngModel)]="addTaskFromData.task_description" #task_description="ngModel"
                                        maxlength="200" name="task_description" placeholder="Description" rows="3" class="form-control"></textarea>
                                    <small class="text-danger" [class.d-none]="task_description.valid || task_description.untouched">Description
                                        is required</small>
    
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Attachment</label>
                                    <input class="form-control" id="file-upload" type="file" type="file" (change)="onSelectFile($event)"
                                        name="uploaded_file" ng2FileSelect [uploader]="uploader" accept="image/*"
                                        #fileInput />
                                    <input type="hidden" [(ngModel)]="addTaskFromData.task_image_url" #task_image_url="ngModel"
                                        name="task_image_url">
    
                                    <div class="progress" style="display: block;" *ngIf="pr_show">
                                        <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Task List</label>
                                    <select class="custom-select" [class.is-invalid]="task_list_id.invalid && task_list_id.touched"
                                        [(ngModel)]="addTaskFromData.task_list_id" #task_list_id="ngModel" name="task_list_id">
                                        <optgroup *ngFor="let TasksType of TasksTypes" label="{{TasksType.task_list_type}}">
                                            <option *ngFor="let tasklist of TasksType.tasklists" value="{{tasklist.id}}">{{tasklist.task_list_name}}</option>
                                        </optgroup>
    
                                    </select>
                                    <small class="text-danger" [class.d-none]="task_list_id.valid || task_list_id.untouched">Task
                                        List is required</small>
    
                                </div>
                                <div class="col-md-12">
                                  
                                   
                                        <div class="form-check">
                                            <label>
                                                <input type="checkbox" name="is_private"  (change)="triggerSomeEvent($event)"  />
                                                <span class="label-text"></span> Only me</label>
                                        </div>
                                           
                                  
                              
        
                                   
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Task Owner</label>
                                
                                    <ng-multiselect-dropdown [disabled]="isDisabled"  [placeholder]="'Task Owner'" [data]="dropdownList" [(ngModel)]="selectedItems"
                                        ng-model-options="{timezone:'UTC/GMT'}" [settings]="dropdownSettings"  (onSelect)="onItemSelect($event)"
                                        (onDeSelect)="onItemDeSelect($event)" (onSelectAll)="onSelectAll($event)"
                                        [ngModelOptions]="{standalone: true}">
                                    </ng-multiselect-dropdown>
                             
    
                                </div>
                            </div>
                            <div class="col-md-6 demo">
                                    <label for="exampleInputPassword1">Start Date</label>
                                    
                                    <input placeholder="Start Date" class="form-control" [(ngModel)]="addTaskFromData.task_start_date" [owlDateTimeTrigger]="dt3" [owlDateTime]="dt3" class="form-control" [class.is-invalid]="task_start_date.invalid && task_start_date.touched" name="task_start_date" #task_start_date="ngModel">
                                    <owl-date-time #dt3></owl-date-time>
                                </div>
                                <div class="col-md-6 demo">
                                    <label for="exampleInputPassword1">Due Date</label>
                                    <input placeholder="Due Date" class="form-control" [class.is-invalid]="task_end_date.invalid && task_end_date.touched" [(ngModel)]="addTaskFromData.task_end_date" [owlDateTimeTrigger]="dt" [owlDateTime]="dt" name="task_end_date" #task_end_date="ngModel">
                                    <owl-date-time #dt></owl-date-time>
                                   
                                </div>
                                <div class="col-md-6 demo">
                                    <label for="exampleInputPassword1">Reminder</label>
                                    <input placeholder="Reminder Date" [class.is-invalid]="task_reminder_date.invalid && task_reminder_date.touched" class="form-control" [(ngModel)]="addTaskFromData.task_reminder_date" [owlDateTimeTrigger]="dt2" [owlDateTime]="dt2" name="task_reminder_date" #task_reminder_date="ngModel">
                                    <owl-date-time #dt2></owl-date-time>
                                    
                                </div>
                            <div class="col-md-6 demo">
                                <label for="exampleInputPassword1">Priority</label>
                                <select class="custom-select" [class.is-invalid]="task_priority.invalid && task_priority.touched"
                                    [(ngModel)]="addTaskFromData.task_priority" #task_priority="ngModel" name="task_priority">
                                    <option value="">Select</option>
                                    <option value="1">High</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Low</option>
                                </select>
                                <small class="text-danger" [class.d-none]="task_priority.valid || task_priority.untouched">Priority
                                    is required</small>
                            </div>
                        </div>
                      <div class="modal-footer">
                        <div class="btn-group" role="group" aria-label="group button">
                            <div class="btn-group" role="group">
                                <button type="button" id="" class="btn btn-success" data-dismiss="modal" (click)="add_new_task();addTaskForm.form.reset()"
                                    [disabled]="addTaskForm.form.invalid" data-action="save" role="button">Add</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Close</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    
        <div class="modal fade" id="addTitle" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog bright-modal-style">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                                class="sr-only">Close</span></button>
                        <h3 class="modal-title" id="lineModalLabel">New Title</h3>
                    </div>
                    <div class="modal-body">
                        <form class="w-100" role="form" #addTaskTypeForm="ngForm">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Title Name</label>
                                    <input type="text" class="form-control" [class.is-invalid]="task_list_name.invalid && task_list_name.touched"
                                        [(ngModel)]="addTaskTypeFromData.task_list_name" #task_list_name="ngModel"
                                        maxlength="100" name="task_list_name" placeholder="Title Name" required>
                                    <small class="text-danger" [class.d-none]="task_list_name.valid || task_list_name.untouched">Title
                                        Name is required</small>
    
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Title Type</label>
                                    <select [class.is-invalid]="task_type_id.invalid && task_type_id.touched" [(ngModel)]="addTaskTypeFromData.task_type_id"
                                        #task_type_id="ngModel" name="task_type_id" required>
                                        <option value="">Select Type</option>
                                        <option value="1">Internal (Private)</option>
                                        <option value="2">External (Public)</option>
                                    </select>
                                    <small class="text-danger" [class.d-none]="task_type_id.valid || task_type_id.untouched">Title
                                        Type is required</small>
                                </div>
                            </div>
                        </form>
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table  table-striped">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let task_title of task_title_list">
                                            <td>{{task_title.task_list_name}}</td>
                                            <td>
                                                <a title="Edit" (click)="editTaskTitleForm.reset();edit_task_title(task_title.id,task_title.task_list_name);"
                                                    data-toggle="modal" data-target="#EditTitle"><i class="fa fa-pencil"></i></a>
                                                <a title="Delete" (click)="delete_task_title(task_title.id);"><i class="fa fa-trash"></i></a>
                                            </td>
                                        </tr>
    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group" aria-label="group button">
                            <div class="btn-group" role="group">
                                <button type="button" id="" class="btn btn-success" data-dismiss="modal" (click)="add_new_task_type()"
                                    [disabled]="addTaskTypeForm.form.invalid" data-action="save" role="button">Add</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="modal fade" id="EditTitle" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog bright-modal-style">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                                class="sr-only">Close</span></button>
                        <h3 class="modal-title">Edit Title</h3>
                    </div>
                    <div class="modal-body">
                        <form class="w-100" role="form" #editTaskTitleForm="ngForm">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Title Name</label>
                                    <input type="text" class="form-control" [class.is-invalid]="task_list_name.invalid && task_list_name.touched"
                                        [(ngModel)]="editTaskTitleFormData.task_list_name" #task_list_name="ngModel"
                                        maxlength="100" minlength="5" name="task_list_name" placeholder="Title Name"
                                        required>
                                    <small class="text-danger" [class.d-none]="task_list_name.valid || task_list_name.untouched">Title
                                        Name is required</small>
    
                                </div>
                            </div>
    
                        </form>
    
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group" role="group" aria-label="group button">
                            <div class="btn-group" role="group">
                                <button type="button" id="" class="btn btn-success" data-dismiss="modal" (click)="update_task_title()"
                                    [disabled]="editTaskTitleForm.form.invalid" data-action="save" role="button">Save</button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" data-dismiss="modal" role="button">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal" *ngIf="modeldisplay2" [style.background]="applyback?'#21212185':'red'" id="Modalupdate2" tabindex="-1"
        role="dialog" aria-labelledby="myModalLabel" style="display:block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="background-color:#fff;">
                <div class="modal-header">
                    <h4 class="modal-title">Delete Title</h4>
                    <button type="button" class="close" (click)="hidemodel()" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
    
                <div class="modal-body">
                    <p> Are You Sure ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default bn-sm" data-dismiss="modal" (click)="hidemodel2()">Close</button>
                    <button type="submit" class="btn btn-success" (click)="delete_title(delete_title_id)">Delete Title</button>
                </div>
    
            </div>
        </div>
    </div>
    <div class="modal" *ngIf="modeldisplay3" [style.background]="applyback?'#21212185':'red'" id="Modalupdate3" tabindex="-1"
        role="dialog" aria-labelledby="myModalLabel" style="display:block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="background-color:#fff;">
                <div class="modal-header">
                    <h4 class="modal-title">Delete Title</h4>
                    <button type="button" class="close" (click)="hidemodel3()" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
    
                <div class="modal-body">
                    <p> You can not Delete this title, this titel used in Task</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default bn-sm" (click)="hidemodel3()">OK</button>
    
                </div>
    
            </div>
        </div>
    </div>