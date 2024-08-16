import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPermissionService } from '../auth-permission.service';
import { Router } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';
import {signIn, signUp} from 'aws-amplify/auth'

@Component({
  selector: 'app-login-with-phone',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-with-phone.component.html',
  styleUrls: ['./login-with-phone.component.scss'],
})
export class LoginWithPhoneComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthPermissionService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.authService.initializeRecaptcha('recaptcha-container');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const phoneNumber = this.loginForm.value.mobileNumber;
      localStorage.setItem('loginFormData', JSON.stringify(this.loginForm.value));
      this.authService.login(`+91${phoneNumber}`);
    }
  }

  async signUp() {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: `+91${this.loginForm.value.mobileNumber}`,
        password: 'TempPassword123!',
        options: {
          userAttributes: {
            email: 'hello@mycompany.com',
            phone_number: `+91${this.loginForm.value.mobileNumber}`,
          },
        },
      });
      this.authService.uid=userId
      console.log( isSignUpComplete, userId, nextStep )
      this.route.navigate(['otp']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
  // async signIn() {
  //   let userExist: boolean = false;
  //   localStorage.setItem('loginFormData', JSON.stringify(this.loginForm.value));

  //   this.authService.phone = this.loginForm.value.mobileNumber;
  //   try {
  //     const output = await signIn({
  //       password: 'TempPassword123!',
  //       username: `+91${this.loginForm.value.mobileNumber}`,
  //       options: {
  //         userAttributes: {
  //           email: 'hello@mycompany.com',
  //           phone_number: `+91${this.loginForm.value.mobileNumber}`,
  //         },
  //       },
  //     }).then((result) => {
  //       this.authService.isUserExist = true;
  //       // this.DataProviderService.loginConfirmationResult = nextStep;
  //       // this.DataProviderService.userMobile = this.loginForm.value.mobileNumber;
  //       this.route.navigate(['otp']);
  //     });
  //   } catch (error: any) {
  //     console.log(error.name);
  //     const code = error.name;
  //     switch (code) {
  //       case 'UserNotFoundException': {
  //         await this.signUp();
  //         break;
  //       }
  //       case 'NotAuthorizedException':
  //       case 'PasswordResetRequiredException':
  //       case 'UserAlreadyAuthenticatedException':
  //       case 'UserNotConfirmedException':
  //       case 'UsernameExistsException': {
  //         userExist = false;
  //         break;
  //       }
  //     }
  //   }
  // }
  async signIn() {
    let userExist: boolean = false;
    localStorage.setItem('loginFormData', JSON.stringify(this.loginForm.value));
  
    this.authService.phone = this.loginForm.value.mobileNumber;
    try {
      const output = await signIn({
        password: 'TempPassword123!',
        username: `+91${this.loginForm.value.mobileNumber}`,
        options: {
          userAttributes: {
            email: 'hello@mycompany.com',
            phone_number: `+91${this.loginForm.value.mobileNumber}`,
          },
        },
      }).then((result) => {
        this.authService.isUserExist = true;
        this.route.navigate(['otp']);
      });
    } catch (error: any) {
      console.log(error.name);
      const code = error.name;
      switch (code) {
        case 'UserNotFoundException': {
          await this.signUp();
          break;
        }
        case 'NotAuthorizedException':
        case 'PasswordResetRequiredException':
        case 'UserNotConfirmedException':
        case 'UsernameExistsException': {
          userExist = false;
          break;
        }
        case 'UserAlreadyAuthenticatedException': {
          this.route.navigate(['home']);
          break;
        }
      }
    }
  }
}
