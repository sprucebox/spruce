import { Component, OnInit,Input } from '@angular/core';
import { AuthServicenew } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
err_message : string='';
message : string='';
token:any;
 modeldisplay:any=true;
 disablebutton: boolean = false;
 modeldisplay1:any=false;
  modeltask:any=false;
  modelmeeting:any=false;
  modelevent:any=false;
  public show:boolean = false;
  public buttonName:any = 'Show';
  forgetPasswordData = {
   email : '',
   password: '',
   otp : '',
  token:'',
 
  repassword:'',
    
  };

  check ={
    confirmpassword:''
  }
  constructor(private _auth:AuthServicenew,
    private _router : Router,
    private _app : AppComponent,private toastr: ToastrService) { this._auth.removeToken(); }

  ngOnInit(): void {
	
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('cover-background');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('cover-background');
  }

forgetPassword()
{
this._app.loading = true;
    this._auth.forgetPassword(this.forgetPasswordData)
    .subscribe(
      res => {
      if(res.success)
	  {
		  console.log(res);
		  this.token = res.token;
		 this._app.loading = false; 
		this.modeldisplay=false;
		this.modeldisplay1=true;
		
	  }
	 
	  },
	   err => {
       console.log(err.error.status_code);
		  
	
        this._app.loading = false;
        if(err.error.message == "A token is required" || err.error.message == "Token has expired" ) 
        {			 
                    localStorage.clear();
                   this._router.navigate(["/login"]);
                  }

                  else if(err.error.code == "550")
                  {			 
                    this.err_message = 'email notification will not sent due to Expected response code 354 but got code "550", with message "550 5.4.5 Daily user sending quota exceeded. 14sm66142279pfj.36 - gsmtp';
                             
                            }
                            else if(err.error.status_code == "401")
                  {			 
                    this.err_message = 'email not exist';
                             
                            }
                  else {
                    alert('Something Went Wrong!!');
                  }

        
        // console.log(err);
      },
	  
      
    );
  
}
insertPassword()
{
this._app.loading = true;
    this._auth.insertPassword(this.forgetPasswordData)
    .subscribe(
      res => {
      
      console.log(res);
      this._app.loading = false;
      //this.message ='Password Updated';
      this.toastr.success('Password Updated', 'success');
      this._router.navigate(["/login"]);
      },
      
    );
 
  
}
onChange($event) {
    
		 
	if (this.forgetPasswordData.otp == this.token)
	{
		
     this.err_message = "";
     this.disablebutton = false;
	}
	else{
    this.err_message = "OTP is not valid";
    this.disablebutton = true;
	}
	
}
check_confirm_password(){
  console.log('fff');
  if(this.forgetPasswordData.password != this.forgetPasswordData.repassword){
    this.err_message ='Password not match';
    this.disablebutton = true;
  }else{
    this.err_message ='';
    this.disablebutton = false;
  }
}
// onChangeObj($event)
// {
// 	if (this.forgetPasswordData.password == this.forgetPasswordData.repassword)
// 		{
		
// 		 this.err_message = "";
// 	}
// 	else
// 	{
// 		this.err_message = "Password is not match";
// 	}
// }
 hidemodel()
   { this.modeldisplay=true;}
   hidemodel1()
   { this.modeldisplay1=true;}
  
}
