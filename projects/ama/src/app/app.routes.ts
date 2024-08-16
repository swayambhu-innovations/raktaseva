import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { UserAndPermissionComponent } from './user-and-permission/user-and-permission.component';
import { PendingComponent } from './modules/pending/pending.component';
import { ApprovedComponent } from './modules/approved/approved.component';
import { CancelledComponent } from './modules/cancelled/cancelled.component';
import { DonorReadyDonationComponent } from './modules/donor-ready-donation/donor-ready-donation.component';

export const routes: Routes = [
  // { path: '', component: LoginWithPhoneComponent },
  // { path: 'login', component: LoginComponent },

  // {path:'',component:LoginComponent},
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },
  
  {
    path: 'userpermission',
    component: UserAndPermissionComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'pending',
    component: PendingComponent,
  },
  {
    path: 'approve',
    component: ApprovedComponent,
  },
  {
    path: 'cancel',
    component: CancelledComponent,
  },
  {
    path: 'readydonor',
    component: DonorReadyDonationComponent,
  },
];
