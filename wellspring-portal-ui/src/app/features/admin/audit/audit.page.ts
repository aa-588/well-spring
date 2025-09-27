import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; // <-- missing import
import { MatButtonModule } from '@angular/material/button';

import { AuditService } from './audit.service';

@Component({
  standalone: true,
  selector: 'admin-audit',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  template: `
    <div class="flex items-center gap-2 mb-4">
      <mat-form-field class="w-80" appearance="outline">
        <mat-label>Search events</mat-label>
        <input
          matInput
          [(ngModel)]="q"
          (keyup.enter)="search()"
          placeholder="actor, action, target"
        />
      </mat-form-field>
      <button mat-flat-button color="primary" (click)="search()" [disabled]="loading()">
        {{ loading() ? 'Searching…' : 'Search' }}
      </button>
    </div>

    <table mat-table [dataSource]="svc.rows()" class="w-full">
      <ng-container matColumnDef="ts">
        <th mat-header-cell *matHeaderCellDef>Time</th>
        <td mat-cell *matCellDef="let r">{{ r.ts | date: 'medium' }}</td>
      </ng-container>

      <ng-container matColumnDef="actor">
        <th mat-header-cell *matHeaderCellDef>Actor</th>
        <td mat-cell *matCellDef="let r">{{ r.actorId }}</td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef>Action</th>
        <td mat-cell *matCellDef="let r">{{ r.action }}</td>
      </ng-container>

      <ng-container matColumnDef="target">
        <th mat-header-cell *matHeaderCellDef>Target</th>
        <td mat-cell *matCellDef="let r">{{ r.target || '-' }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols; trackBy: trackById"></tr>

      <!-- no data state -->
      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell" [attr.colspan]="cols.length">
          {{ q ? 'No results for "' + q + '"' : 'No audit logs yet' }}
        </td>
      </tr>
    </table>
  `,
})
export class AuditPage implements OnInit {
  cols = ['ts', 'actor', 'action', 'target'] as const;
  q = '';
  loading = signal(false);

  constructor(public svc: AuditService) { }

  async ngOnInit() {
    await this.load();
  }

  async search() {
    await this.load(this.q.trim() || undefined);
  }

  async load(q?: string) {
    try {
      this.loading.set(true);
      await this.svc.fetch(q); // fetch returns a Promise in your service
    } finally {
      this.loading.set(false);
    }
  }

  trackById = (_: number, r: { id: string }) => r.id;
}
