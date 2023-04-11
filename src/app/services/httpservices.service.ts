import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {

  constructor(private http: HttpClient) { }

  verifyUser(mailId : any, password : any): Observable<any> {
    const URL = environment.api_url + 'get/verifyUser/' + mailId + '/' + password;
    return this.http.get<any>(URL)
  }

  insertUser(userInfo:any): Observable<any> {
    const URL = environment.api_url + 'post/insertUser';
    return this.http.post<any>(URL, userInfo)
  }

}
