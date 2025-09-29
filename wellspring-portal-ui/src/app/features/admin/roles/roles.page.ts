import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { RoleDialogComponent } from './role-dialog.component';

@Component({
  standalone: true,
  selector: 'admin-roles',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatCardModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Roles & Permissions</h1>
        <p class="text-gray-600">
          Define roles and manage their permissions to control user access.
        </p>
      </div>

      <!-- Table Card -->
      <mat-card class="p-6 shadow rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium">Existing Roles</h2>
          <button mat-flat-button color="primary" (click)="create()">
            Create Role
          </button>
        </div>

        <table mat-table [dataSource]="svc.roles()" class="min-w-full border rounded">
          <!-- Role Name -->
          <ng-container matColumnDef="name">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Role
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">{{ r.name }}</td>
          </ng-container>

          <!-- Permissions -->
          <ng-container matColumnDef="permissions">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-gray-50 text-left px-4 py-2"
            >
              Permissions
            </th>
            <td mat-cell *matCellDef="let r" class="px-4 py-2">
              <mat-chip-set>
                <mat-chip
                  *ngFor="let p of r.permissions"
                  color="primary"
                  selected
                  class="mr-1"
                  >{{ p }}</mat-chip
                >
              </mat-chip-set>
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
                <button mat-stroked-button color="primary" (click)="edit(r)">
                  Edit
                </button>
                <button mat-stroked-button color="warn" (click)="remove(r)">
                  Delete
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
              No roles defined yet. Click "Create Role" to add one.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `,
})
export class RolesPage implements OnInit {
  cols = ['name', 'permissions', 'actions'] as const;
  private dialog = inject(MatDialog);

  constructor(public svc: RolesService) { }

  ngOnInit() {
    this.svc.fetch();
  }

  async create() {
    const payload = await this.dialog
      .open(RoleDialogComponent)
      .afterClosed()
      .toPromise();
    if (payload) await this.svc.create(payload);
  }

  async edit(r: Role) {
    const payload = await this.dialog
      .open(RoleDialogComponent, { data: r })
      .afterClosed()
      .toPromise();
    if (payload) await this.svc.update(r.id, payload);
  }

  async remove(r: Role) {
    if (!confirm(`Delete role "${r.name}"?`)) return;
    await this.svc.remove(r.id);
  }
}
