// src/app/features/volunteer/volunteer-dashboard.page.ts
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VolunteerProfileService } from './volunteer-profile.service';
import { VolunteerTasksService } from './volunteer-tasks.service';
import { ReportsService } from '../staff/reports.service'; // reuse staff reports service
import { CasesService } from './cases.service';

@Component({
  selector: 'app-volunteer-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Volunteer Dashboard</h1>
        <p class="text-gray-600">
          Quick overview of your profile, assigned tasks, and recent reports.
        </p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium">Profile</mat-card-title>
          <mat-card-content *ngIf="currentProfile()" class="text-gray-700">
            <p class="font-medium">{{ currentProfile()?.name }}</p>
            <p>{{ currentProfile()?.email }}</p>
            <p class="mt-2">
              <span class="text-sm text-gray-600">Hours Logged:</span>
              <strong>{{ currentProfile()?.hoursLogged || 0 }}</strong>
            </p>
          </mat-card-content>
          <mat-card-content *ngIf="!currentProfile()" class="text-gray-500">
            No profile loaded.
          </mat-card-content>
        </mat-card>

        <!-- Tasks -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium">Assigned Tasks</mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <div *ngIf="myTasks().length === 0" class="text-gray-500">
              No tasks assigned.
            </div>
            <div *ngFor="let t of myTasks().slice(0, 5)" class="p-2 border rounded hover:bg-gray-50">
              <p class="font-medium">{{ t.title }}</p>
              <p
                class="text-xs mt-1"
                [ngClass]="{
                  'text-green-600': (t.status ?? '') === 'done',
                  'text-yellow-600': (t.status ?? '') === 'in-progress',
                  'text-gray-600': (t.status ?? '') === 'pending'
                }"
              >
                {{ t.status }}
              </p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Reports -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium">Recent Reports</mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <div *ngIf="myReports().length === 0" class="text-gray-500">
              No reports submitted.
            </div>
            <div *ngFor="let r of myReports().slice(0, 5)" class="p-2 border rounded hover:bg-gray-50">
              <p>{{ r.content }}</p>
              <small class="text-gray-500">{{ r.createdAt | date: 'short' }}</small>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
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
    this.profileService.profiles().find(
      (p) => p._id === this.currentVolunteerId() || p.id === this.currentVolunteerId()
    )
  );

  myTasks = computed(() =>
    this.tasksService.tasks().filter((t) => t.assignedTo === this.currentVolunteerId())
  );

  myReports = computed(() =>
    this.reportsService.reports().filter((r) => r.staffId === this.currentVolunteerId())
  );
}
