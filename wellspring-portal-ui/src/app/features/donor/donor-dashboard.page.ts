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
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Donor Dashboard</h1>
        <p class="text-gray-600">Overview of your profile and donation history.</p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Card -->
        <mat-card *ngIf="currentDonor()" class="p-4 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium mb-2">Profile</mat-card-title>
          <mat-card-content class="space-y-1 text-gray-700">
            <p class="text-lg font-semibold">{{ currentDonor()?.name }}</p>
            <p class="text-sm text-gray-500">{{ currentDonor()?.email }}</p>
            <p class="mt-2">
              <span class="font-medium">Total Donations:</span>
              <span class="text-indigo-600 font-semibold">
                {{ totalDonations() | currency:'INR' }}
              </span>
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Donations Card -->
        <mat-card class="p-4 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium mb-2">Recent Donations</mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <div *ngIf="donationsService.donations().length === 0" class="text-gray-500 text-center py-6">
              No donations yet.
            </div>
            <div *ngFor="let d of donationsService.donations().slice(0,5)" class="p-2 border-b last:border-0">
              <p>
                <span class="text-indigo-600 font-medium">₹{{ d.amount }}</span>
                → Case <span class="font-medium">{{ d.caseId }}</span>
                <span class="text-sm text-gray-500">on {{ d.date | date:'shortDate' }}</span>
              </p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
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
    this.donorService.donors().find(
      d => d._id === this.currentDonorId() || d.id === this.currentDonorId()
    )
  );

  totalDonations = computed(() =>
    this.donationsService.donations().reduce((sum, d) => sum + d.amount, 0)
  );
}
