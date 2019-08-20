import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import {saveAs as importedSaveAs} from "file-saver";
@Component({
  selector: 'app-crmlead',
  templateUrl: './crmlead.component.html',
  styleUrls: ['./crmlead.component.css']
})
export class CrmleadComponent implements OnInit {
	maxFileSize = 90000000 ;
	private _crmleadfileuploadUrl = `${environment.api}/crm_lead_file_upload`;

allleads:any;
  filveevent:any;
  task_type:any;
  pr_show2:boolean=true;
  pr_show:boolean=false;
  csv_not_exist:boolean=false;
  modeldisplay4:any=false;
  modeldisplay1:any=false;
  applyback:any=false;
  delete_lead_id:any;
  imageurl:any;
  url:any;
 constructor( private _router: Router,private _activatedroute: ActivatedRoute,private datePipe: DatePipe,
    private _app: AppComponent,
    private _ProjectService:ProjectService,private dragulaService: DragulaService,private toastr: ToastrService) { }
public uploader: FileUploader = new FileUploader({url:this._crmleadfileuploadUrl,authTokenHeader: "Authorization",
  authToken: 'Bearer '+localStorage.getItem("token"), itemAlias: 'file',maxFileSize: this.maxFileSize});
  ngOnInit() {
	this.get_all_leads();  
	this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.pr_show = true;this.pr_show2 = true;};
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.pr_show = false;
            this.pr_show2 = false;
          console.log(response);
            if(response=='{"status_code":200,"csvfile":"success"}'){
				//this.upload_csv_file();
				 //this.toastr.success('Product File Uploaded', 'Success!');
              
            }
            else{
				this.toastr.success('Something went wrong, Please Check File & Try Again', 'Oops!');
              
            }
     
          
       }; 
this.uploader.onProgressItem = (progress: any) => {
        this.uploader.progress = progress['progress'];
      };	   
  }
public hidefirstname1: boolean = false;
 public hidelastname1: boolean = false;
public hidecompany1: boolean = false;
public hidephone1: boolean = false;
public hideleadowner1: boolean = false;
public hideleadsource1: boolean = false;
public hidecreatedby1: boolean = false;
public hidemodifiedby1: boolean = false;
public hidecreatedtime1: boolean = false;
public hidefullname1: boolean = false;
public hidestreet1: boolean = false;
public hidecity1: boolean = false;
public hidestate1: boolean = false;
public hidezipcode1: boolean = false;
public hidedescription1: boolean = false;
public hidesalution1: boolean = false;
public hidesecondaryemail1: boolean = false;
public hidelastactivity1: boolean = false;
public hidetag1: boolean = false;
public hideprojectnumber1: boolean = false;
public hideprojecttype1: boolean = false;
public hidejobspecific1: boolean = false;
public hidesecondaryphone1: boolean = false;
public hidenowalk1: boolean = false;
public hidesecoundrycontact1: boolean = false;
public hidecountry1: boolean = false;
public hideis_active1: boolean = false;

