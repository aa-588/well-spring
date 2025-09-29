// src/app/features/staff/staff-reports.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportsService, Report } from './reports.service';

@Component({
  selector: 'app-staff-reports-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Reports</h1>
        <p class="text-gray-600">Submit and review staff activity reports.</p>
      </div>

      <!-- Submit New Report -->
      <mat-card class="p-6 shadow rounded-xl max-w-3xl">
        <h2 class="text-lg font-medium mb-4">Submit a New Report</h2>

        <div class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Staff ID</mat-label>
            <input matInput [(ngModel)]="newReport.staffId" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Report Content</mat-label>
            <textarea
              matInput
              rows="4"
              [(ngModel)]="newReport.content"
              placeholder="Write your report here..."
            ></textarea>
          </mat-form-field>

          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              (click)="submitReport()"
              [disabled]="!newReport.staffId?.trim() || !newReport.content?.trim()"
            >
              Submit
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Reports List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Recent Reports</h2>

        <div
          *ngIf="reportsService.reports().length === 0"
          class="text-gray-500 text-center py-6"
        >
          No reports submitted yet.
        </div>

        <div *ngFor="let report of reportsService.reports()" class="mb-4">
          <mat-card class="p-4 shadow-sm rounded hover:shadow-md transition">
            <mat-card-content>
              <p class="text-gray-800">{{ report.content }}</p>
              <small class="block text-gray-500 mt-2">
                Staff ID: <span class="font-medium">{{ report.staffId }}</span> •
                {{ report.createdAt | date: 'short' }}
              </small>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `
})
export class StaffReportsPage implements OnInit {
  newReport: Partial<Report> = { staffId: '', content: '' };

  constructor(public reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.fetch();
  }

  async submitReport() {
    if (this.newReport.staffId?.trim() && this.newReport.content?.trim()) {
      await this.reportsService.create(this.newReport);
      this.newReport = { staffId: '', content: '' };
    }
  }
}
