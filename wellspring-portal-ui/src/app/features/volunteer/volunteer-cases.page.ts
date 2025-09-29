// src/app/features/volunteer/volunteer-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesService } from './cases.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer-cases-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Assigned Cases</h1>
        <p class="text-gray-600">Cases you are responsible for monitoring and updating.</p>
      </div>

      <!-- Empty state -->
      <div
        *ngIf="casesService.cases().length === 0"
        class="text-gray-500 text-center py-8 border rounded bg-gray-50"
      >
        No cases assigned yet.
      </div>

      <!-- Case Cards -->
      <div *ngFor="let c of casesService.cases()" class="mb-3">
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="flex items-center justify-between">
            <span class="text-lg font-medium text-gray-800">
              {{ c.familyName }}
              <small class="ml-2 text-gray-500">#{{ c.caseCode }}</small>
            </span>
            <span
              class="px-2 py-1 rounded text-xs font-medium"
              [ngClass]="{
                'bg-green-100 text-green-800': (c.status ?? '') === 'active',
                'bg-yellow-100 text-yellow-800': (c.status ?? '') === 'on-hold',
                'bg-red-100 text-red-800': (c.status ?? '') === 'closed'
              }"
            >
              {{ c.status ?? 'unknown' }}
            </span>
          </mat-card-title>

          <mat-card-content class="mt-2 space-y-1 text-gray-700">
            <p><strong>Hospital:</strong> {{ c.hospital || '-' }}</p>
            <p><strong>Next Step:</strong> {{ c.nextStep || '-' }}</p>
          </mat-card-content>

          <mat-card-actions class="flex justify-end mt-4">
            <a
              [routerLink]="['/volunteer/cases', c._id || c.id]"
              mat-stroked-button
              color="primary"
            >
              View Details
            </a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `
})
export class VolunteerCasesPage implements OnInit {
  constructor(public casesService: CasesService) { }

  ngOnInit() {
    this.casesService.fetchAll();
  }
}
