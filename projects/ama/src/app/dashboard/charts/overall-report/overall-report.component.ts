import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Chart from "chart.js/auto";
import { collection, getDocs } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-overall-report',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './overall-report.component.html',
  styleUrls: ['./overall-report.component.scss']
})
export class OverallReportComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  maxDate: string;
  chart: Chart<"pie", number[], string> | undefined;
  fromDate: any = '';
  toDate: any = '';
  keysArray: string[] = [];
  valuesArray: string[] = [];
  @Output() notify = new EventEmitter<any>();

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
    let totalRequest = 0;
    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;

    const patientSnapshot = await getDocs(collection(this.firestore, 'requirement'));
    const patientDocs = patientSnapshot.docs;

    for (const patient of patientDocs) {
      const patientData = patient.data();
      const dateAt = new Date(patientData['timestamp']);
      const formattedDate = this.convertToYYYYMMDD(dateAt.toString());

      if (formattedDate && this.isDateInRange(dateAt)) {
        if (patientData['status'] === 'approved') {
          approvedCount++;
          totalRequest++;
        } else if (patientData['status'] === 'pending') {
          pendingCount++;
          totalRequest++;
        } else if (patientData['status'] === 'rejected') {
          rejectedCount++;
          totalRequest++;
        }
      }
    }
    const labels = ['Approved', 'Pending', 'Rejected', 'Total Requests'];
    const data = [approvedCount, pendingCount, rejectedCount, totalRequest];

    this.createChart(labels, data);
    return { labels, data };
  }

  private isDateInRange(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  private async createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy(); 
    }

    this.chart = new Chart("MyChart", {
      type: "pie",
      data: {
        labels: labels, 
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            font: {
              size: 24,
              weight: "bold",
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            },
            padding: {
              top: 0,
              bottom: 0,
            },
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 16,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
            },
          },
        },
      },
    });
  }
}
