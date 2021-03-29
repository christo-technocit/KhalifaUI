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

      changePassword(data){
        return this.httpClient.get(this.baseUrl+`Users/ChangePassword?UserName=${data.username}&Password=${data.password}`);
      }

 /*      resetPassword(data){
        return this.httpClient.get(this.baseUrl+`Mail?Name=${data.username}&Email=${data.email}&Subject=${data.subject}&Message=${data.message}`);
        ///api/Mail?Name=Dr.%20Sabina&Email=augustine%40technocit.com&Subject=RESET%20PASSWORD&Message=resetting%20password
      } */

      resetPassword(Email: any = 0) {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        let options = { headers: headers };
        let data = {
          "Name": Email//,
         // "Email": Email,
         // "Subject": 'Reset Password',
         // "Message": 'http://www.ku.com/change-password'
 
        }
        console.log(data); 
        console.log(this.baseUrl + 'Mail');

           return this.httpClient.post(this.baseUrl + 'Mail/SendMail', data, options);
         // return this.httpClient.post(this.baseUrl + 'Mail?Name='+Email+'&Email='+Email+'&Subject=ResetPassword&Message='+this.baseUrl+'\change-password', data, options);

      }
}
