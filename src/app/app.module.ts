import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularDateTimePickerModule } from './angular2-datetimepicker/datepicker.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../environments/environment.prod';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthServicenew } from './auth.service';
import { EventService } from './event.service';
import { ProjecteventService } from './services/projectevent.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';
import { DemoModalComponent } from './demo-modal/demo-modal.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateAccountHomeownerComponent } from './create-account-homeowner/create-account-homeowner.component';
import { CreateAccountHandymanComponent } from './create-account-handyman/create-account-handyman.component';
import { HomeOwnerBackendComponent } from './home-owner-backend/home-owner-backend.component';
import { HomeComponent } from './home-owner-backend/home/home.component';
import { ProfessionalsBackendComponent } from './professionals-backend/professionals-backend.component';
import { ProfessionalsHomeComponent } from './professionals-backend/professionals-home/professionals-home.component';
import { HomeOwnerProfileComponent } from './home-owner-backend/home-owner-profile/home-owner-profile.component';
import { CreateAcountProfessionalComponent } from './create-acount-professional/create-acount-professional.component';
import { CreateAcountProfessionalAccountComponent } from './create-acount-professional/account/account.component';
import { CreateAcountProfessionalProfileComponent } from './create-acount-professional/profile/profile.component';
import { CreateAcountProfessionalLicenseComponent } from './create-acount-professional/license/license.component';
import { CreateAcountProfessionalCheckComponent } from './create-acount-professional/check/check.component';
import { CreateAcountProfessionalCompletedComponent } from './create-acount-professional/completed/completed.component';
import { ProfessionalsProfileComponent } from './professionals-backend/professionals-profile/professionals-profile.component';
import { FileUploadModule  } from 'ng2-file-upload';
import { ProfessionalsProjectsComponent } from './professionals-backend/professionals-projects/professionals-projects.component';
import { ProfessionalsAddProjectComponent } from './professionals-backend/professionals-add-project/professionals-add-project.component';
import { ProjectOverviewComponent } from './professionals-backend/project-overview/project-overview.component';
import { ProjectTaskComponent } from './professionals-backend/project-task/project-task.component';
import { ProProjectCalendarComponent } from './professionals-backend/pro-project-calendar/pro-project-calendar.component';
import { ProProjectFilesComponent } from './professionals-backend/pro-project-files/pro-project-files.component';
import { ProProjectDiscussionComponent } from './professionals-backend/pro-project-discussion/pro-project-discussion.component';
import { ProProjectAddDiscussionComponent } from './professionals-backend/pro-project-add-discussion/pro-project-add-discussion.component';
import { ProProjectShowDiscussionComponent } from './professionals-backend/pro-project-show-discussion/pro-project-show-discussion.component';
import { ProProjectActivityComponent } from './professionals-backend/pro-project-activity/pro-project-activity.component';
import { ProProjectTaskEditComponent } from './professionals-backend/pro-project-task-edit/pro-project-task-edit.component';
import { GanttComponent } from './gantt/gantt.component';
import { SettingComponent } from './setting/setting.component';
import { ProUserSettingComponent } from './professionals-backend/pro-user-setting/pro-user-setting.component';
import { ProAddUserComponent } from './professionals-backend/pro-add-user/pro-add-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FilterPipe } from './filter.pipe';
import { DataFilterPipe } from './dataFilter.pipe';
import { NameFilterPipe } from './filterproject.pipe';
import { ProProjectUsersComponent } from './professionals-backend/pro-project-users/pro-project-users.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { DragulaModule } from 'ng2-dragula';
import { ProTaskComponent } from './professionals-backend/pro-task/pro-task.component';
import { ProProjectReportComponent } from './professionals-backend/pro-project-report/pro-project-report.component';
import { ProCalendarComponent } from './professionals-backend/pro-calendar/pro-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GrdFilterPipe } from './grd-filter.pipe';
import { ProProjectEditComponent } from './professionals-backend/pro-project-edit/pro-project-edit.component';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';
import { ProEditUserComponent } from './professionals-backend/pro-edit-user/pro-edit-user.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { ProDateTimeSettingComponent } from './professionals-backend/pro-date-time-setting/pro-date-time-setting.component';
import { ProNotificationSettingComponent } from './professionals-backend/pro-notification-setting/pro-notification-setting.component';
import { ProRoleSettingComponent } from './professionals-backend/pro-role-setting/pro-role-setting.component';
import { ProManageRoleComponent } from './professionals-backend/pro-manage-role/pro-manage-role.component';
import { ProColorSettingComponent } from './professionals-backend/pro-color-setting/pro-color-setting.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NotesComponent } from './professionals-backend/notes/notes.component';
import { AddnotesComponent } from './professionals-backend/addnotes/addnotes.component';
import { EditnotesComponent } from './professionals-backend/editnotes/editnotes.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDissucionArchiveComponent } from './project-dissucion-archive/project-dissucion-archive.component';
import { ProjectShowArchiveDiscussionComponent } from './project-show-archive-discussion/project-show-archive-discussion.component';
import { ProjectTaskArchiveComponent } from './project-task-archive/project-task-archive.component';
import { ProjectArchiveTaskEditComponent } from './project-archive-task-edit/project-archive-task-edit.component';
import { ProjectUserArchiveComponent } from './project-user-archive/project-user-archive.component';
import { ProjectEchiveUserShowComponent } from './project-echive-user-show/project-echive-user-show.component';
import { ProjectShowArchiveComponent } from './project-show-archive/project-show-archive.component';
import { ProjectEditArchiveDetailComponent } from './project-edit-archive-detail/project-edit-archive-detail.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProjectDiscussionEditComponent } from './project-discussion-edit/project-discussion-edit.component';
import { FullMessageComponent } from './full-message/full-message.component';
import { TemplateSettingComponent } from './template-setting/template-setting.component';
import { AddProjectTemplateComponent } from './add-project-template/add-project-template.component';
import { EditProjectTemplateComponent } from './edit-project-template/edit-project-template.component';
import { TemplateProjectTaskComponent } from './template-project-task/template-project-task.component';
import { TemplateProjectEditTaskComponent } from './template-project-edit-task/template-project-edit-task.component';
import { TemplateProjectDiscussionComponent } from './template-project-discussion/template-project-discussion.component';
import { TemplateProjectAddDiscussionComponent } from './template-project-add-discussion/template-project-add-discussion.component';
import { TemplateProjectShowDiscussionComponent } from './template-project-show-discussion/template-project-show-discussion.component';
import { TemplateProjectDiscussionEditComponent } from './template-project-discussion-edit/template-project-discussion-edit.component';
import { TemplateProjectFileComponent } from './template-project-file/template-project-file.component';
import { PipeComponent } from './pipe/pipe.component';
import { SafePipe } from './safe.pipe';
import { InputTrimModule } from 'ng2-trim-directive';
import { TemplateEditTaskComponent } from './template-edit-task/template-edit-task.component';
import { FormComponent } from './form/form.component';
import {FileUploadModule as FileUpload} from 'primeng/fileupload';
import {MomentModule} from 'angular2-moment';
import { BackupComponent } from './backup/backup.component';
import { CrmoverviewComponent } from './crm-backend/crmoverview/crmoverview.component';
import { CrmBackendComponent } from './crm-backend/crm-backend.component';
import { CrmleadComponent } from './crm-backend/crmlead/crmlead.component';
import { CramdealComponent } from './crm-backend/cramdeal/cramdeal.component';
import { CrmcontactComponent } from './crm-backend/crmcontact/crmcontact.component';
import { CrmcustmorsComponent } from './crm-backend/crmcustmors/crmcustmors.component';
import { CrmvendorsComponent } from './crm-backend/crmvendors/crmvendors.component';
import { CrmappointmentComponent } from './crm-backend/crmappointment/crmappointment.component';
import { CrmreportComponent } from './crm-backend/crmreport/crmreport.component';
import { CrmCreateleadComponent } from './crm-backend/crm-createlead/crm-createlead.component';
import { CrmViewleadComponent } from './crm-backend/crm-viewlead/crm-viewlead.component';
import { CreateEstimateComponent } from './crm-backend/create-estimate/create-estimate.component';
import { CrmViewdealComponent } from './crm-backend/crm-viewdeal/crm-viewdeal.component';
import { CrmCreateDealComponent } from './crm-backend/crm-create-deal/crm-create-deal.component';
import { UploadContractComponent } from './crm-backend/upload-contract/upload-contract.component';
import { CrmCreateContactComponent } from './crm-backend/crm-create-contact/crm-create-contact.component';
import { CrmViewContactComponent } from './crm-backend/crm-view-contact/crm-view-contact.component';
import { EditcreatLeadComponent } from './crm-backend/editcreat-lead/editcreat-lead.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';  
import { TruncateModule } from 'ng2-truncate';

