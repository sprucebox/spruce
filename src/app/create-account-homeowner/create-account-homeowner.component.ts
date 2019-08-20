import { Component, OnInit,NgModule, ViewChild, ElementRef } from '@angular/core';
import { CreateaccountService } from '../createaccount.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
@Component({
  selector: 'app-create-account-homeowner',
  templateUrl: './create-account-homeowner.component.html',
  styleUrls: ['./create-account-homeowner.component.css']
})
export class CreateAccountHomeownerComponent implements OnInit {

    submitted = false;
  err_message : string;

  referencesForm = this.fb.group({
    references: this.fb.array([this.fb.group({street:'',suite:'',city:'',state:'',zip:''})]),
address:this.fb.group({mobile_no :'', confirmmobile_no:'',mail_address_street : '',mail_address_suit : '',mail_address_city :'',mail_address_zip : '',mail_address_state:''   }),
  });
    changepasswordForm ={
    old_password:'',
    new_password:'',
    con_password:'',
  }
  onChange($event)
  {
	  	 
	if (( this.referencesForm.value.address['mobile_no'] == this.referencesForm.value.address['confirmmobile_no']))
	{
		
		 this.err_message = "";
	}
	else{
		
		this.err_message = "mobile number is not valid";
	}
  }
  
  constructor(
    private _CreateaccountService:CreateaccountService,
    private _router: Router,
    private _app: AppComponent,
	private fb: FormBuilder
  ) { }
  
  ngOnInit() {
	
    this.referencesForm = this.fb.group({
      references: this.fb.array([this.fb.group({street:['', [Validators.required]],suite:['', [Validators.required]],city:['', [Validators.required]],state:['', [Validators.required]],zip:['', [Validators.required]]})]),
  address:this.fb.group({mobile_no :['', [Validators.required]], confirmmobile_no:['', [Validators.required]],mail_address_street : ['', [Validators.required]],mail_address_suit : ['', [Validators.required]],mail_address_city :['', [Validators.required]],mail_address_zip : ['', [Validators.required]],mail_address_state:['', [Validators.required]]  }),
    });
    
  }
     get f() { return this.referencesForm.controls; }
  
   onSubmit()
  {
	  
	  this.submitted = true;

        // stop here if form is invalid
        if (this.referencesForm.invalid) {
            return;
        }

   
	  
	   const Data = {
       projectaddress:this.referencesForm.value.references,
	   paddress:this.referencesForm.value.address,
   }
   this._app.loading = true;
    this._CreateaccountService.createHomeOwnerAddress(Data)
    .subscribe(
      res => {
		  console.log(res);
        
        if(res.success){
          this._router.navigate(["/login"]);
          this._app.loading = false;
        }else{
          this._router.navigate(["/special"]);
          this._app.loading = false;
        }     
        
      },
      err => {
        this.err_message = err.error.message;
        this._app.loading = false;
        // console.log(err);
      },
    );
    
  }
get references() {
    return this.referencesForm.get('references') as FormArray;
  }

  addReferences() {
    this.references.push(this.fb.group({street:'',suite:'',city:'',state:'',zip:''}));
  }

  deleteReferences(index) {
    this.references.removeAt(index);
  }
}
