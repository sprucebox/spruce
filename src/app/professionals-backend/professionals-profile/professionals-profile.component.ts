import { Component, OnInit } from '@angular/core';
import { CreateaccountService } from '../../createaccount.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { EventService } from '../../event.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-professionals-profile',
  templateUrl: './professionals-profile.component.html',
  styleUrls: ['./professionals-profile.component.css']
})

export class ProfessionalsProfileComponent implements OnInit {
  private checked_specialities: string[] = [];
  trades: any[] = [];
  private _logouploadUrl = `${environment.api}/logoUpload`;
  private _profileuploaduploadUrl = `${environment.api}/profileUpload`;
  url: '';
  message:any;
  logourl: '';
  pr_show = false;
  pr_show2 = false;
  err_message: string;
  success_message: string;
  specialities: any;
  countries: any;
  states: any;
  company_size_list: any;
  company_year_list: any;
  company_states: any;
  professionalData = {
    company_name: '',
    company_website: '',
    est_year: '',
    company_size: '',
    company_contact_email: '',
    company_contact_mobile: '',
    company_address_street: '',
    company_address_suite: '',
    company_address_city: '',
    company_address_state: '',
    company_address_country: '',
    company_address_zip: '',
    company_corporate_name: '',
    company_tax_id: '',
    user_contact_mobile: '',
    user_address_street: '',
    user_address_suite: '',
    user_address_city: '',
    user_address_state: '',
    user_address_country: '',
    user_address_zip: '',
    user_first_name: '',
    user_last_name: '',
    user_email: '',
  };

  professionalProfileData = {
    speciality: []

  };
  referencesForm = this.fb.group({
    references: this.fb.array([])
  });

  changepasswordForm = {
    old_password: '',
    new_password: '',
    con_password: '',
  }


  constructor(
    private _CreateaccountService: CreateaccountService,
    private _router: Router,
    private _app: AppComponent,
    private _EventService: EventService,
    private fb: FormBuilder, private toastr: ToastrService, private _ProjectService: ProjectService
  ) { }
  public uploader: FileUploader = new FileUploader({
    url: this._profileuploaduploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  public uploader2: FileUploader = new FileUploader({
    url: this._logouploadUrl, authTokenHeader: "Authorization",
    authToken: 'Bearer ' + localStorage.getItem("token"), itemAlias: 'photo'
  });
  ngOnInit() {
    this.get_all_countries();
    this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false; this.pr_show = true;

    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show = false;


    };

    this.uploader2.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show2 = true; };
    this.uploader2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.pr_show2 = false;

    };

    this.getAllprofiledata();

