import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Role } from './role.model';

type RoleName = Role['name'];

@Component({
  standalone: true,
  selector: 'role-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit Role' : 'Create Role' }}</h2>
    <form [formGroup]="form" class="p-4 space-y-4">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Role</mat-label>
        <mat-select formControlName="name" required>
          <mat-option *ngFor="let r of names" [value]="r">{{ r }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Permissions (comma separated)</mat-label>
        <input matInput formControlName="permissionsCsv" placeholder="users.read, users.write"/>
      </mat-form-field>

      <div class="flex gap-2 justify-end">
        <button mat-stroked-button type="button" (click)="close()">Cancel</button>
        <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Save</button>
      </div>
    </form>
  `
})
export class RoleDialogComponent {
  names: RoleName[] = ['Admin', 'Staff', 'Volunteer', 'Donor', 'Seeker', 'Partner'];
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<RoleDialogComponent, Partial<Role> | undefined>,
    @Inject(MAT_DIALOG_DATA) public data?: Role
  ) {
    this.form = this.fb.group({
      name: [this.data?.name ?? null as RoleName | null, Validators.required],
      permissionsCsv: [this.data?.permissions?.join(', ') ?? '']
    });

  }

  private parsePerms(csv: string) {
    return csv.split(',').map(s => s.trim()).filter(Boolean);
  }

  close() { this.ref.close(); }
  save() {
    if (this.form.invalid) return;
    const { name, permissionsCsv } = this.form.value;
    this.ref.close({ name: name as RoleName, permissions: this.parsePerms(permissionsCsv || '') });
  }
}
