import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, query, where, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CheckupFormService {

  constructor(private firestore: Firestore) { }

// Function for fetching survey data based on Aadhar number
async getSurveyDataByAadhar(aadharnumber: string): Promise<any> {
  try {
    const surveyCollection = collection(this.firestore, 'survey');
    const q = query(surveyCollection, where('aadharnumber', '==', aadharnumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    } else {
      return querySnapshot.docs[0].data(); // Assuming one match
    }
  } catch (error) {
    console.error('Error fetching survey data: ', error);
    throw error;
  }
}

// Function for saving form data to Firebase
async saveFormData(formData: any): Promise<void> {
  try {
    const formCollection = collection(this.firestore, 'checkup-form');
    const docRef = doc(formCollection);
    const formDataWithId = {
      ...formData,
      id: docRef.id,
    };

    await setDoc(docRef, formDataWithId);
    console.log(formDataWithId);
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data: ', error);
    throw error;
  }
}
}