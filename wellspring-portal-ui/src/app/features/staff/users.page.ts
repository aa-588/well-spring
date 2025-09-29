// src/app/features/staff/staff-users.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from '../admin/users/users.service';

@Component({
  standalone: true,
  selector: 'staff-users',
  imports: [CommonModule, MatTableModule, MatCardModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Users</h1>
        <p class="text-gray-600">View-only list of registered users.</p>
      </div>

      <!-- Users Table -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Registered Users</h2>

        <table
          mat-table
          [dataSource]="rows"
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
            <td mat-cell *matCellDef="let u" class="px-4 py-2">
              {{ u.name }}
            </td>
          </ng-container>

          <!-- Email -->
          <ng-container matColumnDef="email">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Email
            </th>
            <td mat-cell *matCellDef="let u" class="px-4 py-2">
              {{ u.email }}
            </td>
          </ng-container>

          <!-- Rows -->
          <tr
            mat-header-row
            *matHeaderRowDef="cols"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: cols"
            class="hover:bg-gray-50"
          ></tr>

          <!-- No Data -->
          <tr class="mat-row" *matNoDataRow>
            <td colspan="2" class="mat-cell text-center text-gray-500 py-6">
              No users available.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `
})
export class StaffUsersPage implements OnInit {
  cols = ['name', 'email'] as const;
  rows: any[] = [];

  constructor(private svc: UsersService) { }

  ngOnInit() {
    this.svc.fetch().then(() => (this.rows = this.svc.rows()));
  }
}
