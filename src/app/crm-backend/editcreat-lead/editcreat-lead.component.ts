import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-editcreat-lead',
  templateUrl: './editcreat-lead.component.html',
  styleUrls: ['./editcreat-lead.component.css']
})
export class EditcreatLeadComponent implements OnInit {
updateLeadFormData = {
	first_name:'',
    last_name : '',
    phone : '',
    email : '',
    company : '',
    secondary_contact : '',
    secondary_phone : '',
	project_type:'',
    job_specific :'' ,
    secondary_email :'' ,
    project_number : '',
    followUP_date: this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    Stage : '',
    lead_source : '',
	referral_name:'',
    confirm_walk_through : this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
    lead_owner : '',
	  is_active : '',
    sales_person : '',
	project_walk_note: '',
    time_window_availability : '',
    Street : '',
	  City : '',
    State : '',
	zip_code:'',
	 County : '',
    project_site_access : '',
  
	   project_information : '',
	 };
	 lead_id:any;
	 lead_user:any;
	 current_page:string;
   constructor( private _router: Router,private _activatedroute: ActivatedRoute,private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private dragulaService: DragulaService,private toastr: ToastrService) { }

  ngOnInit() {
	     var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	    this._activatedroute.params.subscribe(params => {
      this.lead_id = params['id'];
	  console.log(this.lead_id);
      });
	  this.get_lead_detail();
  }
get_lead_detail()
{
	 const data = {
		id : this.lead_id
	}
	console.log(data);
	this._ProjectService.get_lead_detail(data)
      .subscribe(
        res => {
          console.log(res.data);
          this.updateLeadFormData.first_name=res.data[0].firstname;
		  this.updateLeadFormData.last_name=res.data[0].lastname;
		  this.updateLeadFormData.phone=res.data[0].phone;
		  this.updateLeadFormData.email=res.data[0].email;
		  this.updateLeadFormData.company=res.data[0].company;
		  this.updateLeadFormData.secondary_contact=res.data[0].secondarycontact;
		  this.updateLeadFormData.secondary_phone=res.data[0].secondaryphone;
		  this.updateLeadFormData.project_type=res.data[0].projecttype;
		  this.updateLeadFormData.job_specific=res.data[0].jobspecific;
		  this.updateLeadFormData.secondary_email=res.data[0].secondaryemail;
		  this.updateLeadFormData.project_number=res.data[0].projectnumber;
		  this.updateLeadFormData.followUP_date=res.data[0].followupdate;
		  this.updateLeadFormData.Stage=res.data[0].stage;
		  this.updateLeadFormData.lead_source=res.data[0].leadsource;
		   this.updateLeadFormData.referral_name=res.data[0].referralname;
		    this.updateLeadFormData.confirm_walk_through=res.data[0].confirmwalkthrough;
			 this.updateLeadFormData.lead_owner=res.data[0].leadowner;
			  this.updateLeadFormData.is_active=res.data[0].is_active;
			   this.updateLeadFormData.sales_person=res.data[0].sales_person;
			    this.updateLeadFormData.project_walk_note=res.data[0].project_walk_note;
				 this.updateLeadFormData.time_window_availability=res.data[0].time_window_availblity;
				  this.updateLeadFormData.Street=res.data[0].street;
				    this.updateLeadFormData.City=res.data[0].city;
					  this.updateLeadFormData.State=res.data[0].state;
					   this.updateLeadFormData.zip_code=res.data[0].zipcode;
					    this.updateLeadFormData.County=res.data[0].country;
				 this.updateLeadFormData.project_site_access=res.data[0].project_site_access;
				 this.updateLeadFormData.project_information=res.data[0].description;
				  
				  
				  
		  
        },
        err =>{
          this._app.loading = false;

          console.log(err);
          this._router.navigate(["/login"]);
          }
      );
}


update_LeadForm_Data(){
      this._app.loading = true;
 const data ={
      id :this.lead_id,
	  first_name:this.updateLeadFormData.first_name,
	  last_name:this.updateLeadFormData.last_name,
	  phone:this.updateLeadFormData.phone,
	  email:this.updateLeadFormData.email,
	  company:this.updateLeadFormData.company,
	   secondarycontact:this.updateLeadFormData.secondary_contact,
	    secondaryphone:this.updateLeadFormData.secondary_phone,
		 projecttype:this.updateLeadFormData.project_type,
		  jobspecific:this.updateLeadFormData.job_specific,
		   secondaryemail:this.updateLeadFormData.secondary_email, 
		   projectnumber:this.updateLeadFormData.project_number,
		    followupdate:this.updateLeadFormData.followUP_date,
			 stage:this.updateLeadFormData.Stage,
			  leadsource:this.updateLeadFormData.lead_source, 
			  referralname:this.updateLeadFormData.referral_name,
			   confirmwalkthrough:this.updateLeadFormData.confirm_walk_through,
			    leadowner:this.updateLeadFormData.lead_owner,
				 is_active:this.updateLeadFormData.is_active,
				  sales_person:this.updateLeadFormData.sales_person,
				   project_walk_note:this.updateLeadFormData.project_walk_note,
				    time_window_availblity:this.updateLeadFormData.time_window_availability,
					 street:this.updateLeadFormData.Street,
					  city:this.updateLeadFormData.City,
					   state:this.updateLeadFormData.State,
					    zipcode:this.updateLeadFormData.zip_code,
					 country:this.updateLeadFormData.County,
					 project_site_access:this.updateLeadFormData.project_site_access,
					  description:this.updateLeadFormData.project_information,
	   
	  
	  
	  
    }
     console.log(data)
      this._ProjectService.update_LeadForm_Data(data)
      .subscribe(
        res => {
          
          
      console.log(res);
      	this.toastr.success('Lead Detail updated', 'success');	
		this._app.loading = false;
		
		this._router.navigate([this.current_page+"/crmlead"]);
		
        },
        err => console.log(err)
      );
      
    }
}
