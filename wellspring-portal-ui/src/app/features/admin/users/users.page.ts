import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  standalone: true,
  selector: 'admin-users',
  imports: [CommonModule, FormsModule, MatTableModule, MatInputModule, MatButtonModule, MatChipsModule, MatIconModule, MatDialogModule],
  template: `
    <div class="flex items-center gap-2 mb-4">
      <mat-form-field class="w-80" appearance="outline">
        <mat-label>Search users</mat-label>
        <input matInput [(ngModel)]="q" (keyup.enter)="search()" placeholder="name or email" />
      </mat-form-field>
      <button mat-flat-button color="primary" (click)="search()">Search</button>
      <span class="flex-1"></span>
      <button mat-stroked-button (click)="openCreate()">Create user</button>
    </div>

    <table mat-table [dataSource]="rows()">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let r">{{ r.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let r">{{ r.email }}</td>
      </ng-container>

      <ng-container matColumnDef="roles">
        <th mat-header-cell *matHeaderCellDef>Roles</th>
        <td mat-cell *matCellDef="let r">
          <mat-chip-set>
            <mat-chip *ngFor="let role of r.roles" disableRipple>{{ role }}</mat-chip>
          </mat-chip-set>
        </td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let r">{{ r.status }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let r" class="text-right">
          <button mat-button (click)="openEdit(r)">Edit</button>
          <button mat-button color="warn" (click)="toggle(r)">
            {{ r.status === 'active' ? 'Suspend' : 'Activate' }}
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  `
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
  search() { this.svc.fetch(this.q); }

  async openCreate() {
    const payload = await this.dialog.open(UserDialogComponent).afterClosed().toPromise();
    if (payload) await this.svc.create(payload);
  }

  async openEdit(u: User) {
    const payload = await this.dialog.open(UserDialogComponent, { data: u }).afterClosed().toPromise();
    if (payload) await this.svc.update(u.id, payload);
  }

  toggle(u: User) {
    this.svc.toggle(String(u.id), u.status === 'active' ? 'suspended' : 'active')
      .subscribe(() => this.svc.fetch(this.q));
  }
}
