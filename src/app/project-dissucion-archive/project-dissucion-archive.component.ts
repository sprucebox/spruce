import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-dissucion-archive',
  templateUrl: './project-dissucion-archive.component.html',
  styleUrls: ['./project-dissucion-archive.component.css']
})
export class ProjectDissucionArchiveComponent implements OnInit {

  project_id:any;
  discussions:any;
  constructor(private _router: Router,private _activatedroute: ActivatedRoute,private _ProjectService:ProjectService) { }

 ngOnInit() {
    this._activatedroute.params.subscribe(params => {
        
      this.project_id = params['id'];
     
    });
    this.get_project_discussion_archive();
  }
get_project_discussion_archive(){
    const data = {
      project_id :this.project_id
    }
    this._ProjectService.get_project_discussion_archive(data).subscribe(res => {
      this.discussions =res.data;
      console.log(res.data);
    });
    
  }

}