import {TooltipModule} from 'primeng/tooltip';

//import { AddstatusComponent } from './addstatus/addstatus.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  // url: `${environment.api}/project_file_upload_for_web`,
  
 
    // maxFilesize: 50485760,
          
    // dictDefaultMessage: "custom message",
   // addRemoveLinks: true,
   // dictRemoveFile: 'Remove file',
        // dictFileTooBig: 'Image is larger than 16MB',
        // timeout: 10000,
  // acceptedFiles: 'image/*,application/pdf,application/msword,text/html,video/mpeg,audio/mpeg3,video/mp4,audio/mp3,text/plain,application/vnd.ms-excel,application/docx',
  
    
  //addRemoveLinks: true, 
  // maxfilesexceeded: function(file) {
        // this.removeAllFiles();
        // this.addFile(file);
    // }
 
  
  // dictRemoveFileConfirmation: 'Are you sure you want to remove this file?'
    
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('219941630903-rlscla1e31bjshmd25mod4b6phtfqviq.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('697806063920153')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    DemoModalComponent,
    CreateAccountComponent,
    CreateAccountHomeownerComponent,
    CreateAccountHandymanComponent,
    HomeOwnerBackendComponent,
    HomeComponent,
    ProfessionalsBackendComponent,
    ProfessionalsHomeComponent,
    HomeOwnerProfileComponent,
    CreateAcountProfessionalComponent,
    CreateAcountProfessionalAccountComponent,
    CreateAcountProfessionalProfileComponent,
    CreateAcountProfessionalLicenseComponent,
    CreateAcountProfessionalCheckComponent,
    CreateAcountProfessionalCompletedComponent,
    ProfessionalsProfileComponent,
    ProfessionalsProjectsComponent,
    ProfessionalsAddProjectComponent,
    ProjectOverviewComponent,
    ProjectTaskComponent,
    ProProjectCalendarComponent,
    ProProjectFilesComponent,
    ProProjectDiscussionComponent,
    ProProjectAddDiscussionComponent,
    ProProjectShowDiscussionComponent,
    ProProjectActivityComponent,
    ProProjectTaskEditComponent,
    GanttComponent,
    SettingComponent,
    ProUserSettingComponent,
    ProAddUserComponent,
    ForgotPasswordComponent,
    FilterPipe,
	DataFilterPipe,
	NameFilterPipe,
    ProProjectUsersComponent,
    ProTaskComponent,
    ProProjectReportComponent,
    ProCalendarComponent,
    GrdFilterPipe,
    ProProjectEditComponent,
    AcceptInvitationComponent,
    ProEditUserComponent,
    ProDateTimeSettingComponent,
    ProNotificationSettingComponent,
    ProRoleSettingComponent,
    ProManageRoleComponent,
    ProColorSettingComponent,
    NotesComponent,
    AddnotesComponent,
    EditnotesComponent,
    ProjectComponent,
    ProjectDissucionArchiveComponent,
    ProjectShowArchiveDiscussionComponent,
    ProjectTaskArchiveComponent,
    ProjectArchiveTaskEditComponent,
    ProjectUserArchiveComponent,
    ProjectEchiveUserShowComponent,
    ProjectShowArchiveComponent,
    ProjectEditArchiveDetailComponent,
    PrivacyPolicyComponent,
    ProjectDiscussionEditComponent,
    FullMessageComponent,
    TemplateSettingComponent,
    AddProjectTemplateComponent,
    EditProjectTemplateComponent,
    TemplateProjectTaskComponent,
    TemplateProjectEditTaskComponent,
    TemplateProjectDiscussionComponent,
    TemplateProjectAddDiscussionComponent,
    TemplateProjectShowDiscussionComponent,
    TemplateProjectDiscussionEditComponent,
    TemplateProjectFileComponent,
    PipeComponent,
    SafePipe,
    TemplateEditTaskComponent,
    FormComponent,
    BackupComponent,
    CrmoverviewComponent,
    CrmBackendComponent,
    CrmleadComponent,
    CramdealComponent,
    CrmcontactComponent,
    CrmcustmorsComponent,
    CrmvendorsComponent,
    CrmappointmentComponent,
    CrmreportComponent,
    CrmCreateleadComponent,
    CrmViewleadComponent,
    CreateEstimateComponent,
    CrmViewdealComponent,
    CrmCreateDealComponent,
    UploadContractComponent,
    CrmCreateContactComponent,
    CrmViewContactComponent,
    EditcreatLeadComponent,
    
   
    
 
    
    //AddstatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingModule,
    FullCalendarModule,
    FileUploadModule,
    DropzoneModule,
    NgxEditorModule,
    HttpModule,
	FileUpload,
    AngularDateTimePickerModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
	TruncateModule,
TooltipModule,

    DragulaModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    SocialLoginModule,
    ColorPickerModule,
  InputTrimModule,
  
  MomentModule
	 
	
  ],
  exports: [
    ColorPickerModule
  ],
  providers: [AuthServicenew,AuthGuard,EventService,ProjecteventService,DatePipe,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  },{
    provide : AuthServiceConfig,
    useFactory: provideConfig,
  },{
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
