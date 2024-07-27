import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AmaService {
  constructor(private firestore: Firestore) {}

  async getRequirement() {
    return  await getDocs(collection(this.firestore, 'requirement'));
   
   }
   async getSurvey() {
    return  await getDocs(collection(this.firestore, 'survey'));
   
   }

  //  async getSurveyDetail() {
  //     const usersSnapshot = await this.getSurvey();
  //     const surveySnapshot = await getDocs(collection(this.firestore, 'survey'));
  //     const surveyDocs = surveySnapshot.docs;

  //     for (const survey of surveyDocs) {
  //       const surveyData = survey.data();
  //       console.log(surveyData)

  //       return this.getSurveyDetail()
  //     }
  //   }
}
