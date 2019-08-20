import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CreateAcountProfessionalCheckComponent implements OnInit {

  constructor(private _router: Router,private _app: AppComponent,) { }

  ngOnInit() {
  }

  next(){
        this._app.loading = true;
        this._router.navigate(["/create-account-professional/completed"]);
        this._app.loading = false;
  }
}
