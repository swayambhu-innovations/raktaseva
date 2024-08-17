// import { Component, AfterViewInit, OnDestroy, } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements AfterViewInit, OnDestroy {
//   currentIndex = 0;
//   autoSlideInterval: any;

//   ngAfterViewInit() {
//     const slides = document.querySelector('.slides') as HTMLElement;
//     const prevBtn = document.querySelector('.prev') as HTMLElement;
//     const nextBtn = document.querySelector('.next') as HTMLElement;

//     prevBtn.addEventListener('click', () => this.prevSlide(slides));
//     nextBtn.addEventListener('click', () => this.nextSlide(slides));

//     this.autoSlide(slides);
//   }

//   ngOnDestroy() {
//     if (this.autoSlideInterval) {
//       clearInterval(this.autoSlideInterval);
//     }
//   }

//   prevSlide(slides: HTMLElement) {
//     this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : slides.children.length - 1;
//     this.updateSlider(slides);
//   }

//   nextSlide(slides: HTMLElement) {
//     this.currentIndex = (this.currentIndex < slides.children.length - 1) ? this.currentIndex + 1 : 0;
//     this.updateSlider(slides);
//   }

//   updateSlider(slides: HTMLElement) {
//     slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
//   }

//   autoSlide(slides: HTMLElement) {
//     this.autoSlideInterval = setInterval(() => {
//       this.nextSlide(slides);
//     }, 3000);
//   }

//   // Controlling the number of words in testimonial section

// }

// import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
// import { Router } from '@angular/router';
// import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
// // import { collection, getDocs } from 'firebase/firestore';
// import { Firestore, collection, getDocs } from '@angular/fire/firestore';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [BottomNavbarComponent, BottomNavbarComponent, NavbarComponent,CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements AfterViewInit, OnDestroy {
//   currentIndex = 0;
//   autoSlideInterval: any;

//   constructor(private renderer: Renderer2, private router: Router,private firestore: Firestore) {}

//   ngAfterViewInit() {
//     const slides = document.querySelector('.slides') as HTMLElement;
//     const prevBtn = document.querySelector('.prev') as HTMLElement;
//     const nextBtn = document.querySelector('.next') as HTMLElement;

//     prevBtn.addEventListener('click', () => this.prevSlide(slides));
//     nextBtn.addEventListener('click', () => this.nextSlide(slides));

//     this.autoSlide(slides);
//   }

//   ngOnDestroy() {
//     if (this.autoSlideInterval) {
//       clearInterval(this.autoSlideInterval);
//     }
//   }

//   prevSlide(slides: HTMLElement) {
//     this.currentIndex =
//       this.currentIndex > 0
//         ? this.currentIndex - 1
//         : slides.children.length - 1;
//     this.updateSlider(slides);
//   }

//   nextSlide(slides: HTMLElement) {
//     this.currentIndex =
//       this.currentIndex < slides.children.length - 1
//         ? this.currentIndex + 1
//         : 0;
//     this.updateSlider(slides);
//   }

//   updateSlider(slides: HTMLElement) {
//     slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
//   }

//   autoSlide(slides: HTMLElement) {
//     this.autoSlideInterval = setInterval(() => {
//       this.nextSlide(slides);
//     }, 3000);
//   }

//   // Page Navigation Code
//   requirement() {
//     this.router.navigate(['requirement']);
//   }

//   status() {
//     this.router.navigate(['status']);
//   }

//   //fetch data for feedback
//  async feedback(){
//   const feedbackSnapshot = await getDocs(collection(this.firestore, 'feedback'));
//   const feedbackDocs = feedbackSnapshot.docs;

//   for (const feedback of feedbackDocs) {
//     const feedbackData = feedback.data();
//     console.log(feedbackData);
//     const name=feedbackData['name'];
//     const feed=feedbackData['text'];

//   }
//  }

// }





// import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
// import { Router } from '@angular/router';
// import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
// import { Firestore, collection, getDocs } from '@angular/fire/firestore';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [BottomNavbarComponent, BottomNavbarComponent, NavbarComponent,CommonModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements AfterViewInit, OnDestroy {
//   currentIndex = 0;
//   autoSlideInterval: any;
//   feedbacks: any[] = [];

//   constructor(private renderer: Renderer2, private router: Router, private firestore: Firestore) {}

//   async ngAfterViewInit() {
//     const slides = document.querySelector('.slides') as HTMLElement;
//     const prevBtn = document.querySelector('.prev') as HTMLElement;
//     const nextBtn = document.querySelector('.next') as HTMLElement;

//     prevBtn.addEventListener('click', () => this.prevSlide(slides));
//     nextBtn.addEventListener('click', () => this.nextSlide(slides));

//     this.autoSlide(slides);

//     // Fetch feedback data
//     await this.fetchFeedback();
//     this.initializeTestimonialSlider();
//   }

//   ngOnDestroy() {
//     if (this.autoSlideInterval) {
//       clearInterval(this.autoSlideInterval);
//     }
//   }

//   prevSlide(slides: HTMLElement) {
//     this.currentIndex =
//       this.currentIndex > 0
//         ? this.currentIndex - 1
//         : slides.children.length - 1;
//     this.updateSlider(slides);
//   }

