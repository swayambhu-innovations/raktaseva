// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dialog',
//   standalone: true,
//   imports: [],
//   templateUrl: './dialog.component.html',
//   styleUrl: './dialog.component.scss'
// })
// export class DialogComponent {

// }



// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components

// @Component({
//   selector: 'app-dialog',
//   standalone: true,
//   imports: [CommonModule,], 
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.scss']
// })
// export class ConfirmationDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { message: string, data: any }
//   ) {}

//   closeDialog(result: boolean): void {
//     this.dialogRef.close(result);
//   }
// }




import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule,], 
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, data: any}
  ) {}

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

}



