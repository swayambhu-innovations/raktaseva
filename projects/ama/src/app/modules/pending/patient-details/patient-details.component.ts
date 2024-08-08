import { Component, Input, OnInit, inject } from '@angular/core';
import { Patient } from '../../patient.structure';
import { EmailService } from './email.service';
import { Firestore, doc, updateDoc, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  @Input() patientData: Patient = {
    name: '',
    id: '',
    imageURL: '',
    aadharNumber: '',
    contact: '',
    status: '',
    unit: '',
    city: '',
    hospital_name: '',
    bed_no: '',
    bloodGroup: '',
    availableDonor: 0,
    assignedDonor: 0,
    date: '',
  };
  patientTime: string = '';
  firestore: Firestore = inject(Firestore);

  sos: { bloodGroup: string, city: string }[] = [];
  matchingDonors: { name: string, email: string }[] = [];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    console.log('Initial patientData:', this.patientData);
    this.populateSosArray();
    console.log('Sos after populateSosArray:', this.sos);
  }

  async updateStatus(status: string): Promise<void> {
    if (!this.patientData.id) {
      console.error('Patient ID is required to update status');
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      const docRef = doc(this.firestore, `requirement/${this.patientData.id}`);
      await updateDoc(docRef, { status, patientTime: timestamp });
      console.log(`Status updated to ${status} at ${timestamp}`);

      // Fetch matching donors after updating status
      await this.fetchMatchingDonors();
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  }

  sendEmail() {
    const recipients = ['ambarmishra740@gmail.com', 'amanyddv@gmail.com', 'kritarthshukla92@gmail.com'];
    const subject = 'Test Subject';
    const text = 'Test Text';
    const html = '<p>Good Evening</p>';

    this.emailService.sendEmail(recipients, subject, text, html).subscribe(
      response => {
        console.log('Email sent successfully', response);
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }

  populateSosArray() {
    console.log('PatientData in populateSosArray:', this.patientData);

    console.log('Blood Group:', this.patientData.bloodGroup);
    console.log('City:', this.patientData.city);
    console.log('Available Donor:', this.patientData.availableDonor);

    if (this.patientData.bloodGroup !== undefined &&
      this.patientData.city &&
      this.patientData.availableDonor != null) {
      this.sos.push({
        bloodGroup: this.patientData.bloodGroup,
        city: this.patientData.city,
      });
      console.log('Sos populated:', this.sos);
    } else {
      console.warn('PatientData values are not sufficient to populate sos');
    }
  }

  async fetchMatchingDonors(): Promise<void> {
    if (!this.patientData.bloodGroup || !this.patientData.city) {
      console.error('Blood group and city are required to fetch donors');
      return;
    }

    try {
      const donorsRef = collection(this.firestore, 'survey');
      const querySnapshot = await getDocs(donorsRef);

      this.matchingDonors = [];
      querySnapshot.forEach((doc) => {
        const donorData = doc.data();
        if (donorData['bloodgroup'] === this.patientData.bloodGroup && donorData['city'] === this.patientData.city) {
          this.matchingDonors.push({ name: donorData['name'], email: donorData['email'] });
        }
      });

      console.log('Matching Donors:', this.matchingDonors);

      if (this.matchingDonors.length > 0) {
        this.sendEmailToDonors(this.matchingDonors);
      } else {
        console.log('No matching donors found.');
      }
    } catch (error) {
      console.error('Error fetching matching donors: ', error);
    }
  }

  sendEmailToDonors(donors: { name: string, email: string }[]) {
    const recipients = donors.map(donor => donor.email);
    const subject = 'Matching Donor Notification';
    const text = 'There is a matching patient requiring your blood group in your city.';
    const html = '<p>Dear Donor,</p><p>There is a matching patient requiring your blood group in your city.</p>';

    this.emailService.sendEmail(recipients, subject, text, html).subscribe(
      response => {
        console.log('Email sent successfully', response);
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }
}
