import { Injectable } from '@angular/core';
import { catchError, from, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private url = 'https://sendemail-xrrbnpwedq-uc.a.run.app';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow requests from all origins
      Accept: '*/*',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
       'Access-Control-Allow-Headers': 'Content-Type,X-API-KEY,X-Requested-With,Accept,  X-Auth-Token, Origin, Authorization,Access-Control-Request-Method,Access-Control-Request-Headers',
       
    }),
  };

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, text: string) {
    const emailData = { to, subject, text };
    return this.http.post(this.url, emailData, this.httpOptions);
  }
  // sendEmail(to: string, subject: string, text: string): Observable<any> {
  //   const emailData = { to, subject, text };
  //   return this.http.post(this.url, emailData,this.httpOptions);
  // }
}
