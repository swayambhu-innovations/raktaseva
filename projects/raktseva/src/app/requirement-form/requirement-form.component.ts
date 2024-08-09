import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';
import { RequirementformService } from './service/requirementform.service';
import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderWithBackComponent],
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss'],
})
export class RequirementFormComponent implements OnInit {
  requirementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private requirementFormService: RequirementformService,
    private storage: Storage
  ) {
    this.requirementForm = this.fb.group({
      patientname: [''],
      gender: [''],
      aadharnumber: [''],
      hospitalname: [''],
      cityname: [''],
      bloodgroup: [''],
      bloodcount: [''],
      bednumber: [''],
      report: ['', Validators.required],
      timestamp: [''],
      phone: [''],
    });
  }
  isImgSizeValid: boolean = false;
  ngOnInit(): void {}

  //Function for interacting with service file
  async onSubmit(): Promise<void> {
    if (this.requirementForm.valid) {
      try {
        // Set the current timestamp
        this.requirementForm.patchValue({
          timestamp: new Date().toISOString(),
        });

        // Retrieve phone number from local storage
        const storedData = localStorage.getItem('loginFormData');
        if (storedData) {
          const loginFormData = JSON.parse(storedData);
          const phoneNumber = loginFormData.mobileNumber;

          // Add phone number to the form data
          this.requirementForm.patchValue({
            phone: phoneNumber,
          });
        }

        await this.requirementFormService.saveFormData({
          ...this.requirementForm.value,
          status: 'pending',
        });
        this.requirementForm.reset();
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  // Photo changing TS file
  async changePhoto(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    if (fileSizeKB > maxSizeKB) {
      this.isImgSizeValid = true;
      return;
    } else {
      this.isImgSizeValid = false;
      try {
        const fileName = `${this.requirementForm.value.report}.${file.name
          .split('.')
          .pop()}`;
        const filePath = `userAvatar/${fileName}`;

        // Upload file to storage
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Get download URL and update form value
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        this.requirementForm.patchValue({
          report: downloadURL,
        });

        console.log('File uploaded successfully:', downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'report.png'; // Path to your default image
  }
}
