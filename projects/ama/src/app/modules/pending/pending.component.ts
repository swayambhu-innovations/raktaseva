import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmaService } from '../../services/ama.service';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { Patient } from '../patient.structure';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule, PatientDetailsComponent, ImageContainerComponent, LoaderComponent],
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  name: string = '';
  aadharNumber: number = 0;
  contact: number = 0;
  status: string = '';
  imageURL: string = '';
  patientData!: Patient;
  unit: number = 0;
  city: string = '';
  hospital_name: string = '';
  bed_no: string = '';
  bloodGroup: string = '';
  pendingSummary: Patient[] = [];
  loading:boolean=true;

  isOpen = false;

  openModal(id: string) {
    this.isOpen = true;
    this.pendingSummary.map((patient) => {
      if (patient.id === id) {
        this.patientData = patient;
        this.imageURL = patient.imageURL;
        console.log('Opened patient data:', this.patientData); // Log patient data when modal is opened
      }
    });
  }

  closeModal() {
    this.isOpen = false;
  }

  constructor(
    private amaService: AmaService,
    private firestore: Firestore,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading=false;
     },2000);
    this.getPatientDetail();
  }

  async getPatientDetail() {
    try {
      const usersSnapshot = await this.amaService.getRequirement();
      const patientSnapshot = await getDocs(
        collection(this.firestore, 'requirement')
      );
      const patientDocs = patientSnapshot.docs;

      for (const patient of patientDocs) {
        const patientData = patient.data();
        console.log('Fetched patient data:', patientData); // Log the entire data object

        if (patientData['status'] === 'pending') {
          console.log('Patient blood group:', patientData['bloodgroup']); // Log the specific field
          this.pendingSummary.push({
            id: patientData['id'] || '',
            name: patientData['patientname'] || '',
            aadharNumber: patientData['aadharnumber'] || '',
            contact: patientData['phone'] || '',
            status: patientData['status'] || '',
            imageURL: patientData['report'] || '',
            unit: patientData['bloodcount'] || 0,
            city: patientData['cityname'] || '',
            hospital_name: patientData['hospitalname'] || '',
            bed_no: patientData['bednumber'] || '',
            bloodGroup: patientData['bloodgroup'] || '', // Updated field name
            availableDonor: patientData['availableDonor'] || 0,
            assignedDonor: patientData['assignedDonor'] || 0,
            date: patientData['timestamp'] || '', // Updated field name
          });
        }
      }
    } catch (error) {
      console.error("Error fetching users' booking data:", error);
    }
  }

  // Routing
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
}
