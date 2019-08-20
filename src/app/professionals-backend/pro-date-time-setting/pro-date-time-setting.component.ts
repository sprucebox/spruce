import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pro-date-time-setting',
  templateUrl: './pro-date-time-setting.component.html',
  styleUrls: ['./pro-date-time-setting.component.css']
})
export class ProDateTimeSettingComponent implements OnInit {
  countries:any;
  checkbox:any;
  constructor(private _CreateaccountService:CreateaccountService,private _router: Router,private _activatedroute: ActivatedRoute,private toastr: ToastrService,private _app: AppComponent,) { }
  updatedatetimeData = {
    // company_timezone : '',
    company_dateformat : '',
    is_monday_firstday:'',
  
 };
 select_permissions:any;
 
  ngOnInit() {
    // this.get_all_timezone();
	this.get_datetime_detail();
    this.select_permissions = localStorage.getItem('permissions');
  }

  checkValue(event: any){
    
    this.updatedatetimeData.is_monday_firstday=event;
    console.log(this.updatedatetimeData.is_monday_firstday);
  }
  // get_all_timezone(){

    // this._CreateaccountService.get_all_timezone()
    // .subscribe(
      // res => {
        // this.countries = res.data;
      // },
      // err =>{
         // this._app.loading = false;
          // console.log(err.error.message);
    // if(err.error.message == "Token has expired")
// {			 
            // localStorage.clear();
           // this._router.navigate(["/login"]);
          // } else {
            // alert('Something Went Wrong!!');
          // }
        // }
    // );
  // }

  update_datetime_detail()
  {
	  console.log("mayuri123");
    localStorage.removeItem("company_dateformat");
    console.log(this.updatedatetimeData);
    this.updatedatetimeData.is_monday_firstday;
      this._CreateaccountService.update_datetime_detail(this.updatedatetimeData)
      .subscribe(
        res => {
			console.log(res.timezone);
          this.toastr.success('Date Updated', 'success');
          localStorage.setItem("company_dateformat",this.updatedatetimeData.company_dateformat);
		  // localStorage.setItem("timezonedata",res.timezone);
		  
          this._app.loading = false;
          
     },
     err =>{
     this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
      }

      );
  
  }
get_datetime_detail()
{
	console.log("mayu");
	 this._CreateaccountService.get_datetime_detail()
    .subscribe(
      res => {
       console.log("mayuri");
        console.log(res);
        // this.updatedatetimeData.company_timezone =res.data[0].company_timezone;
        this.updatedatetimeData.company_dateformat =res.data[0].company_dateformat;
        this.updatedatetimeData.is_monday_firstday =res.data[0].is_monday_firstday;
      
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
}
}
