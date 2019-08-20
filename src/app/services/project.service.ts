import { Inject, Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';  
import { Observable,Subject,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
 
  
  private _createProjectUrl = `${environment.api}/create_project`;
  private _rotateimageUrl = `${environment.api}/rotate_image`;
    private _createTemplateProjectUrl = `${environment.api}/create_template_project`;
  private _getAllProjectUrl = `${environment.api}/get_all_project`;
   private _getAllProjecttemplateUrl = `${environment.api}/get_all_projects_template`;
     private _createtasktitlenewUrl = `${environment.api}/create_task_title_new`;
	  private _pdfCreateforPrint = `${environment.api}/Pdf_create_for_print`;
   private _getAllProjectarchiveUrl = `${environment.api}/get_all_project_archive`;
  private _getAllProjectUrlForCalender = `${environment.api}/get_all_project_for_calender`;
   private _getleadowneruser = `${environment.api}/get_lead_owner_user`;
  private _getprojectbyidUrl = `${environment.api}/get_project_by_id`;
   private _getcompanybyidUrl = `${environment.api}/get_companytask_by_id`;
  private _getprojecttemplatebyidUrl = `${environment.api}/get_project_template_by_id`;
  private _checktestUrl = `${environment.api}/check_test`;
  private _addnewtaskUrl = `${environment.api}/add_new_task`;
   private _createleadprofileUrl = `${environment.api}/createleadprofile`;
   private _addnewtasktemplateUrl = `${environment.api}/add_template_task`;
   private _addtasktemplateUrl = `${environment.api}/add_template_new_task`;
  private _getprivatetaskUrl = `${environment.api}/get_private_task`;
   private _getprivatetemplatetaskUrl = `${environment.api}/get_private_template_task`;
   private _gettemplatetaskUrl = `${environment.api}/get_template_task`;
 private _getusermessagedetailUrl = `${environment.api}/get_user_message_detail`
   private _getprivatearchivetaskUrl = `${environment.api}/get_private_archive_task`;
  private _getpublictaskUrl = `${environment.api}/get_public_task`;
  private _getprofiledataUrl = `${environment.api}/get_profile_data`;
  private _getprivatetaskoverviewUrl = `${environment.api}/get_private_task_overview`;
  private _getpublictaskoverviewUrl = `${environment.api}/get_public_task_overview`;
  private _getprivatetaskoverviewNewUrl = `${environment.api}/get_private_task_overview_new`;
  private _deleteprojectfilesUrl = `${environment.api}/delete_project_files`;
  private _deletetemplateprojectfilesUrl = `${environment.api}/delete_template_project_files`;
   private _deletetasktemplateprojectfilesUrl = `${environment.api}/delete_task_template_files`;
  private _updateTaskStatusdataUrl = `${environment.api}/update_task_statusdata`;
  private _updateTaskOwnerNameUrl = `${environment.api}/update_task_owner_name`;
  private _updateTaskStartDateUrl = `${environment.api}/update_task_start_date`;
  private _updateTaskEndDateUrl = `${environment.api}/update_task_end_date`;
  private _updatefileStatusUrl = `${environment.api}/update_file_status`;
  private _getprojectfilesoverviewUrl = `${environment.api}/get_project_files_overview`;
  private _getprojectfilesUrl = `${environment.api}/get_project_files`;
  private _gettemplateprojectfilesUrl = `${environment.api}/get_template_project_files`;
  private _getprojectdiscussionUrl = `${environment.api}/get_project_discussion`;
   private _getprojecttemplatediscussionUrl = `${environment.api}/get_project_template_discussion`;
  private _getprojectdiscussionarchiveUrl = `${environment.api}/get_project_discussion_archive`;
  private _getcompanyidUrl = `${environment.api}/get_company_id_check`;
  private _addprojectdiscussionUrl = `${environment.api}/add_project_discussion`;
   private _addtemplateprojectdiscussionUrl = `${environment.api}/add_template_discussion`;
  private _editprojectdiscussionUrl = `${environment.api}/edit_project_discussion`;
  private _editprojecttemplatediscussionUrl = `${environment.api}/edit_project_template_discussion`;
  private _getprojectdiscussiondetailUrl = `${environment.api}/get_project_discussion_detail`;
   private _getprojecttemplatediscussiondetailUrl = `${environment.api}/get_template_discussion_details`;
  private _getprojectnotesUrl = `${environment.api}/get_project_notes`;
  private _editprojectnotesUrl = `${environment.api}/edit_project_notes`;
  private _addprojectdiscussioncommentUrl = `${environment.api}/add_project_discussion_comment`;
   private _addprojecttemplatediscussioncommentUrl = `${environment.api}/add_template_comment`;
  private _getprojectdiscussioncommentUrl = `${environment.api}/get_project_discussion_comment`;
  private _gettemplateprojectdiscussioncommentUrl = `${environment.api}/get_template_project_discussion_comments`;
  private _replyprojectdiscussioncommentUrl = `${environment.api}/reply_project_discussion_comment`; 
  private _replytemplateprojectdiscussioncommentUrl = `${environment.api}/reply_project_template_discussion_comment`; 
  private _downloadprojectfileUrl = `${environment.api}/download_project_file`; 
  private _downloadcrmleadfileUrl = `${environment.api}/download_csv_file`;
   private _downloadbackupdataUrl = `${environment.api}/download_backup_data`; 
   private _downloadprojectdiscussionfileUrl = `${environment.api}/download_project_discussion_file`; 
  private _getprojectactivityUrl = `${environment.api}/get_project_activity`; 
  private _getallprojectactivityUrl = `${environment.api}/get_all_project_activity`; 
  private _addmeetingUrl = `${environment.api}/add_new_meeting`;
  private _addnotificationdetailUrl = `${environment.api}/add_notifications_detail`;
  private _updatemeetingUrl = `${environment.api}/update_meeting`;
  private _getProjectTaskDetailsUrl = `${environment.api}/get_project_task_details`;
  private _getProjecttemplateTaskDetailsUrl = `${environment.api}/get_template_task_details_by_id`;
  private _gettemplateTaskUrl = `${environment.api}/get_template_task_id`;
  private _updateTaskStatusUrl = `${environment.api}/update_task_status`;
  private _updateTemplateTaskStatusUrl = `${environment.api}/update_template_task_status`;
  private _updateTemplateStatusUrl = `${environment.api}/update_template_status`;
  private _updateTaskProrityUrl = `${environment.api}/update_task_prority`;
  private _updatetemplateTaskProrityUrl = `${environment.api}/update_template_task_priority`;
  private _updatetemplateProrityUrl = `${environment.api}/update_template_priority`;
  private _getprojecttaskfilesUrl = `${environment.api}/get_project_task_files`;
  private _gettemplateprojecttaskfilesUrl = `${environment.api}/get_template_project_task_files`;
  private _gettemplatetaskfilesUrl = `${environment.api}/get_template_task_files`;
  private _addtaskcomment = `${environment.api}/add_task_comment`;
  private _addtemplatetaskcomment = `${environment.api}/add_template_task_comment`;
   private _addtemplatecomment = `${environment.api}/add_task_template_comment`;
  private _getAllCommentsByTaskId = `${environment.api}/get_all_comments_by_task_id`;
  private _gettemplateCommentsByTaskId = `${environment.api}/get_template_comments_by_task_id`;
   private _gettemplateCommentUrl = `${environment.api}/get_template_comments`;
  private _addUserInProject = `${environment.api}/add_user_in_project`;
  private _getAllCompanyUser = `${environment.api}/get_all_company_user`;
  private _getAllnotificationUrl = `${environment.api}/get_project_notifications`;
   private _getAllCompanyUserarchive = `${environment.api}/get_all_company_user_archive`;
  private _getAllUsersWithProjectId = `${environment.api}/get_all_users_with_project_id`;
  private _addUserbyProjectId = `${environment.api}/add_user_by_project_id`;
  private _getAllProjectUsers = `${environment.api}/get_all_project_users`; 
  private _getAllProjectUsersForTask = `${environment.api}/get_project_user_for_task`; 
  private _getAllcompanyUsersForTask = `${environment.api}/get_company_user_for_task`; 
  private _gettemplatetaskdata = `${environment.api}/get_template_task_data`;
   private _getleaddetaildata = `${environment.api}/get_lead_detail`;
  private _updateLeadDataUrl = `${environment.api}/update_LeadForm_Data`;
  private _gettemplateprojectdata = `${environment.api}/get_template_project_data`;
  private _removeUserFromProject = `${environment.api}/remove_user_from_project`; 
  private _removeUserFromProjectuser = `${environment.api}/remove_user_from_projectuser`;
  private _removeUserFromProjectusernew = `${environment.api}/remove_user_from_projectuser_new`;  
  private _removediscussionfromprojectdiscussion = `${environment.api}/remove_discussion_from_projectdiscussion`;
  private _removeproject = `${environment.api}/remove_project`;
  private _removetemplateproject = `${environment.api}/remove_template_project`;
  private _removetemplatediscussionfromprojectdiscussion = `${environment.api}/remove_template_discussion_from_projectdiscussion`;
  private _removemessagefromusernotification = `${environment.api}/remove_message_from_usernotification`;
  private _deleteallnotificationUrl = `${environment.api}/delete_all_notification`;
  private _removediscussionfromprojectdiscussioncomment = `${environment.api}/remove_discussion_from_projectdiscussion_comment`;
  private _getUserRole = `${environment.api}/get_user_role`;
   private _getUserRolecompanyid = `${environment.api}/get_user_role_company_id`; 
  private _getAllTaskByStatus = `${environment.api}/get_all_task_by_status`; 
  private _getAllTask = `${environment.api}/get_all_tasks`; 
    private _getAllLead = `${environment.api}/get_all_leads`; 
  private _getAllTasknew = `${environment.api}/get_all_tasksnew`;
  
  private _updatetaskstatuss = `${environment.api}/update_task_statuss`;
    private _updatediscussiondata = `${environment.api}/update_discussion_data`;
    private _updatediscussiondetailurl = `${environment.api}/update_discussion_detail`;
	private _updatetemplatediscussiondetailurl = `${environment.api}/update_template_discussion_detail`;
	private _updatediscussionarchivedata = `${environment.api}/update_discussion_archive_data`;
	  private _updatetaskdata = `${environment.api}/update_task_data`;
	   private _updateprojecteditdata = `${environment.api}/update_projectedit_data`;
	   private _updateprojecteditarchivedata = `${environment.api}/update_projectedit_archive_data`;
	   private _updateusersdata = `${environment.api}/update_users_data`;
	    private _updateusersarchivedata = `${environment.api}/update_users_archive_data`;
	  private _updatetaskarchivedata = `${environment.api}/update_task_archive_data`;
  private _getAllTaskStatusByProjectId = `${environment.api}/get_all_task_status_by_project_id`;
  private _getAllTaskPriorityByProjectId = `${environment.api}/get_all_task_priority_by_project_id`;
  private _gethomediscussionUrl = `${environment.api}/get_home_discussion`;
  private _getprojectdataUrl = `${environment.api}/get_project_data`;
  private _gethomefilesoverviewUrl = `${environment.api}/get_home_files_overview`;
  private _getSourceList = `${environment.api}/get_source_list`;
   private _getSourceListmeeting = `${environment.api}/get_source_list_meeting`;
    private _getSourceListevent = `${environment.api}/get_source_list_event`;
  private _getDueTask = `${environment.api}/get_due_task`;
  private _getAllUsers = `${environment.api}/get_all_users`;
  private _updateusertaskdetail = `${environment.api}/update_task_detail`;
    private _updatetemplatetaskdetail = `${environment.api}/update_template_task_detail`;
	 private _updatetasktemplatedetail = `${environment.api}/update_template_by_id_detail`;
  private _updateusertask = `${environment.api}/update_task`;
  private _getProjectUserForMeeting = `${environment.api}/get_project_user_for_meeting`;
  private _getProjectUserForMeeting1 = `${environment.api}/get_project_user_for_meeting1`;
  private _checkEmailExist = `${environment.api}/check_email_exist`;
  private _addNewTaskType = `${environment.api}/add_new_task_type`;
   private _addtemplateTaskType = `${environment.api}/add_template_task_type`;
    private _addtitleTaskType = `${environment.api}/add_tile_task_type`;
  private _gatTaskType = `${environment.api}/gat_task_type`;
  private _gatTaskName = `${environment.api}/gat_task_name`;
  private _getTemplateProjectname = `${environment.api}/get_templateproject_name`;
   private _gatTaskTemplateType = `${environment.api}/gat_task_template_type`;
  private _gatTemplateType = `${environment.api}/gat_template_type`;
  private _getTheProjectsName = `${environment.api}/get_the_projects_name`;
  private updateProjectDetails = `${environment.api}/update_project_details`;
  private updateProjecttemplate = `${environment.api}/update_project_template`;
  private _resendInvitaion = `${environment.api}/resend_invitaion`;
  private _getUserForEdit = `${environment.api}/get_user_for_edit`;
  private _updateUserDetails = `${environment.api}/update_user_details`;
  private _getTaskTitleList = `${environment.api}/get_task_title_list`;
   private _gettemplateTaskTitleList = `${environment.api}/get_template_task_title_list`;
   private _gettemplateTitleList = `${environment.api}/get_template_title_list`;
  private _updateTaskTitle = `${environment.api}/update_task_title`;
   private _updatetemplateTaskTitle = `${environment.api}/update_template_task_title`;
    private _updatetemplateTitle = `${environment.api}/update_template_title`;
	 private _addformbuilderdata = `${environment.api}/add_formbuilder_data`;
  private _createNewFolder = `${environment.api}/create_new_folder`;
  private _createTemplateFolder = `${environment.api}/create_Template_folder`;
  private _deleteTaskTitle = `${environment.api}/delete_task_title`;
  private _deleteTask = `${environment.api}/delete_task`;
   private _deleteLead = `${environment.api}/delete_lead`;
   private _deletetemplateTaskTitle = `${environment.api}/delete_template_task_title`;
    private _deletetemplateTitleTask = `${environment.api}/delete_template_titletask`;
  private _checkDeleteTaskTitle = `${environment.api}/check_delete_task_title`;
  private _checkDeletetemplateTaskTitle = `${environment.api}/check_delete_template_task_title`;
  private _checkDeletetemplateTitle = `${environment.api}/check_delete_template_title`;
  private _getFileComments = `${environment.api}/get_file_comments`;
  private _addFileComments = `${environment.api}/add_file_comments`;
  private _getprojectfilesdataUrl = `${environment.api}/get_project_filesdata`;
  private _gettemplateprojectfilesdataUrl = `${environment.api}/get_project_template_filesdata`;
  private _deleteprojectfilesdataUrl = `${environment.api}/delete_project_filesdata`;
  private _deletetemplateprojectfilesdataUrl = `${environment.api}/delete_template_project_filesdata`;
  private _deletenotesdataUrl = `${environment.api}/delete_notes_data`;
  private _updatenewfolder = `${environment.api}/update_new_folder`;
  private _updatetemplatefolder = `${environment.api}/update_template_folder`;
  private _moveeprojectfilesUrl = `${environment.api}/move_project_files`;
   private _moveetemplateprojectfilesUrl = `${environment.api}/move_template_project_files`;
  private _getUserRoleAndPermissions = `${environment.api}/get_user_role_and_permissions`;
  private _getSelectedRolePermissions = `${environment.api}/get_selected_roles_permissions`;
  private _addUserRole = `${environment.api}/add_new_role`;
  private _updatePermissions = `${environment.api}/update_permissions`;
  private _updateRolename = `${environment.api}/update_role_name`;
   private _checkuniqueupdatetaskstatus = `${environment.api}/check_unique_updatetask_status`;
  private _checkuniquetaskstatus = `${environment.api}/check_unique_task_status`;
   private _savedata = `${environment.api}/export`;
   private _checkuniquefoldername = `${environment.api}/check_unique_folder_name`;
   private _checkuniquerolename = `${environment.api}/check_unique_role_name`;
   private _getalltaskwithdynamicstatus = `${environment.api}/get_all_task_with_dynamic_status_name`;
    private _checkuniquefoldereditname = `${environment.api}/check_unique_folder_edit_name`;
   private subject = new Subject<any>();
   private getprojectid = new BehaviorSubject('');
   get_project_id = this.getprojectid.asObservable();
  constructor(private http: HttpClient,private http2: Http) { }
  private salesofficeinuserListSource = new BehaviorSubject('');

  Currentimageupload = this.salesofficeinuserListSource.asObservable();
  
   changeprofileimage(imageupdate: any) {
    this.salesofficeinuserListSource.next(imageupdate)
  }

  set_project_id(id: any) {
    console.log(id);
    this.getprojectid.next(id)
  }
  save_project(data){
    return this.http.post<any>(this._createProjectUrl,data);
  }
    rotate_image(data){
    return this.http.post<any>(this._rotateimageUrl,data);
  }
  save_template_project(data){
    return this.http.post<any>(this._createTemplateProjectUrl,data);
  }
  get_all_project(data){
    return this.http.post<any>(this._getAllProjectUrl,data);
  }
  get_all_projects_template(){
    return this.http.get<any>(this._getAllProjecttemplateUrl);
  }
  
  get_all_task_with_dynamic_status_name(data){
    return this.http.post<any>(this._getalltaskwithdynamicstatus,data);
  }
  create_task_title_new(data){
    return this.http.post<any>(this._createtasktitlenewUrl,data);
  }
  Pdf_create_for_print(data){
    return this.http.post<any>(this._pdfCreateforPrint,data);
  }
  get_all_project_archive(){
    return this.http.get<any>(this._getAllProjectarchiveUrl);
  }
  get_all_project_for_calender(){
    return this.http.get<any>(this._getAllProjectUrlForCalender);
  }
  get_lead_owner_user(){
    return this.http.get<any>(this._getleadowneruser);
  }
get_user_message_detail(){
    return this.http.get<any>(this._getusermessagedetailUrl);
  }
  get_project_by_id(data){
    return this.http.post<any>(this._getprojectbyidUrl,data);
  }
  get_companytask_by_id(){
    return this.http.get<any>(this._getcompanybyidUrl);
  }
	get_project_template_by_id(data){
    return this.http.post<any>(this._getprojecttemplatebyidUrl,data);
  }
  check_test(data){
    return this.http.post<any>(this._checktestUrl,data);
  }
  check_unique_task_status(data){
    return this.http.post<any>(this._checkuniquetaskstatus,data);
  }
  Save_data(data){
    return this.http.post<any>(this._savedata,data);
  }
  check_unique_folder_name(data){
    return this.http.post<any>(this._checkuniquefoldername,data);
  }
  check_unique_role_name(data){
    return this.http.post<any>(this._checkuniquerolename,data);
  }
    check_unique_folder_edit_name(data){
    return this.http.post<any>(this._checkuniquefoldereditname,data);
  }
  check_unique_updatetask_status(data){
    return this.http.post<any>(this._checkuniqueupdatetaskstatus,data);
  }
  add_new_task(data){
    return this.http.post<any>(this._addnewtaskUrl,data);
  }
    createleadprofile(data){
    return this.http.post<any>(this._createleadprofileUrl,data);
  }
	add_template_task(data){
    return this.http.post<any>(this._addnewtasktemplateUrl,data);
  }
add_template_new_task(data){
    return this.http.post<any>(this._addtasktemplateUrl,data);
  }
  get_private_task(data){
    return this.http.post<any>(this._getprivatetaskUrl,data);
  }
  get_private_template_task(data){
    return this.http.post<any>(this._getprivatetemplatetaskUrl,data);
  }
   get_template_task(){
    return this.http.get<any>(this._gettemplatetaskUrl);
  } 
get_private_archive_task(data){
    return this.http.post<any>(this._getprivatearchivetaskUrl,data);
  }
  get_public_task(data){
    return this.http.post<any>(this._getpublictaskUrl,data);
  }
   get_profile_data(){
    return this.http.get<any>(this._getprofiledataUrl);
  }
  get_private_task_overview(data){
    return this.http.post<any>(this._getprivatetaskoverviewUrl,data);
  }

  get_private_task_overview_new(data){
    return this.http.post<any>(this._getprivatetaskoverviewNewUrl,data);
  }

  get_public_task_overview(data){
    return this.http.post<any>(this._getpublictaskoverviewUrl,data);
  }

  
  deletefiles(data){
    return this.http.post<any>(this._deleteprojectfilesUrl,data);
  }
    deletetemplatefiles(data){
    return this.http.post<any>(this._deletetemplateprojectfilesUrl,data);
  }
  deletetasktemplatefiles(data){
    return this.http.post<any>(this._deletetasktemplateprojectfilesUrl,data);
  }
  get_project_files_overview(data){
    return this.http.post<any>(this._getprojectfilesoverviewUrl,data);
  }
  get_project_files(data){
    return this.http.post<any>(this._getprojectfilesUrl,data);
  }
  get_template_project_files(data){
    return this.http.post<any>(this._gettemplateprojectfilesUrl,data);
  }
  get_project_task_files(data){
    return this.http.post<any>(this._getprojecttaskfilesUrl,data);
  }
   get_template_project_task_files(data){
    return this.http.post<any>(this._gettemplateprojecttaskfilesUrl,data);
  }
  get_template_task_files(data){
    return this.http.post<any>(this._gettemplatetaskfilesUrl,data);
  }
  get_project_notes(data){
    return this.http.post<any>(this._getprojectnotesUrl,data);
  }
  edit_project_notes(data){
    return this.http.post<any>(this._editprojectnotesUrl,data);
  }
  get_project_discussion(data){
    return this.http.post<any>(this._getprojectdiscussionUrl,data);
  }
    get_project_template_discussion(data){
    return this.http.post<any>(this._getprojecttemplatediscussionUrl,data);
  }
   get_project_discussion_archive(data){
    return this.http.post<any>(this._getprojectdiscussionarchiveUrl,data);
  }
  get_company_id_check(data){
    return this.http.post<any>(this._getcompanyidUrl,data);
  }
  add_new_discussion(data){
    return this.http.post<any>(this._addprojectdiscussionUrl,data);
  }
  add_template_discussion(data){
    return this.http.post<any>(this._addtemplateprojectdiscussionUrl,data);
  }
  edit_project_discussion(data){
    return this.http.post<any>(this._editprojectdiscussionUrl,data);
  }
   edit_project_template_discussion(data){
    return this.http.post<any>(this._editprojecttemplatediscussionUrl,data);
  }
  get_project_discussion_details(data){
    return this.http.post<any>(this._getprojectdiscussiondetailUrl,data);
  }
  get_template_discussion_details(data){
    return this.http.post<any>(this._getprojecttemplatediscussiondetailUrl,data);
  }
  
  add_new_comment(data){
    return this.http.post<any>(this._addprojectdiscussioncommentUrl,data);
  }
   add_template_comment(data){
   return this.http.post<any>(this._addprojecttemplatediscussioncommentUrl,data);
  }
  get_project_discussion_comments(data){
    return this.http.post<any>(this._getprojectdiscussioncommentUrl,data);
  }
get_template_project_discussion_comments(data){
    return this.http.post<any>(this._gettemplateprojectdiscussioncommentUrl,data);
  }
  reply_comment(data){
    return this.http.post<any>(this._replyprojectdiscussioncommentUrl,data);
  }
    reply_template_comment(data){
    return this.http.post<any>(this._replytemplateprojectdiscussioncommentUrl,data);
  }
	downloadFile(data): Observable<any> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob});
    return this.http2.post(this._downloadprojectfileUrl,data,options)
        .map(res => res.blob())
        .catch(this.handleError);
  }
