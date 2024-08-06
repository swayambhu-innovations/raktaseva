import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule], 
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


