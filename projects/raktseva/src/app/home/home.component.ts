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

import { Component, AfterViewInit, OnDestroy,Renderer2  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  autoSlideInterval: any;

  constructor(private renderer: Renderer2,private router: Router) {}

  ngAfterViewInit() {
    const slides = document.querySelector('.slides') as HTMLElement;
    const prevBtn = document.querySelector('.prev') as HTMLElement;
    const nextBtn = document.querySelector('.next') as HTMLElement;

    prevBtn.addEventListener('click', () => this.prevSlide(slides));
    nextBtn.addEventListener('click', () => this.nextSlide(slides));

    this.autoSlide(slides);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  prevSlide(slides: HTMLElement) {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : slides.children.length - 1;
    this.updateSlider(slides);
  }

  nextSlide(slides: HTMLElement) {
    this.currentIndex = (this.currentIndex < slides.children.length - 1) ? this.currentIndex + 1 : 0;
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
requirement(){
  this.router.navigate(['requirement']);
}

status(){

}
}
