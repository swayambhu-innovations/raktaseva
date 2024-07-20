import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmaService } from '../../services/ama.service';
import {  collection, getDocs } from 'firebase/firestore';
// import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  name: string = '';
  aadharNumber: number = 0;
  contact: number = 0;
  status: string = '';

  pendingSummary: any[] = [];

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
      }
    }
    } catch (error) {
      console.error("Error fetching users' booking data:", error);
    }
  }
}
