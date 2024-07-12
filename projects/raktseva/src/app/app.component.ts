import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequirementFormComponent } from "./requirement-form/requirement-form.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { InviteFriendModalComponent } from './invite-friend-modal/invite-friend-modal.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditProfileComponent, ProfileComponent, RequirementFormComponent,InviteFriendModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'raktseva';
}
