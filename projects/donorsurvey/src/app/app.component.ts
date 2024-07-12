import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SurveyFormComponent } from "./survey-form/survey-form.component";
import { SurveySubmitComponent } from './survey-form/survey-submit/survey-submit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SurveyFormComponent,SurveySubmitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'donorsurvey';
}
