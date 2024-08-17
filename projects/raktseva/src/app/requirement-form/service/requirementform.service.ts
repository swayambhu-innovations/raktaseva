import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc,getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RequirementformService {
  constructor(private firestore: Firestore) {}

  //Function for sending data to firebase 
  async saveFormData(formData: any): Promise<void> {
    try {
      const formCollection = collection(this.firestore, 'requirement');
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

  async getCityNames(): Promise<any[]> {
    try {
      const citiesCollection = collection(this.firestore, 'donor-city');
      const citySnapshot = await getDocs(citiesCollection);
      const citiesList = citySnapshot.docs.map(doc => doc.data());
      return citiesList;
    } catch (error) {
      console.error('Error fetching cities: ', error);
      throw error;
    }
  }
}
