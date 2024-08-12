import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Storage } from '@angular/fire/storage';
import { timestamp } from 'rxjs';
import { Router } from '@angular/router';
import { Page2Service } from './service/page-2.service';


@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.scss',
})
export class Page2Component implements OnInit {
  surveyForm: FormGroup;
  progressSteps = ['Step 1', 'Step 2', 'Step 3'];
  currentStep = 1;  

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private router: Router,
    private page2Service: Page2Service
  ) {
    this.surveyForm = this.fb.group({
      bloodgroup: [''],
      donated: [''],
      lastdonation: [''],
      medicine: this.fb.array([]),
      surgery: [''],
      timestamp: [''],
    });
  }

  ngOnInit(): void {}
  //Function for interacting with service file
  async onSubmit(): Promise<void> {
    if (this.surveyForm.valid) {
      try {
        // Set the current timestamp
        this.surveyForm.patchValue({
          timestamp: new Date().toISOString(),
        });

        console.log('Good Night', this.surveyForm.value);
        const page2 = this.surveyForm.value;
        // Retrieve the form data from local storage
        const storedFormData = localStorage.getItem('surveyFormData');
        console.log('Good Night', storedFormData);
        let allData: any;
        if (storedFormData)
          allData = {
            ...page2,
            ...JSON.parse(storedFormData),
          };

        console.log('Final Check', allData);
        localStorage.removeItem('surveyFormData');
        this.router.navigate(['salutation']);

        await this.page2Service.saveFormData(allData);
        this.surveyForm.reset();
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  //Function for selection multiple input
  onCheckboxChange(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const medicineArray: FormArray = this.surveyForm.get(
      'medicine'
    ) as FormArray;

    if (checkbox.checked) {
      medicineArray.push(new FormControl(checkbox.value));
    } else {
      const index = medicineArray.controls.findIndex(
        (x) => x.value === checkbox.value
      );
      medicineArray.removeAt(index);
    }
  }
}
