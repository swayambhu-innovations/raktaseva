import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [HeaderWithBackComponent, CommonModule, FormsModule], 
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {
  userName: string = '';
  feedbackText: string = '';
  showErrorMessage: boolean = false;

  constructor(private firestore: Firestore) {}

  // async submitFeedback() {
  //   if (this.feedbackText.trim() === '') {
  //     this.showErrorMessage = true;
  //     return;
  //   }
  //   this.showErrorMessage = false;
  async submitFeedback() {
    if (this.feedbackText.trim() === '' || this.userName.trim() === '') {
      this.showErrorMessage = true;
      return;
    }
    this.showErrorMessage = false;
    
    const feedback = {
      text: this.feedbackText,
      name: this.userName,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(this.firestore, 'feedback'), feedback);
      console.log('Feedback submitted successfully');
      this.feedbackText = ''; 
      this.userName = '';
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    }
  }

}


















// If you want to give feedback through userid
// import { Component } from '@angular/core';
// import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
// import { Firestore, collection, setDoc, doc } from '@angular/fire/firestore';
// import { Auth } from '@angular/fire/auth';  // Import Auth for getting the current user

// @Component({
//   selector: 'app-testimonial',
//   standalone: true,
//   imports: [HeaderWithBackComponent, CommonModule, FormsModule], 
//   templateUrl: './testimonial.component.html',
//   styleUrls: ['./testimonial.component.scss']
// })
// export class TestimonialComponent {
//   feedbackText: string = '';
//   showErrorMessage: boolean = false;
//   userId: string | null = null;

//   constructor(private firestore: Firestore, private auth: Auth) {
//     // Get the current user's ID
//     this.auth.onAuthStateChanged(user => {
//       if (user) {
//         this.userId = user.uid;
//       } else {
//         this.userId = null;
//       }
//     });
//   }

//   async submitFeedback() {
//     if (this.feedbackText.trim() === '') {
//       this.showErrorMessage = true;
//       return;
//     }
//     this.showErrorMessage = false;

//     if (!this.userId) {
//       console.error('No user is signed in');
//       return;
//     }

//     const feedback = {
//       text: this.feedbackText,
//       timestamp: new Date(),
//       userId: this.userId
//     };

//     try {
//       // Use the user's ID as the document ID in the feedback collection
//       await setDoc(doc(this.firestore, 'feedback', this.userId), feedback);
//       console.log('Feedback submitted successfully');
//       this.feedbackText = ''; // Clear the textarea after submission
//     } catch (error) {
//       console.error('Error submitting feedback: ', error);
//     }
//   }
// }
