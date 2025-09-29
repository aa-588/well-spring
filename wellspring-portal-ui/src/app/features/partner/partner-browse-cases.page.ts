// src/app/features/partner/partner-browse-cases.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaborationsService } from './collaborations.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-partner-browse-cases',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Available Cases</h1>
        <p class="text-gray-600">
          Browse and request to collaborate on cases that need partner support.
        </p>
      </div>

      <!-- Empty State -->
      <div
        *ngIf="collabsService.availableCases().length === 0"
        class="text-gray-500 text-center py-6"
      >
        No cases are currently available for collaboration.
      </div>

      <!-- Case List -->
      <div *ngFor="let c of collabsService.availableCases()" class="mb-4">
        <mat-card
          class="p-6 shadow rounded-xl hover:shadow-md transition"
        >
          <mat-card-title class="text-lg font-medium mb-2">
            {{ c.familyName }}
          </mat-card-title>
          <mat-card-content class="space-y-2 text-gray-700">
            <p><span class="font-medium">Hospital:</span> {{ c.hospital || '-' }}</p>
            <p>
              <span class="font-medium">Status:</span>
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-800': c.status === 'open',
                  'bg-yellow-100 text-yellow-800': c.status === 'in-progress',
                  'bg-gray-200 text-gray-700': c.status === 'closed'
                }"
              >
                {{ c.status }}
              </span>
            </p>

            <!-- Note Input -->
            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Note</mat-label>
              <input
                matInput
                [(ngModel)]="joinNotes[c.id!]"
                placeholder="Add a note to your request"
              />
            </mat-form-field>

            <!-- Actions -->
            <div class="flex justify-end pt-2">
              <button
                mat-flat-button
                color="primary"
                (click)="joinCase(c.id!)"
              >
                Request Collaboration
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
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