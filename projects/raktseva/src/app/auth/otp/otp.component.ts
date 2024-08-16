// import { Component, QueryList, ViewChildren } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { NgFor } from '@angular/common';
// import { AuthPermissionService } from '../auth-permission.service';
// import { Location } from '@angular/common';
// @Component({
//   selector: 'app-otp',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule,NgFor],
//   templateUrl: './otp.component.html',
//   styleUrls: ['./otp.component.scss']
// })
// export class OtpComponent {
//   otp: FormGroup;
// //  @ViewChildren('otp') otpInputs!: QueryList<any>;

//   constructor(private fb: FormBuilder,private authService: AuthPermissionService,private location: Location) {
//     this.otp = this.fb.group({
//       otp1: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
//     });
//   }

  

  

//   // resendOTP(): void {
//   //   const phoneNumber = this.getPhoneNumber();
//   //   if (phoneNumber) {
//   //     this.authService.login(phoneNumber); // Assuming login method handles OTP sending
//   //     this.clearOtpInputs();
//   //   }
//   // }

//   goBack() {
//     this.location.back();
//   }
//   onSubmit(): void {

//     if (this.otp.valid) {
//       const ph = this.otp.value.otp1;
//       console.log('Form Submitted', ph);
//       this.authService.verifyCode(ph); 
//     }
//   }
// }

import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { AuthPermissionService } from '../auth-permission.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  otp: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthPermissionService) {
    this.otp = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp6: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  
  }

  

  moveToNext(event: any, index: number) {
    const input = event.target;
    const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;

    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  moveToPrevious(event: any, index: number) {
    const input = event.target;
    const previousInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement;

    if (event.key === 'Backspace' && input.value.length === 0 && previousInput) {
      previousInput.focus();
    }
  }

  // goBack() {
  //   this.location.back();
  // }


  resendOTP() {
    console.log('Resend OTP clicked');
    this.authService.resendOTP();
    this.clearOtpInputs();
  }

  clearOtpInputs() {
    this.otp.reset();
  }

  onSubmit(): void {
    if (this.otp.valid) {
      const otpValue = this.otp.value;
      const otpCode = Object.values(otpValue).join('');
      // console.log('Entered OTP:', otpCode);
      this.authService.verifyOTP(otpCode); 
    }
  }
}
