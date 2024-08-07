// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Firestore, collection, getDocs, doc, getDoc, updateDoc } from '@angular/fire/firestore';
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
//     this.donorSummary = []; // Clear the donorSummary array before fetching new data
//     this.getDonorDetail(id);
//   }

//   closeModal() {
//     this.isOpen = false;
//   }

//   async getPatientDetail() {
//     try {
//       const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
//       const patientDocs = patientSnapshot.docs;

//       const patientDataArray = patientDocs.map(doc => ({ id: doc.id, data: doc.data() }));
//       const patientDetailsPromises = patientDataArray.map(async (patient) => {
//         if (patient.data['status'] === 'approved') {
//           const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patient.id}/donor-acknowledge`));
//           const donorDocs = donorSnapshot.docs;
//           const availableDonorCount = donorDocs.filter(donor => donor.data()['active']).length;

//           this.pendingSummary.push({
//             id: patient.id,
//             name: patient.data['patientname'],
//             aadharNumber: patient.data['aadharnumber'],
//             contact: '9987565848',
//             status: '',
//             imageURL: patient.data['report'],
//             unit: patient.data['bloodcount'],
//             city: patient.data['cityname'],
//             hospital_name: patient.data['hospitalname'],
//             bed_no: patient.data['bednumber'],
//             bloodGroup: '',
//             availableDonor: availableDonorCount || 0,
//             assignedDonor: '0',
//           });
//         }
//       });

//       await Promise.all(patientDetailsPromises);
//     } catch (error) {
//       console.error("Error fetching patients' booking data:", error);
//     }
//   }

//   async getDonorDetail(patientId: string) {
//     try {
//       const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patientId}/donor-acknowledge`));
//       const donorDocs = donorSnapshot.docs;

//       const donorDataArray = donorDocs.map(doc => ({ id: doc.id, data: doc.data() }));
//       const surveyPromises = donorDataArray.filter(donor => donor.data['active']).map(donor => {
//         const surveyId = donor.data['id'];
//         const donorstatus = donor.data['status'];
//         return getDoc(doc(this.firestore, `survey/${surveyId}`)).then(surveyDoc => ({ surveyId, donorstatus, surveyDoc }));
//       });

//       const surveyDocs = await Promise.all(surveyPromises);

//       for (const { surveyId, donorstatus, surveyDoc } of surveyDocs) {
//         if (surveyDoc.exists()) {
//           const surveyData = surveyDoc.data();
//           if (surveyData) {
//             this.donorSummary.push({
//               id: surveyId,
//               donorName: surveyData['name'],
//               aadharNumber: '987564864585',
//               bloodGroup: surveyData['bloodgroup'],
//               contact: surveyData['phone'],
//               status: donorstatus,
//               city: surveyData['city']
//             });
//           }
//         } else {
//           console.error('Survey document does not exist for donor ID:', surveyId);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching donor data:', error);
//     }
//   }

//   async assignDonor(donorId: string) {
//     try {
//       // Find the donor summary entry for the given donorId
//       const donorEntry = this.donorSummary.find(d => d.id === donorId);
//       if (!donorEntry) {
//         console.error('No donor entry found for the donor ID:', donorId);
//         return;
//       }
  
//       // Find the corresponding patient ID from pendingSummary using donorEntry
//       const patient = this.pendingSummary.find(p => this.donorSummary.some(d => d.id === donorId));
//       if (!patient) {
//         console.error('No patient found for the donor ID:', donorId);
//         return;
//       }
  
//       // Get the donor-acknowledge subcollection for the patient
//       const donorAcknowledgeCollection = collection(this.firestore, `requirement/${patient.id}/donor-acknowledge`);
//       const donorSnapshot = await getDocs(donorAcknowledgeCollection);
  
//       // Find the document with the matching donor ID
//       let donorDocRef;
//       donorSnapshot.forEach(doc => {
      
//         // console.log(donord)
//         if (doc.data()?.['id']== donorId) {
//           donorDocRef = doc.ref;
//         }
//       });
  
//       if (!donorDocRef) {
//         console.error('No document found with the donor ID:', donorId);
//         return;
//       }
  
//       // Log the document path for debugging
//       console.log('Document path:', donorDocRef.path);
  
//       // Update the status field of the found document
//       await updateDoc(donorDocRef, { status: 'assigned' });
  
