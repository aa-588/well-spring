import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorMatchingService } from './donor-matching.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-donor-matching-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Suggested Families</h1>
        <p class="text-gray-600">
          These families are recommended based on your giving history and matching algorithm.
        </p>
      </div>

      <!-- Empty State -->
      <div *ngIf="matchingService.candidates().length === 0" class="text-gray-500 text-center py-6">
        No suggested families available right now. Please check back later.
      </div>

      <!-- Candidate List -->
      <div *ngFor="let c of matchingService.candidates()" class="mb-4">
        <mat-card class="p-6 shadow rounded-xl hover:shadow-md transition">
          <mat-card-title class="text-lg font-medium mb-2">
            {{ c.familyName }}
          </mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <p><span class="font-medium">Hospital:</span> {{ c.hospital }}</p>
            <p>
              <span class="font-medium">Need:</span>
              <span class="text-red-600 font-semibold">₹{{ c.needAmount || 0 }}</span>
            </p>
            <p>
              <span class="font-medium">Suitability:</span>
              <span class="text-green-600 font-semibold">{{ c.suitabilityScore || 0 }}%</span>
            </p>

            <div class="flex gap-2 mt-4">
              <input
                type="number"
                [(ngModel)]="pledgeAmounts[c.caseId]"
                placeholder="Amount"
                class="border rounded p-2 w-32"
              />
              <button mat-flat-button color="primary" (click)="pledge(c.caseId)">
                Pledge Support
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DonorMatchingPage implements OnInit {
  donorId = 'current-donor-id'; // TODO: replace with AuthService
  pledgeAmounts: Record<string, number> = {};

  constructor(public matchingService: DonorMatchingService) { }

  ngOnInit() {
    this.matchingService.fetchCandidatesForDonor(this.donorId);
  }

  async pledge(caseId: string) {
    const amt = this.pledgeAmounts[caseId] || 0;
    if (!amt) return;
    await this.matchingService.pledgeSupport(this.donorId, caseId, amt);
    alert(`Pledged ₹${amt} to case ${caseId}`);
    this.pledgeAmounts[caseId] = 0;
  }
}
