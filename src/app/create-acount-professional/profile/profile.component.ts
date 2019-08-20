import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { FormBuilder,Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class CreateAcountProfessionalProfileComponent implements OnInit {
  private checked_specialities:string[]=[];
  private trades:string[]=[];
  public show:boolean = false;
  err_message : string;
  specialities : any;
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
  toggle() {
    this.show = !this.show;
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

  checkdata(){
  
    const sendData = {
      specialities:this.checked_specialities,
      workexpireance:this.referencesForm.value.references,
      trades:this.trades
    }
    this._app.loading = true;
    this._CreateaccountService.professionalcompanyprofile(sendData)
    .subscribe(
      res => {
        this._router.navigate(["/create-account-professional/license"]);
        this._app.loading = false;
      },
      err => console.log(err)
    );
  }

  onChange(tradeid: string, isChecked: boolean) {
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
}
