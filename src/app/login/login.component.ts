import { Component, OnInit,Input } from '@angular/core';
import { AuthServicenew } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  err_message : string;

  loginUserData = {
    email : '',
    password : '',
    
  };

  constructor(
    private _auth:AuthServicenew,
    private _router : Router,
    private _app : AppComponent,
    private socialauthService: AuthService
  ) {
    this._auth.removeToken();
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('cover-background');
    localStorage.removeItem("company_dateformat");
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('cover-background');
  } 


  loginUser()
  {
    this._app.loading = true;
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("username",res.data.username);
        localStorage.setItem("profile_image",res.data.profile_image);
        localStorage.setItem("company_dateformat",res.data.company_dateformat);
		 localStorage.setItem("timezonedata",res.data.timezonedata);
        localStorage.setItem("permissions",res.data.user_permissions);
        localStorage.setItem("is_internal",res.data.user_roles_type);
		 localStorage.setItem("userroletype",res.data.userroletype);
		localStorage.setItem("userid",res.data.userid);
        localStorage.setItem("company_id",res.data.company_id);
        console.log(localStorage.getItem('company_id'));
		console.log(localStorage.getItem('userid'));
        
        if(res.data.usertype==1){
          this._router.navigate(["/home-owner/home"]);
          this._app.loading = false;
        }else if(res.data.usertype==2){
          this._router.navigate(["/professionals/home"]);
          this._app.loading = false;
        }else{
          this._router.navigate(["/special"]);
        }
        
      },
      err => {
        this.err_message = err.error.message;
        this._app.loading = false;
        // console.log(err);
      },
    );
    
  }


  signInWithGoogle(): void {
    console.log('sdf');
      this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
    //console.log(data);
    this._app.loading = true;
    this._auth.social_login_user(data)
    .subscribe(
      res => {
        
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("username",res.data.username);
        localStorage.setItem("profile_image",res.data.profile_image);
        if(res.data.usertype==1){
          this._router.navigate(["/home-owner/home"]);
          this._app.loading = false;
        }else if(res.data.usertype==2){
          this._router.navigate(["/professionals/home"]);
          this._app.loading = false;
        }else{
          this._router.navigate(["/special"]);
        }
        
      },
      err => {
        this.err_message = err.error.message;
        this._app.loading = false;
        // console.log(err);
      },
    );
    });
    
    //console.log(data);
    }
  
    // signInWithFB(): void {
      // this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=>{
        // this._app.loading = true;
        // this._auth.social_login_user(data)
        // .subscribe(
          // res => {
            
            // localStorage.setItem("token",res.data.token);
            // localStorage.setItem("username",res.data.username);
            // localStorage.setItem("profile_image",res.data.profile_image);
            // if(res.data.usertype==1){
              // this._router.navigate(["/home-owner/home"]);
              // this._app.loading = false;
            // }else if(res.data.usertype==2){
              // this._router.navigate(["/professionals/home"]);
              // this._app.loading = false;
            // }else{
              // this._router.navigate(["/special"]);
            // }
            
          // },
          // err => {
            // this.err_message = err.error.message;
            // this._app.loading = false;
            // console.log(err);
          // },
        // );
        // });
    // }
}
