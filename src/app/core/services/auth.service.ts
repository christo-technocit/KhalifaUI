import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  getMenus(data): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Users/GetMenu?UserName=${data.username}`)
            .pipe(
              map(res => res)
          );
      }
}
