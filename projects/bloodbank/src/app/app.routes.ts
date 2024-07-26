import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { BloodInventoryComponent } from './blood-inventory/blood-inventory.component';

export const routes: Routes = [
    {
        path: 'home',
        component: BloodInventoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component:LoginComponent,
       
      },
];
