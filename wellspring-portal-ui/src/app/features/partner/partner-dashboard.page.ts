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
    <h2 class="text-2xl font-bold mb-4">Partner Dashboard</h2>

    <div *ngIf="currentPartner()">
      <mat-card>
        <mat-card-title>{{ currentPartner()?.name }}</mat-card-title>
        <mat-card-content>
          <p>Type: {{ currentPartner()?.orgType }}</p>
          <p>Email: {{ currentPartner()?.email }}</p>
          <p>Phone: {{ currentPartner()?.phone }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="mt-4">
        <mat-card-title>Collaborations</mat-card-title>
        <mat-card-content>
          <div *ngFor="let c of collabsService.collabs()">
            <p>{{ c.description }} — {{ c.status }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PartnerDashboardPage implements OnInit {
    currentPartnerId = signal<string>('');

    constructor(public partnersService: PartnersService, public collabsService: CollaborationsService) { }

    async ngOnInit() {
        await this.partnersService.fetchAll();
        const first = this.partnersService.partners()[0];
        if (first) {
            this.currentPartnerId.set(first._id || first.id || '');
            await this.collabsService.fetchForPartner(this.currentPartnerId());
        }
    }

    currentPartner = computed(() =>
        this.partnersService.partners().find(p => p._id === this.currentPartnerId() || p.id === this.currentPartnerId())
    );
}
