import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'https://sendemail-xrrbnpwedq-uc.a.run.app'; // Replace with your Firebase function URL

  constructor(private http: HttpClient) {}

  sendEmail(recipients: string[], subject: string, text: string, html: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { recipients, subject, text, html };

    return this.http.post<any>(this.emailUrl, body, { headers });
  }
}
