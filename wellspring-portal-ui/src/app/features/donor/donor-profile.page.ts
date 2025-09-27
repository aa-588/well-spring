import { Component, OnInit } from '@angular/core';
import { DonorService, Donor } from './donor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  template: `
    <h2 class="text-xl font-bold mb-4">My Profile</h2>

    <div *ngIf="profile">
      <div class="mb-3">
        <input matInput placeholder="Name" [(ngModel)]="profile.name" />
      </div>
      <div class="mb-3">
        <input matInput placeholder="Email" [(ngModel)]="profile.email" />
      </div>
      <div class="mb-3">
        <input matInput placeholder="Phone" [(ngModel)]="profile.phone" />
      </div>

      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `
})
export class DonorProfilePage implements OnInit {
  profile?: Donor;
  currentId = '';

  constructor(private donorService: DonorService) { }

  async ngOnInit() {
    await this.donorService.fetchAll();
    const first = this.donorService.donors()[0];
    if (first) {
      this.currentId = first._id || first.id || '';
      this.profile = await this.donorService.fetchById(this.currentId);
    }
  }

  async save() {
    if (!this.profile || !this.currentId) return;
    await this.donorService.update(this.currentId, this.profile);
  }
}
