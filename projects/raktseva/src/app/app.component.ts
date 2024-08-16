import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequirementFormComponent } from './requirement-form/requirement-form.component';

import { ProfileComponent } from './profile/profile.component';

import { UserdetailComponent } from './userdetail/userdetail.component';
import { OtpComponent } from './auth/otp/otp.component';
import { LoginWithPhoneComponent } from './auth/login-with-phone/login-with-phone.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HeaderWithBackComponent } from './shared/header-with-back/header-with-back/header-with-back.component';
import { HomeComponent } from './home/home.component';
import { BottomNavbarComponent } from './shared/bottom-navbar/bottom-navbar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NotificationComponent } from './notification/notification.component';
import { StatusComponent } from './status/status.component';
import { ContactComponent } from './contact/contact.component';
import { HelpFaqComponent } from './help-faq/help-faq.component';
import { HistoryComponent } from './history/history.component';
import { InviteFriendModalComponent } from './invite-friend-modal/invite-friend-modal.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileComponent,
    LoaderComponent,
    RequirementFormComponent,
    UserdetailComponent,
    OtpComponent,
    LoginWithPhoneComponent,
    EditProfileComponent,
    HeaderWithBackComponent,
    HomeComponent,
    BottomNavbarComponent,
    NavbarComponent,
    NotificationComponent,
    TestimonialComponent,
    StatusComponent,
    ContactComponent,
    HelpFaqComponent,
    HistoryComponent,
    InviteFriendModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    const amplifyConfig = {
      aws_project_region: 'ap-south-1',
      aws_cognito_identity_pool_id:
        'ap-south-1:51a2a247-01e2-45aa-9f05-b6c30cc7f7d8',
      aws_cognito_region: 'ap-south-1',
      aws_user_pools_id: 'ap-south-1_GPmaR9caZ',
      aws_user_pools_web_client_id: '5qv2bvmvtuoo6u29fgoclfoer1',
      oauth: {},
      aws_cognito_username_attributes: ['PHONE_NUMBER'],
      aws_cognito_social_providers: [],
      aws_cognito_signup_attributes: ['PHONE_NUMBER'],
      aws_cognito_mfa_configuration: 'OFF',
      aws_cognito_mfa_types: ['SMS'],
      aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: [],
      },
      aws_cognito_verification_mechanisms: ['EMAIL'],
    };
  }
  title = 'raktseva';
}
