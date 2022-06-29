import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ManageService {

  constructor(private http:HttpClient) {}
  registerUser(userData: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/user/',userData)
  }
  findUser():Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/')
  }
  SendMail(userData:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/save/',userData)
  }
}
