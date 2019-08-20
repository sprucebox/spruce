import {Injectable} from "@angular/core";
import {Link} from "../models/link";
import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class LinkService {
     constructor(private http: HttpClient,private http2: Http) { }
    private _createProjectUrl = `${environment.api}/get_task_for_chart_by_project_id_new`;
	private _AddTaskProjectUrl = `${environment.api}/add_task_detail_by_depandancy`;
    get(data): Promise<any> {
         console.log(data);
        return this.http.post(this._createProjectUrl,data)
        .toPromise();
    }

     insert(link: Link): Promise<any> {
         console.log(link);
         return this.http.post(this._AddTaskProjectUrl,link)
         .toPromise();
     }

     update(link: Link): Promise<any> {
         console.log('link update');
         return this.http.get(this._AddTaskProjectUrl)
         .toPromise();
     }

    remove(id: number): Promise<any> {
        console.log('link remove');
         return this.http.get(this._createProjectUrl)
         .toPromise();
     }
}