toggleElement1(){
        if(this.hidefirstname1){
            this.hidefirstname1 = false;
        }
        else
        {
            this.hidefirstname1 = true;
    }
 }
 toggleElement2(){
        if(this.hidelastname1){
            this.hidelastname1 = false;
        }
        else
        {
            this.hidelastname1 = true;
    }
 }
 toggleElement3(){
        if(this.hidecompany1){
            this.hidecompany1 = false;
        }
        else
        {
            this.hidecompany1 = true;
    }
 }
 toggleElement4(){
        if(this.hidephone1){
            this.hidephone1 = false;
        }
        else
        {
            this.hidephone1 = true;
    }
 }
  toggleElement5(){
        if(this.hideleadowner1){
            this.hideleadowner1 = false;
        }
        else
        {
            this.hideleadowner1 = true;
    }
 }
  toggleElement6(){
        if(this.hideleadsource1){
            this.hideleadsource1 = false;
        }
        else
        {
            this.hideleadsource1 = true;
    }
 }
 toggleElement7(){
        if(this.hidecreatedby1){
            this.hidecreatedby1 = false;
        }
        else
        {
            this.hidecreatedby1 = true;
    }
 }
 toggleElement8(){
        if(this.hidemodifiedby1){
            this.hidemodifiedby1 = false;
        }
        else
        {
            this.hidemodifiedby1 = true;
    }
 }
 toggleElement9(){
        if(this.hidecreatedtime1){
            this.hidecreatedtime1 = false;
        }
        else
        {
            this.hidecreatedtime1 = true;
    }
 }
 toggleElement10(){
        if(this.hidefullname1){
            this.hidefullname1 = false;
        }
        else
        {
            this.hidefullname1 = true;
    }
 }
 toggleElement11(){
        if(this.hidestreet1){
            this.hidestreet1 = false;
        }
        else
        {
            this.hidestreet1 = true;
    }
 }
 toggleElement12(){
        if(this.hidecity1){
            this.hidecity1 = false;
        }
        else
        {
            this.hidecity1 = true;
    }
 }
 toggleElement13(){
        if(this.hidestate1){
            this.hidestate1 = false;
        }
        else
        {
            this.hidestate1 = true;
    }
 }
 toggleElement14(){
        if(this.hidezipcode1){
            this.hidezipcode1 = false;
        }
        else
        {
            this.hidezipcode1 = true;
    }
 }
  toggleElement15(){
        if(this.hidedescription1){
            this.hidedescription1 = false;
        }
        else
        {
            this.hidedescription1 = true;
    }
 }
 toggleElement16(){
        if(this.hidesalution1){
            this.hidesalution1 = false;
        }
        else
        {
            this.hidesalution1 = true;
    }
 }
 toggleElement17(){
        if(this.hidesecondaryemail1){
            this.hidesecondaryemail1 = false;
        }
        else
        {
            this.hidesecondaryemail1 = true;
    }
 }
 toggleElement18(){
        if(this.hidelastactivity1){
            this.hidelastactivity1 = false;
        }
        else
        {
            this.hidelastactivity1 = true;
    }
 }
 toggleElement19(){
        if(this.hidetag1){
            this.hidetag1 = false;
        }
        else
        {
            this.hidetag1 = true;
    }
 }
 toggleElement20(){
        if(this.hideprojectnumber1){
            this.hideprojectnumber1 = false;
        }
        else
        {
            this.hideprojectnumber1 = true;
    }
 }
 toggleElement21(){
        if(this.hideprojecttype1){
            this.hideprojecttype1 = false;
        }
        else
        {
            this.hideprojecttype1 = true;
    }
 }
 toggleElement22(){
        if(this.hidejobspecific1){
            this.hidejobspecific1 = false;
        }
        else
        {
            this.hidejobspecific1 = true;
    }
 }
 toggleElement23(){
        if(this.hidesecondaryphone1){
            this.hidesecondaryphone1 = false;
        }
        else
        {
            this.hidesecondaryphone1 = true;
    }
 }
 toggleElement24(){
        if(this.hidenowalk1){
            this.hidenowalk1 = false;
        }
        else
        {
            this.hidenowalk1 = true;
    }
 }
 toggleElement25(){
        if(this.hidesecoundrycontact1){
            this.hidesecoundrycontact1 = false;
        }
        else
        {
            this.hidesecoundrycontact1 = true;
    }
 }
  toggleElement26(){
        if(this.hidecountry1){
            this.hidecountry1 = false;
        }
        else
        {
            this.hidecountry1 = true;
    }
 }
 toggleElement27(){
        if(this.hideis_active1){
            this.hideis_active1 = false;
        }
        else
        {
            this.hideis_active1 = true;
    }
 }
 openModal_for_import_file() {
     
    this.modeldisplay1=true;
    this.applyback=true;
  }
get_all_leads(){
    

      this._ProjectService.get_all_leads()
      .subscribe(
        res => {
          console.log(res);
          this.allleads = res.response;
		
			
		
          this._app.loading = false;
		 
        },
         
        err => console.log(err)
      );
      
    
    }
	delete_Lead_data(id){
    this.delete_lead_id =id;
   
    this.modeldisplay4=true;
    this.applyback=true;
  }
  delete_lead(leadid) {

    const data = {
      lead_id :leadid,
     
    };
   console.log(data);
      this._ProjectService.delete_lead(data)
      .subscribe(
        res => {
           this.get_all_leads();
		     this.toastr.success('Lead Deleted', 'success');
          this._app.loading = false;
          this.modeldisplay4=false;
          this.applyback=false;
        },
        err =>{
          this._app.loading = false;
          console.log(err);
          this._router.navigate(["/login"]);
          }
      );
    
  }
  hidemodel4(){
    this.modeldisplay4=false;
    this.applyback=false;
  }
   hidemodel1(){
    this.modeldisplay1=false;
    this.applyback=false;
  }
  
	download_csv_file(){
    var filename="sprucebox.csv";
    this._ProjectService.download_csv_file(filename).subscribe(blob => {
              importedSaveAs(blob, filename);
          },err => console.log(err)
        );
    }
 onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { 
          let target: any = event.target; 
          this.url = target.result;
        }
        this.uploader.uploadAll();
      }
    
    }
  
  upload_csv_file(){
    this.hidemodel1();
	this.toastr.success('uploaded', 'success');
   
  }
 
}
