// src/app/features/partner/partners.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PartnersService, Partner } from './partners.service';

@Component({
    standalone: true,
    selector: 'app-partners-page',
    imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Partners</h2>

    <div class="flex gap-2 mb-4">
      <input class="border p-2" placeholder="Name" [(ngModel)]="newPartner.name" />
      <input class="border p-2" placeholder="Org Type" [(ngModel)]="newPartner.orgType" />
      <button mat-flat-button color="primary" (click)="add()">Add</button>
    </div>

    <table mat-table [dataSource]="service.partners()" class="w-full">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let p">{{ p.name }}</td>
      </ng-container>
      <ng-container matColumnDef="orgType">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let p">{{ p.orgType }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let p">
          <button mat-button color="warn" (click)="remove(p._id || p.id!)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['name','orgType','actions']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name','orgType','actions']"></tr>
    </table>
  `
})
export class PartnersPage implements OnInit {
    newPartner: Partial<Partner> = { name: '', orgType: '' };

    constructor(public service: PartnersService) { }

    ngOnInit() { this.service.fetchAll(); }

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
