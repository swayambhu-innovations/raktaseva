import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-friend-modal',
  standalone: true,
  imports: [ MatDialogModule],
  templateUrl: './invite-friend-modal.component.html',
  styleUrl: './invite-friend-modal.component.scss'
})
export class InviteFriendModalComponent {
  constructor(public dialogRef: MatDialogRef<InviteFriendModalComponent>) { }

  openWhatsApp() {
    const message = encodeURIComponent('Hello');
    const url = `https://api.whatsapp.com/send?text=${message}`;
    window.open(url, '_blank');
  }

  openTelegram() {
    const message = encodeURIComponent('Hello');
    const url = `https://t.me/share/url?url=&text=${message}`;
    window.open(url, '_blank');
  }
}
