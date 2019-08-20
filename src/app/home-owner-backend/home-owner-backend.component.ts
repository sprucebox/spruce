import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-owner-backend',
  templateUrl: './home-owner-backend.component.html',
  styleUrls: ['./home-owner-backend.component.css']
})
export class HomeOwnerBackendComponent implements OnInit {
  username:string;
  profile_image:string;
  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.profile_image = localStorage.getItem("profile_image");
  }

}