//       console.log(`Donor with ID ${donorId} has been assigned.`);
//       // Optionally, update the local donorSummary to reflect the change
//       donorEntry.status = 'assigned';
//     } catch (error) {
//       console.error('Error assigning donor:', error);
//     }
//   }

  // async updateStatus(status: string): Promise<void> {
  //   if (!this.patientData.id) {
  //     console.error('Patient ID is required to update status');
  //     return;
  //   }

  //   try {
  //     const docRef = doc(this.firestore, `requirement/${this.patientData.id}/donor-acknowledge/`);
      

  //     await updateDoc(docRef, { status: 'assigned' });
  //     console.log(`Status updated to ${status}`);
  //   } catch (error) {
  //     console.error('Error updating status: ', error);
  //   }
  // }
  
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Patient } from '../patient.structure';
import { donor } from '../donor.structure';
import { LoaderComponent } from "../../loader/loader.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-ready-donation',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
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
  selectedPatientId: string = '';
  isLoading: boolean = false; 

  constructor(private firestore: Firestore,private router: Router,) {}

  ngOnInit(): void {
    this.getPatientDetail();
  }

  openModal(id: string) {
    this.isOpen = true;
    this.donorSummary = [];
    this.selectedPatientId = id;
    console.log(this.selectedPatientId)
    this.getDonorDetail(id);
  }

  closeModal() {
    this.isOpen = false;
  }

  async getPatientDetail() {
    this.isLoading = true;
    try {
      const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
      const patientDocs = patientSnapshot.docs;

      const patientDataArray = patientDocs.map(doc => ({ id: doc.id, data: doc.data() }));
      const patientDetailsPromises = patientDataArray.map(async (patient) => {
        if (patient.data['status'] === 'approved') {
          const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patient.id}/donor-acknowledge`));
          const donorDocs = donorSnapshot.docs;
          const availableDonorCount = donorDocs.filter(donor => donor.data()['active']).length;
          const assignedDonor = donorDocs.filter(donor => donor.data()['status']=='assigned').length;


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
            availableDonor: availableDonorCount || 0,
            assignedDonor:assignedDonor || 0,
            date:'',
          });
        }
      });

      await Promise.all(patientDetailsPromises);
    } catch (error) {
      console.error("Error fetching patients' booking data:", error);
    }finally {
      this.isLoading = false;
    }
  }

  async getDonorDetail(patientId: string) {
    this.isLoading = true;
    try {
      const donorSnapshot = await getDocs(collection(this.firestore, `requirement/${patientId}/donor-acknowledge`));
      const donorDocs = donorSnapshot.docs;

      const donorDataArray = donorDocs.map(doc => ({ id: doc.id, data: doc.data() }));
      const surveyPromises = donorDataArray.filter(donor => donor.data['active']).map(donor => {
        const surveyId = donor.data['id'];
        const donorstatus = donor.data['status'];
        return getDoc(doc(this.firestore, `survey/${surveyId}`)).then(surveyDoc => ({ surveyId, donorstatus, surveyDoc }));
      });

      const surveyDocs = await Promise.all(surveyPromises);

      for (const { surveyId, donorstatus, surveyDoc } of surveyDocs) {
        if (surveyDoc.exists()) {
          const surveyData = surveyDoc.data();
          if (surveyData) {
            this.donorSummary.push({
              id: surveyId,
              donorName: surveyData['name'],
              aadharNumber: '987564864585',
              bloodGroup: surveyData['bloodgroup'],
              contact: surveyData['phone'],
              status: donorstatus,
              city: surveyData['city']
            });
          }
        } else {
          console.error('Survey document does not exist for donor ID:', surveyId);
        }
      }
    } catch (error) {
      console.error('Error fetching donor data:', error);
    }finally {
      this.isLoading = false; 
    }
  }

  async assignDonor(patientId: string, donorId: string) {
    this.isLoading = true;
    try {
      const donorCollectionRef = collection(this.firestore, `requirement/${patientId}/donor-acknowledge`);
      const donorSnapshot = await getDocs(donorCollectionRef);
      
      // Find the document where the id field matches the donorId
      let matchingDonorDocId = '';
      donorSnapshot.forEach((doc) => {
        if (doc.data()?.['id'] === donorId) {
          matchingDonorDocId = doc.id;
        }
      });

      if (matchingDonorDocId) {
        const donorDocRef = doc(this.firestore, `requirement/${patientId}/donor-acknowledge/${matchingDonorDocId}`);
        await updateDoc(donorDocRef, { status: 'assigned' });

        // Updating the local donorSummary array to reflect the change
        const donorIndex = this.donorSummary.findIndex(d => d.id === donorId);
        if (donorIndex !== -1) {
          this.donorSummary[donorIndex].status = 'assigned';
        }
      } else {
        console.error('No matching donor document found for donor ID:', donorId);
      }
    } catch (error) {
      console.error('Error updating donor status:', error);
    }finally {
      this.isLoading = false; 
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
  
}

