import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsService } from './donations.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-donor-donations',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2 class="text-xl font-bold mb-4">Donation History</h2>

    <table mat-table [dataSource]="donationsService.donations()" class="w-full">
      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef>Amount</th>
        <td mat-cell *matCellDef="let d">₹{{ d.amount }}</td>
      </ng-container>

      <ng-container matColumnDef="caseId">
        <th mat-header-cell *matHeaderCellDef>Case</th>
        <td mat-cell *matCellDef="let d">{{ d.caseId }}</td>
      </ng-container>

      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let d">{{ d.date | date:'short' }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['amount','caseId','date']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['amount','caseId','date']"></tr>
    </table>
  `
})
export class DonorDonationsPage implements OnInit {
  constructor(public donationsService: DonationsService) { }

  ngOnInit() {
    this.donationsService.fetchByDonor('current-donor-id'); // TODO: replace with AuthService
  }
}
