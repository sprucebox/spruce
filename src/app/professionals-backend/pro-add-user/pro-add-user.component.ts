import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-add-user',
  templateUrl: './pro-add-user.component.html',
  styleUrls: ['./pro-add-user.component.css']
})
export class ProAddUserComponent implements OnInit {
firsttab:boolean=true;
secondtab:boolean=false;
thirdtab:boolean=false;
allcheck:boolean=false;
select_permissions:any;
selectdisabled:boolean=false;
userrolelist:any;
userrolelist1:any;
user_id:any;
homeowner:any;
homeownertype:any;
email_exist:string='';
projects:any;
current_page:string;
select_projects:string[]=[];
addUserFromData = {
  email:'',
  userrole:'',
  select_projects:[]
}
constructor(private _ProjectService:ProjectService, private _router : Router,private _app : AppComponent) { }

  ngOnInit(){
    this.get_user_role();
	this.get_user_role_company_id();
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
	 this.select_permissions = localStorage.getItem('permissions');
		console.log(this.select_permissions);
  }
  get_user_role(){
    //this._app.loading = true;
    this._ProjectService.get_user_role()
    .subscribe(
      res => {
        this.userrolelist = res.data;
        
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
        }
    );
  }
  get_user_role_company_id(){
    //this._app.loading = true;
    this._ProjectService.get_user_role_company_id()
    .subscribe(
      res => {
        console.log(res);
        this.userrolelist1 = res.data;
        
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
        }
    );
  }
  registerbyemail(){
    if(this.addUserFromData.email){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.addUserFromData.email))
    {
      this._app.loading = true;
      const data = {
        email:this.addUserFromData.email
      }
      this._ProjectService.check_email_exist(data)
    .subscribe(
      res => {
		  
      console.log(res);
        this._app.loading = false;
        if(res.check){
			console.log('true');
			this.homeowner=res.response;
			
			this.user_id=res.data1;
      console.log(this.homeowner);
      console.log(this.user_id);
          this.get_the_projects_name();
          
          this.firsttab=false;
          this.secondtab=true;
          this.thirdtab=false;
        }else{
          console.log('false');
		  
          this.email_exist ='This User Already Exist ';
        }
        
      },
      err =>{ this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          }
          
          else {
            alert('Something Went Wrong!!');
          }
        }
    );
    }else{
      this.selectdisabled=false;
      this.email_exist ='You have entered an invalid email address!';
    }
     
    }
    
  }

  get_the_projects_name(){
    this._ProjectService.get_the_projects_name()
    .subscribe(
      res => {
       this.projects = res.data;
      },
      err =>{ this._app.loading = false;
          console.log(err.error.message);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
  updatetherole(){
    if(this.addUserFromData.userrole){
      this.firsttab=false;
      this.secondtab=false;
      this.thirdtab=true;
    }
  }

  sendInvitation(){
    //console.log(this.addUserFromData);
    this._app.loading = true;
    this.addUserFromData.select_projects = this.select_projects;
    this._ProjectService.add_user_in_project(this.addUserFromData)
    .subscribe(
      res => {
        this._router.navigate([this.current_page+"/user-setting"]);

        this._app.loading = false;
      },
      err =>{
         this._app.loading = false;
          console.log(err.error.code);
          if(err.error.message == "A token is required" || err.error.message == "Token has expired" )
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          }
          else if(err.error.code == "550")
          {			 
            alert('User added sucesfully but email not sendemail notification will not sent due to Expected response code 354 but got code "550", with message "550 5.4.5 Daily user sending quota exceeded. 14sm66142279pfj.36 - gsmtp');
                     
                    }
          else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }

  onselectproject(projectid: string, isChecked: boolean) {
    if (isChecked) {
      this.select_projects.push(projectid);
      if(this.select_projects.length == this.projects.length){
        this.allcheck = true;
      }else{
        this.allcheck = false;
      }
    } else {
      this.select_projects.splice(this.select_projects.indexOf(projectid), 1);
      this.allcheck = false;
    }
   
  }

  check_all_project(isChecked: boolean){
    
    if(isChecked) {
      this.select_projects = [];
      
      for(var i=0;i< this.projects.length;i++){
       this.select_projects.push(this.projects[i].id);
      }
      this.allcheck = true;
    } else {
      this.select_projects = [];
      this.allcheck = false;
    }
  }
  on_type_email(){
    this.email_exist = '';
  }
}
