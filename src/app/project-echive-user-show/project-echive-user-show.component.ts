import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-echive-user-show',
  templateUrl: './project-echive-user-show.component.html',
  styleUrls: ['./project-echive-user-show.component.css']
})
export class ProjectEchiveUserShowComponent implements OnInit {
role:any;
editUserFormData ={
    firstname:'',
    lastname:'',
    status:'',
    email:'',
    user_id:'',
    userrole:'',
    select_projects:[]
  }
  user_id:any;
  current_page:string;
  isReadOnly:boolean=true;
  projects:any;
  allcheck:boolean=false;
  select_projects:string[]=[];
  userrolelist:any;
  constructor(private _router: Router,private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private toastr: ToastrService) { }

  ngOnInit() {
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    this._activatedroute.params.subscribe(params => {
      
      this.user_id = params['id'];
    });
    this.get_user_for_edit();
    this.get_the_projects_name();
    this.get_user_role();
  }

  get_user_for_edit(){
     const data ={
       user_id:this.user_id
     }
     this._ProjectService.get_user_for_edit(data)
    .subscribe(
      res => {
         this.role = res.role;
		  console.log(res.role);
        this.editUserFormData.firstname = res.data.firstname;
        this.editUserFormData.lastname = res.data.lastname;
        this.editUserFormData.status = res.data.is_active;
        this.editUserFormData.email = res.data.email;
        this.editUserFormData.user_id = res.data.id;
        this.editUserFormData.userrole = res.data.userrole;
        if(res.selected_project[0].projects){
          var projectid = res.selected_project[0].projects.split(',').map(octet => parseInt(octet, 10));
          for(var i =0;i<projectid.length;i++){
            this.select_projects.push( projectid[i] );
          }
        }else{
          this.select_projects = [];
        }
        
        if(res.data.status=='pending'){
          this.isReadOnly=false;
        }
       
        //this._app.loading = false;
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

  update_user_details(){
    this._app.loading = true;
    this.editUserFormData.select_projects = this.select_projects;
    this._ProjectService.update_user_details(this.editUserFormData)
    .subscribe(
      res => {
        this.toastr.success('User Updated', 'success');
            this._router.navigate([this.current_page+"/user-setting"]);
            this._app.loading = false;
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

  get_the_projects_name(){
    this._ProjectService.get_the_projects_name()
    .subscribe(
      res => {
       this.projects = res.data;
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
    console.log(this.select_projects);
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
  
   update_users_archive_data(){
    const data = {
     user_id:this.user_id
    }
console.log(data);
   this._ProjectService.update_users_archive_data(data)
    .subscribe(
      res => {
     
this._router.navigate(["/professionals/user-setting"]);
 this.toastr.success('remove to archive', 'success');
     console.log(res.data);
     
    });

  }
}

