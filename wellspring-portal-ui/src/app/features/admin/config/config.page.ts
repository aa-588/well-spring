import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfigService } from './config.service';

@Component({
  standalone: true,
  selector: 'admin-config',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 class="text-xl font-semibold mb-4">Configuration</h2>

    <!-- add new -->
    <div class="flex gap-2 items-end mb-6">
      <mat-form-field class="w-60" appearance="outline">
        <mat-label>New key</mat-label>
        <input matInput [(ngModel)]="newKey"/>
      </mat-form-field>
      <mat-form-field class="flex-1" appearance="outline">
        <mat-label>Value</mat-label>
        <input matInput [(ngModel)]="newValue"/>
      </mat-form-field>
      <button mat-flat-button color="primary" (click)="add()" [disabled]="!newKey">Add</button>
    </div>

    <!-- list -->
    <div class="space-y-4">
      <div *ngFor="let item of svc.items(); trackBy: trackByKey" class="flex items-center gap-2">
        <mat-form-field class="w-60" appearance="outline">
          <mat-label>Key</mat-label>
          <input matInput [value]="item.key" disabled />
        </mat-form-field>
        <mat-form-field class="flex-1" appearance="outline">
          <mat-label>Value</mat-label>
          <input matInput [(ngModel)]="item.value" />
        </mat-form-field>
        <button mat-stroked-button (click)="save(item.key, item.value)">Save</button>
        <button mat-button color="warn" (click)="del(item.key)">Delete</button>
      </div>
    </div>
  `
})
export class ConfigPage implements OnInit {
  newKey = ''; newValue = '';
  constructor(public svc: ConfigService) { }
  ngOnInit() { this.svc.fetch(); }

  trackByKey = (_: number, it: { key: string }) => it.key;

  async add() {
    await this.svc.create(this.newKey.trim(), this.newValue ?? '');
    this.newKey = ''; this.newValue = '';
  }
  async save(k: string, v: string) { await this.svc.set(k, v); }
  async del(k: string) {
    if (!confirm(`Delete config "${k}"?`)) return;
    await this.svc.remove(k);
  }
}
