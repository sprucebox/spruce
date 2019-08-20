import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-backend',
  templateUrl: './crm-backend.component.html',
  styleUrls: ['./crm-backend.component.css']
})
export class CrmBackendComponent implements OnInit {
  username:string;
  profile_image:string;
  select_permissions:any;
  constructor() { }

  ngOnInit() {
	   this.username = localStorage.getItem("username");
      this.profile_image = localStorage.getItem("profile_image");
      this.select_permissions = localStorage.getItem('permissions');
	  
  }

}
