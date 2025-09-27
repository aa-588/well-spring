// src/app/features/partner/collaborations.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CollaborationsService } from './collaborations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-collaborations-page',
  imports: [CommonModule, FormsModule, MatCardModule],
  template: `
    <h2 class="text-xl font-bold mb-4">Collaborations</h2>

    <div class="flex gap-2 mb-4">
      <input class="border p-2" placeholder="Description" [(ngModel)]="desc" />
      <button class="border px-3 py-2" (click)="create()">Create</button>
    </div>

    <div *ngFor="let c of collabsService.collabs()" class="mb-3">
      <mat-card>
        <mat-card-title>{{ c.description }}</mat-card-title>
        <mat-card-content>Status: {{ c.status }}</mat-card-content>
      </mat-card>
    </div>
  `
})
export class CollaborationsPage implements OnInit {
  partnerId = '';
  desc = '';

  constructor(public collabsService: CollaborationsService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.partnerId) await this.collabsService.fetchForPartner(this.partnerId);
  }

  async create() {
    if (!this.desc.trim() || !this.partnerId) return;
    await this.collabsService.create(this.partnerId, { description: this.desc });
    this.desc = '';
  }
}
