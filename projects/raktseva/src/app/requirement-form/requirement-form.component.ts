import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { doc, setDoc } from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';

@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss'],
})
export class RequirementFormComponent implements OnInit {
  requirementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.requirementForm = this.fb.group({
      patientname: [''],
      gender: [''],
      aadharnumber: [''],
      hospitalname: [''],
      cityname: [''],
      bloodcount: [''],
      bednumber: [''],
      report: ['',Validators.required],
    });
  }
  isImgSizeValid: boolean = false;
  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.requirementForm.valid) {
      try {
        const formCollection = collection(this.firestore, 'Requirement Form');
        const docRef = doc(formCollection);
        const formDataWithId = {
          ...this.requirementForm.value,
          id: docRef.id,
        };

        await setDoc(docRef, formDataWithId);
        console.log(formDataWithId);
        console.log('Data saved successfully');

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
}
