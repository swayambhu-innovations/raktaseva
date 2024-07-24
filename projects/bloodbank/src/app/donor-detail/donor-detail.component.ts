import { Component } from '@angular/core';
import { BbsidebarComponent } from "../shared/bbsidebar/bbsidebar.component";


@Component({
  selector: 'app-donor-detail',
  standalone: true,
  imports: [BbsidebarComponent],
  templateUrl: './donor-detail.component.html',
  styleUrl: './donor-detail.component.scss'
})
export class DonorDetailComponent {

}
