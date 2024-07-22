
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms'; 

// @Component({
//   selector: 'app-login-with-phone',
//   standalone:true,
//   imports: [ ReactiveFormsModule],
//   templateUrl: './login-with-phone.component.html',
//   styleUrls: ['./login-with-phone.component.scss']
// })
// export class LoginWithPhoneComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       console.log('Form Submitted', this.loginForm.value);
//     }
//   }
// }


// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms'; 
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// // import { AuthService } from '../../core/auth.service';
// import { FormControl } from '@angular/forms';
// import { RecaptchaVerifier } from '@angular/fire/auth';
// import { DataProviderService } from '../../core/data-provider.service';
// import { authGuard } from '../auth.guard';
// import { Auth } from 'firebase/auth';
// // import { AlertsAndNotificationsService } from '../../alerts-and-notifications.service';
// // import { LoadingController } from '@ionic/angular';

// @Component({
//   selector: 'app-login-with-phone',
//   standalone:true,
//   imports: [ ReactiveFormsModule],
//   templateUrl: './login-with-phone.component.html',
//   styleUrls: ['./login-with-phone.component.scss']
// })
// export class LoginWithPhoneComponent {
//   loginForm: FormGroup;
//   phoneNumber:string= '';
//   terms:boolean= false;
//   verifier:RecaptchaVerifier|undefined;
//   constructor(private router: Router,private fb: FormBuilder,public auth:authGuard, public dataProvider:DataProviderService,) 
//    {  
//     // this.loginForm = this.fb.group({
//   //   mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
//   }
//   // );


//   // ngOnInit() {
    
//   // }


//   // onSubmit() {
//   //   if (this.loginForm.valid) {
//   //     console.log('Form Submitted', this.loginForm.value);
//   //   }
//   // }

//   async login(){
//     let loader = await this.loaderService.create({
//       message:'Logging in...',
//     });
//     loader.present();
//     if (!this.verifier) this.verifier = new RecaptchaVerifier('recaptcha-container',{'size':'invisible'},this.authService.auth);
//     this.authService.loginWithPhoneNumber(this.phoneNumber,this.verifier).then((login)=>{
//       this.dataProvider.loginConfirmationResult=login;
//       this.dataProvider.userMobile = this.phoneNumber;
//       this.router.navigate(['unauthorized/otp'])
//     }).catch((error)=>{
//       console.log(error);
//       this.alertify.presentToast(error.message);
//     }).finally(()=>{
//       loader.dismiss();
//     });
//   } 
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPermissionService } from '../auth-permission.service';
import { Router } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-login-with-phone',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-with-phone.component.html',
  styleUrls: ['./login-with-phone.component.scss']
})
export class LoginWithPhoneComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthPermissionService, private route:Router) {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.authService.initializeRecaptcha('recaptcha-container');
  }

  onSubmit() {
  
    if (this.loginForm.valid) {
      const phoneNumber = this.loginForm.value.mobileNumber;
      this.authService.login(`+91${phoneNumber}`);  
      
    }
   
  }
}
