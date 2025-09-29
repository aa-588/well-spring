import { Component, OnInit } from '@angular/core';
import { DonorService, Donor } from './donor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Profile</h1>
        <p class="text-gray-600">
          Update your personal details to keep your donor information current.
        </p>
      </div>

      <!-- Profile Form -->
      <mat-card class="p-6 shadow rounded-xl max-w-lg">
        <div *ngIf="profile" class="space-y-4">
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="profile.name" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="profile.email" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="profile.phone" />
          </mat-form-field>

          <!-- Save button -->
          <div class="flex justify-end pt-2">
            <button mat-flat-button color="primary" (click)="save()">Save</button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
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
    alert('Profile updated successfully');
  }
}
