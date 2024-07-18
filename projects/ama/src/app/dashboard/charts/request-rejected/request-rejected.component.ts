import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-request-rejected',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
  
  ],
  
  templateUrl: './request-rejected.component.html',
  styleUrl: './request-rejected.component.scss'
})
export class RequestRejectedComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  maxDate: string;
  private myChart: any;
  fromDate: any = '';
  toDate: any = '';
  keysArray: string[] = [];
  valuesArray: string[] = [];
  @Output() notify = new EventEmitter<any>();

  constructor() {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    const currentDate = new Date();
    this.startDate = new Date(currentDate);
    this.endDate = new Date();
    this.startDate.setDate(currentDate.getDate() - 6); 
    this.onDateChange(); 
  }

  onDateChange() {
    this.fromDate = this.convertToYYYYMMDD(this.startDate.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDate.toString());
    console.log(this.fromDate, this.toDate);
  }

  convertToYYYYMMDD(dateString: string): string | null {
    const inputDate = new Date(dateString);
    if (isNaN(inputDate.getTime())) {
      return null;
    }
    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2); 
    const day = ('0' + inputDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // private destroyChart() {
  //   if (this.myChart) {
  //     this.myChart.destroy();
  //     this.myChart = null;
  //   }
  // }

  // private loadChart() {
  //   if (this.myChart) {
  //     this.destroyChart();
  //   }
  //   this.myChart = new Chart('bookingsPerDay', {
  //     type: 'line',
  //     data: {
  //       labels: this.keysArray,
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: this.valuesArray,
  //           borderColor: 'rgb(255, 99, 132)',
  //           backgroundColor: 'rgb(255, 99, 132,50)',
  //           fill: true,
  //           tension: 0.4,
  //         },
  //       ],
  //     },
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //     },
  //   });
  // }
}

