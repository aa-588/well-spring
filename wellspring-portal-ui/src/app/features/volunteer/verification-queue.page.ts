// src/app/features/volunteer/verification-queue.page.ts
import { Component, OnInit } from '@angular/core';
import { VerificationService, VerificationItem } from './verification.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-verification-queue-page',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Verification Queue</h2>

    <div *ngFor="let it of verificationService.items()" class="mb-3">
      <mat-card>
        <mat-card-title>Case: {{ it.caseId }}</mat-card-title>
        <mat-card-content>
          <p>Type: {{ it.type }}</p>
          <p>Uploaded by: {{ it.uploadedBy }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="approve(it)">Approve</button>
          <button mat-button color="warn" (click)="reject(it)">Reject</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class VerificationQueuePage implements OnInit {
    constructor(public verificationService: VerificationService) { }

    ngOnInit() {
        this.verificationService.fetchPending();
    }

    async approve(it: VerificationItem) {
        await this.verificationService.approve(it._id || it.id!);
    }

    async reject(it: VerificationItem) {
        await this.verificationService.reject(it._id || it.id!);
    }
}
