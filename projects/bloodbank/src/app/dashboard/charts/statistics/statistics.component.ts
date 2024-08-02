import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input() totalDonor:number = 0;
  @Input() approved:number = 0;
  @Input() rejected:number = 0;
  @Input() pending:number = 0;
}