    this.getAllSpeciality();
    this.get_size_and_est_year();
    this._app.loading = false;
  }


  get_all_countries() {
    this._CreateaccountService.get_all_countries()
      .subscribe(
        res => {
          this.countries = res.data;
        },
        err => console.log(err)
    );
  }
  get_all_states(country_id) {
    const data = {
      country_id: country_id,
    }

    this._CreateaccountService.get_all_state_by_country_id(data)
      .subscribe(
        res => {
          this.states = res.data;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  get_all_comapny_states(country_id) {
    const data = {
      country_id: country_id,
    }

    this._CreateaccountService.get_all_state_by_country_id(data)
      .subscribe(
        res => {
          this.company_states = res.data;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  get_size_and_est_year() {
    this._CreateaccountService.get_size_and_est()
      .subscribe(
        res => {
          this.company_size_list = res.size;
          this.company_year_list = res.year;
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ){
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  updateprofile() {

    const sendData = {
      specialities: this.checked_specialities,
      workexpireance: this.referencesForm.value.references,
      trades: this.trades,
      profiledata: this.professionalData,
    }
    //console.log(sendData);
    this._app.loading = true;
    this._CreateaccountService.professionalupdatecompanyprofile(sendData)
      .subscribe(
        res => {

          localStorage.setItem("username", this.professionalData.user_first_name + ' ' + this.professionalData.user_last_name);
          this._app.loading = false;
          this.toastr.success('Profile Updated', 'success');
          this.refresh_sidebar();


        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }




        }
      );
  }
  refresh_sidebar() {

    this._ProjectService.get_profile_data()
      .subscribe(
        res => {
          //console.log(res.data);
          this._ProjectService.changeprofileimage(res.data.profile_image)
          //console.log(res.data.profile_image);
        },
        err => {//console.log(err)
          //this._app.loading = false;
          this._router.navigate(['login']);
        }
      );

  }
  getAllSpeciality() {
    this._EventService.getAllSpeciality()
      .subscribe(
        res => {

          this.specialities = res.speciality;

        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }
  onChange(tradeid: any, isChecked: boolean) {
    if (isChecked) {
      this.trades.push(tradeid);
    } else {
      this.trades.splice(this.trades.indexOf(tradeid), 1);
    }

  }

  addData(msg: string) {
    var str1 = new String("select_id");
    var str3 = str1.concat(msg);
    if (this.checked_specialities.indexOf(msg) > -1) {

      this.checked_specialities.splice(this.checked_specialities.indexOf(msg), 1);

      var divToChange = document.getElementById(str3);
      divToChange.className = "circle-image check-img";
    } else {
      this.checked_specialities.push(msg);

      var divToChange = document.getElementById(str3);
      divToChange.className = divToChange.className.concat(" selection-overlay");
    }
  }

  get references() {
    return this.referencesForm.get('references') as FormArray;
  }

  addReferences() {
    this.references.push(this.fb.group({ experience_id: '', name: '', number: '', email: '', note: '' }));

  }

  deleteReferences(index) {
    this.references.removeAt(index);
  }


  getAllprofiledata() {
    this._CreateaccountService.getprofessionalcompanydetails()
      .subscribe(
        res => {
          console.log('Profile Data:')
          console.log(res);
          this.refresh_sidebar();
          this.get_all_comapny_states(res.data.company_address_country);
          if (res.user_details.country_id) {
            this.get_all_states(res.user_details.country_id);
          }

          this.professionalData = res.data;
          this.professionalData.user_contact_mobile = res.user_details.contact;
          this.professionalData.user_address_street = res.user_details.street;
          this.professionalData.user_address_suite = res.user_details.suit;
          this.professionalData.user_address_city = res.user_details.city;
          this.professionalData.user_address_state = res.user_details.state_id;
          this.professionalData.user_address_country = res.user_details.country_id;
          this.professionalData.user_address_zip = res.user_details.zipcode;
          this.professionalData.user_first_name = res.user_details.firstname;
          this.professionalData.user_last_name = res.user_details.lastname;
          this.professionalData.user_email = res.user_details.email;

          this.checked_specialities = res.speciality;
          this.trades = res.trade;
          this.url = res.profile_image;
          this.logourl = res.data.logo;



          //this.referencesForm.value.references = res.CompanyWorkExperience;
          //this.references.push(this.fb.group(res.CompanyWorkExperience));
          this.setexp(res.CompanyWorkExperience);
        },
        err => {
          this._app.loading = false;
          //console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) {
            localStorage.clear();
            this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
      );
  }

  setexp(data) {
    let control = <FormArray>this.referencesForm.controls.references;
    data.forEach(x => {
      control.push(this.fb.group({
        experience_id: x.experience_id, name: x.name, number: x.number, email: x.email, note: x.note
      }))
    })
  }

  changepassword() {
    this._app.loading = true;
    this._CreateaccountService.updatepassword(this.changepasswordForm)
      .subscribe(
        res => {
          if (res.status_code == 400) {
            this.success_message = null;
            this.err_message = res.message;
            //console.log(res.message)
          } else {
            this.err_message = null;
            this.success_message = res.message;
          }
          this._app.loading = false;

        },
        err => console.log(err.message)
  );
  }

  onSelectFile(event) {
    //console.log(event);

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
        this.refresh_sidebar();
      }
      this.uploader.uploadAll();
    }
  }

  onSelectFile2(event) {

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
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        //this.logourl = event.target.result;
        let target: any = event.target;
        this.logourl = target.result;
      }
      this.uploader2.uploadAll();
    }
  }

  check_confirm() {
    //console.log('test');
  }

}

