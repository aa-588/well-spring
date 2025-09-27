// src/app/features/volunteer/volunteer-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesService, CaseRecord } from './cases.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-volunteer-cases-page',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule, RouterModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Assigned Cases</h2>

    <div *ngFor="let c of casesService.cases()" class="mb-3">
      <mat-card>
        <mat-card-title>{{ c.familyName }} <small class="ml-2 text-gray-500">#{{ c.caseCode }}</small></mat-card-title>
        <mat-card-content>
          <p><strong>Hospital:</strong> {{ c.hospital || '-' }}</p>
          <p><strong>Status:</strong> {{ c.status || '-' }}</p>
          <p><strong>Next:</strong> {{ c.nextStep || '-' }}</p>
        </mat-card-content>
        <mat-card-actions>
          <a [routerLink]="['/volunteer/cases', c._id || c.id]" mat-button>View</a>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class VolunteerCasesPage implements OnInit {
    constructor(public casesService: CasesService) { }

    ngOnInit() {
        this.casesService.fetchAll();
    }
}
