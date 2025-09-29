// src/app/features/seeker/seekers.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SeekersService, Seeker } from './seekers.service';

@Component({
  standalone: true,
  selector: 'app-seekers-page',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Seekers</h1>
        <p class="text-gray-600">
          Manage seeker profiles who are requesting assistance.
        </p>
      </div>

      <!-- Add Seeker -->
      <mat-card class="p-6 shadow rounded-xl max-w-3xl">
        <h2 class="text-lg font-medium mb-4">Add New Seeker</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="newSeeker.name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="newSeeker.phone" />
          </mat-form-field>

          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              (click)="add()"
              [disabled]="!newSeeker.name?.trim()"
            >
              Add
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Seekers List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Seekers</h2>

        <table
          mat-table
          [dataSource]="service.seekers()"
          class="min-w-full border rounded"
        >
          <!-- Name -->
          <ng-container matColumnDef="name">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Name
            </th>
            <td mat-cell *matCellDef="let s" class="px-4 py-2">
              {{ s.name }}
            </td>
          </ng-container>

          <!-- Phone -->
          <ng-container matColumnDef="phone">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Phone
            </th>
            <td mat-cell *matCellDef="let s" class="px-4 py-2">
              {{ s.phone }}
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 px-4 py-2 text-right"
            ></th>
            <td mat-cell *matCellDef="let s" class="px-4 py-2 text-right">
              <button
                mat-stroked-button
                color="warn"
                (click)="remove(s._id || s.id!)"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <!-- Rows -->
          <tr
            mat-header-row
            *matHeaderRowDef="['name','phone','actions']"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: ['name','phone','actions']"
            class="hover:bg-gray-50"
          ></tr>

          <!-- No Data -->
          <tr class="mat-row" *matNoDataRow>
            <td
              class="mat-cell text-center text-gray-500 py-6"
              colspan="3"
            >
              No seekers added yet.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `,
})
export class SeekersPage implements OnInit {
  newSeeker: Partial<Seeker> = { name: '', phone: '' };

  constructor(public service: SeekersService) { }

  ngOnInit() {
    this.service.fetchAll();
  }

  async add() {
    if (this.newSeeker.name?.trim()) {
      await this.service.create(this.newSeeker);
      this.newSeeker = { name: '', phone: '' };
    }
  }

  async remove(id: string) {
    await this.service.remove(id);
  }
}
