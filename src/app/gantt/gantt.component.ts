import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import "dhtmlx-gantt";

declare let gantt: any;

import {TaskService} from "../services/task.service";
import {LinkService} from "../services/link.service";
import { Task } from "../models/task";
import { Link } from "../models/link";
import { ProjectService } from '../services/project.service';


@Component({
    selector: "gantt",
    styles: [
        `
        :host{
            display: block;
            height: 600px;
            position: relative;
            width: 100%;
        }
    `],
    providers: [TaskService, LinkService],
    template: "<div #gantt_here style='width: 100%; height: 100%;'></div>",
})
export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    constructor(private taskService: TaskService, private linkService: LinkService,private _ProjectService:ProjectService){}
project_id:any;
response:any;
    ngOnInit(){
      gantt.config.xml_date = "%Y-%m-%d %H:%i";

      gantt.init(this.ganttContainer.nativeElement);

      gantt.attachEvent("onAfterTaskAdd", (id, item) => {
           this.taskService.insert(this.serializeTask(item, true))
               .then((response)=> {
                  if (response.id != id) {
                       gantt.changeTaskId(id, response.id)
					  
                   }
               });
       });
this._ProjectService.get_project_id.subscribe(res=>this.project_id = res);
console.log(this.project_id);
       gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
           this.taskService.update(this.serializeTask(item));
       });

       gantt.attachEvent("onAfterTaskDelete", (id) => {
           this.taskService.remove(id);
       });

       gantt.attachEvent("onAfterLinkAdd", (id, item) => {
           this.linkService.insert(this.serializeLink(item, true))
               .then((response) => {
                  if(response.id != id){
                       gantt.changeLinkId(id, response.id);
                   }
         });
       });

       gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
           this.linkService.update(this.serializeLink(item));
       });

      gantt.attachEvent("onAfterLinkDelete", (id) => {
           this.linkService.remove(id);
       });
const data1 = {projectiddetail : this.project_id}
console.log(data1);
      Promise.all([this.taskService.get(data1), this.linkService.get(data1)])
          .then(([data,links ]) => {
              gantt.parse({data, links });
			  console.log(data)
          });

  }

   private serializeTask(data: any, insert: boolean = false): Task {
       return this.serializeItem(data, insert) as Task;
   }

   private serializeLink(data: any, insert: boolean = false): Link {
       return this.serializeItem(data, insert) as Link;
   }

  private serializeItem(data: any, insert: boolean): any{
       var result = {};

      for (let i in data) {
           if (i.charAt(0) == "$" || i.charAt(0) == "_") continue;
           if(insert && i == "id") continue;
           if (data[i] instanceof Date) {
               result[i] = gantt.templates.xml_format(data[i]);
           }
           else {
               result[i] = data[i];
           }
		  
       }

       return result;
   }
}