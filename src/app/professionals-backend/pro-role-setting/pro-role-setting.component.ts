import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pro-role-setting',
  templateUrl: './pro-role-setting.component.html',
  styleUrls: ['./pro-role-setting.component.css']
})
export class ProRoleSettingComponent implements OnInit {
  userrolelist:any;
  permissionsgroup:any;
  select_permissions:string[]=[];
  err_message: boolean = true;
  disablebutton: boolean = false;
  modeldisplay3:boolean=false;
  current_page: string;
  applyback:boolean=false;
  selected_role:any;
  select_permissions2:any;
  constructor(private _ProjectService:ProjectService, private _router : Router,private _app : AppComponent,private toastr: ToastrService) { }
  addRoleFromData = {
    role_name : '',
	 role_type : '',
  };
  
  ngOnInit(){
    this.get_user_role_and_permissions();
    this.select_permissions2 = localStorage.getItem('permissions');
    this.selected_role = 1;
    var temp = this._router.url;
    var array = temp.split("/");
    this.current_page = array[1];
    //this.onchange_roles('1');
  }
  get_user_role_and_permissions(){
    //this._app.loading = true;
    this._ProjectService.get_user_role_and_permissions()
    .subscribe(
      res => {
        console.log(res);
        this.userrolelist = res.roles;
        this.permissionsgroup = res.permissions;
        //this.select_permissions = res.select_permissions;
      },
      err =>{
       this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }

  onchange_permission(permissionid: string, isChecked: boolean) {
    console.log(this.select_permissions);
    if (isChecked) {
      this.select_permissions.push(permissionid);
     
    } else {
      this.select_permissions.splice(this.select_permissions.indexOf(permissionid), 1);
     
    }
   console.log(this.select_permissions);
  }

  onchange_roles(selected_role_id: string){
    const data ={role_id:selected_role_id}
    this.selected_role =selected_role_id;
    this._ProjectService.get_selected_roles_permissions(data)
    .subscribe(
      res => {
        if(res.select_permissions!=''){
          this.select_permissions = res.select_permissions.split(',').map(octet => parseInt(octet, 10));
        }else{
          this.select_permissions =[];
        }
        
        console.log(res);
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }
  add_role(){
    this.modeldisplay3=true;
    this.applyback=true;
  }

  add_new_role(){
    console.log(this.addRoleFromData);
    this._ProjectService.add_user_role(this.addRoleFromData)
    .subscribe(
      res => {
        this.modeldisplay3=false;
        this.applyback=false;
        this.get_user_role_and_permissions();
        this.toastr.success('New Role Added', 'success');
        console.log(res);
      },
      err =>{
         this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
    
  }

  hidemodel3(){
    this.modeldisplay3=false;
        this.applyback=false;
  }

  update_permissions(){
    this._app.loading = true;
    const data ={
      role_id :this.selected_role,
      select_permissions : this.select_permissions
    }
    this._ProjectService.update_permissions(data)
    .subscribe(
      res => {
        this._app.loading = false;
        this.get_user_role_and_permissions();
        this.toastr.success('Permission Updated', 'success');
      },
      err =>{
        this._app.loading = false;
          console.log(err.error.message);
    if(err.error.message == "Token has expired")
{			 
            localStorage.clear();
           this._router.navigate(["/login"]);
          } else {
            alert('Something Went Wrong!!');
          }
        }
    );
  }

  check_unique_role_name($event) {
    const data = {
      role_name: this.addRoleFromData.role_name,
     
    }
    console.log(data);
    this.addRoleFromData.role_name;
    //console.log(this.addFolderFormData.folder_name);
    this._ProjectService.check_unique_role_name(data)
      .subscribe(
        res => {
          //console.log(res);
          if (res.check) {

            this.err_message = true;
            this.disablebutton = false;
          }
          else {

            this.err_message = false;
            this.disablebutton = true;
          }


        },
        err => console.log(err)

      );
  }
  reset()

  {
     this._router.navigate([this.current_page + '/notification-setting/' ]).then(() => {
           this._router.navigate([this.current_page + '/role-setting/' ]);
           });
  }
}
