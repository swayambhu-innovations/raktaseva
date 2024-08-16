import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://sendsms-xrrbnpwedq-uc.a.run.app/send-otp';

  constructor(private http: HttpClient) { }

  sendOtp(payload: { recipients: string[], message: string }): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<any> {
    // Implement this method based on your backend implementation
    return this.http.post('your-verification-endpoint', { phoneNumber, otp });
  }
}
