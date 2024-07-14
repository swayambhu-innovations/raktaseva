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
  selector: 'app-userdetail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent implements OnInit {
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
      report: ['', Validators.required],
    });
  }

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
}
