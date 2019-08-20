import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from './canvasjs.min';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-pro-project-report',
  templateUrl: './pro-project-report.component.html',
  styleUrls: ['./pro-project-report.component.css']
})
export class ProProjectReportComponent implements OnInit {
  project_id:any;
  constructor(private _app: AppComponent,private _activatedroute: ActivatedRoute,private _router: Router,private _ProjectService:ProjectService) { }
 select_permissions:any;
  chart_type:any;
  
  projectname:any;
  report_data:any;
  report_title:any;
  allDueTasks:any;
  alldatetask: any;
  showchart:boolean=true;
  showlist:boolean=false;
	ngOnInit() {
    this._activatedroute.params.subscribe(params => {
      this.project_id = params['id'];
   });
    this.get_all_task_data_by_project_id('Task Status');
     this.select_permissions = localStorage.getItem('permissions');
   this.get_due_task();
   this.alldatetask = localStorage.getItem('company_dateformat');
    }
	
	change_chart_type(type){
	this.chart_type = type;
	let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		 axisX: [
  {
  title :this.report_title,
  },
  
], 
		title: {
			text: this.report_title
		},
		data: [{
			 // interval: 5,
			type: this.chart_type,
			dataPoints: this.report_data
			
		}]
  });
 
	chart.render();
	
  }
  onButtonGroupClick($event){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }

      clickedElement.className += " active";
    }

  }
  get_all_task_data_by_project_id(report_title){
    //this._app.loading = true;
    this.showchart=true;
    this.showlist=false;
    const data ={
      project_id:this.project_id,
      reoprt_type:report_title,
    }
   this._ProjectService.get_all_task_status_by_project_id(data)
    .subscribe(
      res => {
       // this._app.loading = true;
        console.log(res);
        this.report_data = res.data;
		console.log(this.report_data);
        this.report_title = report_title;
		console.log(this.report_title);
        this.projectname=res.project;
        this.change_chart_type('bar');
        
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

  get_all_task_priority_by_project_id(){
    //this._app.loading = true;
    const data ={
      project_id:this.project_id,
    }
   this._ProjectService.get_all_task_priority_by_project_id(data)
    .subscribe(
      res => {
        console.log(res);
        this.report_data = res.data;
        this.report_title = 'Task Priority';
        this.change_chart_type('bar');
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

  get_due_task(){
    const data ={
      project_id:this.project_id,
      due_date :  new Date(),
    }
   this._ProjectService.get_due_task(data)
    .subscribe(
      res => {
        console.log(res);
        this.allDueTasks = res.data;
        this.showchart=false;
        this.showlist=true;
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
  
   print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}
