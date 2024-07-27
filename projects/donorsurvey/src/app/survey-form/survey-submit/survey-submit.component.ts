import { Component } from '@angular/core';


import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-submit',
  standalone: true,
  
  imports: [],

  templateUrl: './survey-submit.component.html',
  styleUrl: './survey-submit.component.scss'
})
export class SurveySubmitComponent {

  constructor(private ruoter:Router){}
  move(){
    this.ruoter.navigateByUrl("thank-component");
  }
  }

  

