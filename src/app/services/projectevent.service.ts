import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


@Injectable()
export class ProjecteventService {


    private _createEventUrl = `${environment.api}/save_project_event`;
    private _updateEventUrl = `${environment.api}/update_project_event`;
    private _getAllEventUrl = `${environment.api}/get_project_event`;
    private _getAllUserEventUrl = `${environment.api}/get_user_event`;
    private _getEventByIdUrl = `${environment.api}/get_event_by_id`;
    private _getMeetingByIdUrl = `${environment.api}/get_meeting_by_id`;
	private _getMeetingById1Url = `${environment.api}/get_meeting_by_id1`;
    private _getTaskByIdUrl = `${environment.api}/get_task_by_id`;
    private _updateEventStartById = `${environment.api}/update_event_start_by_id`;
    private _updateMeetingStartById = `${environment.api}/update_meeting_start_by_id`;
    private _updateTaskStartById = `${environment.api}/update_task_start_by_id`;
    private _getAllEventdataUrl = `${environment.api}/get_project_eventdata`;
    private _getAllUserEventdataUrl = `${environment.api}/get_user_eventdata`;
    private _deleteEventUrl = `${environment.api}/delete_event`;
    private _deleteMeetingUrl = `${environment.api}/delete_meeting`;

    constructor(private http: HttpClient) { }
    
    public save_project_event(data){
        return this.http.post<any>(this._createEventUrl,data);
    }

    public update_project_event(data){
        return this.http.post<any>(this._updateEventUrl,data);
    }

    public getEvents(data): Observable<any> {
         return this.http.post<any>(this._getAllEventUrl,data);
    }
    public getUserEvents(): Observable<any> {
        return this.http.get<any>(this._getAllUserEventUrl);
   }

    public get_event_by_id(data): Observable<any> {
        return this.http.post<any>(this._getEventByIdUrl,data);
   }

   public get_meeting_by_id(data): Observable<any> {
    return this.http.post<any>(this._getMeetingByIdUrl,data);
    }
	 public get_meeting_by_id1(data): Observable<any> {
    return this.http.post<any>(this._getMeetingById1Url,data);
    }
   public get_task_by_id(data): Observable<any> {
        return this.http.post<any>(this._getTaskByIdUrl,data);
    }
    update_event_start_by_id(data){
        return this.http.post<any>(this._updateEventStartById,data);
      }
    update_meeting_start_by_id(data){
        return this.http.post<any>(this._updateMeetingStartById,data);
    }
    update_task_start_by_id(data){
        return this.http.post<any>(this._updateTaskStartById,data);
    }
    public getEventdata(data): Observable<any> {
        return this.http.post<any>(this._getAllEventdataUrl,data);
    }
    public getUserEventdata(data): Observable<any> {
        return this.http.post<any>(this._getAllUserEventdataUrl,data);
    }

    delete_event(data){
        return this.http.post<any>(this._deleteEventUrl,data);
    }

    delete_meeting(data){
        return this.http.post<any>(this._deleteMeetingUrl,data);
    }


}
