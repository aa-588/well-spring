// src/app/features/partner/partners.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PartnersService, Partner } from './partners.service';

@Component({
  standalone: true,
  selector: 'app-partners-page',
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
        <h1 class="text-2xl font-semibold text-gray-800">Partners</h1>
        <p class="text-gray-600">
          Manage all partner organizations collaborating with Wellspring.
        </p>
      </div>

      <!-- Add Partner -->
      <mat-card class="p-6 shadow rounded-xl max-w-3xl">
        <h2 class="text-lg font-medium mb-4">Add New Partner</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="newPartner.name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Organization Type</mat-label>
            <input matInput [(ngModel)]="newPartner.orgType" />
          </mat-form-field>

          <div class="flex justify-end">
            <button
              mat-flat-button
              color="primary"
              (click)="add()"
              [disabled]="!newPartner.name?.trim()"
            >
              Add
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Partners List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Partners</h2>

        <table
          mat-table
          [dataSource]="service.partners()"
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
            <td mat-cell *matCellDef="let p" class="px-4 py-2">{{ p.name }}</td>
          </ng-container>

          <!-- Type -->
          <ng-container matColumnDef="orgType">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Type
            </th>
            <td mat-cell *matCellDef="let p" class="px-4 py-2">
              {{ p.orgType }}
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 px-4 py-2 text-right"
            ></th>
            <td mat-cell *matCellDef="let p" class="px-4 py-2 text-right">
              <button
                mat-stroked-button
                color="warn"
                (click)="remove(p._id || p.id!)"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <!-- Rows -->
          <tr mat-header-row *matHeaderRowDef="['name','orgType','actions']"></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: ['name','orgType','actions']"
            class="hover:bg-gray-50"
          ></tr>

          <!-- No Data -->
          <tr class="mat-row" *matNoDataRow>
            <td
              class="mat-cell text-center text-gray-500 py-6"
              colspan="3"
            >
              No partners added yet.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `,
})
export class PartnersPage implements OnInit {
  newPartner: Partial<Partner> = { name: '', orgType: '' };

  constructor(public service: PartnersService) { }

  ngOnInit() {
    this.service.fetchAll();
  }

  async add() {
    if (this.newPartner.name?.trim()) {
      await this.service.create(this.newPartner);
      this.newPartner = { name: '', orgType: '' };
    }
  }

  async remove(id: string) {
    await this.service.remove(id);
  }
}
