import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from "./test/test.component";
import { DonorAcknowledgeComponent } from "./donor-acknowledge/donor-acknowledge.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, TestComponent, DonorAcknowledgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'response';
}
