// src/app/features/partner/partner-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnersService, Partner } from './partners.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-partner-profile-page',
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
          Update your organization’s details to keep your profile current.
        </p>
      </div>

      <!-- Profile Form -->
      <mat-card class="p-6 shadow rounded-xl max-w-lg">
        <div *ngIf="model" class="space-y-4">
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Organization Name</mat-label>
            <input matInput [(ngModel)]="model.name" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Contact Person</mat-label>
            <input matInput [(ngModel)]="model.contactPerson" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="model.email" />
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
export class PartnerProfilePage implements OnInit {
    currentId = '';
    model?: Partner;

    constructor(private service: PartnersService) { }

    async ngOnInit() {
        await this.service.fetchAll();
        const first = this.service.partners()[0];
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
