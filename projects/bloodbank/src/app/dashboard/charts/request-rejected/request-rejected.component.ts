import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import Chart from "chart.js/auto";
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-request-rejected',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './request-rejected.component.html',
  styleUrls: ['./request-rejected.component.scss']
})
export class RequestRejectedComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  maxDate: string;
  fromDate: string | null = '';
  toDate: string | null = '';
  lineChart: Chart | undefined;
  noDataFound: boolean = false;

  constructor(private firestore: Firestore) {
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
    if (this.startDate && this.endDate) {
        this.fromDate = this.convertToYYYYMMDD(this.startDate.toString());
        this.toDate = this.convertToYYYYMMDD(this.endDate.toString());
        console.log(this.fromDate, this.toDate);
        this.refreshChart();
    } else {
        console.error("Start date or end date is not defined.");
    }
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

  private async refreshChart() {
    if (!this.startDate || !this.endDate) {
      return;
    }

    const labels: string[] = [];
    const data: number[] = [];

    // Initialize labels and data arrays
    const dateCursor = new Date(this.startDate);
    while (dateCursor <= this.endDate) {
      const formattedDate = this.convertToYYYYMMDD(dateCursor.toString());
      if (formattedDate) {
        labels.push(formattedDate);
        data.push(0);
      }
      dateCursor.setDate(dateCursor.getDate() + 1);
    }

    const donateSnapshot = await getDocs(collection(this.firestore, 'checkup-form'));
    const donateDocs = donateSnapshot.docs;

    for (const doc of donateDocs) {
      const dataItem = doc.data();
      const timestamp = dataItem['timestamp'];
      const datePart = this.extractDatePart(timestamp);

      if (datePart && this.isDateInRange(datePart)) {
        const formattedDate = this.convertToYYYYMMDD(datePart.toString());
        if (formattedDate) {
          const index = labels.indexOf(formattedDate);
          if (index !== -1) {
            data[index]++;
          }
        }
      }
    }

    this.noDataFound = data.every(count => count === 0);

    // Create the line chart with the updated data
    this.createLineChart(labels, data);
  }

  private extractDatePart(timestamp: string): Date | null {
    const dateRegex = /^(\d{1,2}) (\w+) (\d{4})/;
    const match = timestamp.match(dateRegex);

    if (match) {
      const day = parseInt(match[1], 10);
      const month = match[2];
      const year = parseInt(match[3], 10);

      const dateString = `${day} ${month} ${year}`;
      const date = new Date(dateString);

      return isNaN(date.getTime()) ? null : date;
    }

    return null;
  }

  private isDateInRange(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  private createLineChart(labels: string[], data: number[]) {
    const lineChartCanvas = document.getElementById('bookingsPerDay') as HTMLCanvasElement;

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Donor Count',
          data: data,
          borderColor: '#FF0000',
          fill: false,
          tension: 0.1,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
            beginAtZero: true,
          },
          y: {
            title: {
              display: true,
              text: 'Count',
            },
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Donor Count per Date',
            font: {
              size: 20,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
}
