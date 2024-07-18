// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-chart-container',
//   standalone: true,
//   imports: [],
//   templateUrl: './chart-container.component.html',
//   styleUrl: './chart-container.component.scss'
// })
// export class ChartContainerComponent {

// }

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './chart-container.component.html',
  styleUrl: './chart-container.component.scss'
})
export class ChartContainerComponent {
  @Input() center: boolean = false;
  @Input() title: string = '';
}

