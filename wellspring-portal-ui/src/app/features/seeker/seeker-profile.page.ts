// src/app/features/seeker/seeker-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeekersService, Seeker } from './seekers.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    standalone: true,
    selector: 'app-seeker-profile-page',
    imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
    template: `
    <h2 class="text-xl font-bold mb-4">My Profile</h2>

    <div *ngIf="model">
      <input matInput class="mb-2" placeholder="Name" [(ngModel)]="model.name" />
      <input matInput class="mb-2" placeholder="Phone" [(ngModel)]="model.phone" />
      <input matInput class="mb-2" placeholder="City" [(ngModel)]="model.city" />
      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `
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
        }
    }
}
