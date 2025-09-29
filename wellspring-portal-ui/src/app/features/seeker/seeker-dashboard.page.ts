// src/app/features/seeker/seeker-dashboard.page.ts
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SeekersService } from './seekers.service';
import { SeekerCasesService } from './seeker-cases.service';

@Component({
  standalone: true,
  selector: 'app-seeker-dashboard',
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Seeker Dashboard</h1>
        <p class="text-gray-600">
          Overview of your profile and cases.
        </p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Card -->
        <mat-card *ngIf="currentSeeker()" class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium mb-2">Profile</mat-card-title>
          <mat-card-content class="space-y-1 text-gray-700">
            <p class="text-lg font-semibold">{{ currentSeeker()?.name }}</p>
            <p class="text-sm text-gray-500">
              {{ currentSeeker()?.phone }} · {{ currentSeeker()?.city }}
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Cases Card -->
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium mb-2">My Cases</mat-card-title>
          <mat-card-content class="space-y-3">
            <div
              *ngIf="casesService.cases().length === 0"
              class="text-gray-500 text-center py-6"
            >
              No cases created yet.
            </div>

            <div
              *ngFor="let c of casesService.cases()"
              class="p-3 border rounded hover:bg-gray-50 transition"
            >
              <p class="font-medium text-gray-800">
                {{ c.familyName }}
              </p>
              <p class="text-sm text-gray-600">
                Status:
<span
  class="px-2 py-1 rounded text-xs font-medium"
  [ngClass]="{
    'bg-green-100 text-green-800': c.status === 'active',
    'bg-yellow-100 text-yellow-800': c.status === 'on-hold',
    'bg-gray-200 text-gray-700': c.status === 'closed'
  }"
>
  {{ c.status }}
</span>

              </p>
              <p class="text-sm text-gray-500">Next: {{ c.nextStep || '-' }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})
export class SeekerDashboardPage implements OnInit {
  currentSeekerId = signal<string>('');

  constructor(
    public seekersService: SeekersService,
    public casesService: SeekerCasesService
  ) { }

  async ngOnInit() {
    await this.seekersService.fetchAll();
    const first = this.seekersService.seekers()[0];
    if (first) {
      this.currentSeekerId.set(first._id || first.id || '');
      await this.casesService.fetchForSeeker(this.currentSeekerId());
    }
  }

  currentSeeker = computed(() =>
    this.seekersService
      .seekers()
      .find(
        (s) =>
          s._id === this.currentSeekerId() || s.id === this.currentSeekerId()
      )
  );
}

