import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { BloodInventoryComponent } from './blood-inventory/blood-inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceiverDetailComponent } from './receiver-detail/receiver-detail.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';

export const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
   },  
  {
        path: 'home',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      
       { path: 'bloodInventory', component: BloodInventoryComponent },
       { path: 'receiverDetail', component: ReceiverDetailComponent},
       {path: 'donorDetail', component: DonorDetailComponent},
       {path: 'userPermission', component: UserPermissionComponent},
       
];
