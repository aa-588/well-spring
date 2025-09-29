// src/app/features/volunteer/case-details.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CasesService, CaseRecord } from './cases.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-case-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="space-y-6" *ngIf="caseRecord">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">
          Case: {{ caseRecord.familyName }}
        </h1>
        <p class="text-gray-600">Detailed information and updates about this case.</p>
      </div>

      <!-- Case Details -->
      <mat-card class="p-6 shadow rounded-xl">
        <mat-card-title class="text-lg font-medium mb-2">Details</mat-card-title>
        <mat-card-content class="space-y-2 text-gray-700">
          <p><strong>Hospital:</strong> {{ caseRecord.hospital }}</p>
          <p><strong>Doctor:</strong> {{ caseRecord.doctor }}</p>
          <p>
            <strong>Status:</strong>
            <span
              class="px-2 py-1 rounded text-xs font-medium"
              [ngClass]="{
                'bg-green-100 text-green-800': caseRecord.status === 'active',
                'bg-yellow-100 text-yellow-800': caseRecord.status === 'on-hold',
                'bg-red-100 text-red-800': caseRecord.status === 'closed'
              }"
            >
              {{ caseRecord.status }}
            </span>
          </p>
          <p><strong>Next Step:</strong> {{ caseRecord.nextStep || '-' }}</p>
        </mat-card-content>
      </mat-card>

      <!-- Case Documents -->
      <mat-card class="p-6 shadow rounded-xl">
        <mat-card-title class="text-lg font-medium mb-2">Documents</mat-card-title>
        <mat-card-content>
          <p class="text-gray-600 mb-3">
            No documents UI yet. In future this will show attachments with preview/download.
          </p>
          <input type="file" (change)="onUpload($any($event).target.files)" />
        </mat-card-content>
      </mat-card>

      <!-- Add Note -->
      <mat-card class="p-6 shadow rounded-xl">
        <mat-card-title class="text-lg font-medium mb-2">Add Note</mat-card-title>
        <mat-card-content class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Note</mat-label>
            <textarea
              matInput
              rows="3"
              [(ngModel)]="note"
              placeholder="Write a note for this case..."
            ></textarea>
          </mat-form-field>

          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              (click)="addNote()"
              [disabled]="!note.trim()"
            >
              Add Note
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class CaseDetailsPage implements OnInit {
  caseId = '';
  caseRecord?: CaseRecord;
  note = '';

  constructor(
    private route: ActivatedRoute,
    private casesService: CasesService
  ) { }

  async ngOnInit() {
    this.caseId = this.route.snapshot.paramMap.get('id') || '';
    if (this.caseId) {
      this.caseRecord = await this.casesService.fetchById(this.caseId);
    }
  }

  onUpload(files: FileList) {
    if (!files || files.length === 0) return;
    const f = files[0];
    // TODO: implement upload (multipart) to backend and attach to case
    console.log('upload placeholder', f.name);
  }

  async addNote() {
    if (!this.note.trim()) return;
    await this.casesService.update(this.caseId, { nextStep: this.note });
    this.caseRecord = await this.casesService.fetchById(this.caseId);
    this.note = '';
  }
}
