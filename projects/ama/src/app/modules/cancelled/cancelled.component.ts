// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cancelled',
//   standalone: true,
//   imports: [ CommonModule],
//   templateUrl: './cancelled.component.html',
//   styleUrl: './cancelled.component.scss'
// })
// export class CancelledComponent {
//   isOpen = false;

//   openModal() {
//       this.isOpen = true;
//   }

//   closeModal() {
//       this.isOpen = false;
//   }

// }




import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmaService } from '../../services/ama.service';
import {  collection, getDocs } from 'firebase/firestore';
// import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cancelled',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.scss'
})
export class CancelledComponent implements OnInit {
  name: string = '';
  aadharNumber: number = 0;
  contact: number = 0;
  status: string = '';
  imageURL: string = '';

  pendingSummary: any[] = [];


  isOpen = false;

  openModal() {
      this.isOpen = true;
  }

  closeModal() {
      this.isOpen = false;
  }

  constructor(private amaService: AmaService,private firestore: Firestore) {}

  ngOnInit(): void {
    this.getPatientDetail();
  }

  async getPatientDetail() {
    try {
      const usersSnapshot = await this.amaService.getRequirement();
        const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
        const patientDocs = patientSnapshot.docs;

        for (const patient of patientDocs) {
          const patientData = patient.data();
          console.log(patientData)

          if(patientData['status']=='pending'){
          
          this.pendingSummary.push({
            name:patientData['patientname'],
            aadharNumber:patientData['aadharnumber'],
            contact: '9987565848',
            status: patientData['status'],
          });
          this.imageURL = patientData['report'];
      }
    }
    } catch (error) {
      console.error("Error fetching users' booking data:", error);
    }
  }
}



