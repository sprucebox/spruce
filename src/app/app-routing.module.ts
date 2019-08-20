import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateAccountHomeownerComponent } from './create-account-homeowner/create-account-homeowner.component';
import { CreateAccountHandymanComponent } from './create-account-handyman/create-account-handyman.component';
import { HomeOwnerBackendComponent } from './home-owner-backend/home-owner-backend.component';
import { HomeComponent } from './home-owner-backend/home/home.component';
import { ProfessionalsBackendComponent } from './professionals-backend/professionals-backend.component';
import { CrmBackendComponent } from './crm-backend/crm-backend.component';
import { CrmoverviewComponent } from './crm-backend/crmoverview/crmoverview.component';
import { CrmleadComponent } from './crm-backend/crmlead/crmlead.component';
import { ProfessionalsHomeComponent } from './professionals-backend/professionals-home/professionals-home.component';
import { HomeOwnerProfileComponent } from './home-owner-backend/home-owner-profile/home-owner-profile.component';
import { DemoModalComponent } from './demo-modal/demo-modal.component';
import { CreateAcountProfessionalComponent } from './create-acount-professional/create-acount-professional.component';
import { CreateAcountProfessionalAccountComponent } from './create-acount-professional/account/account.component';
import { CreateAcountProfessionalProfileComponent } from './create-acount-professional/profile/profile.component';
import { CreateAcountProfessionalLicenseComponent } from './create-acount-professional/license/license.component';
import { CreateAcountProfessionalCheckComponent } from './create-acount-professional/check/check.component';
import { CreateAcountProfessionalCompletedComponent } from './create-acount-professional/completed/completed.component';
import { ProfessionalsProfileComponent } from './professionals-backend/professionals-profile/professionals-profile.component';
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
import { AuthGuard } from './auth.guard';
import { ProUserSettingComponent } from './professionals-backend/pro-user-setting/pro-user-setting.component';
import { ProAddUserComponent } from './professionals-backend/pro-add-user/pro-add-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProProjectUsersComponent } from './professionals-backend/pro-project-users/pro-project-users.component';
import { ProTaskComponent } from './professionals-backend/pro-task/pro-task.component';
import { ProProjectReportComponent } from './professionals-backend/pro-project-report/pro-project-report.component';
import { ProCalendarComponent } from './professionals-backend/pro-calendar/pro-calendar.component';
import { ProProjectEditComponent } from './professionals-backend/pro-project-edit/pro-project-edit.component';
import { AcceptInvitationComponent } from './accept-invitation/accept-invitation.component';
import { ProEditUserComponent } from './professionals-backend/pro-edit-user/pro-edit-user.component';
import { ProDateTimeSettingComponent } from './professionals-backend/pro-date-time-setting/pro-date-time-setting.component';
import { ProNotificationSettingComponent } from './professionals-backend/pro-notification-setting/pro-notification-setting.component';
import { ProRoleSettingComponent } from './professionals-backend/pro-role-setting/pro-role-setting.component';
import { ProManageRoleComponent } from './professionals-backend/pro-manage-role/pro-manage-role.component';
import { ProColorSettingComponent } from './professionals-backend/pro-color-setting/pro-color-setting.component';
import { NotesComponent } from './professionals-backend/notes/notes.component';
import { AddnotesComponent } from './professionals-backend/addnotes/addnotes.component';
import { EditnotesComponent } from './professionals-backend/editnotes/editnotes.component';
import { ProjectDissucionArchiveComponent } from './project-dissucion-archive/project-dissucion-archive.component';
//import { AddstatusComponent } from './addstatus/addstatus.component';
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
import { TemplateEditTaskComponent } from './template-edit-task/template-edit-task.component';
import { FormComponent } from './form/form.component';
import { BackupComponent } from './backup/backup.component';
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
const routes: Routes = [
  {
    path : "",
    redirectTo : "/login",
    pathMatch : "full"
  },{
    path : "demo",
    component : DemoModalComponent,
  },
  {
    path : "events",
    component : EventsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "special",
    component:SpecialEventsComponent,
    canActivate : [AuthGuard]
    
  },
  {
    path: "login",
    component : LoginComponent
  },
  {
    path: "privacy-policy",
    component : PrivacyPolicyComponent
  },
  {
    path: "logout",
    component : LoginComponent
  },
  {
    path : "register",
    component : RegisterComponent    
  },
  {
    path : "accept_invitation/:secret",
    component : AcceptInvitationComponent    
  },
  {
    path: "forgot-password",
    component : ForgotPasswordComponent,
    
  },
  {
    path: "create-account",
    component : CreateAccountComponent,
    
  },
  {
    path: "create-account-homeowner",
    component : CreateAccountHomeownerComponent
  },
  {
    path: "create-account-handyman",
    component : CreateAccountHandymanComponent
  },
  {
    path: "home-owner",
    component : HomeOwnerBackendComponent,
    children: [                          
      {
          path:'home',
          component: ProfessionalsHomeComponent
      },
      {
        path:'myprofile',
        component: HomeOwnerProfileComponent
      },{
        path:'projects',
        component: ProfessionalsProjectsComponent
      },{
        path:'add-projects',
        component: ProfessionalsAddProjectComponent
      },{
        path:'add-project-template',
        component: AddProjectTemplateComponent
      },{
        path:'project-overview/:id',
        component: ProjectOverviewComponent
      },{
        path:'project-task/:id',
        component: ProjectTaskComponent
      },{
        path:'template-project-task/:id',
        component: TemplateProjectTaskComponent
      },{
        path:'project-calendar/:id',
        component: ProProjectCalendarComponent
      },{
        path:'project-files/:id',
        component: ProProjectFilesComponent
      },{
        path:'template-project-file/:id',
        component: TemplateProjectFileComponent
      },{
        path:'project-files/:id/:folder_id',
        component: ProProjectFilesComponent
      },{
        path:'template-project-file/:id/:folder_id',
        component: TemplateProjectFileComponent
      },
      {
        path:'project-discussion/:id',
        component: ProProjectDiscussionComponent
      },{
        path:'template-project-discussion/:id',
        component: TemplateProjectDiscussionComponent
      },{
        path:'project-add-discussion/:id',
        component: ProProjectAddDiscussionComponent
      },{
        path:'template-project-add-discussion/:id',
        component:TemplateProjectAddDiscussionComponent
      },{
        path:'project-show-discussion/:id/:did',
        component: ProProjectShowDiscussionComponent
      },{
        path:'template-project-show-discussion/:id/:did',
        component: TemplateProjectShowDiscussionComponent
      },{
        path:'project-discussion-edit/:id/:did',
        component:  ProjectDiscussionEditComponent
      },{
        path:'template-project-discussion-edit/:id/:did',
        component:  TemplateProjectDiscussionEditComponent
      },{
        path:'project-activity/:id',
        component: ProProjectActivityComponent
      },{
        path:'project-task-edit/:id/:taskid',
        component: ProProjectTaskEditComponent
      },{
        path:'template-project-edit-task/:id/:taskid',
        component: TemplateProjectEditTaskComponent
      },{
        path:'template-edit-task/:taskid',
        component: TemplateEditTaskComponent
      }
      ,{
        path:'project-users/:id',
        component: ProProjectUsersComponent
      },{
        path:'project-reports/:id',
        component: ProProjectReportComponent
      },
      {
        path:'user-setting',
        component: ProUserSettingComponent,
       },
       {
        path:'date-time-setting',
        component: ProDateTimeSettingComponent,
       }
       ,{
        path:'template-setting',
        component: TemplateSettingComponent,
       },{
        path:'add-user',
        component: ProAddUserComponent,
       },{
        path:'project-user-archive',
        component: ProjectUserArchiveComponent,
       },{
        path:'task',
        component: ProTaskComponent,
       },{
        path:'calendar',
        component: ProCalendarComponent,
       },{
        path:'edit-project/:id',
        component: ProProjectEditComponent,
       },{
        path:'edit-project-template/:id',
        component: EditProjectTemplateComponent,
       },{
        path:'edit-user/:id',
        component: ProEditUserComponent,
       },{
        path:'role-setting',
        component: ProRoleSettingComponent,
       },{
        path:'color-setting',
        component: ProColorSettingComponent,
       },{
        path:'notification-setting',
        component: ProNotificationSettingComponent,
       },{
        path:'project-user-archive',
        component: ProjectUserArchiveComponent,
       },{
        path:'project-show-archive',
        component: ProjectShowArchiveComponent
      },{
        path:'project-show-archive-discussion/:id/:did',
        component: ProjectShowArchiveDiscussionComponent
      },{
        path:'project-archive-task-edit/:id/:taskid',
        component: ProjectArchiveTaskEditComponent
      },{
        path:'project-edit-archive-detail/:id',
        component: ProjectEditArchiveDetailComponent,
       },{
        path:'project-echive-user-show/:id',
        component: ProjectEchiveUserShowComponent,
       },{
        path:'notes/:id',
        component:NotesComponent,
       },
     {
        path:'addnotes/:id',
        component:AddnotesComponent,
       },
     {
        path:'editnotes/:id/:noteid',
        component:EditnotesComponent,
       },
       {
        path:'full-message',
        component: FullMessageComponent,
       },{
        path:'backup',
        component: BackupComponent
      }
       
    ],
    canActivate : [AuthGuard]
  },
  {
    path: "professionals",
    component : ProfessionalsBackendComponent,
    children: [                          
      {
          path:'home',
          component: ProfessionalsHomeComponent
      },
	   {
          path:'crmoverview',
          component: CrmoverviewComponent
      },
      {
        path:'myprofile',
        component: ProfessionalsProfileComponent
      },{
        path:'projects',
        component: ProfessionalsProjectsComponent
      },{
        path:'project-show-archive',
        component: ProjectShowArchiveComponent
      },{
        path:'add-projects',
        component: ProfessionalsAddProjectComponent
      },{
        path:'add-project-template',
        component: AddProjectTemplateComponent
      },{
        path:'backup',
        component: BackupComponent
      },{
        path:'project-overview/:id',
        component: ProjectOverviewComponent
      },{
        path:'project-task/:id',
        component: ProjectTaskComponent
      },{
        path:'template-project-task/:id',
        component: TemplateProjectTaskComponent
      },{
        path:'project-task-archive/:id',
        component: ProjectTaskArchiveComponent
      },{
        path:'project-calendar/:id',
        component: ProProjectCalendarComponent
      },{
        path:'project-files/:id',
        component: ProProjectFilesComponent
      },{
        path:'template-project-file/:id',
        component: TemplateProjectFileComponent
      },{
        path:'project-files/:id/:folder_id',
        component: ProProjectFilesComponent
      },{
        path:'template-project-file/:id/:folder_id',
        component: TemplateProjectFileComponent
      },{
        path:'project-discussion/:id',
        component: ProProjectDiscussionComponent
      },{
        path:'template-project-discussion/:id',
        component:TemplateProjectDiscussionComponent
      },{
        path:'project-add-discussion/:id',
        component: ProProjectAddDiscussionComponent
      },{
        path:'template-project-add-discussion/:id',
        component:TemplateProjectAddDiscussionComponent
      },{
        path:'project-show-discussion/:id/:did',
        component: ProProjectShowDiscussionComponent
      },{
        path:'template-project-show-discussion/:id/:did',
        component: TemplateProjectShowDiscussionComponent
      },{
        path:'project-discussion-edit/:id/:did',
        component:  ProjectDiscussionEditComponent
      },{
        path:'template-project-discussion-edit/:id/:did',
        component:  TemplateProjectDiscussionEditComponent
      },{
        path:'project-show-archive-discussion/:id/:did',
        component: ProjectShowArchiveDiscussionComponent
      },
	  {
        path:'project-dissucion-archive/:id',
        component: ProjectDissucionArchiveComponent
      },{
        path:'project-activity/:id',
        component: ProProjectActivityComponent
      },{
        path:'project-task-edit/:id/:taskid',
        component: ProProjectTaskEditComponent
      },
      {
        path:'template-project-edit-task/:id/:taskid',
        component: TemplateProjectEditTaskComponent
      },{
        path:'template-edit-task/:taskid',
        component: TemplateEditTaskComponent
      }
      ,{
        path:'project-archive-task-edit/:id/:taskid',
        component: ProjectArchiveTaskEditComponent
      }
      ,{
        path:'project-users/:id',
        component: ProProjectUsersComponent
      },{
        path:'project-reports/:id',
        component: ProProjectReportComponent
      },
      {
        path:'user-setting',
        component: ProUserSettingComponent,
       },{
        path:'full-message',
        component: FullMessageComponent,
       },{
        path:'date-time-setting',
        component: ProDateTimeSettingComponent,
       },{
        path:'form',
        component: FormComponent,
       },
      //  {
      //   path:'addstatus',
      //   component:AddstatusComponent,
      //  },
       {
        path:'notification-setting',
        component: ProNotificationSettingComponent,
       },{
        path:'template-setting',
        component: TemplateSettingComponent,
       },
       {
          path:'notes/:id',
          component:NotesComponent,
         },
       {
          path:'addnotes/:id',
          component:AddnotesComponent,
         },
       {
          path:'editnotes/:id/:noteid',
          component:EditnotesComponent,
         },{
        path:'role-setting',
        component: ProRoleSettingComponent,
       },{
        path:'color-setting',
        component: ProColorSettingComponent,
       }
       ,{
        path:'manage-role',
        component: ProManageRoleComponent,
       },{
        path:'add-user',
        component: ProAddUserComponent,
       },{
        path:'project-user-archive',
        component: ProjectUserArchiveComponent,
       },{
        path:'task',
        component: ProTaskComponent,
       },{
        path:'calendar',
        component: ProCalendarComponent,
       },{
        path:'edit-project/:id',
        component: ProProjectEditComponent,
       },{
        path:'edit-project-template/:id',
        component: EditProjectTemplateComponent,
       },
	   {
        path:'project-edit-archive-detail/:id',
        component: ProjectEditArchiveDetailComponent,
       },
	   {
        path:'edit-user/:id',
        component: ProEditUserComponent,
       },
	  
	   {
        path:'project-echive-user-show/:id',
        component: ProjectEchiveUserShowComponent,
       },{
          path:'crmoverview',
          component: CrmoverviewComponent
      }, {
          path:'home',
          component: ProfessionalsHomeComponent
      },
      {
        path:'myprofile',
        component: ProfessionalsProfileComponent
      },{
        path:'projects',
        component: ProfessionalsProjectsComponent
      }	 
       
    ],
    canActivate : [AuthGuard]
  },
  {
    path: "CRM",
    component : CrmBackendComponent,
    children: [                          
      {
          path:'crmoverview',
          component: CrmoverviewComponent
      }, {
          path:'home',
          component: ProfessionalsHomeComponent
      },
      {
        path:'myprofile',
        component: ProfessionalsProfileComponent
      },{
        path:'full-message',
        component: FullMessageComponent,
       },{
        path:'user-setting',
        component: ProUserSettingComponent,
       },{
        path:'projects',
        component: ProfessionalsProjectsComponent
      },{
        path:'task',
        component: ProTaskComponent,
       },{
        path:'calendar',
        component: ProCalendarComponent,
       },
	  {
        path:'crmlead',
        component: CrmleadComponent
      },{
        path:'cramdeal',
        component: CramdealComponent
      },{
        path:'crmcontact',
        component: CrmcontactComponent
      },
	  {
        path:'crmcustmors',
        component: CrmcustmorsComponent
      },{
        path:'crmvendors',
        component: CrmvendorsComponent
      },{
        path:'crmappointment',
        component: CrmappointmentComponent
      },{
        path:'crmreport',
        component: CrmreportComponent
      },{
        path:'crm-createlead',
        component: CrmCreateleadComponent
      },{
        path:'crm-viewlead',
        component: CrmViewleadComponent
      },
	  {
        path:'create-estimate',
        component: CreateEstimateComponent
      },{
        path:'crm-viewdeal',
        component:CrmViewdealComponent
      },
	  {
        path:'crm-create-deal',
        component:CrmCreateDealComponent
      },{
        path:'upload-contract',
        component:UploadContractComponent
      },{
        path:'crm-create-contact',
        component:CrmCreateContactComponent
      },{
        path:'crm-view-contact',
        component:CrmViewContactComponent
      },
	  {
        path:'editcreat-lead/:id',
        component:EditcreatLeadComponent,
       }
       
    ],
    canActivate : [AuthGuard]
  },
  {
    path: "create-account-professional",
    component : CreateAcountProfessionalComponent,
    children: [                          
      {
          path:'account',
          component: CreateAcountProfessionalAccountComponent
      },
      {
        path:'profile',
        component: CreateAcountProfessionalProfileComponent
      },
      {
        path:'license',
        component: CreateAcountProfessionalLicenseComponent
      },
      {
        path:'check',
        component: CreateAcountProfessionalCheckComponent
      },
      {
        path:'completed',
        component: CreateAcountProfessionalCompletedComponent
    }
    ],
    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
