// src/app/features/volunteer/volunteer-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { VolunteerProfileService, VolunteerProfile } from './volunteer-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-volunteer-profile-page',
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
      <div class="mb-3">
        <input matInput placeholder="Skills (comma separated)" [(ngModel)]="skills" />
      </div>

      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `
})
export class VolunteerProfilePage implements OnInit {
    profile?: VolunteerProfile;
    skills = '';

    // TODO: get current id from AuthService
    currentId = '';

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
        const payload = { ...this.profile, skills: this.skills.split(',').map(s => s.trim()).filter(Boolean) };
        await this.profileService.update(this.currentId, payload);
        // refresh
        this.profile = await this.profileService.fetchById(this.currentId);
    }
}
