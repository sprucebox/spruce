import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { FormBuilder,Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class CreateAcountProfessionalLicenseComponent implements OnInit {

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
    this._app.loading = true;
    this._CreateaccountService.professionalcompanylicense(this.licenseForm.value.licenses)
    .subscribe(
      res => {
        this._router.navigate(["/create-account-professional/check"]);
        this._app.loading = false;
      },
      err => console.log(err)
    );
  }
}
