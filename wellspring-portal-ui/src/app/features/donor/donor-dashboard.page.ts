import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DonorService } from './donor.service';
import { DonationsService } from './donations.service';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2 class="text-2xl font-bold mb-4">Donor Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-card *ngIf="currentDonor()">
        <mat-card-title>Profile</mat-card-title>
        <mat-card-content>
          <p><strong>{{ currentDonor()?.name }}</strong></p>
          <p>{{ currentDonor()?.email }}</p>
          <p>Total Donations: {{ totalDonations() | currency:'INR' }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Recent Donations</mat-card-title>
        <mat-card-content>
          <div *ngFor="let d of donationsService.donations().slice(0,5)">
            <p>₹{{ d.amount }} → Case {{ d.caseId }} on {{ d.date | date:'shortDate' }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class DonorDashboardPage implements OnInit {
  currentDonorId = signal<string>('');

  constructor(
    public donorService: DonorService,
    public donationsService: DonationsService
  ) { }

  ngOnInit() {
    this.donorService.fetchAll().then(() => {
      const first = this.donorService.donors()[0];
      if (first) {
        this.currentDonorId.set(first._id || first.id || '');
        this.donationsService.fetchByDonor(this.currentDonorId());
      }
    });
  }

  currentDonor = computed(() =>
    this.donorService.donors().find(d => d._id === this.currentDonorId() || d.id === this.currentDonorId())
  );

  totalDonations = computed(() =>
    this.donationsService.donations().reduce((sum, d) => sum + d.amount, 0)
  );
}
