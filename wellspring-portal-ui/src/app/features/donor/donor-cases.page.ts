import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DonorCasesService } from './donor-cases.service';

@Component({
  selector: 'app-donor-cases',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Supported Cases</h1>
        <p class="text-gray-600">
          View the cases you have contributed to and track their progress.
        </p>
      </div>

      <!-- Cases List -->
      <div *ngIf="donorCasesService.cases().length === 0" class="text-gray-500 text-center py-6">
        You haven't supported any cases yet.
      </div>

      <div *ngFor="let c of donorCasesService.cases()" class="mb-4">
        <mat-card class="p-4 shadow rounded-xl hover:shadow-md transition">
          <mat-card-title class="text-lg font-medium mb-2">
            {{ c.familyName }}
          </mat-card-title>
          <mat-card-content class="space-y-1 text-gray-700">
            <p><span class="font-medium">Hospital:</span> {{ c.hospital }}</p>
            <p>
              <span class="font-medium">Status:</span>
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-800': c.status === 'open',
                  'bg-yellow-100 text-yellow-800': c.status === 'in-progress',
                  'bg-gray-200 text-gray-700': c.status === 'closed'
                }"
              >
                {{ c.status }}
              </span>
            </p>
            <p>
              <span class="font-medium">Total Donated:</span>
              <span class="text-indigo-600 font-semibold">₹{{ c.totalDonated }}</span>
            </p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DonorCasesPage implements OnInit {
  constructor(public donorCasesService: DonorCasesService) { }

  ngOnInit() {
    this.donorCasesService.fetchByDonor('current-donor-id'); // TODO: replace with AuthService
  }
}
