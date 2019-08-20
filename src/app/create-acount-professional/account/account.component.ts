import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { FormBuilder,Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class CreateAcountProfessionalAccountComponent implements OnInit {
  professionalData = {
    company_name : '',
    company_website : '',
    est_year : '',
    company_size : '',
    company_contact_first_name : '',
    company_contact_last_name : '',
    company_contact_email : '',
    company_contact_mobile : '',
    company_address_street : '',
    company_address_suite : '',
    company_address_city : '',
    company_address_state : '',
    company_address_country : '',
    company_address_zip : '',
    company_corporate_name : '',
    company_tax_id : ''
  };
  countries:any;
  states:any;
  constructor(
    private _CreateaccountService:CreateaccountService,
    private _router: Router,
    private _app: AppComponent,
    private _EventService:EventService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.get_all_countries();
  }
  get_all_countries(){
    this._CreateaccountService.get_all_countries()
    .subscribe(
      res => {
        this.countries = res.data;
      },
      err => console.log(err)
    );
  }

  get_all_states(country_id){
    const data ={
      country_id:country_id,
    }

    this._CreateaccountService.get_all_state_by_country_id(data)
    .subscribe(
      res => {
        this.states = res.data;
      },
      err => console.log(err)
    );
  }
  createprofessionalAccount()
  {
    this._app.loading = true;
    this._CreateaccountService.createprofessionalAccount(this.professionalData)
    .subscribe(
      res => {
        this._router.navigate(["/create-account-professional/profile"]);
        this._app.loading = false;
      },
      err => console.log(err)
    );
    
  }
}
