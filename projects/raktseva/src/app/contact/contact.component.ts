import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  openFb() {
    window.open('https://shreeva.in/', '_self'); 
  }

  openInsta(){
    window.open('https://shreeva.in/', '_self'); 
  }

  openWhatsapp(){
    window.open('https://shreeva.in/', '_self'); 
  }

  openEmail() {
    window.location.href = 'mailto:create@shreeva.com'; // Replace with your email address
  }

  openDialer() {
    window.location.href = 'tel:+917676767677';
  }

  openMaps() {
    const address = 'https://www.google.com/maps/place/Shreeva+Soft-Tech+Innovations+Pvt.+Ltd./@25.4700849,81.8211519,17z/data=!3m1!4b1!4m6!3m5!1s0x399acbdc6d05fc4d:0x67b0ae7917d279e7!8m2!3d25.4700801!4d81.8237268!16s%2Fg%2F11s49nj0y4?entry=ttu';
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  }
}
