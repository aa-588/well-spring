// src/app/features/staff/staff-dashboard.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'staff-dashboard',
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Staff Dashboard</h1>
        <p class="text-gray-600">
          Overview of assigned users, pending tasks, and recent reports.
        </p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Assigned Users -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium">Assigned Users</mat-card-title>
          <mat-card-content class="text-gray-700">
            <p class="text-sm">You currently have <strong>12</strong> users assigned.</p>
          </mat-card-content>
        </mat-card>

        <!-- Pending Tasks -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium">Pending Tasks</mat-card-title>
          <mat-card-content class="text-gray-700">
            <p class="text-sm">There are <strong>5</strong> tasks pending completion.</p>
          </mat-card-content>
        </mat-card>

        <!-- Recent Reports -->
        <mat-card class="p-6 shadow rounded-xl md:col-span-3">
          <mat-card-title class="text-lg font-medium">Recent Reports</mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <p>No reports submitted yet.</p>
            <!-- Example entry -->
            <!-- <p><strong>Report #123</strong> — Submitted on Jan 20, 2025</p> -->
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})
export class StaffDashboardPage { }
