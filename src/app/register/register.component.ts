import { Component, OnInit } from '@angular/core';
import { AuthServicenew } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usertypelist:any;
  err_message : string;
  err_message2 : string='';
  err_message3 : boolean = true;
  check ={
    confirmpassword:''
  }
 
  registerUserData = {
    usertype : '',
    firstname : '',
    lastname : '',
    email : '',
    password : ''
  };
  user: SocialUser;
  constructor(
    private _auth:AuthServicenew,
    private _router: Router,
    private _app: AppComponent,
    private socialauthService: AuthService
  ) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('cover-background');
    this.get_user_type();
    
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('cover-background');
  }

  get_user_type(){
    //this._app.loading = true;
    this._auth.get_user_type()
    .subscribe(
      res => {
        this.usertypelist = res.data;
        
      },
      err => console.log(err)
    );
  }

  registerUser()
  {
    this._app.loading = true;
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem("token",res.data.token)
        if(res.data.usertype==1){
          this._router.navigate(["/create-account-homeowner"]);
          this._app.loading = false;
        }else if(res.data.usertype==2){
          this._router.navigate(["/create-account-professional/account"]);
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

  check_confirm_password(){
    console.log('fff');
    if(this.registerUserData.password != this.check.confirmpassword){
      this.err_message2 ='Password not match';
    }else{
      this.err_message2 ='';
    }
  }
  signInWithGoogle(): void {
    console.log('sdf');
      this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
    //console.log(data);
    this._app.loading = true;
    const newdata = {
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      usertype:this.registerUserData.usertype,
      photoUrl:data.photoUrl,
      socailId:data.id,
      provider: data.provider,
    }
    this._auth.social_register_user(newdata)
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
          this._app.loading = false;
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
  
    signInWithFB(): void {

      if(this.registerUserData.usertype){
        this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=>{
          this._app.loading = true;
      const newdata = {
        email:data.email,
        firstName:data.firstName,
        lastName:data.lastName,
        usertype:this.registerUserData.usertype,
        photoUrl:data.photoUrl,
        socailId:data.id,
        provider: data.provider,
      }
      this._auth.social_register_user(newdata)
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
          this._router.navigate(["/professionals/home"]);
          this._app.loading = false;
        }        
          
        },
        err => {
          this.err_message = err.error.message;
          this._app.loading = false;
          // console.log(err);
        },
      );
          });
      }else{
        console.log('nodtaa'+this.registerUserData.usertype);
        this.err_message3 =false;
      }
      
    }
  
   
  
    signOut(): void {
      this.socialauthService.signOut();
    }

    check_usertype(){
      if(this.registerUserData.usertype){
        this.err_message3 =true;
      }else{
        this.err_message3 =false;
      }
    }
}
