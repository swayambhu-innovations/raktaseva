import { Routes } from '@angular/router';
import { YesThankComponent } from './donor-acknowledge/yes-thank/yes-thank.component';
import { DonorAcknowledgeComponent } from './donor-acknowledge/donor-acknowledge.component';
import { NoThankComponent } from './donor-acknowledge/no-thank/no-thank.component';

export const routes: Routes = [
    { path: ' ', component: DonorAcknowledgeComponent },
  { path: 'yes-thank', component: YesThankComponent },
  { path: 'no-thank', component: NoThankComponent },
];
