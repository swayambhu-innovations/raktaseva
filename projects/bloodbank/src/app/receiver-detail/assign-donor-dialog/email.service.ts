import { Injectable } from '@angular/core';
import { httpsCallable } from '@angular/fire/functions';
import { from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  // sendEmail(to: string, subject: string, text: string): Promise<any> {
  //   const callable = httpsCallable('sendEmail'); // Provide the function name here
  //   return from(callable({ to, subject, text }))
  //     .pipe(
  //       map(result => result.data),
  //       catchError(error => {
  //         console.error('Error sending email:', error);
  //         return throwError(error);
  //       })
  //     )
  //     .toPromise();
  // }
  sendEmail(){
    
  }
}