download_csv_file(name): Observable<any> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http2.get(this._downloadcrmleadfileUrl+'/'+name, options)
        .map(res => res.blob())
        .catch(this.handleError);
  }

  get_backup(data): Observable<any> {
	  
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http2.post(this._downloadbackupdataUrl,data,options)
        .map(res => res.blob())
        .catch(this.handleError);
  }
  
  downloaddiscussionFile(data): Observable<any> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http2.post(this._downloadprojectdiscussionfileUrl, data ,options)
        .map(res => res.blob())
        .catch(this.handleError);
  }

handleError(){return 't';}

  get_project_activity(data){
    return this.http.post<any>(this._getprojectactivityUrl,data);
  }

  get_all_project_activity(data){
    return this.http.post<any>(this._getallprojectactivityUrl,data);
  }

  add_new_meeting(data){
    return this.http.post<any>(this._addmeetingUrl,data);
  }
  add_notifications_detail(data){
    return this.http.post<any>(this._addnotificationdetailUrl,data);
  }
  update_meeting(data){
    return this.http.post<any>(this._updatemeetingUrl,data);
  }
  get_project_task_details(data){
    return this.http.post<any>(this._getProjectTaskDetailsUrl,data);
  }
  get_template_task_details_by_id(data){
    return this.http.post<any>(this._getProjecttemplateTaskDetailsUrl,data);
  }
  get_template_task_id(data){
    return this.http.post<any>(this._gettemplateTaskUrl,data);
  }
  update_task_status(data){
    return this.http.post<any>(this._updateTaskStatusUrl,data);
  }
  update_template_task_status(data){
    return this.http.post<any>(this._updateTemplateTaskStatusUrl,data);
  }
    update_template_status(data){
    return this.http.post<any>(this._updateTemplateStatusUrl,data);
  }
  update_task_statuss(data){
    return this.http.post<any>(this._updatetaskstatuss,data);
  }
  update_task_priority(data){
    return this.http.post<any>(this._updateTaskProrityUrl,data);
  }
  update_template_task_priority(data){
    return this.http.post<any>(this._updatetemplateTaskProrityUrl,data);
  }
   update_template_priority(data){
    return this.http.post<any>(this._updatetemplateProrityUrl,data);
  }
  addTaskComment(data){
    return this.http.post<any>(this._addtaskcomment,data);
  }
  addTemplateTaskComment(data){
    return this.http.post<any>(this._addtemplatetaskcomment,data);
  }
   addTemplateComment(data){
    return this.http.post<any>(this._addtemplatecomment,data);
  }
  get_all_comments_by_task_id(data){
    return this.http.post<any>(this._getAllCommentsByTaskId,data);
  }

