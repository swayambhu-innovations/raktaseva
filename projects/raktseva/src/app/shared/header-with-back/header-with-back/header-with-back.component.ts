import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-with-back',
  standalone: true,
  imports: [],
  templateUrl: './header-with-back.component.html',
  styleUrl: './header-with-back.component.scss',
})
export class HeaderWithBackComponent {
  @Input() title: string = '';
  @Input() backURL: string = '/main/home';

  goback() {
    window.history.back();
  }
}
