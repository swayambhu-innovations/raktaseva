import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailService } from './service/user-detail.service';

@Component({
  selector: 'app-userdetail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent implements OnInit {
  detailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userDetailService: UserDetailService
  ) {
    this.detailForm = this.fb.group({
      username: [''],
      gender: [''],
      bloodgroup: [''],
      aadharnumber: [''],
      cityname: [''],
      email: ['', Validators.email],
      timestamp: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {}

  //Function for interacting with service file
  async onSubmit(): Promise<void> {
    if (this.detailForm.valid) {
      try {
        // Set the current timestamp
        this.detailForm.patchValue({
          timestamp: new Date().toISOString(),
        });

        // Retrieve phone number from local storage
        const storedData = localStorage.getItem('loginFormData');
        if (storedData) {
          const loginFormData = JSON.parse(storedData);
          const phoneNumber = loginFormData.mobileNumber;

          // Add phone number to the form data
          this.detailForm.patchValue({
            phone: phoneNumber
          });
        }

        await this.userDetailService.saveFormData(this.detailForm.value);
        this.detailForm.reset();
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
