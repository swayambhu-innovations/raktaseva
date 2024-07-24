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
  selector: 'app-approved-request',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.scss']
})
export class ApprovedRequestComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  maxDate: string;
  fromDate: string | null = '';
  toDate: string | null = '';
  lineChart: Chart | undefined;

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
    this.fromDate = this.convertToYYYYMMDD(this.startDate.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDate.toString());
    console.log(this.fromDate, this.toDate);
    this.refreshChart();
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

    const dateCursor = new Date(this.startDate);
    while (dateCursor <= this.endDate) {
      labels.push(this.convertToYYYYMMDD(dateCursor.toString())!);
      data.push(0); // Initialize count for each date
      dateCursor.setDate(dateCursor.getDate() + 1);
    }

    const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
    const patientDocs = patientSnapshot.docs;

    for (const patient of patientDocs) {
      const patientData = patient.data();
      if (patientData['status'] === 'approved') {
        console.log(patientData)
        const dateAt = new Date(patientData['timestamp']);
        const formattedDate = this.convertToYYYYMMDD(dateAt.toString());

        if (formattedDate && labels.includes(formattedDate)) {
          const index = labels.indexOf(formattedDate);
          data[index]++;
        }
      }
    }

    this.createLineChart(labels, data);
  }

  private createLineChart(labels: string[], data: number[]) {
    const lineChartCanvas = document.getElementById('PerDay') as HTMLCanvasElement;

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Approvals',
          data: data,
          borderColor: '#00FF00',
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
            text: 'Total Approvals per Date',
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
