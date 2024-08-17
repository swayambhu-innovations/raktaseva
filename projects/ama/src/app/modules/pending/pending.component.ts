import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AmaService } from '../../services/ama.service';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { Patient } from '../patient.structure';
import { Router,ActivatedRoute } from '@angular/router';
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
   this.closeAndReload();
    // this.router.navigate(['/pending']);
  }
  handleCloseAndRefresh() {
    this.closeModal(); 
    this.router.navigate([this.router.url]); 
  }
  closeAndReload() {
    this.isOpen = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      window.location.reload();
      this.router.navigate([this.router.url]);
    });
  }

  constructor(
    private amaService: AmaService,
    private firestore: Firestore,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(() => {
    //   // Force a reload of the entire page when the component is activated
    //   window.location.reload();
    // });
    setTimeout(()=>{
      this.loading=false;
     },2000);
    this.getPatientDetail();
    // setInterval(() => {
    //   this.getPatientDetail();
    // }, 5000);
   
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
        console.log('Fetched patient data:', patientData); 

        if (patientData['status'] === 'pending') {
          console.log('Patient blood group:', patientData['bloodgroup']);
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
            bloodGroup: patientData['bloodgroup'] || '', 
            availableDonor: patientData['availableDonor'] || 0,
            assignedDonor: patientData['assignedDonor'] || 0,
            date: patientData['timestamp'] || '', 
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
