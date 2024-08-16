// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; 
// import Chart from 'chart.js/auto';
// import { collection, getDocs, QueryDocumentSnapshot } from '@firebase/firestore';
// import { Firestore } from '@angular/fire/firestore';
// @Component({
//     selector: 'app-total-request',
//     standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     CommonModule,
//     FormsModule,
//   ],
//   templateUrl: './total-request.component.html',
//     styleUrls: ['./total-request.component.scss']
//   })
//   export class TotalRequestComponent  implements OnInit {
//   startDate!: Date;
//   endDate!: Date;
//   maxDate: string;
//   chart: Chart<"pie", number[], string> | undefined;
//   fromDate: any = '';
//   toDate: any = '';
//   keysArray: string[] = [];
//   valuesArray: string[] = [];
//   @Output() notify = new EventEmitter<any>();

//   constructor(private firestore: Firestore) {
//     this.maxDate = new Date().toISOString().split('T')[0];
//   }

//   ngOnInit() {
//     const currentDate = new Date();
//     this.startDate = new Date(currentDate);
//     this.endDate = new Date();
//     this.startDate.setDate(currentDate.getDate() - 6); 
//     this.onDateChange(); 
//   }

//   onDateChange() {
//     this.fromDate = this.convertToYYYYMMDD(this.startDate.toString());
//     this.toDate = this.convertToYYYYMMDD(this.endDate.toString());
//     console.log(this.fromDate, this.toDate);
//     this.refreshChart();
//   }

//   convertToYYYYMMDD(dateString: string): string | null {
//     const inputDate = new Date(dateString);
//     if (isNaN(inputDate.getTime())) {
//       return null;
//     }
//     const year = inputDate.getFullYear();
//     const month = ('0' + (inputDate.getMonth() + 1)).slice(-2); 
//     const day = ('0' + inputDate.getDate()).slice(-2);
//     return `${year}-${month}-${day}`;
//   }

//   private async refreshChart() {
//     let Approved=0;
//     let rejected=0;
//     const donateSnapshot = await getDocs(collection(this.firestore, 'checkup-form'));
//     const donateDocs = donateSnapshot.docs;
//     for (const doc of donateDocs) {
//       const data = doc.data();
//       const date=data['timestamp'];
//       console.log(doc.id,date)
//       // const dateAt = new Date(data['timestamp']);
//       // const formattedDate = this.convertToYYYYMMDD(dateAt.toString());

//       // if (formattedDate && this.isDateInRange(dateAt)) {
//       if(data['status']== 'approved'){
//         Approved++;

//       }
//       if(data['status']== 'rejected'){
//         rejected=rejected+1;
//       }

//     // }
//     }

//     //here i'm Preparing data for the chart
//     const labels = ['Approved','Rejected']
//     console.log(labels)
//     const data = [Approved,rejected]
//     console.log(data)

//     this.createChart(labels, data);
//   }
//   private isDateInRange(date: Date): boolean {
//     return date >= this.startDate && date <= this.endDate;
//   }



//   private async createChart(labels: string[], data: number[]) {
//     if (this.chart) {
//       this.chart.destroy(); 
//     }

//     this.chart = new Chart("chart", {
//       type: "pie",
//       data: {
//         labels: labels, 
//         datasets: [
//           {
//             data: data,
//             backgroundColor: [
//               "rgb(255, 99, 132)",
//               "rgb(54, 162, 235)",
//               "rgb(255, 205, 86)",
//               "rgb(75, 192, 192)",
//               "rgb(153, 102, 255)",
//               "rgb(255, 159, 64)",
//               "rgb(199, 199, 199)",
//               "rgb(83, 102, 255)"
//             ],
//             hoverOffset: 4,
//           },
//         ],
//       },
//       options: {
//         aspectRatio: 2.5,
//         plugins: {
//           title: {
//             display: true,
//             font: {
//               size: 24,
//               weight: "bold",
//               family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//             },
//             padding: {
//               top: 0,
//               bottom: 0,
//             },
//           },
//           legend: {
//             display: true,
//             labels: {
//               font: {
//                 size: 16,
//                 family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//               },
//             },
//           },
//         },
//       },
//     });
//   }
// }












// date wise data
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Chart from 'chart.js/auto';
import { collection, getDocs, QueryDocumentSnapshot } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-total-request',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './total-request.component.html',
    styleUrls: ['./total-request.component.scss']
})
export class TotalRequestComponent implements OnInit {
  noDataFound: boolean = false; 
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
      let donorCount=0
        let approved = 0;
        let rejected = 0;
        const donateSnapshot = await getDocs(collection(this.firestore, 'checkup-form'));
        const donateDocs = donateSnapshot.docs;

        for (const doc of donateDocs) {
            const data = doc.data();
            const timestamp = data['timestamp'];
            const datePart = this.extractDatePart(timestamp);

            if (datePart && this.isDateInRange(datePart)) {
                if (data['status'] === 'approved') {
                    approved++;
                    donorCount++;
                }
                if (data['status'] === 'rejected') {
                    rejected++;
                    donorCount++
                }
            }
        }

        this.noDataFound = (approved === 0 && rejected === 0);
        const labels = ['Approved', 'Rejected'];
        const data = [approved, rejected];

        this.createChart(labels, data);
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

    private async createChart(labels: string[], data: number[]) {
        if (this.chart) {
            this.chart.destroy(); 
        }

        this.chart = new Chart("chart", {
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
                            "rgb(153, 102, 255)",
                            "rgb(255, 159, 64)",
                            "rgb(199, 199, 199)",
                            "rgb(83, 102, 255)"
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
