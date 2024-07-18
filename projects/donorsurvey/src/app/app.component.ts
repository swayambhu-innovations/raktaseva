import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page1Component } from "./surveyForm/page-1/page-1.component";
import { Page2Component } from "./surveyForm/page-2/page-2.component";
import { SalutationComponent } from "./surveyForm/salutation/salutation.component";
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveySubmitComponent } from './survey-form/survey-submit/survey-submit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Page1Component, Page2Component, SalutationComponent, Page1Component, Page2Component, SalutationComponent,SurveyFormComponent,SurveySubmitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'donorsurvey';
}
