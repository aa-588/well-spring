// src/app/features/seeker/seekers.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SeekersService, Seeker } from './seekers.service';

@Component({
    standalone: true,
    selector: 'app-seekers-page',
    imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Seekers</h2>

    <div class="flex gap-2 mb-4">
      <input class="border p-2" placeholder="Name" [(ngModel)]="newSeeker.name" />
      <input class="border p-2" placeholder="Phone" [(ngModel)]="newSeeker.phone" />
      <button mat-flat-button color="primary" (click)="add()">Add</button>
    </div>

    <table mat-table [dataSource]="service.seekers()" class="w-full">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let s">{{ s.name }}</td>
      </ng-container>
      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef>Phone</th>
        <td mat-cell *matCellDef="let s">{{ s.phone }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let s">
          <button mat-button color="warn" (click)="remove(s._id || s.id!)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['name','phone','actions']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name','phone','actions']"></tr>
    </table>
  `
})
export class SeekersPage implements OnInit {
    newSeeker: Partial<Seeker> = { name: '', phone: '' };

    constructor(public service: SeekersService) { }

    ngOnInit() { this.service.fetchAll(); }

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
