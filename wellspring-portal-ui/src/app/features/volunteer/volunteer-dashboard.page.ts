// src/app/features/volunteer/volunteer-dashboard.page.ts
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { VolunteerProfileService } from './volunteer-profile.service';
import { VolunteerTasksService } from './volunteer-tasks.service';
import { ReportsService } from '../staff/reports.service'; // re-use reports service
import { CasesService } from './cases.service';

@Component({
    selector: 'app-volunteer-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, MatCardModule, MatTableModule, MatButtonModule],
    template: `
    <h2 class="text-2xl font-bold mb-4">Volunteer Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <mat-card>
        <mat-card-title>Profile</mat-card-title>
        <mat-card-content *ngIf="currentProfile()">
          <p><strong>{{ currentProfile()?.name }}</strong></p>
          <p>{{ currentProfile()?.email }}</p>
          <p>Hours: {{ currentProfile()?.hoursLogged || 0 }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Assigned Tasks</mat-card-title>
        <mat-card-content>
          <table mat-table [dataSource]="myTasks()" class="w-full">
            <ng-container matColumnDef="title">
              <td mat-cell *matCellDef="let t">{{ t.title }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <td mat-cell *matCellDef="let t">{{ t.status }}</td>
            </ng-container>
            <tr mat-row *matRowDef="let row; columns: ['title','status']"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Recent Reports</mat-card-title>
        <mat-card-content>
          <div *ngFor="let r of myReports().slice(0,5)">
            <p>{{ r.content }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class VolunteerDashboardPage implements OnInit {
    // TODO replace with auth-supplied id
    currentVolunteerId = signal<string>('');

    constructor(
        public profileService: VolunteerProfileService,
        public tasksService: VolunteerTasksService,
        public casesService: CasesService,
        public reportsService: ReportsService
    ) { }

    ngOnInit() {
        this.profileService.fetchAll();
        this.tasksService.fetchAll();
        this.casesService.fetchAll();
        this.reportsService.fetch();

        // pick first available volunteer as demo/current
        setTimeout(() => {
            const first = this.profileService.profiles()[0];
            if (first) this.currentVolunteerId.set(first._id || first.id || '');
        }, 300);
    }

    currentProfile = computed(() =>
        this.profileService.profiles().find(p => p._id === this.currentVolunteerId() || p.id === this.currentVolunteerId())
    );

    myTasks = computed(() => this.tasksService.tasks().filter(t => t.assignedTo === this.currentVolunteerId()));

    myReports = computed(() => this.reportsService.reports().filter(r => r.staffId === this.currentVolunteerId()));
}
