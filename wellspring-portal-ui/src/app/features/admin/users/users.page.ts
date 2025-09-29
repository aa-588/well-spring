import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  standalone: true,
  selector: 'admin-users',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Users</h1>
        <p class="text-gray-600">
          Manage system users, their roles, and account status.
        </p>
      </div>

      <!-- Search + Actions -->
      <mat-card class="p-4 shadow rounded-xl">
        <div class="flex items-center gap-2">
          <mat-form-field class="w-80" appearance="outline">
            <mat-label>Search users</mat-label>
            <input
              matInput
              [(ngModel)]="q"
              (keyup.enter)="search()"
              placeholder="name or email"
            />
          </mat-form-field>
          <button mat-flat-button color="primary" (click)="search()">
            Search
          </button>
          <span class="flex-1"></span>
<button mat-flat-button color="primary" class="flex items-center gap-1">
  Create User
</button>
        </div>
      </mat-card>

      <!-- Users Table -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">User List</h2>
        <table mat-table [dataSource]="rows()" class="min-w-full border rounded">
          <!-- Name -->
          <ng-container matColumnDef="name">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Name
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.name }}
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
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              {{ r.email }}
            </td>
          </ng-container>

          <!-- Roles -->
          <ng-container matColumnDef="roles">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Roles
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              <mat-chip-set>
                <mat-chip
                  *ngFor="let role of r.roles"
                  color="primary"
                  selected
                  class="mr-1"
                  >{{ role }}</mat-chip
                >
              </mat-chip-set>
            </td>
          </ng-container>

          <!-- Status -->
          <ng-container matColumnDef="status">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Status
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                  'bg-green-100 text-green-800': r.status === 'active',
                  'bg-red-100 text-red-800': r.status === 'suspended'
                }"
              >
                {{ r.status }}
              </span>
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 px-4 py-2 text-right"
            ></th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2 text-right">
              <div class="flex gap-2 justify-end">
                <button mat-stroked-button color="primary" (click)="openEdit(r)">
                  Edit
                </button>
                <button
                  mat-stroked-button
                  color="warn"
                  (click)="toggle(r)"
                >
                  {{ r.status === 'active' ? 'Suspend' : 'Activate' }}
                </button>
              </div>
            </td>
          </ng-container>

          <!-- Rows -->
          <tr mat-header-row *matHeaderRowDef="cols"></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: cols"
            class="hover:bg-gray-50"
          ></tr>

          <!-- No Data -->
          <tr class="mat-row" *matNoDataRow>
            <td
              class="mat-cell text-center text-gray-500 py-6"
              [attr.colspan]="cols.length"
            >
              No users found.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `,
})
export class UsersPage implements OnInit {
  cols = ['name', 'email', 'roles', 'status', 'actions'] as const;
  q = '';
  rows: ReturnType<UsersService['rows']> extends () => infer T ? T : any;
  private dialog = inject(MatDialog);

  constructor(private svc: UsersService) { }

  ngOnInit() {
    this.rows = this.svc.rows;
    this.svc.fetch();
  }

  search() {
    this.svc.fetch(this.q);
  }

  async openCreate() {
    const payload = await this.dialog
      .open(UserDialogComponent)
      .afterClosed()
      .toPromise();
    if (payload) await this.svc.create(payload);
  }

  async openEdit(u: User) {
    const payload = await this.dialog
      .open(UserDialogComponent, { data: u })
      .afterClosed()
      .toPromise();
    if (payload) await this.svc.update(u.id, payload);
  }

  toggle(u: User) {
    this.svc
      .toggle(String(u.id), u.status === 'active' ? 'suspended' : 'active')
      .subscribe(() => this.svc.fetch(this.q));
  }
}
