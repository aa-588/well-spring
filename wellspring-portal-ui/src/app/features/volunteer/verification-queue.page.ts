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
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Verification Queue</h1>
        <p class="text-gray-600">Review and approve/reject pending verifications.</p>
      </div>

      <!-- Empty state -->
      <div
        *ngIf="verificationService.items().length === 0"
        class="text-gray-500 text-center py-8 border rounded bg-gray-50"
      >
        No pending verifications.
      </div>

      <!-- Verification Items -->
      <div *ngFor="let it of verificationService.items()" class="mb-3">
        <mat-card class="p-6 shadow rounded-xl">
          <mat-card-title class="text-lg font-medium mb-2">
            Case: {{ it.caseId }}
          </mat-card-title>

          <mat-card-content class="space-y-2 text-gray-700">
            <p><strong>Type:</strong> {{ it.type }}</p>
            <p><strong>Uploaded by:</strong> {{ it.uploadedBy || '-' }}</p>
            <p>
              <strong>Status:</strong>
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                  'bg-yellow-100 text-yellow-800': (it.status ?? 'pending') === 'pending',
                  'bg-green-100 text-green-800': (it.status ?? '') === 'approved',
                  'bg-red-100 text-red-800': (it.status ?? '') === 'rejected'
                }"
              >
                {{ it.status ?? 'pending' }}
              </span>
            </p>
          </mat-card-content>

          <mat-card-actions class="flex justify-end gap-2 mt-4">
            <button
              mat-stroked-button
              color="primary"
              (click)="approve(it)"
              [disabled]="(it.status ?? 'pending') !== 'pending'"
            >
              Approve
            </button>
            <button
              mat-stroked-button
              color="warn"
              (click)="reject(it)"
              [disabled]="(it.status ?? 'pending') !== 'pending'"
            >
              Reject
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
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
    await this.verificationService.fetchPending(); // refresh
  }

  async reject(it: VerificationItem) {
    await this.verificationService.reject(it._id || it.id!);
    await this.verificationService.fetchPending(); // refresh
  }
}
