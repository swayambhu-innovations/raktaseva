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
