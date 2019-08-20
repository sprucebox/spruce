import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CreateAcountProfessionalCompletedComponent implements OnInit {

  constructor(private _router: Router,private _app: AppComponent,) { }

  ngOnInit() {
  }
  next(){
    this._app.loading = true;
    this._router.navigate(["/login"]);
    this._app.loading = false;
}
}
