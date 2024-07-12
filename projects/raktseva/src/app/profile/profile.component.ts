import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatCardModule,
    MatIconModule,
    MatListModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}



