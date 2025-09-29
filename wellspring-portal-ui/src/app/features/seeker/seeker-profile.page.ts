// src/app/features/seeker/seeker-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeekersService, Seeker } from './seekers.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-seeker-profile-page',
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
          Update your personal details to keep your seeker information current.
        </p>
      </div>

      <!-- Profile Form -->
      <mat-card class="p-6 shadow rounded-xl max-w-lg">
        <div *ngIf="model" class="space-y-4">
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="model.name" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="model.phone" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>City</mat-label>
            <input matInput [(ngModel)]="model.city" />
          </mat-form-field>

          <!-- Save button -->
          <div class="flex justify-end pt-2">
            <button mat-flat-button color="primary" (click)="save()">
              Save
            </button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
})
export class SeekerProfilePage implements OnInit {
    currentId = '';
    model?: Seeker;

    constructor(private service: SeekersService) { }

    async ngOnInit() {
        await this.service.fetchAll();
        const first = this.service.seekers()[0];
        if (first) {
            this.currentId = first._id || first.id || '';
            this.model = await this.service.fetchById(this.currentId);
        }
    }

    async save() {
        if (this.currentId && this.model) {
            await this.service.update(this.currentId, this.model);
            alert('Profile updated successfully');
        }
    }
}
