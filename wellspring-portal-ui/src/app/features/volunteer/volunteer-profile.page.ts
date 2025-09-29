// src/app/features/volunteer/volunteer-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { VolunteerProfileService, VolunteerProfile } from './volunteer-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-volunteer-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Profile</h1>
        <p class="text-gray-600">Update your personal information and volunteering skills.</p>
      </div>

      <!-- Profile Form -->
      <mat-card class="p-6 shadow rounded-xl max-w-2xl">
        <form *ngIf="profile" class="space-y-4">
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="profile.name" name="name" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="profile.email" name="email" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Phone</mat-label>
            <input matInput [(ngModel)]="profile.phone" name="phone" />
          </mat-form-field>

          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Skills (comma separated)</mat-label>
            <input matInput [(ngModel)]="skills" name="skills" />
          </mat-form-field>

          <div class="flex justify-end gap-2">
            <button mat-stroked-button type="button" color="warn" (click)="reset()">Reset</button>
            <button mat-flat-button color="primary" type="button" (click)="save()">Save</button>
          </div>
        </form>

        <div *ngIf="!profile" class="text-gray-500 text-center py-8">
          Loading profile…
        </div>
      </mat-card>
    </div>
  `
})
export class VolunteerProfilePage implements OnInit {
  profile?: VolunteerProfile;
  skills = '';
  currentId = ''; // TODO: from AuthService

  constructor(private profileService: VolunteerProfileService) { }

  async ngOnInit() {
    await this.profileService.fetchAll();
    const first = this.profileService.profiles()[0];
    if (first) {
      this.currentId = first._id || first.id || '';
      this.profile = await this.profileService.fetchById(this.currentId);
      this.skills = (this.profile?.skills || []).join(', ');
    }
  }

  async save() {
    if (!this.profile || !this.currentId) return;
    const payload = {
      ...this.profile,
      skills: this.skills.split(',').map((s) => s.trim()).filter(Boolean)
    };
    await this.profileService.update(this.currentId, payload);
    this.profile = await this.profileService.fetchById(this.currentId);
  }

  async reset() {
    if (!this.currentId) return;
    this.profile = await this.profileService.fetchById(this.currentId);
    this.skills = (this.profile?.skills || []).join(', ');
  }
}
