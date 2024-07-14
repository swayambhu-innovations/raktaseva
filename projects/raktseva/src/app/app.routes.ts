import { Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: ProfileComponent },
    { path: 'editprofile', component: EditProfileComponent }
];
