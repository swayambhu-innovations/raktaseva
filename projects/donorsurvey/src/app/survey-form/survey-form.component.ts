import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { Router } from '@angular/router';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-survey-form',
  standalone: true,
  
  imports: [MatRadioModule],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.scss'
})
export class SurveyFormComponent {
  constructor(private ruoter:Router){}
  submit(){
    this.ruoter.navigateByUrl("next-component");
  }

  // [x: string]: any;

  // regForm!: FormGroup;
  // constructor(){}
  // ngOnInit(){
  //   this.regForm=new FormGroup({
  //    id:new FormControl(),
  //    fname:new FormControl(),
  //   dob:new FormControl(),
     

  //   })
  // }
  //  register(formdata:FormGroup){
  //   // console.log(formdata.value);
  //   console.log(this.regForm.value);
  //  }

}
