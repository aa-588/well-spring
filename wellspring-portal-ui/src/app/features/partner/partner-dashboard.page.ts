// src/app/features/partner/partner-dashboard.page.ts
import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PartnersService } from './partners.service';
import { CollaborationsService } from './collaborations.service';

@Component({
  standalone: true,
  selector: 'app-partner-dashboard',
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Partner Dashboard</h1>
        <p class="text-gray-600">
          Overview of your organization profile and active collaborations.
        </p>
      </div>

      <!-- Profile Card -->
      <mat-card *ngIf="currentPartner()" class="p-6 shadow rounded-xl">
        <mat-card-title class="text-lg font-medium mb-2">
          {{ currentPartner()?.name }}
        </mat-card-title>
        <mat-card-content class="space-y-2 text-gray-700">
          <p><span class="font-medium">Type:</span> {{ currentPartner()?.orgType }}</p>
          <p><span class="font-medium">Email:</span> {{ currentPartner()?.email }}</p>
          <p><span class="font-medium">Phone:</span> {{ currentPartner()?.phone }}</p>
        </mat-card-content>
      </mat-card>

      <!-- Collaborations Card -->
      <mat-card class="p-6 shadow rounded-xl">
        <mat-card-title class="text-lg font-medium mb-4">Collaborations</mat-card-title>
        <mat-card-content class="space-y-3">
          <div
            *ngIf="collabsService.collabs().length === 0"
            class="text-gray-500 text-center py-6"
          >
            No collaborations yet. Browse cases to start collaborating.
          </div>

          <div
            *ngFor="let c of collabsService.collabs()"
            class="p-3 border rounded hover:bg-gray-50 transition"
          >
            <p class="font-medium text-gray-800">{{ c.description }}</p>
            <p class="text-sm text-gray-600">
              Status:
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

            </p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class PartnerDashboardPage implements OnInit {
  currentPartnerId = signal<string>('');

  constructor(
    public partnersService: PartnersService,
    public collabsService: CollaborationsService
  ) { }

  async ngOnInit() {
    await this.partnersService.fetchAll();
    const first = this.partnersService.partners()[0];
    if (first) {
      this.currentPartnerId.set(first._id || first.id || '');
      await this.collabsService.fetchForPartner(this.currentPartnerId());
    }
  }

  currentPartner = computed(() =>
    this.partnersService
      .partners()
      .find(
        (p) =>
          p._id === this.currentPartnerId() || p.id === this.currentPartnerId()
      )
  );
}
