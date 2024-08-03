import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckupFormService } from './service/checkup-form.service';
@Component({
  selector: 'app-checkup-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './checkup-form-dialog.component.html',
  styleUrl: './checkup-form-dialog.component.scss'
})
export class CheckupFormDialogComponent implements OnInit  {
  checkupForm: FormGroup;
  status: string = '';

  constructor(private fb: FormBuilder,private checkupFormService: CheckupFormService,) {
    this.checkupForm = this.fb.group({
      donorname: ['', Validators.required],
      gender: ['', Validators.required],
      bloodgroup:['', Validators.required],
      aadharnumber: ['', Validators.required],
      medicalcondition: ['', Validators.required],
      lastdonation: ['', Validators.required],
      unitdonated: ['', [Validators.required, Validators.min(0)]],
      bp: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      timestamp: [''],
      age:[''],
    });
  }

  ngOnInit(): void {}

  // async onSubmit(): Promise<void> {
  //   if (this.checkupForm.valid) {
  //     try {
  //       // Set the current timestamp
  //       this.checkupForm.patchValue({
  //         timestamp: new Date().toISOString(),
  //       });

  //       await this.checkupFormService.saveFormData(
  //         { ...this.checkupForm.value, status: 'pending' }
  //       );
  //       this.checkupForm.reset();
  //     } catch (error) {
  //       console.error('Error saving data: ', error);
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  async onSubmit(status: string): Promise<void> {
    if (this.checkupForm.valid) {
      try {
        // Set the current timestamp
        this.checkupForm.patchValue({
          timestamp: new Date().toISOString(),
        });

        await this.checkupFormService.saveFormData(
          { ...this.checkupForm.value, status: status }
        );

        // Update the status property
        this.status = status;

        this.checkupForm.reset();
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Example method to set the status (optional if not used elsewhere)
  setStatus(newStatus: string) {
    this.status = newStatus;
  }
}
