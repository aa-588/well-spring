import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Audit Logs</h1>
        <p class="text-gray-600">Track system events for accountability and compliance.</p>
      </div>

      <!-- Search -->
      <div class="flex items-center gap-2">
        <mat-form-field class="w-80" appearance="outline">
          <mat-label>Search events</mat-label>
          <input
            matInput
            [(ngModel)]="q"
            (keyup.enter)="search()"
            placeholder="actor, action, target"
          />
        </mat-form-field>
        <button
          mat-flat-button
          color="primary"
          (click)="search()"
          [disabled]="loading()"
        >
          {{ loading() ? 'Searching…' : 'Search' }}
        </button>
      </div>

      <!-- Audit Table -->
      <mat-card class="p-4 shadow rounded-xl">
        <table
          mat-table
          [dataSource]="svc.rows()"
          class="min-w-full border rounded"
        >
          <!-- Time -->
          <ng-container matColumnDef="ts">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Time
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.ts | date: 'medium' }}
            </td>
          </ng-container>

          <!-- Actor -->
          <ng-container matColumnDef="actor">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Actor
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.actorId }}
            </td>
          </ng-container>

          <!-- Action -->
          <ng-container matColumnDef="action">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Action
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.action }}
            </td>
          </ng-container>

          <!-- Target -->
          <ng-container matColumnDef="target">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Target
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.target || '-' }}
            </td>
          </ng-container>

          <!-- Rows -->
          <tr mat-header-row *matHeaderRowDef="cols"></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: cols; trackBy: trackById"
            class="hover:bg-gray-50"
          ></tr>

          <!-- No data -->
          <tr class="mat-row" *matNoDataRow>
            <td
              class="mat-cell text-center text-gray-500 py-6"
              [attr.colspan]="cols.length"
            >
              {{ q ? 'No results for "' + q + '"' : 'No audit logs yet' }}
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
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
      await this.svc.fetch(q);
    } finally {
      this.loading.set(false);
    }
  }

  trackById = (_: number, r: { id: string }) => r.id;
}
