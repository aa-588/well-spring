// src/app/features/seeker/seeker-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { SeekerCasesService } from './seeker-cases.service';

@Component({
  standalone: true,
  selector: 'app-seeker-cases-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Cases</h1>
        <p class="text-gray-600">Track and manage your submitted cases.</p>
      </div>

      <!-- Create Case -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Create New Case</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Family Name</mat-label>
            <input matInput [(ngModel)]="familyName" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Hospital</mat-label>
            <input matInput [(ngModel)]="hospital" />
          </mat-form-field>

          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              (click)="create()"
              [disabled]="!familyName.trim()"
            >
              Create Case
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Case List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Cases</h2>

        <div
          *ngIf="casesService.cases().length === 0"
          class="text-gray-500 text-center py-6"
        >
          No cases created yet.
        </div>

        <div *ngFor="let c of casesService.cases()" class="mb-3">
          <mat-card class="p-4 shadow-sm rounded hover:shadow-md transition">
            <mat-card-title class="text-base font-semibold mb-2">
              {{ c.familyName }}
            </mat-card-title>
            <mat-card-content class="text-sm text-gray-700 space-y-1">
              <p><span class="font-medium">Hospital:</span> {{ c.hospital || '-' }}</p>
              <p>
                <span class="font-medium">Status:</span>
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
              <p><span class="font-medium">Next:</span> {{ c.nextStep || '-' }}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `,
})
export class SeekerCasesPage implements OnInit {
  seekerId = '';
  familyName = '';
  hospital = '';

  constructor(
    public casesService: SeekerCasesService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.seekerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.seekerId) {
      await this.casesService.fetchForSeeker(this.seekerId);
    }
  }

  async create() {
    if (!this.seekerId || !this.familyName.trim()) return;
    await this.casesService.create(this.seekerId, {
      familyName: this.familyName,
      hospital: this.hospital,
    });
    this.familyName = '';
    this.hospital = '';
  }
}
