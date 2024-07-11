import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {
  requirementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.requirementForm = this.fb.group({
      patientname: [''],
      gender: [''],
      aadharnumber: [''],
      hospitalname: [''],
      cityname: [''],
      bloodcount: [''],
      bednumber: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.requirementForm.valid) {
      console.log('Form Submitted', this.requirementForm.value);
    }
    else{
      console.log("No")
    }
  }

  onReportImage(): void {
    // Handle the report image upload
  }
}
