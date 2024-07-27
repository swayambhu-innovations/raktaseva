// final

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
// import { Patient } from '../patient.structure';
// import { donor } from '../donor.structure';

// @Component({
//   selector: 'app-donor-ready-donation',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './donor-ready-donation.component.html',
//   styleUrls: ['./donor-ready-donation.component.scss']
// })
// export class DonorReadyDonationComponent implements OnInit {
//   name: string = '';
//   aadharNumber: number = 0;
//   contact: number = 0;
//   status: string = '';
//   imageURL: string = '';
//   patientData: Patient;
//   unit: number = 0;
//   city: string = '';
//   hospital_name: string;
//   bed_no: string = '';
//   availableDonor: number = 0;
//   assignedDonor: string = '';
//   donorData: donor;

//   pendingSummary: Patient[] = [];
//   isOpen = false;
//   donorSummary: donor[] = [];

//   constructor(private firestore: Firestore) {}

//   ngOnInit(): void {
//     this.getPatientDetail();
//   }

//   openModal(id: string) {
//     this.isOpen = true;
//     this.donorSummary = [];
//     this.getDonorDetail(id);
//   }

//   closeModal() {
//     this.isOpen = false;
//   }

//   async getPatientDetail() {
//     try {
//       const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
//       const patientDocs = patientSnapshot.docs;

//       for (const patient of patientDocs) {
//         const patientData = patient.data();
//         let availableDonorCount = 0;

//         if (patientData['status'] == 'approved') {
//           const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patient.id}/donor-acknowledge`));
//           const donorDocs = donorSnapshot.docs;

//           for (const donor of donorDocs) {
//             const donorData = donor.data();
//             if (donorData['active'] === true) {
//               availableDonorCount++;
//             }
//           }

//           this.pendingSummary.push({
//             id: patient.id,
//             name: patientData['patientname'],
//             aadharNumber: patientData['aadharnumber'],
//             contact: '9987565848',
//             status: '',
//             imageURL: patientData['report'],
//             unit: patientData['bloodcount'],
//             city: patientData['cityname'],
//             hospital_name: patientData['hospitalname'],
//             bed_no: patientData['bednumber'],
//             bloodGroup: '',
//             availableDonor: availableDonorCount,
//             assignedDonor: '0',
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching patients' booking data:", error);
//     }
//   }

//   async getDonorDetail(patientId: string) {
//     try {
//       const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patientId}/donor-acknowledge`));
//       const donorDocs = donorSnapshot.docs;

//       for (const donor of donorDocs) {
//         const donorData = donor.data();
//         if (donorData['active'] === true) {
//           const surveyId = donorData['id']; // Get the donor ID from the field named 'id'
//           console.log(surveyId)
//           const surveyDoc = await getDoc(doc(this.firestore, `survey/${surveyId}`));

//           if (surveyDoc.exists()) {
//             const surveyData = surveyDoc.data();
//             console.log(surveyData)
//             if (surveyData) {
//               this.donorSummary.push({
//                 id: surveyId,
//                 donorName: surveyData['name'],
//                 aadharNumber: '987564864585',
//                 bloodGroup: surveyData['bloodGroup'],
//                 contact: surveyData['phone'],
//                 status: surveyData['status'],
//                 city: surveyData['city']
//               });
//             }
//           } else {
//             console.error('Survey document does not exist for donor ID:', surveyId);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching donor data:', error);
//     }
//   }


  
//   assignDonor(donorId: string) {
//     // Assign donor logic
//   }
// }





import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { Patient } from '../patient.structure';
import { donor } from '../donor.structure';

@Component({
  selector: 'app-donor-ready-donation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donor-ready-donation.component.html',
  styleUrls: ['./donor-ready-donation.component.scss']
})
export class DonorReadyDonationComponent implements OnInit {
  name: string = '';
  aadharNumber: number = 0;
  contact: number = 0;
  status: string = '';
  imageURL: string = '';
  patientData: Patient;
  unit: number = 0;
  city: string = '';
  hospital_name: string;
  bed_no: string = '';
  availableDonor: number = 0;
  assignedDonor: string = '';
  donorData: donor;

  pendingSummary: Patient[] = [];
  isOpen = false;
  donorSummary: donor[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getPatientDetail();
  }

  openModal(id: string) {
    this.isOpen = true;
    this.donorSummary = []; // Clear the donorSummary array before fetching new data
    this.getDonorDetail(id);
  }

  closeModal() {
    this.isOpen = false;
  }

  async getPatientDetail() {
    try {
      const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
      const patientDocs = patientSnapshot.docs;

      const patientDataArray = patientDocs.map(doc => ({ id: doc.id, data: doc.data() }));
      const patientDetailsPromises = patientDataArray.map(async (patient) => {
        if (patient.data['status'] === 'approved') {
          const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patient.id}/donor-acknowledge`));
          const donorDocs = donorSnapshot.docs;
          const availableDonorCount = donorDocs.filter(donor => donor.data()['active']).length;

          this.pendingSummary.push({
            id: patient.id,
            name: patient.data['patientname'],
            aadharNumber: patient.data['aadharnumber'],
            contact: '9987565848',
            status: '',
            imageURL: patient.data['report'],
            unit: patient.data['bloodcount'],
            city: patient.data['cityname'],
            hospital_name: patient.data['hospitalname'],
            bed_no: patient.data['bednumber'],
            bloodGroup: '',
            availableDonor: availableDonorCount||0,
            assignedDonor: '0',
          });
        }
      });

      await Promise.all(patientDetailsPromises);
    } catch (error) {
      console.error("Error fetching patients' booking data:", error);
    }
  }

  async getDonorDetail(patientId: string) {
    try {
      const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patientId}/donor-acknowledge`));
      const donorDocs = donorSnapshot.docs;

      const donorDataArray = donorDocs.map(doc => ({ id: doc.id, data: doc.data() }));
      const surveyPromises = donorDataArray.filter(donor => donor.data['active']).map(donor => {
        const surveyId = donor.data['id'];
        return getDoc(doc(this.firestore, `survey/${surveyId}`)).then(surveyDoc => ({ surveyId, surveyDoc }));
      });

      const surveyDocs = await Promise.all(surveyPromises);

      for (const { surveyId, surveyDoc } of surveyDocs) {
        if (surveyDoc.exists()) {
          const surveyData = surveyDoc.data();
          if (surveyData) {
            this.donorSummary.push({
              id: surveyId,
              donorName: surveyData['name'],
              aadharNumber: '987564864585',
              bloodGroup: surveyData['bloodGroup'],
              contact: surveyData['phone'],
              status: surveyData['status'],
              city: surveyData['city']
            });
          }
        } else {
          console.error('Survey document does not exist for donor ID:', surveyId);
        }
      }
    } catch (error) {
      console.error('Error fetching donor data:', error);
    }
  }

  assignDonor(donorId: string) {
    // Assign donor logic
  }
}
