// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-approved',
//   standalone: true,
//   imports: [],
//   templateUrl: './approved.component.html',
//   styleUrl: './approved.component.scss'
// })
// export class ApprovedComponent {

// }


import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { AmaService } from '../../services/ama.service';
import { collection, getDocs } from 'firebase/firestore';
// import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
// import { PatientDetailsComponent } from "./patient-details/patient-details.component";
import { Patient } from '../patient.structure';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.scss'
})
export class ApprovedComponent implements OnInit {
  name: string = '';
  aadharNumber: number = 0;
  contact: number = 0;
  status: string = '';
  imageURL: string = '';
  patientData: Patient;
  unit:number=0;
  city:string='';
  hospital_name:string;
  bed_no:string='';

  pendingSummary: Patient[] = [];
  surveyDetail: any;


  isOpen = false;

  openModal(id: string) {
    this.isOpen = true;
    this.pendingSummary.map((patient) => {
      if (patient.id == id) {
        this.patientData = patient
        this.imageURL = patient.imageURL
      }
    })

  }

  closeModal() {
    this.isOpen = false;
  }

  constructor(private amaService: AmaService, private firestore: Firestore,private router: Router,private authService: AuthService,) { }

  ngOnInit(): void {
    this.getPatientDetail();
  }

  async getPatientDetail() {
    const surveySnapshot = await getDocs(collection(this.firestore, 'survey'));
    const surveyDocs = surveySnapshot.docs;

    for (const survey of surveyDocs) {
      const surveyData = survey.data();
      console.log(surveyData)
    }
    try {
      const usersSnapshot = await this.amaService.getRequirement();
      const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
      const patientDocs = patientSnapshot.docs;

      for (const patient of patientDocs) {
        const patientData = patient.data();
        console.log(patientData)

      


        if (patientData['status'] == 'approved') {

          this.pendingSummary.push({
            id: patientData['id'],
            name: patientData['patientname'],
            aadharNumber: patientData['aadharnumber'],
            contact: patientData['phone'],
            status: patientData['status'],
            imageURL: patientData['report'],
            unit: patientData['bloodcount'],
            city: patientData['cityname'],
            hospital_name: patientData['hospitalname'],
            bed_no: patientData['bednumber'],
            bloodGroup:patientData['bloodgroup'],
            availableDonor:0,
            assignedDonor:0,
            date:this.formatDate(patientData['patientTime']),

          });
        }
      }
    
    } catch (error) {
      console.error("Error fetching users' booking data:", error);
    }
  }

    //Routing
    userpermission() {
      this.router.navigate(['userpermission']);
    }
    dashboard() {
      this.router.navigate(['dashboard']);
    }
    pendingpage() {
      this.router.navigate(['pending']);
    }
    approvepage() {
      this.router.navigate(['approve']);
    }
    cancelpage() {
      this.router.navigate(['cancel']);
    }
    readydonor() {
      this.router.navigate(['readydonor']);
    }

    triggerSignout() {
      console.log('hello');
      this.authService
        .signout()
        .then(() => {
          console.log('User signed out');
        })
        .catch((error) => {
          console.error('Error signing out: ', error);
        });
    }
    formatDate(timestamp: string): string {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      return formattedDate;
    }
}






