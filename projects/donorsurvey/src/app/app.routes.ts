import { Routes } from '@angular/router';
import { SurveySubmitComponent } from './survey-form/survey-submit/survey-submit.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyThankComponent } from './survey-form/survey-submit/survey-thank/survey-thank.component';

export const routes: Routes = [
   { path: 'next-component', component: SurveySubmitComponent },
   { path: '', component: SurveyFormComponent },
   

  { path: 'thank-component', component: SurveyThankComponent },
   { path: '', component: SurveySubmitComponent  }
];
