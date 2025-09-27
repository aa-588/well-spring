// src/app/features/volunteer/matching.page.ts
import { Component, OnInit } from '@angular/core';
import { MatchingService } from './matching.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-volunteer-matching-page',
    standalone: true,
    imports: [CommonModule, MatButtonModule, FormsModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Matching</h2>

    <div class="mb-3">
      <input placeholder="Case ID" [(ngModel)]="caseId" class="border p-2" />
      <button mat-flat-button color="primary" (click)="load()">Load Candidates</button>
    </div>

    <div *ngFor="let c of matchingService.candidates()">
      <div class="border p-3 mb-2">
        <p><strong>{{ c.donorName }}</strong> (score: {{ c.suitabilityScore | number:'1.0-0' }})</p>
        <button mat-button (click)="assign(c.donorId)">Assign</button>
      </div>
    </div>
  `
})
export class MatchingPage implements OnInit {
    caseId = '';

    constructor(public matchingService: MatchingService) { }

    ngOnInit() { }

    async load() {
        if (!this.caseId.trim()) return;
        await this.matchingService.fetchCandidatesForCase(this.caseId);
    }

    async assign(donorId: string) {
        if (!this.caseId.trim()) return;
        await this.matchingService.assignDonor(this.caseId, donorId, 'Assigned by volunteer');
        // optionally refresh candidates or notify user
    }
}
