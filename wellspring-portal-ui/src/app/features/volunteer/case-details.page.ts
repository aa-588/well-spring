// src/app/features/volunteer/case-details.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CasesService, CaseRecord } from './cases.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-case-details-page',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
    template: `
    <ng-container *ngIf="caseRecord">
      <h2 class="text-xl font-bold mb-4">Case: {{ caseRecord.familyName }}</h2>

      <mat-card class="mb-4">
        <mat-card-title>Details</mat-card-title>
        <mat-card-content>
          <p><strong>Hospital:</strong> {{ caseRecord.hospital }}</p>
          <p><strong>Doctor:</strong> {{ caseRecord.doctor }}</p>
          <p><strong>Status:</strong> {{ caseRecord.status }}</p>
          <p><strong>Next Step:</strong> {{ caseRecord.nextStep }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card class="mb-4">
        <mat-card-title>Documents</mat-card-title>
        <mat-card-content>
          <!-- TODO: actual doc list -->
          <p>No documents UI yet. In future show attachments with preview/download</p>
          <!-- simple upload placeholder -->
          <input type="file" (change)="onUpload($any($event).target.files)" />
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Add Note</mat-card-title>
        <mat-card-content>
          <textarea [(ngModel)]="note" rows="3" class="w-full border p-2 mb-2"></textarea>
          <button mat-flat-button color="primary" (click)="addNote()">Add Note</button>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `
})
export class CaseDetailsPage implements OnInit {
    caseId = '';
    caseRecord?: CaseRecord;
    note = '';

    constructor(private route: ActivatedRoute, private casesService: CasesService) { }

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
        // append note to case via API (minimal implementation: update nextStep or logs)
        await this.casesService.update(this.caseId, { nextStep: this.note });
        // refetch
        this.caseRecord = await this.casesService.fetchById(this.caseId);
        this.note = '';
    }
}
