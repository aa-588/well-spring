// src/app/features/partner/partner-browse-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaborationsService } from './collaborations.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'app-partner-browse-cases',
    imports: [CommonModule, FormsModule, MatButtonModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Available Cases</h2>

    <div *ngFor="let c of collabsService.availableCases()" class="mb-4 border p-4 rounded">
      <h3 class="font-semibold">{{ c.familyName }}</h3>
      <p>Hospital: {{ c.hospital || '-' }}</p>
      <p>Status: {{ c.status }}</p>

      <input [(ngModel)]="joinNotes[c.id!]" placeholder="Add note" class="border p-2 w-full mb-2" />

      <button mat-flat-button color="primary" (click)="joinCase(c.id!)">
        Request Collaboration
      </button>
    </div>
  `
})
export class PartnerBrowseCasesPage implements OnInit {
    partnerId = 'current-partner-id'; // TODO: replace with AuthService/session
    joinNotes: Record<string, string> = {};

    constructor(public collabsService: CollaborationsService) { }

    ngOnInit() {
        this.collabsService.fetchAvailableCases(this.partnerId);
    }

    async joinCase(caseId: string) {
        const note = this.joinNotes[caseId];
        await this.collabsService.joinCase(this.partnerId, caseId, note);
        await this.collabsService.fetchAvailableCases(this.partnerId);
    }
}
