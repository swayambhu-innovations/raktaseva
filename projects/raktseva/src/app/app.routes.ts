import { Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginWithPhoneComponent } from './auth/login-with-phone/login-with-phone.component';
import { OtpComponent } from './auth/otp/otp.component';
import { AuthGuard } from './auth/auth.guard';
import { UserdetailComponent } from './userdetail/userdetail.component';

export const routes: Routes = [
     { path: '', component: ProfileComponent },
     { path: 'editprofile', component: EditProfileComponent }
    // { path: '', component: LoginWithPhoneComponent },
    // { path: 'otp', component: OtpComponent},
    // { path: 'userdetail', component: UserdetailComponent,canActivate:[AuthGuard] },
    
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];



























































































































  
