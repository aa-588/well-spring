import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConfigService } from './config.service';

@Component({
  standalone: true,
  selector: 'admin-config',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Configuration</h1>
        <p class="text-gray-600">
          Manage application-wide settings such as feature flags, API keys, and environment variables.
        </p>
      </div>

      <!-- Add New Config -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Add New Setting</h2>
        <div class="flex gap-2 items-end">
          <mat-form-field class="w-60" appearance="outline">
            <mat-label>Key</mat-label>
            <input matInput [(ngModel)]="newKey" />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Value</mat-label>
            <input matInput [(ngModel)]="newValue" />
          </mat-form-field>
          <button
            mat-flat-button
            color="primary"
            class="h-10"
            (click)="add()"
            [disabled]="!newKey"
          >
            Add
          </button>
        </div>
      </mat-card>

      <!-- Config List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Settings</h2>

        <div *ngIf="svc.items().length === 0" class="text-gray-500 text-center py-6">
          No settings found. Add one above to get started.
        </div>

        <div
          *ngFor="let item of svc.items(); trackBy: trackByKey"
          class="flex items-center gap-2 p-3 border rounded hover:bg-gray-50"
        >
          <mat-form-field class="w-60" appearance="outline">
            <mat-label>Key</mat-label>
            <input matInput [value]="item.key" disabled />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Value</mat-label>
            <input matInput [(ngModel)]="item.value" />
          </mat-form-field>
          <div class="flex gap-2">
            <button mat-stroked-button color="primary" (click)="save(item.key, item.value)">
              Save
            </button>
            <button mat-stroked-button color="warn" (click)="del(item.key)">
              Delete
            </button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
})
export class ConfigPage implements OnInit {
  newKey = '';
  newValue = '';

  constructor(public svc: ConfigService) { }

  ngOnInit() {
    this.svc.fetch();
  }

  trackByKey = (_: number, it: { key: string }) => it.key;

  async add() {
    await this.svc.create(this.newKey.trim(), this.newValue ?? '');
    this.newKey = '';
    this.newValue = '';
  }

  async save(k: string, v: string) {
    await this.svc.set(k, v);
  }

  async del(k: string) {
    if (!confirm(`Delete config "${k}"?`)) return;
    await this.svc.remove(k);
  }
}
