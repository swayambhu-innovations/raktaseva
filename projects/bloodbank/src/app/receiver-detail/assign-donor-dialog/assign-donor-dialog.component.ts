import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'app-assign-donor-dialog',
  standalone: true,
  imports: [MatInputModule,MatDialogModule,
    MatFormFieldModule,FormsModule],
  templateUrl: './assign-donor-dialog.component.html',
  styleUrl: './assign-donor-dialog.component.scss'
})
export class AssignDonorDialogComponent {
  donorName: string = '';
  constructor(private emailService: EmailService) {}

  onCancel(): void {
    // this.dialogRef.close();
  }

  onAssign(): void {
    // Handle the donor assignment logic here
    // this.dialogRef.close(this.donorName);
  }
  sendEmail() {
    // this.emailService.sendEmail('recipient@example.com', 'Subject', 'Email body')
    //   .then(response => {
    //     console.log('Email sent successfully:', response);
    //   })
    //   .catch(error => {
    //     console.error('Error sending email:', error);
    //   });
  }
}
