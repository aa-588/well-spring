// src/app/features/seeker/seeker-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { SeekerCasesService } from './seeker-cases.service';

@Component({
    standalone: true,
    selector: 'app-seeker-cases-page',
    imports: [CommonModule, FormsModule, MatCardModule],
    template: `
    <h2 class="text-xl font-bold mb-4">My Cases</h2>

    <div class="flex gap-2 mb-4">
      <input class="border p-2" placeholder="Family name" [(ngModel)]="familyName" />
      <input class="border p-2" placeholder="Hospital" [(ngModel)]="hospital" />
      <button class="border px-3 py-2" (click)="create()">Create Case</button>
    </div>

    <div *ngFor="let c of casesService.cases()" class="mb-3">
      <mat-card>
        <mat-card-title>{{ c.familyName }}</mat-card-title>
        <mat-card-content>
          <p>Hospital: {{ c.hospital || '-' }}</p>
          <p>Status: {{ c.status }}</p>
          <p>Next: {{ c.nextStep || '-' }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class SeekerCasesPage implements OnInit {
    seekerId = '';
    familyName = '';
    hospital = '';

    constructor(public casesService: SeekerCasesService, private route: ActivatedRoute) { }

    async ngOnInit() {
        this.seekerId = this.route.snapshot.paramMap.get('id') || '';
        if (this.seekerId) await this.casesService.fetchForSeeker(this.seekerId);
    }

    async create() {
        if (!this.seekerId || !this.familyName.trim()) return;
        await this.casesService.create(this.seekerId, { familyName: this.familyName, hospital: this.hospital });
        this.familyName = ''; this.hospital = '';
    }
}
