// src/app/features/partner/collaborations.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CollaborationsService } from './collaborations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-collaborations-page',
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
        <h1 class="text-2xl font-semibold text-gray-800">Collaborations</h1>
        <p class="text-gray-600">
          Create and manage collaborations between partners and supported cases.
        </p>
      </div>

      <!-- Create Collaboration -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">New Collaboration</h2>
        <div class="flex gap-2 items-end">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Description</mat-label>
            <input matInput [(ngModel)]="desc" />
          </mat-form-field>
          <button
            mat-flat-button
            color="primary"
            (click)="create()"
            [disabled]="!desc.trim()"
          >
            Create
          </button>
        </div>
      </mat-card>

      <!-- Collaborations List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Collaborations</h2>

        <div *ngIf="collabsService.collabs().length === 0" class="text-gray-500 text-center py-6">
          No collaborations created yet.
        </div>

        <div *ngFor="let c of collabsService.collabs()" class="mb-3">
          <mat-card class="p-4 shadow-sm rounded hover:shadow-md transition">
            <mat-card-title class="text-base font-semibold mb-1">
              {{ c.description }}
            </mat-card-title>
            <mat-card-content class="text-sm text-gray-700">
              <span class="font-medium">Status:</span>
<span
  [ngClass]="{
    'text-green-600': c.status === 'active',
    'text-yellow-600': c.status === 'proposed',
    'text-blue-600': c.status === 'completed',
    'text-red-600': c.status === 'cancelled'
  }"
>
  {{ c.status }}
</span>

            </mat-card-content>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `,
})
export class CollaborationsPage implements OnInit {
  partnerId = '';
  desc = '';

  constructor(
    public collabsService: CollaborationsService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.partnerId) {
      await this.collabsService.fetchForPartner(this.partnerId);
    }
  }

  async create() {
    if (!this.desc.trim() || !this.partnerId) return;
    await this.collabsService.create(this.partnerId, { description: this.desc });
    this.desc = '';
  }
}
