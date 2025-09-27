import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { RoleDialogComponent } from './role-dialog.component';

@Component({
  standalone: true,
  selector: 'admin-roles',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatChipsModule, MatDialogModule],
  template: `
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">Roles & Permissions</h2>
      <button mat-stroked-button (click)="create()">Create role</button>
    </div>

    <table mat-table [dataSource]="svc.roles()">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Role</th>
        <td mat-cell *matCellDef="let r">{{ r.name }}</td>
      </ng-container>

      <ng-container matColumnDef="permissions">
        <th mat-header-cell *matHeaderCellDef>Permissions</th>
        <td mat-cell *matCellDef="let r">
          <mat-chip-set>
            <mat-chip *ngFor="let p of r.permissions">{{ p }}</mat-chip>
          </mat-chip-set>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let r" class="text-right">
          <button mat-button (click)="edit(r)">Edit</button>
          <button mat-button color="warn" (click)="remove(r)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  `
})
export class RolesPage implements OnInit {
  cols = ['name', 'permissions', 'actions'] as const;
  private dialog = inject(MatDialog);

  constructor(public svc: RolesService) { }
  ngOnInit() { this.svc.fetch(); }

  async create() {
    const payload = await this.dialog.open(RoleDialogComponent).afterClosed().toPromise();
    if (payload) await this.svc.create(payload);
  }

  async edit(r: Role) {
    const payload = await this.dialog.open(RoleDialogComponent, { data: r }).afterClosed().toPromise();
    if (payload) await this.svc.update(r.id, payload);
  }

  async remove(r: Role) {
    if (!confirm(`Delete role "${r.name}"?`)) return;
    await this.svc.remove(r.id);
  }
}
