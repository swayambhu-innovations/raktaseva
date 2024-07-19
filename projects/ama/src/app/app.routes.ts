import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    // { path: '', component: LoginWithPhoneComponent },
    // { path: 'login', component: LoginComponent},
    
    // {path:'',component:LoginComponent},
    {
        path: 'home',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        component:LoginComponent,
       
      },
];
