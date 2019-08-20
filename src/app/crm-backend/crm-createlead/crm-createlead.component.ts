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
  selector: 'app-crm-createlead',
  templateUrl: './crm-createlead.component.html',
  styleUrls: ['./crm-createlead.component.css']
})
export class CrmCreateleadComponent implements OnInit {
addLeadFormData = {
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
lead_user:any;
current_page:string;
  constructor( private _router: Router,private _activatedroute: ActivatedRoute,private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private dragulaService: DragulaService,private toastr: ToastrService) { }

  ngOnInit() {
	   var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	  this.get_lead_owner_user();
	 
  }
  get_lead_owner_user(){
      this._app.loading = true;
console.log("mayuri");
     
      this._ProjectService.get_lead_owner_user()
      .subscribe(
        res => {
          
          
      console.log(res);
      this.lead_user= res.users;
	  console.log(this.lead_user);
		this._app.loading = false;
		
		
		
        },
        err => console.log(err)
      );
      
    }
createleadprofile(){
      this._app.loading = true;
  console.log(this.addLeadFormData);
     
      this._ProjectService.createleadprofile(this.addLeadFormData)
      .subscribe(
        res => {
          
          
      console.log(res);
      	this.toastr.success('Lead Detail Added', 'success');	
		this._app.loading = false;
		
		this._router.navigate([this.current_page+"/crmlead"]);
		
        },
        err => console.log(err)
      );
      
    }
	createlead(form){
      this._app.loading = true;
  console.log(this.addLeadFormData);
     
      this._ProjectService.createleadprofile(this.addLeadFormData)
      .subscribe(
        res => {
          
          
      console.log(res);
	  form.reset();
      	this.toastr.success('Lead Detail Added', 'success');	
		this._app.loading = false;
		
		this._router.navigate([this.current_page+"/crm-createlead"]);
		
        },
        err => console.log(err)
      );
      
    }
	
   
}

   
