import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RequirementformService {
  constructor(private firestore: Firestore) {}

  //Function for sending data to firebase 
  async saveFormData(formData: any): Promise<void> {
    try {
      const formCollection = collection(this.firestore, 'Requirement Form');
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
