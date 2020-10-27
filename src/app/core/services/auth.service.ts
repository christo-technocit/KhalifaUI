import { Injectable } from '@angular/core';
import { api } from '../_utils/api.url';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl :string  = api;
  constructor(private httpClient: HttpClient) { }

  loginToApp(data){
    return this.httpClient.get(this.baseUrl+`Users/ValidateUser?UserName=${data.username}&Password=${data.password}`);
  }
}