//   nextSlide(slides: HTMLElement) {
//     this.currentIndex =
//       this.currentIndex < slides.children.length - 1
//         ? this.currentIndex + 1
//         : 0;
//     this.updateSlider(slides);
//   }

//   updateSlider(slides: HTMLElement) {
//     slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
//   }

//   autoSlide(slides: HTMLElement) {
//     this.autoSlideInterval = setInterval(() => {
//       this.nextSlide(slides);
//     }, 3000);
//   }

//   // Page Navigation Code
//   requirement() {
//     this.router.navigate(['requirement']);
//   }

//   status() {
//     this.router.navigate(['status']);
//   }

//   // Fetch data for feedback
//   async fetchFeedback() {
//     const feedbackSnapshot = await getDocs(collection(this.firestore, 'feedback'));
//     const feedbackDocs = feedbackSnapshot.docs;

//     this.feedbacks = feedbackDocs.map(doc => doc.data());
//   }

//   // Initialize testimonial slider
//   initializeTestimonialSlider() {
//     const testimonialSlides = document.querySelector('.testimonial-slides') as HTMLElement;
//     const testimonialPrevBtn = document.querySelector('.testimonial-prev') as HTMLElement;
//     const testimonialNextBtn = document.querySelector('.testimonial-next') as HTMLElement;

//     testimonialPrevBtn.addEventListener('click', () => this.prevSlide(testimonialSlides));
//     testimonialNextBtn.addEventListener('click', () => this.nextSlide(testimonialSlides));

//     this.autoSlide(testimonialSlides);
//   }
// }





import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../../../ama/src/app/loader/loader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BottomNavbarComponent, NavbarComponent, CommonModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  autoSlideInterval: any;
  testimonialIndex = 0;
  testimonialAutoSlideInterval: any;
  feedbacks: any[] = [];
  loading:boolean=true;

  constructor(private router: Router, private firestore: Firestore) {}

  async ngAfterViewInit() {
    const slides = document.querySelector('.slides') as HTMLElement;
    const prevBtn = document.querySelector('.prev') as HTMLElement;
    const nextBtn = document.querySelector('.next') as HTMLElement;

    prevBtn.addEventListener('click', () => this.prevSlide(slides));
    nextBtn.addEventListener('click', () => this.nextSlide(slides));

    this.autoSlide(slides);

    // Fetch feedback data
    await this.fetchFeedback();
    this.initializeTestimonialSlider();
  }
  // ngOnInit(){
  //   setTimeout(()=>{
  //     this.loading=false;
  //   },500)
  // }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (this.testimonialAutoSlideInterval) {
      clearInterval(this.testimonialAutoSlideInterval);
    }
  }

  prevSlide(slides: HTMLElement) {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : slides.children.length - 1;
    this.updateSlider(slides);
  }

  nextSlide(slides: HTMLElement) {
    this.currentIndex =
      this.currentIndex < slides.children.length - 1 ? this.currentIndex + 1 : 0;
    this.updateSlider(slides);
  }

  updateSlider(slides: HTMLElement) {
    slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  autoSlide(slides: HTMLElement) {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide(slides);
    }, 3000);
  }

  // Page Navigation Code
  requirement() {
    this.router.navigate(['requirement']);
  }

  status() {
    this.router.navigate(['status']);
  }

  // Fetch data for feedback
  async fetchFeedback() {
    const feedbackSnapshot = await getDocs(collection(this.firestore, 'feedback'));
    const feedbackDocs = feedbackSnapshot.docs;
    // for (const feedback of feedbackDocs) {
    //   const feedbackData = feedback.data();

    // }
    // Limit to top 10 feedbacks
  this.feedbacks = feedbackDocs.slice(0, 10).map(doc => doc.data());

    // this.feedbacks = feedbackDocs.map(doc => doc.data());
  }

  // Initialize testimonial slider
  initializeTestimonialSlider() {
    const testimonialSlides = document.querySelector('.testimonial-slides') as HTMLElement;
    const testimonialPrevBtn = document.querySelector('.testimonial-prev') as HTMLElement;
    const testimonialNextBtn = document.querySelector('.testimonial-next') as HTMLElement;

    testimonialPrevBtn.addEventListener('click', () => this.prevTestimonialSlide(testimonialSlides));
    testimonialNextBtn.addEventListener('click', () => this.nextTestimonialSlide(testimonialSlides));

    this.autoSlideTestimonials(testimonialSlides);
  }

  prevTestimonialSlide(testimonialSlides: HTMLElement) {
    this.testimonialIndex =
      this.testimonialIndex > 0 ? this.testimonialIndex - 1 : testimonialSlides.children.length - 1;
    this.updateTestimonialSlider(testimonialSlides);
  }

  nextTestimonialSlide(testimonialSlides: HTMLElement) {
    this.testimonialIndex =
      this.testimonialIndex < testimonialSlides.children.length - 1 ? this.testimonialIndex + 1 : 0;
    this.updateTestimonialSlider(testimonialSlides);
  }

  updateTestimonialSlider(testimonialSlides: HTMLElement) {
    testimonialSlides.style.transform = `translateX(-${this.testimonialIndex * 100}%)`;
  }

  autoSlideTestimonials(testimonialSlides: HTMLElement) {
    this.testimonialAutoSlideInterval = setInterval(() => {
      this.nextTestimonialSlide(testimonialSlides);
    }, 3000);
  }
}
