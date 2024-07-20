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
}
