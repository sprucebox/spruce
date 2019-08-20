import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import {saveAs as importedSaveAs} from "file-saver";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
company_id:any;
currentDate = new Date();
select_permissions:any;
  showMainContent: Boolean = true;
file:any;

  constructor(private _router: Router,private _activatedroute: ActivatedRoute,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private toastr: ToastrService) { }

  ngOnInit() {
	   this.company_id=localStorage.getItem('company_id');
	    this.select_permissions = localStorage.getItem('permissions');
		console.log(this.select_permissions);
  }
  ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;
   }
  
Save_data(){
	
	
	const data = {
      companyid :this.company_id
      
    }
	// const filedata = 'companybackup.zip';
    this._ProjectService.Save_data(data).subscribe(res => {
		
         this.file=res.filename;
		 console.log(this.file);
          this._app.loading = false;
          this.toastr.success('save file', 'success');
         
       });
            
         
    }
get_backup(){
	  const data = {
      filename :this.file
      
    }
	var filedata = 'companybackup.zip';
    this._ProjectService.get_backup(data).subscribe(blob => {
           importedSaveAs(blob, filedata);
          },err => console.log(err)
        );     
            
         
    }
}
