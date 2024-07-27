import { Routes } from '@angular/router';
import { Page2Component } from './surveyForm/page-2/page-2.component';
import { Page1Component } from './surveyForm/page-1/page-1.component';
import { SalutationComponent } from './surveyForm/salutation/salutation.component';
export const routes: Routes = [
    {path:'',component:Page1Component},

    {path:'page-2',component:Page2Component},
    {path: 'salutation', component: SalutationComponent }
];
