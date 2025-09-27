import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DonorCasesService } from './donor-cases.service';

@Component({
  selector: 'app-donor-cases',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2 class="text-xl font-bold mb-4">My Supported Cases</h2>

    <div *ngFor="let c of donorCasesService.cases()" class="mb-3">
      <mat-card>
        <mat-card-title>{{ c.familyName }}</mat-card-title>
        <mat-card-content>
          <p>Hospital: {{ c.hospital }}</p>
          <p>Status: {{ c.status }}</p>
          <p>Total Donated: ₹{{ c.totalDonated }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class DonorCasesPage implements OnInit {
  constructor(public donorCasesService: DonorCasesService) { }

  ngOnInit() {
    this.donorCasesService.fetchByDonor('current-donor-id'); // TODO: replace with AuthService
  }
}
