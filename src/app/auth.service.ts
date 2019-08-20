import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServicenew {

  private _registerUrl = `${environment.api}/auth/register`;
  private _loginUrl = `${environment.api}/auth/login`;
  private _insertforgetUrl = `${environment.api}/update_new_password`;
  private _forgetUrl = `${environment.api}/request_forget_password`;
  private _getUserType = `${environment.api}/get_user_type`;
  private _getUserBySecret = `${environment.api}/get_user_by_secret`;
  private _updateInviteUser = `${environment.api}/update_invite_user`;
  private _socialRegisterUser = `${environment.api}/social_register_user`;
  private _socialLoginUser = `${environment.api}/social_login_user`;

  constructor(private http: HttpClient) { }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl,user);
  }

  loggedIn()
  {
    return !!localStorage.getItem("token");
  }

  getToken()
  {
    return localStorage.getItem("token");
  }

  removeToken()
  {
    return localStorage.removeItem("token");
  }
  insertPassword(user)
	{
		
    return this.http.post<any>(this._insertforgetUrl,user);
  }
  forgetPassword(user)
	{
		return this.http.post<any>(this._forgetUrl,user);
  }
  get_user_type()
	{
		return this.http.get<any>(this._getUserType);
  }
  get_user_by_secret(user)
	{
		return this.http.post<any>(this._getUserBySecret,user);
  }
  
  update_invite_user(data)
	{
		return this.http.post<any>(this._updateInviteUser,data);
  }

  social_register_user(data)
	{
		return this.http.post<any>(this._socialRegisterUser,data);
  }

  social_login_user(data)
	{
		return this.http.post<any>(this._socialLoginUser,data);
  }
}