get_template_comments_by_task_id(data){
    return this.http.post<any>(this._gettemplateCommentsByTaskId,data);
  }
  
  get_template_comments(data){
    return this.http.post<any>(this._gettemplateCommentUrl,data);
  }
  add_user_in_project(data){
    return this.http.post<any>(this._addUserInProject,data);
  }
  get_all_company_user(){
    return this.http.get<any>(this._getAllCompanyUser);
  }
  get_project_notifications(){
    return this.http.get<any>(this._getAllnotificationUrl);
  }
  get_all_company_user_archive(){
    return this.http.get<any>(this._getAllCompanyUserarchive);
  }
  get_all_users_with_project_id(data){
    return this.http.post<any>(this._getAllUsersWithProjectId,data);
  }
  add_user_by_project_id(data){
    return this.http.post<any>(this._addUserbyProjectId,data);
  }
  get_all_project_users(data){
    return this.http.post<any>(this._getAllProjectUsers,data);
  }
  remove_user_from_project(data){
    return this.http.post<any>(this._removeUserFromProject,data);
  }
  remove_user_from_projectuser(data){
    return this.http.post<any>(this._removeUserFromProjectuser,data);
  }
  remove_user_from_projectuser_new(data){
    return this.http.post<any>(this._removeUserFromProjectusernew,data);
  }
   remove_discussion_from_projectdiscussion(data){
    return this.http.post<any>(this._removediscussionfromprojectdiscussion,data);
  }
  remove_project(data){
    return this.http.post<any>(this._removeproject,data);
  }
  remove_template_project(data){
    return this.http.post<any>(this._removetemplateproject,data);
  }
  remove_template_discussion_from_projectdiscussion(data){
    return this.http.post<any>(this._removetemplatediscussionfromprojectdiscussion,data);
  }
  remove_message_from_usernotification(data){
    return this.http.post<any>(this._removemessagefromusernotification,data);
  }
  delete_all_notification(){
    return this.http.get<any>(this._deleteallnotificationUrl);
  }
  remove_discussion_from_projectdiscussion_comment(data){
    return this.http.post<any>(this._removediscussionfromprojectdiscussioncomment,data);
  }
  get_project_user_for_task(data){
    return this.http.post<any>(this._getAllProjectUsersForTask,data);
  }
    get_company_user_for_task(data){
    return this.http.post<any>(this._getAllcompanyUsersForTask,data);
  }
   get_template_task_data(data){
    return this.http.post<any>(this._gettemplatetaskdata,data);
  }
  get_lead_detail(data){
    return this.http.post<any>(this._getleaddetaildata,data);
  }
  update_LeadForm_Data(data){
    return this.http.post<any>(this._updateLeadDataUrl,data);
  }
  get_template_project_data(data){
    return this.http.post<any>(this._gettemplateprojectdata,data);
  }
  get_project_user_for_meeting(data){
    return this.http.post<any>(this._getProjectUserForMeeting,data);
  }
  get_project_user_for_meeting1(){
    return this.http.get<any>(this._getProjectUserForMeeting1);
  }
  
  get_user_role(){
    return this.http.get<any>(this._getUserRole);
  }
  get_user_role_company_id(){
    return this.http.get<any>(this._getUserRolecompanyid);
  }
  get_all_task_by_status(data){
    return this.http.post<any>(this._getAllTaskByStatus,data);
  }
  get_all_tasksnew(){
    return this.http.get<any>(this._getAllTasknew);
  }
 
  update_discussion_data(data){
    return this.http.post<any>(this._updatediscussiondata,data);
  }
  update_discussion_detail(data){
    return this.http.post<any>(this._updatediscussiondetailurl,data);
  }
  update_template_discussion_detail(data){
    return this.http.post<any>(this._updatetemplatediscussiondetailurl,data);
  }
  update_discussion_archive_data(data){
    return this.http.post<any>(this._updatediscussionarchivedata,data);
  }
  update_task_data(data){
    return this.http.post<any>(this._updatetaskdata,data);
  }
  update_projectedit_data(data){
    return this.http.post<any>(this._updateprojecteditdata,data);
  }
  update_projectedit_archive_data(data){
    return this.http.post<any>(this._updateprojecteditarchivedata,data);
  }
  update_users_data(data){
    return this.http.post<any>(this._updateusersdata,data);
  }
  update_users_archive_data(data){
    return this.http.post<any>(this._updateusersarchivedata,data);
  }
  update_task_archive_data(data){
    return this.http.post<any>(this._updatetaskarchivedata,data);
  }
  get_all_tasks(){
    return this.http.get<any>(this._getAllTask);
  }
   get_all_leads(){
    return this.http.get<any>(this._getAllLead);
  }
  get_all_task_status_by_project_id(data){
    return this.http.post<any>(this._getAllTaskStatusByProjectId,data);
  }
  get_all_task_priority_by_project_id(data){
    return this.http.post<any>(this._getAllTaskPriorityByProjectId,data);
  }
  get_home_discussion(data){
    return this.http.post<any>(this._gethomediscussionUrl,data);
  }
  get_project_data(data){
    return this.http.post<any>(this._getprojectdataUrl,data);
  }
  get_home_files_overview(data){
    return this.http.post<any>(this._gethomefilesoverviewUrl,data);
  }

  get_source_list(data){
    return this.http.post<any>(this._getSourceList,data);
  }
   get_source_list_event(data){
    return this.http.post<any>(this._getSourceListevent,data);
  }
   get_source_list_meeting(data){
    return this.http.post<any>(this._getSourceListmeeting,data);
  }
  get_due_task(data){
    return this.http.post<any>(this._getDueTask,data);
  }
  get_all_users(){
    return this.http.get<any>(this._getAllUsers);
  }
  update_task_detail(data){
    return this.http.post<any>(this._updateusertaskdetail,data);
  }
  update_template_task_detail(data){
    return this.http.post<any>(this._updatetemplatetaskdetail,data);
  }
  update_template_by_id_detail(data){
    return this.http.post<any>(this._updatetasktemplatedetail,data);
  }
  update_task(data){
    return this.http.post<any>(this._updateusertask,data);
  }
  check_email_exist(data){
    return this.http.post<any>(this._checkEmailExist,data);
  }
  add_new_task_type(data){
    return this.http.post<any>(this._addNewTaskType,data);
  }
  add_template_task_type(data){
    return this.http.post<any>(this._addtemplateTaskType,data);
  }
  add_tile_task_type(data){
    return this.http.post<any>(this._addtitleTaskType,data);
  }
  gat_task_type(data){
    return this.http.post<any>(this._gatTaskType,data);
  }
  gat_task_name(){
    return this.http.get<any>(this._gatTaskName);
  }
  get_templateproject_name(){
    return this.http.get<any>(this._getTemplateProjectname);
  }
  gat_task_template_type(data){
    return this.http.post<any>(this._gatTaskTemplateType,data);
  }
   gat_template_type(){
    return this.http.get<any>(this._gatTemplateType);
  } 
  get_the_projects_name(){
    return this.http.get<any>(this._getTheProjectsName);
  }
  
  update_project_details(data){
    return this.http.post<any>(this.updateProjectDetails,data);
  }
	update_project_template(data){
    return this.http.post<any>(this.updateProjecttemplate,data);
  }
  resend_invitaion(data){
    return this.http.post<any>(this._resendInvitaion,data);
  }
  get_user_for_edit(data){
    return this.http.post<any>(this._getUserForEdit,data);
  }
  update_user_details(data){
    return this.http.post<any>(this._updateUserDetails,data);
  }
  get_task_title_list(data){
    return this.http.post<any>(this._getTaskTitleList,data);
  }
	get_template_task_title_list(data){
    return this.http.post<any>(this._gettemplateTaskTitleList,data);
  }
  get_template_title_list(){
    return this.http.get<any>(this._gettemplateTitleList);
  }
  update_task_title(data){
    return this.http.post<any>(this._updateTaskTitle,data);
  }
  update_template_task_title(data){
    return this.http.post<any>(this._updatetemplateTaskTitle,data);
  }
  update_template_title(data){
    return this.http.post<any>(this._updatetemplateTitle,data);
  }
  add_formbuilder_data(data){
    return this.http.post<any>(this._addformbuilderdata,data);
  }
  create_new_folder(data){
    return this.http.post<any>(this._createNewFolder,data);
  }
  create_template_folder(data){
    return this.http.post<any>(this._createTemplateFolder,data);
  }
  delete_task_title(data){
    return this.http.post<any>(this._deleteTaskTitle,data); 
  }
   delete_task(data){
    return this.http.post<any>(this._deleteTask,data); 
  }
     delete_lead(data){
    return this.http.post<any>(this._deleteLead,data); 
  }
  delete_template_task_title(data){
    return this.http.post<any>(this._deletetemplateTaskTitle,data); 
  }
  delete_template_titletask(data){
    return this.http.post<any>(this._deletetemplateTitleTask,data); 
  }
  check_delete_task_title(data){
    return this.http.post<any>(this._checkDeleteTaskTitle,data); 
  }
  check_delete_template_task_title(data){
    return this.http.post<any>(this._checkDeletetemplateTaskTitle,data); 
  }
  check_delete_template_title(data){
    return this.http.post<any>(this._checkDeletetemplateTitle,data); 
  }
  get_file_comments(data){
    return this.http.post<any>(this._getFileComments,data); 
  }
  add_file_comments(data){
    return this.http.post<any>(this._addFileComments,data); 
  }
  get_project_filesdata(data){
    return this.http.post<any>(this._getprojectfilesdataUrl,data);
  }
  get_project_template_filesdata(data){
    return this.http.post<any>(this._gettemplateprojectfilesdataUrl,data);
  }
  deletefilesdata(data){
    return this.http.post<any>(this._deleteprojectfilesdataUrl,data);
  }
  deletetemplatefilesdata(data){
    return this.http.post<any>(this._deletetemplateprojectfilesdataUrl,data);
  }
  delete_notes_data(data){
    return this.http.post<any>(this._deletenotesdataUrl,data);
  }

  update_new_folder(data){
    return this.http.post<any>(this._updatenewfolder,data);
  }
  update_template_folder(data){
    return this.http.post<any>(this._updatetemplatefolder,data);
  }
  movefiles(data){
    return this.http.post<any>(this._moveeprojectfilesUrl,data);
  }
  movetemplatefiles(data){
    return this.http.post<any>(this._moveetemplateprojectfilesUrl,data);
  }
  update_task_statusdata(data){
    return this.http.post<any>(this._updateTaskStatusdataUrl,data);
  }
  update_task_owner_name(data){
    return this.http.post<any>(this._updateTaskOwnerNameUrl,data);
  }
    update_task_start_date(data){
    return this.http.post<any>(this._updateTaskStartDateUrl,data);
  }
  update_task_end_date(data){
    return this.http.post<any>(this._updateTaskEndDateUrl,data);
  }
  update_file_status(data){
    return this.http.post<any>(this._updatefileStatusUrl,data);
  }
  get_user_role_and_permissions(){
    return this.http.get<any>(this._getUserRoleAndPermissions);
  }
  get_selected_roles_permissions(data){
    return this.http.post<any>(this._getSelectedRolePermissions,data);
  }
  add_user_role(data){
    return this.http.post<any>(this._addUserRole,data);
  }
  update_permissions(data){
    return this.http.post<any>(this._updatePermissions,data);
  }
  update_role_name(data){
    return this.http.post<any>(this._updateRolename,data);
  }

}
