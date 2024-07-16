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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.scss',
})
export class Page2Component implements OnInit {
  surveyForm: FormGroup;

  constructor(private fb: FormBuilder, private storage: Storage) {
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

  finalSubmit() {
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

    if (storedFormData) {
      const formData = JSON.parse(storedFormData);

      // localStorage.removeItem('surveyFormData');
    } else {
      console.log('No form data found in local storage.');
    }
  }

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
