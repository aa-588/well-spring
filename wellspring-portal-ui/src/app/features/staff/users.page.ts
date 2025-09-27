import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../admin/users/users.service';

@Component({
    standalone: true,
    selector: 'staff-users',
    imports: [CommonModule, MatTableModule],
    template: `
    <h2>Users (view only)</h2>
    <table mat-table [dataSource]="rows" class="w-full">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let u">{{ u.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let u">{{ u.email }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  `
})
export class StaffUsersPage implements OnInit {
    cols = ['name', 'email'] as const;
    rows: any[] = [];
    constructor(private svc: UsersService) { }
    ngOnInit() {
        this.svc.fetch().then(() => this.rows = this.svc.rows());
    }
}
