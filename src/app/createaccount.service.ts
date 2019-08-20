import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateaccountService {
  private _createhomeownerUrl = `${environment.api}/create_account/home_owner`;
  private _createhomeowneraddressUrl = `${environment.api}/create_account/home_owneraddress`;
  private _createaccountUrl = `${environment.api}/create_account/professional`;
  private _professionalcompanyprofileUrl = `${environment.api}/create_account/professional_companyprofile`;
  private _professionalcompanylicenseUrl = `${environment.api}/create_account/save_company_license`;
  private _getprofessionalcompanydetails = `${environment.api}/get_professional_company_profile`;
   private _getprofessionalaccountdetails = `${environment.api}/get_professional_account_profile`;
  private _professionalupdatecompanyprofileUrl = `${environment.api}/update_professional_company_profile`;
   private _professionalupdateaccountprofileUrl= `${environment.api}/update_professional_account`;
  private _updatepasswordUrl = `${environment.api}/updatepassword`;
  private _getAllCountries = `${environment.api}/get_all_countries`;
  private _getAllStateByCountryId = `${environment.api}/get_all_state_by_country_id`; 
  private _getSizeAndEst = `${environment.api}/get_company_size_select_list`; 
  private _professionalupdateaccountdetailprofileUrl= `${environment.api}/update_professional_accountdetail`;
  private _getAlltimezone = `${environment.api}/get_all_timezone`;
  private _updatedatetimeUrl = `${environment.api}/update_datetime_detail`;
  private _addNotesdetailUrl = `${environment.api}/add_notes_detail`;
   private _createNewstatusUrl = `${environment.api}/create_new_status`;
   private _updateNotesdetailUrl = `${environment.api}/update_notes_detail`;
  private _getdatetimeUrl = `${environment.api}/get_datetime_detail`;
  private _updatecolorUrl = `${environment.api}/update_color_detail`;
   private _updatenewstatusUrl = `${environment.api}/update_new_statusname`;
  private _getcolorUrl = `${environment.api}/get_color_data`;
  private _getstatusdataUrl = `${environment.api}/get_status_data`;
    private _getstatusnamedataUrl = `${environment.api}/get_statusname_data`;
   private _deletestatusdataUrl = `${environment.api}/delete_status_data`;
   private _deleteroleUrl = `${environment.api}/delete_role`;
  constructor(private http: HttpClient) { }

  createHomeOwner(homeowner)
  {
    return this.http.post<any>(this._createhomeownerUrl,homeowner);
  }
  createHomeOwnerAddress(data)
  {
    return this.http.post<any>(this._createhomeowneraddressUrl,data);
  }

  createprofessionalAccount(professionalData)
  {
    return this.http.post<any>(this._createaccountUrl,professionalData);
  }
  professionalcompanyprofile(companyprofiledata){
    return this.http.post<any>(this._professionalcompanyprofileUrl,companyprofiledata);
  }

  professionalcompanylicense(companyprofiledata){
    return this.http.post<any>(this._professionalcompanylicenseUrl,companyprofiledata); 
  }

  getprofessionalcompanydetails(){
    return this.http.get<any>(this._getprofessionalcompanydetails); 
  }
    getprofessionalaccountdetails(){
    return this.http.get<any>(this._getprofessionalaccountdetails); 
  }

  professionalupdatecompanyprofile(companyprofiledata){
    return this.http.post<any>(this._professionalupdatecompanyprofileUrl,companyprofiledata);
  }
professionalupdateaccountprofile(companyprofiledata){
    return this.http.post<any>(this._professionalupdateaccountprofileUrl,companyprofiledata);
  }
  updatepassword(data){
    return this.http.post<any>(this._updatepasswordUrl,data);
  }

  get_all_countries(){
    return this.http.get<any>(this._getAllCountries); 
  }
  get_all_state_by_country_id(data){
    return this.http.post<any>(this._getAllStateByCountryId,data);
  }
  get_size_and_est(){
    return this.http.get<any>(this._getSizeAndEst); 
  }

  professionalupdateaccountdetailprofile(companyprofiledata){
    return this.http.post<any>(this._professionalupdateaccountdetailprofileUrl,companyprofiledata);
  }
  get_all_timezone(){
    return this.http.get<any>(this._getAlltimezone); 
  }
  update_datetime_detail(data){
    return this.http.post<any>(this._updatedatetimeUrl,data);
  }
  add_notes_detail(data){
    return this.http.post<any>(this._addNotesdetailUrl,data);
  }
   create_new_status(data){
    return this.http.post<any>(this._createNewstatusUrl,data);
  }
   update_notes_detail(data){
    return this.http.post<any>(this._updateNotesdetailUrl,data);
  }
  get_datetime_detail(){
    return this.http.get<any>(this._getdatetimeUrl);
  }
  update_color_detail(data){
    return this.http.post<any>(this._updatecolorUrl,data);
  }
   update_new_statusname(data){
    return this.http.post<any>(this._updatenewstatusUrl,data);
  }
  get_color_data(){
    return this.http.get<any>(this._getcolorUrl); 
  }
  get_status_data(){
    return this.http.get<any>(this._getstatusdataUrl); 
  }
  get_statusname_data(data){
    return this.http.post<any>(this._getstatusnamedataUrl,data); 
  }
  delete_status_data(data){
    return this.http.post<any>(this._deletestatusdataUrl,data);
  }

  delete_role(data){
    return this.http.post<any>(this._deleteroleUrl,data);
  }
}
