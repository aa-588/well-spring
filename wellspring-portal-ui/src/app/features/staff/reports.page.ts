import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReportsService, Report } from './reports.service';

@Component({
  selector: 'app-staff-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatInputModule],
  template: `
    <h2 class="text-xl font-bold mb-4">Reports</h2>

    <div class="mb-4 flex flex-col gap-2">
      <input matInput placeholder="Staff ID" [(ngModel)]="newReport.staffId">
      <textarea matInput [(ngModel)]="newReport.content" placeholder="Write report..." rows="3" class="w-full"></textarea>
      <button mat-flat-button color="primary" (click)="submitReport()">Submit</button>
    </div>

    <mat-card *ngFor="let report of reportsService.reports()" class="mb-3">
      <mat-card-content>
        <p>{{ report.content }}</p>
        <small class="text-gray-500">
          Staff ID: {{ report.staffId }} | {{ report.createdAt | date:'short' }}
        </small>
      </mat-card-content>
    </mat-card>
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
