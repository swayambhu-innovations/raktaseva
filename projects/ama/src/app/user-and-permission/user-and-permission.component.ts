import { Component, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-user-and-permission',
  standalone: true,
  imports: [],
  templateUrl: './user-and-permission.component.html',
  styleUrl: './user-and-permission.component.scss',
})
export class UserAndPermissionComponent {
  constructor(private firestore: Firestore) {}

  async click() {
    let donor: any[] = [];
    const donorList = await getDocs(collection(this.firestore, 'survey'));
    donorList.docs.forEach((state: any) => {
      console.log(state.id);
      let data = state.data();
      if (data.city == 'Allahabad' && data.bloodgroup == 'A+') {
        donor.push({
          city: data.city,
          bloodgroup: data.bloodgroup,
          email:data.email
        });
      }
    });
    console.log(donor);
    return donor;
  }
}
