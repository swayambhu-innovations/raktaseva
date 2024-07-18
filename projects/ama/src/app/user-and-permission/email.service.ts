import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailUrl = 'https://sendemail-xrrbnpwedq-uc.a.run.app';

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, text: string) {
    const emailData = { to, subject, text };
    console.log(emailData);
    return this.http
      .post<Observable<any>>(this.emailUrl, emailData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

