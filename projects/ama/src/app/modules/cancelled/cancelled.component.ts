import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { AmaService } from '../../services/ama.service';
import { collection, getDocs } from 'firebase/firestore';
// import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
// import { PatientDetailsComponent } from "./patient-details/patient-details.component";
import { Patient } from '../patient.structure';

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
  patientData: Patient;
  unit:number=0;
  city:string='';
  hospital_name:string;
  bed_no:string='';

  pendingSummary: Patient[] = [];


  isOpen = false;

  openModal(id: string) {
    this.isOpen = true;
    this.pendingSummary.map((patient) => {
      if (patient.id == id) {
        this.patientData = patient
        console.log(patient.id)
        this.imageURL = patient.imageURL
      }
    })

  }

  closeModal() {
    this.isOpen = false;
  }

  constructor(private amaService: AmaService, private firestore: Firestore) { }

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


        if(patientData['status']=='rejected'){

          this.pendingSummary.push({
            id: patientData['id'],
            name: patientData['patientname'],
            aadharNumber: patientData['aadharnumber'],
            contact: '9987565848',
            status: patientData['status'],
            imageURL: patientData['report'],
            unit: patientData['bloodcount'],
            city: patientData['cityname'],
            hospital_name: patientData['hospitalname'],
            bed_no: patientData['bednumber'],
            bloodGroup:'',
            availableDonor:'',
            assignedDonor:'',


          });
        }
      }
    } catch (error) {
      console.error("Error fetching users' booking data:", error);
    }
  }
}







