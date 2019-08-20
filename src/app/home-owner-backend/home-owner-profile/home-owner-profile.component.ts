import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { EventService } from '../../event.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home-owner-profile',
  templateUrl: './home-owner-profile.component.html',
  styleUrls: ['./home-owner-profile.component.css']
})
export class HomeOwnerProfileComponent implements OnInit {
  private _profileuploaduploadUrl = `${environment.api}/profileUpload`;
   referencesForm = this.fb.group({
    references: this.fb.array([this.fb.group({street:'',suite:'',city:'',state:'',zip:''})]),
address:this.fb.group({mobile_no :'', confirmmobile_no:'',mail_address_street : '',mail_address_suit : '',mail_address_city :'',mail_address_zip : '',mail_address_state:''   }),
  });
  projectaddress:any=0;
  submitted = false;
  message:any;
	 url:'';
  logourl:'';
   countries:any;
  states:any;
    success_message : string;
  pr_show = false;
  pr_show2 = false;
 err_message : string;
  company_states:any;
     professionalData = {
     user_contact_mobile : '',
    user_address_street : '',
    user_address_suite : '',
    user_address_city : '',
    user_address_state : '',
    user_address_country : '',
    user_address_zip : '',
    user_first_name : '',
    user_last_name : '',
    user_email : '',
  };

  constructor(
    private _CreateaccountService:CreateaccountService,
    private _router: Router,
    private _app: AppComponent,
    private _EventService:EventService,
    private fb: FormBuilder,private toastr: ToastrService
  ) { }
 public uploader: FileUploader = new FileUploader({url:this._profileuploaduploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'photo'});
  ngOnInit() {
    this.referencesForm = this.fb.group({
      references: this.fb.array([this.fb.group({street:['', [Validators.required]],suite:['', [Validators.required]],city:['', [Validators.required]],state:['', [Validators.required]],zip:['', [Validators.required]]})]),
  address:this.fb.group({mobile_no :['', [Validators.required]],mail_address_street : ['', [Validators.required]],mail_address_suit : ['', [Validators.required]],mail_address_city :['', [Validators.required]],mail_address_zip : ['', [Validators.required]],mail_address_state:['', [Validators.required]]  }),
    });
    
	   this.get_all_countries();
	  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.pr_show = false;
       };
	    this.getAllprofiledata();
  }
  get f() { return this.referencesForm.controls; }
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
  
get references() {
    return this.referencesForm.get('references') as FormArray;
  }

  addReferences() {
    this.references.push(this.fb.group({street:'',suite:'',city:'',state:'',zip:''}));
  }

  deleteReferences(index) {
    this.references.removeAt(index);
  }
  
 getAllprofiledata(){
    this._CreateaccountService.getprofessionalaccountdetails()
      .subscribe(
        res => {
         
          if(res.user_details.country_id){
            this.get_all_states(res.user_details.country_id);
          }
          console.log(this.referencesForm);
           this.referencesForm = this.fb.group({
    references: this.fb.array([]),
address:this.fb.group({mobile_no : res.data.mobile_no, mail_address_street : res.data.mail_address_street,mail_address_suit : res.data.mail_address_suit,mail_address_city :res.data.mail_address_city,mail_address_state :res.data.mail_address_state,mail_address_zip : res.data.mail_address_zip   }),
  });
 
         
          this.professionalData.user_contact_mobile = res.user_details.contact ;
          this.professionalData.user_address_street = res.user_details.street ;
          this.professionalData.user_address_suite = res.user_details.suit ;
          this.professionalData.user_address_city = res.user_details.city ;
          this.professionalData.user_address_state = res.user_details.state_id ;
          this.professionalData.user_address_country = res.user_details.country_id ;
          this.professionalData.user_address_zip = res.user_details.zipcode ;
          this.professionalData.user_first_name = res.user_details.firstname ;
          this.professionalData.user_last_name = res.user_details.lastname ;
          this.professionalData.user_email = res.user_details.email ;
      this.referencesForm.value.references=res.CompanyProjectAddress.length;
	  console.log(this.referencesForm.value.references);
          this.url = res.profile_image;
		  if (res.CompanyProjectAddress.length>0)
		  {
			 
		   this.setexp(res.CompanyProjectAddress);
		  }
		  else 
		  {
			 
			  this.references.push(this.fb.group({street:'',suite:'',city:'',state:'',zip:''}));
			
		  }
        
          
          // this.referencesForm.value.address = res.data;
         
        },
        err => console.log(err)
      );
  }
 
 setexp(data) {
    let control = <FormArray>this.referencesForm.controls.references;
    data.forEach(x => {
      control.push(this.fb.group({ 
       street:x.street,suite:x.suite,city:x.city,state:x.state,zip:x.zip 
         }))
    })
  }
  updateprofile(){
    
  const sendData = {
   profiledata:this.professionalData,
  }
  console.log(sendData);
  this._app.loading = true;
  this._CreateaccountService.professionalupdateaccountprofile(sendData)
  .subscribe(
    res => {
		console.log(res);
      localStorage.setItem("username",this.professionalData.user_first_name+' '+this.professionalData.user_last_name);
      this._app.loading = false;     
      this.toastr.success('Profile Updated', 'success');
    },
    err => console.log(err)
  );
}
updateaccountdetail(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.referencesForm.invalid) {
        return;
    }
  const sendData = {
   
     projectaddress:this.referencesForm.value.references,
	   paddress:this.referencesForm.value.address,
   
   
  }
  console.log(sendData);
  this._app.loading = true;
  this._CreateaccountService.professionalupdateaccountdetailprofile(sendData)
  .subscribe(
    res => {
      console.log(res);
      this._app.loading = false;     
      this.toastr.success('Profile Updated', 'success');
    },
    err => console.log(err)
  );
}
  changepasswordForm = {
    old_password: '',
    new_password: '',
    con_password: '',
  }
  
 changepassword() {
	
    this._app.loading = true;
    this._CreateaccountService.updatepassword(this.changepasswordForm)
      .subscribe(
        res => {
			 console.log(res);
          if (res.status_code == 400) {
            this.success_message = null;
            this.err_message = res.message;
			console.log(this.err_message);
            console.log(res.message)
          } else {
            this.err_message = null;
            this.success_message = res.message;
			console.log(this.success_message);
          }
          this._app.loading = false;

        },
        err => console.log(err.message)
  );
  }

  onSelectFile(event) {
    if (event.target.files[0].size > 10000000) {
      this.message = "Image size  should be less than 10 mb. ";
    }
   else if(event.target.files[0].type != "image/jpeg")
   {
    this.message = "file type should be allow only jpeg/png ";
   }
    else
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { 
        let target: any = event.target; 
        this.url = target.result;
      }
	    this.uploader.uploadAll();
    }
  }
  check_confirm()
  {
  }
}
