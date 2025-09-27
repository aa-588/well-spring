import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorMatchingService } from './donor-matching.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donor-matching-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule],
  template: `
    <h2 class="text-2xl font-bold mb-4">Suggested Families to Support</h2>

    <div *ngFor="let c of matchingService.candidates()" class="mb-3 p-3 border rounded">
      <p><strong>{{ c.familyName }}</strong> ({{ c.hospital }})</p>
      <p>Need: ₹{{ c.needAmount || 0 }}</p>
      <p>Suitability: {{ c.suitabilityScore || 0 }}%</p>

      <div class="flex gap-2 mt-2">
        <input type="number" [(ngModel)]="pledgeAmounts[c.caseId]" placeholder="Amount" class="border p-2 w-32" />
        <button mat-flat-button color="accent" (click)="pledge(c.caseId)">Pledge Support</button>
      </div>
    </div>
  `
})
export class DonorMatchingPage implements OnInit {
  donorId = 'current-donor-id'; // TODO: replace with AuthService
  pledgeAmounts: Record<string, number> = {};

  constructor(public matchingService: DonorMatchingService) { }

  ngOnInit() {
    this.matchingService.fetchCandidatesForDonor(this.donorId);
  }

  async pledge(caseId: string) {
    const amt = this.pledgeAmounts[caseId] || 0;
    if (!amt) return;
    await this.matchingService.pledgeSupport(this.donorId, caseId, amt);
    alert(`Pledged ₹${amt} to case ${caseId}`);
  }
}
