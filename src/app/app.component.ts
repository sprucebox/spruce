import { Component } from '@angular/core';
import { AuthServicenew } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public loading: boolean = false;
   
  
  title = 'EventHub';

  constructor(
    public _auth : AuthServicenew,
    private _router : Router    
  ){}

  logoutUser()
  {
    this.loading = true;
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
    this.loading = false;
  }  
}
