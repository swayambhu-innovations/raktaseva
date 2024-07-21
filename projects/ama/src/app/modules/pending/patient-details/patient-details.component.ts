import { Component, Input, OnInit, inject } from '@angular/core';
import { Patient } from '../../patient.structure';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  @Input() patientData: Patient = {
    name: '',
    id: '',
    imageURL: '',
    aadharNumber: '',
    contact: '',
    status: '',
    unit:'',
    city:'',
    hospital_name:'',
    bed_no:'',
    bloodGroup:'',
  };
  firestore: Firestore = inject(Firestore)
  constructor() {
  }
  ngOnInit(): void {
    console.log(this.patientData)
  }
  async updateStatus(status: string): Promise<void> {
    if (!this.patientData.id) {
      console.error('Patient ID is required to update status');
      return;
    }

    try {
      const docRef = doc(this.firestore, `requirement/${this.patientData.id}`);
      await updateDoc(docRef, { status });
      console.log(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  }
}
