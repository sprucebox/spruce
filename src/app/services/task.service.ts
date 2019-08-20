import {Injectable} from "@angular/core";
import {Task} from "../models/task";
import { environment } from '../../environments/environment.prod';

import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TaskService {
    private _createProjectUrl = `${environment.api}/get_task_for_chart_by_project_id_new`;
	private _AddTaskProjectUrl = `${environment.api}/add_task_detail_by_depandancy`;
    constructor(private http: HttpClient,private http2: Http) { }
    
    get(data): Promise<any>{
        console.log(data);
        return this.http.post<any>(this._createProjectUrl,data)
        .toPromise();
		
    }
    
     insert(task: Task): Promise<any> {
         console.log(task);
         return this.http.post(this._AddTaskProjectUrl,task)
        .toPromise();
     }


     update(task: Task): Promise<any> {
         console.log(task);
         return this.http.get(this._AddTaskProjectUrl)
         .toPromise();
     }

    remove(id: number): Promise<any> {
        console.log('task remove');
         return this.http.get(this._createProjectUrl)
         .toPromise();
    }
}