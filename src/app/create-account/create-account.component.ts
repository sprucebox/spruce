import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../createaccount.service';
import { FormBuilder,Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css','../../assets/front-assets/css/price-range.css']
})
export class CreateAccountComponent implements OnInit {
  private checked_specialities:string[]=[];
  trades:any[]=[];

  err_message : string;
  specialities : any;
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

  professionalProfileData ={
    speciality:[]

  };
  referencesForm = this.fb.group({
    references: this.fb.array([this.fb.group({experience_id:'',name:'',number:'',email:'',note:''})])
  });

  licenseForm = this.fb.group({
    licenses: this.fb.array([this.fb.group({state_id:'',license_number:'',status:''})])
  });
  
  constructor(
    private _CreateaccountService:CreateaccountService,
    private _router: Router,
    private _app: AppComponent,
    private _EventService:EventService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllSpeciality();
  }

  createprofessionalAccount()
  {
    this._app.loading = true;
    this._CreateaccountService.createprofessionalAccount(this.professionalData)
    .subscribe(
      res => {
        console.log(res);     
        this._app.loading = false;
      },
      err => console.log(err)
    );
    
  }

checkdata(){
  
  const sendData = {
    specialities:this.checked_specialities,
    workexpireance:this.referencesForm.value.references,
    trades:this.trades
  }
  console.log(sendData);
  this._CreateaccountService.professionalcompanyprofile(sendData)
  .subscribe(
    res => {
            
     
      console.log(res);
    },
    err => console.log(err)
  );
}
  
getAllSpeciality(){
  this._EventService.getAllSpeciality()
    .subscribe(
      res => {
              
        this.specialities = res.speciality;
        console.log(this.specialities);
      },
      err => console.log(err)
    );
}
  onChange(tradeid: any, isChecked: boolean) {
    if (isChecked) {
      this.trades.push(tradeid);
    } else {
      this.trades.splice(this.trades.indexOf(tradeid), 1);
    }
    console.log(this.trades);
  }
  
  addData(msg:string)
  {
    var str1 = new String("select_id");  
    var str3 = str1.concat( msg ); 
    if(this.checked_specialities.indexOf(msg)>-1){

      this.checked_specialities.splice(this.checked_specialities.indexOf(msg), 1);
      console.log(this.checked_specialities)
      var divToChange = document.getElementById(str3);
      divToChange.className = "circle-image check-img";
    }else{
      this.checked_specialities.push(msg);
      console.log(this.checked_specialities)
      var divToChange = document.getElementById(str3);
      divToChange.className = divToChange.className.concat(" selection-overlay");
    }
  }

  get references() {
    return this.referencesForm.get('references') as FormArray;
  }

  addReferences() {
    this.references.push(this.fb.group({experience_id:'',name:'',number:'',email:'',note:''}));
  }

  deleteReferences(index) {
    this.references.removeAt(index);
  }

  get licenses() {
    return this.licenseForm.get('licenses') as FormArray;
  }

  addlicenses() {
    this.licenses.push(this.fb.group({state_id:'',license_number:'',status:''}));
  }

  deletelicenses(index) {
    this.licenses.removeAt(index);
  }

  savelicenses(){
    console.log(this.licenseForm.value);
    this._CreateaccountService.professionalcompanylicense(this.licenseForm.value.licenses)
    .subscribe(
      res => {
              
      
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
