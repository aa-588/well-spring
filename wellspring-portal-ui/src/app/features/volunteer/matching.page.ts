// src/app/features/volunteer/matching.page.ts
import { Component, OnInit } from '@angular/core';
import { MatchingService } from './matching.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-volunteer-matching-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Matching</h1>
        <p class="text-gray-600">Find suitable donors for a case and assign them.</p>
      </div>

      <!-- Case Input -->
      <mat-card class="p-6 shadow rounded-xl max-w-2xl">
        <h2 class="text-lg font-medium mb-4">Load Candidates</h2>
        <div class="flex gap-4 items-end">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Case ID</mat-label>
            <input matInput [(ngModel)]="caseId" />
          </mat-form-field>
          <button mat-flat-button color="primary" (click)="load()" [disabled]="!caseId.trim()">
            Load
          </button>
        </div>
      </mat-card>

      <!-- Candidates -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Candidate Donors</h2>

        <div *ngIf="matchingService.candidates().length === 0" class="text-gray-500 text-center py-6">
          No candidates available. Enter a Case ID to load donors.
        </div>

        <div
          *ngFor="let c of matchingService.candidates()"
          class="mb-4 border rounded p-4 hover:bg-gray-50 transition"
        >
          <p class="text-gray-800 font-medium">{{ c.donorName }}</p>
          <p class="text-sm text-gray-600">
            Suitability Score:
            <span
              class="px-2 py-1 rounded text-xs font-medium"
              [ngClass]="{
                'bg-green-100 text-green-800': (c.suitabilityScore ?? 0) >= 70,
                'bg-yellow-100 text-yellow-800': (c.suitabilityScore ?? 0) >= 40 && (c.suitabilityScore ?? 0) < 70,
                'bg-red-100 text-red-800': (c.suitabilityScore ?? 0) < 40
              }"
            >
              {{ c.suitabilityScore ?? 0 }}%
            </span>
          </p>

          <div class="flex justify-end mt-3">
            <button mat-stroked-button color="primary" (click)="assign(c.donorId)">
              Assign Donor
            </button>
          </div>
        </div>
      </mat-card>
    </div>
  `
})
export class MatchingPage implements OnInit {
  caseId = '';

  constructor(public matchingService: MatchingService) { }

  ngOnInit() { }

  async load() {
    if (!this.caseId.trim()) return;
    await this.matchingService.fetchCandidatesForCase(this.caseId);
  }

  async assign(donorId: string) {
    if (!this.caseId.trim()) return;
    await this.matchingService.assignDonor(this.caseId, donorId, 'Assigned by volunteer');
    // optionally refresh candidates or show toast
  }
}
