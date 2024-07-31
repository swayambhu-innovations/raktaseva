// sub collection

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Firestore, collection, getDocs, setDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';

// @Component({
//   selector: 'app-donor-acknowledge',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './donor-acknowledge.component.html',
//   styleUrls: ['./donor-acknowledge.component.scss']
// })
// export class DonorAcknowledgeComponent {
//   phoneForm: FormGroup;
//   response: string | null = null;

//   constructor(private fb: FormBuilder, private firestore: Firestore) {
//     this.phoneForm = this.fb.group({
//       phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
//     });
//   }

//   handleResponse(response: string) {
//     this.response = response;
//   }

//   async onSubmit() {
//     if (this.phoneForm.valid) {
//       const phoneNumber = this.phoneForm.value.phoneNumber;
//       console.log(phoneNumber)
//       const donorSnapshot = await getDocs(collection(this.firestore, 'survey'));
//       const donorDocs = donorSnapshot.docs;
        
//       const donor = donorDocs.find(doc => doc.data()['phone'] === phoneNumber);
//       console.log(donor)
//       if (donor) {
//         const id = donor.id;
//         const requirementSnapshot = await getDocs(collection(this.firestore, 'requirement'));
//         const requirementDocs = requirementSnapshot.docs;

//         // Assume that you need to add to all requirements for simplicity
//         for (const reqDoc of requirementDocs) {
//           const requirementId = reqDoc.id;
//           const subcollectionPath = `requirement/${requirementId}/donor-acknowledge`;
//           const subcollectionRef = collection(this.firestore, subcollectionPath);

//           const donorDocRef = doc(subcollectionRef);
//           await setDoc(donorDocRef, {
//             id: id,
//             active: this.response === 'yes',
//             status: 'pending'
//           });
//         }
//       }
//     }
//   }
// }





import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, getDocs, setDoc, doc, updateDoc, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-donor-acknowledge',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './donor-acknowledge.component.html',
  styleUrls: ['./donor-acknowledge.component.scss']
})
export class DonorAcknowledgeComponent {
  phoneForm: FormGroup;
  response: string | null = null;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  handleResponse(response: string) {
    this.response = response;
  }

  async onSubmit() {
    if (this.phoneForm.valid) {
      const phoneNumber = this.phoneForm.value.phoneNumber;
      const donorSnapshot = await getDocs(collection(this.firestore, 'survey'));
      const donorDocs = donorSnapshot.docs;

      const donor = donorDocs.find(doc => doc.data()['phone'] === phoneNumber);
      if (donor) {
        const id = donor.id;
        const bloodGroup = donor.data()['bloodgroup'];
        console.log(id, bloodGroup);
        const requirementSnapshot = await getDocs(collection(this.firestore, 'requirement'));
        const requirementDocs = requirementSnapshot.docs;

        for (const reqDoc of requirementDocs) {
          const requirementId = reqDoc.id;
          const requirementBloodGroup = reqDoc.data()['bloodgroup'];
          if (requirementBloodGroup === bloodGroup) {
            const subcollectionPath = `requirement/${requirementId}/donor-acknowledge`;
            const subcollectionRef = collection(this.firestore, subcollectionPath);

            const existingDonorQuery = query(subcollectionRef, where('id', '==', id));
            const existingDonorSnapshot = await getDocs(existingDonorQuery);

            if (existingDonorSnapshot.empty) {
              // If no existing document, create a new one with the same ID from the survey collection
              const donorDocRef = doc(this.firestore, subcollectionPath, id);
              await setDoc(donorDocRef, {
                id: id,
                active: this.response === 'yes',
                status: 'pending'
              });
            } else {
              // If document exists, update the existing document
              const existingDoc = existingDonorSnapshot.docs[0];
              const donorDocRef = doc(this.firestore, subcollectionPath, existingDoc.id);
              await updateDoc(donorDocRef, {
                active: this.response === 'yes'
              });
            }
          }
        }
      }
    }
  }
}
