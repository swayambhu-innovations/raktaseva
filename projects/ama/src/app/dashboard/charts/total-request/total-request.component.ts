import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Chart from "chart.js/auto";
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-total-request',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './total-request.component.html',
  styleUrls: ['./total-request.component.scss']
})
export class TotalRequestComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  years: number[] = [2023, 2024]; 
  lineChart: Chart | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.onYearChange();
  }

  onYearChange() {
    this.refreshChart();
  }

  private async refreshChart() {
    const labels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const data: number[] = Array(12).fill(0);

    const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
    const patientDocs = patientSnapshot.docs;

    for (const patient of patientDocs) {
      const patientData = patient.data();
      const dateAt = new Date(patientData['timestamp']);
      const year = dateAt.getFullYear();
      const month = dateAt.getMonth(); // 0-based index for month (0 = January, 11 = December)

      if (year === this.selectedYear) {
        data[month]++;
      }
    }

    this.createLineChart(labels, data);
  }

  private createLineChart(labels: string[], data: number[]) {
    const lineChartCanvas = document.getElementById('chart') as HTMLCanvasElement;

    if (this.lineChart) {
      this.lineChart.destroy(); 
    }

    this.lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Requests',
          data: data,
          borderColor: '#0692FB',
          fill: false,
          tension: 1.5,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
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
            text: 'Total Requests per Month',
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

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short' });
  }
}

