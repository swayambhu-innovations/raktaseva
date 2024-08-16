import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";

@Component({
  selector: 'app-help-faq',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './help-faq.component.html',
  styleUrl: './help-faq.component.scss'
})
export class HelpFaqComponent {
  toggleCard(card: any) {
    const content = card.querySelector('.card-content');
    const maxHeight = content.style.maxHeight;

    if (maxHeight && maxHeight !== '0px') {
      content.style.maxHeight = '0px';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }
}
