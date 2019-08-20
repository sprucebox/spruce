import { Component, OnInit } from '@angular/core';
import { AuthServicenew } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.css']
})
export class AcceptInvitationComponent implements OnInit {

  inviteUserData = {
    user_id:'',
    firstname : '',
    lastname : '',
    password : ''
  };
  check ={
    confirmpassword:''
  }
  secret:'';
  email:'';
  show_form:boolean=true;
  err_message : string;
  err_message2 : string='';
  constructor(
    private _auth:AuthServicenew,
    private _activatedroute: ActivatedRoute,
    private _router: Router,
    private _app: AppComponent
  ) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('cover-background');
    this._activatedroute.params.subscribe(params => {
      
      this.secret = params['secret'];
    });

    this.get_user_by_secret();
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('cover-background');
  }

  get_user_by_secret(){
    const user ={
      secret:this.secret,
    }
    this._auth.get_user_by_secret(user)
    .subscribe(
      res => {
        if(res.result){
          this.email = res.data.email;
          this.inviteUserData.user_id = res.data.id
        }else{
          this.show_form =false;
        }
        
        console.log(res);
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
      },
    );
  }

  update_invite_user(){

    this._auth.update_invite_user(this.inviteUserData)
    .subscribe(
      res => {
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("username",res.data.username);
        localStorage.setItem("profile_image",res.data.profile_image);
        if(res.data.usertype==1){
          this._router.navigate(["/home-owner-backend/home"]);
          this._app.loading = false;
        }else if(res.data.usertype==2){
          this._router.navigate(["/professionals/home"]);
          this._app.loading = false;
        }else{
          this._router.navigate(["/special"]);
        }
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
      },
    );

  }
  check_confirm_password(){
   // console.log('fff');
    if(this.inviteUserData.password != this.check.confirmpassword){
      this.err_message2 ='Password not match';
    }else{
      this.err_message2 ='';
    }
  }
}
