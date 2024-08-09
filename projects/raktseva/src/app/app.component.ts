import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequirementFormComponent } from "./requirement-form/requirement-form.component";

import { ProfileComponent } from './profile/profile.component';

import { UserdetailComponent } from "./userdetail/userdetail.component";
import { OtpComponent } from "./auth/otp/otp.component";
import { LoginWithPhoneComponent } from "./auth/login-with-phone/login-with-phone.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { HeaderWithBackComponent } from "./shared/header-with-back/header-with-back/header-with-back.component";
import { HomeComponent } from "./home/home.component";
import { BottomNavbarComponent } from "./shared/bottom-navbar/bottom-navbar.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { NotificationComponent } from "./notification/notification.component";
import { StatusComponent } from "./status/status.component";
import { ContactComponent } from "./contact/contact.component";
import { HelpFaqComponent } from "./help-faq/help-faq.component";
import { HistoryComponent } from "./history/history.component";
import { InviteFriendModalComponent } from "./invite-friend-modal/invite-friend-modal.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, RequirementFormComponent, UserdetailComponent, OtpComponent, LoginWithPhoneComponent, EditProfileComponent, HeaderWithBackComponent, HomeComponent, BottomNavbarComponent, NavbarComponent, NotificationComponent, TestimonialComponent, StatusComponent, ContactComponent, HelpFaqComponent, HistoryComponent, InviteFriendModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'raktseva';
}
