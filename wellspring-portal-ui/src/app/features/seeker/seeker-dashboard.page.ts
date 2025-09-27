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
    <h2 class="text-2xl font-bold mb-4">Seeker Dashboard</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <mat-card *ngIf="currentSeeker()">
        <mat-card-title>Profile</mat-card-title>
        <mat-card-content>
          <p><strong>{{ currentSeeker()?.name }}</strong></p>
          <p>{{ currentSeeker()?.phone }} · {{ currentSeeker()?.city }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>My Cases</mat-card-title>
        <mat-card-content>
          <div *ngFor="let c of casesService.cases()">
            <p><strong>{{ c.familyName }}</strong> — {{ c.status }}</p>
            <small>Next: {{ c.nextStep || '-' }}</small>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class SeekerDashboardPage implements OnInit {
    currentSeekerId = signal<string>('');

    constructor(public seekersService: SeekersService, public casesService: SeekerCasesService) { }

    async ngOnInit() {
        await this.seekersService.fetchAll();
        const first = this.seekersService.seekers()[0];
        if (first) {
            this.currentSeekerId.set(first._id || first.id || '');
            await this.casesService.fetchForSeeker(this.currentSeekerId());
        }
    }

    currentSeeker = computed(() =>
        this.seekersService.seekers().find(s => s._id === this.currentSeekerId() || s.id === this.currentSeekerId())
    );
}
