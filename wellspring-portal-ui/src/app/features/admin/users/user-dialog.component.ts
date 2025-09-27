import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { User } from './user.model';

type RoleName = User['roles'][number];

@Component({
    standalone: true,
    selector: 'user-dialog',
    imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
    template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit User' : 'Create User' }}</h2>
    <form [formGroup]="form" class="p-4 space-y-4">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name"/>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email"/>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Roles</mat-label>
        <mat-select formControlName="roles" multiple>
          <mat-option *ngFor="let r of allRoles" [value]="r">{{ r }}</mat-option>
        </mat-select>
      </mat-form-field>

      <div class="flex gap-2 justify-end pt-2">
        <button mat-stroked-button type="button" (click)="close()">Cancel</button>
        <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">
          {{ data?.id ? 'Save' : 'Create' }}
        </button>
      </div>
    </form>
  `
})
export class UserDialogComponent {
    allRoles: RoleName[] = ['Admin', 'Staff', 'Volunteer', 'Donor', 'Seeker', 'Partner'];
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private ref: MatDialogRef<UserDialogComponent, Partial<User> | undefined>,
        @Inject(MAT_DIALOG_DATA) public data?: User
    ) {
        this.form = this.fb.group({
            name: [this.data?.name ?? '', [Validators.required, Validators.minLength(2)]],
            email: [this.data?.email ?? '', [Validators.required, Validators.email]],
            roles: [this.data?.roles ?? ([] as RoleName[]), [Validators.required]],
        });
    }

    close() { this.ref.close(); }
    save() {
        if (this.form.invalid) return;
        this.ref.close(this.form.value as Partial<User>);
    }
}
