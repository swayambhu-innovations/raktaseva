import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequirementFormComponent } from "./requirement-form/requirement-form.component";

import { ProfileComponent } from './profile/profile.component';
import { InviteFriendModalComponent } from './invite-friend-modal/invite-friend-modal.component';
import { UserdetailComponent } from "./userdetail/userdetail.component";
import { OtpComponent } from "./auth/otp/otp.component";
import { LoginWithPhoneComponent } from "./auth/login-with-phone/login-with-phone.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { HeaderWithBackComponent } from "./shared/header-with-back/header-with-back/header-with-back.component";
import { HomeComponent } from "./home/home.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, RequirementFormComponent, UserdetailComponent, InviteFriendModalComponent, OtpComponent, LoginWithPhoneComponent, EditProfileComponent, HeaderWithBackComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'raktseva';
}
