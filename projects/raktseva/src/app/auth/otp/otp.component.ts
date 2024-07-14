import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  otp:FormGroup;
  constructor(private fb: FormBuilder) {
    this.otp = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-5]{6}$')]]
    });
  }
  onSubmit() {
    if (this.otp.valid) {
      console.log('Form Submitted', this.otp.value);
    }
}
}