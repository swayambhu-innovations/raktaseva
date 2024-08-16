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
