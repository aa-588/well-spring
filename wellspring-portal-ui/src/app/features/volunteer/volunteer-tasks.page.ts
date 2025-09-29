// src/app/features/volunteer/volunteer-tasks.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerTasksService, VolunteerTask } from './volunteer-tasks.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-volunteer-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Tasks</h1>
        <p class="text-gray-600">Create, view, and update tasks assigned to you.</p>
      </div>

      <!-- Create Task -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Add New Task</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Title</mat-label>
            <input matInput [(ngModel)]="newTask.title" name="title" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Case ID</mat-label>
            <input matInput [(ngModel)]="newTask.caseId" name="caseId" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Assigned To</mat-label>
            <input matInput [(ngModel)]="newTask.assignedTo" name="assignedTo" />
          </mat-form-field>

          <div class="md:col-span-3 flex justify-end">
            <button mat-flat-button color="primary" (click)="createTask()">
              Create Task
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Task List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Task List</h2>

        <div *ngIf="tasksService.tasks().length === 0" class="text-gray-500">
          No tasks found.
        </div>

        <table
          mat-table
          [dataSource]="tasksService.tasks()"
          class="w-full border rounded"
          *ngIf="tasksService.tasks().length > 0"
        >
          <!-- Title -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef class="font-semibold">Title</th>
            <td mat-cell *matCellDef="let t">{{ t.title }}</td>
          </ng-container>

          <!-- Case -->
          <ng-container matColumnDef="case">
            <th mat-header-cell *matHeaderCellDef class="font-semibold">Case</th>
            <td mat-cell *matCellDef="let t">{{ t.caseId }}</td>
          </ng-container>

          <!-- Status with Inline Edit -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="font-semibold">Status</th>
            <td mat-cell *matCellDef="let t">
              <mat-form-field appearance="outline" class="w-40">
                <mat-select
                  [(ngModel)]="t.status"
                  (selectionChange)="updateStatus(t)"
                >
                  <mat-option value="pending">Pending</mat-option>
                  <mat-option value="in-progress">In Progress</mat-option>
                  <mat-option value="done">Done</mat-option>
                </mat-select>
              </mat-form-field>
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let t" class="text-right">
              <button mat-stroked-button color="primary" (click)="markDone(t)">
                Mark Done
              </button>
              <button mat-stroked-button color="warn" (click)="remove(t)">
                Delete
              </button>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="['title', 'case', 'status', 'actions']"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: ['title', 'case', 'status', 'actions']"
          ></tr>
        </table>
      </mat-card>
    </div>
  `
})
export class VolunteerTasksPage implements OnInit {
  newTask: Partial<VolunteerTask> = { title: '', caseId: '', assignedTo: '' };

  constructor(public tasksService: VolunteerTasksService) { }

  ngOnInit() {
    this.tasksService.fetchAll();
  }

  async createTask() {
    if (!this.newTask.title?.trim() || !this.newTask.assignedTo?.trim()) return;
    await this.tasksService.create({ ...this.newTask, status: 'pending' });
    this.newTask = { title: '', caseId: '', assignedTo: '' };
  }

  async updateStatus(t: VolunteerTask) {
    if (t._id || t.id) {
      await this.tasksService.update(t._id || t.id!, { status: t.status });
    }
  }

  async markDone(t: VolunteerTask) {
    if (t._id || t.id)
      await this.tasksService.update(t._id || t.id!, { status: 'done' });
  }

  async remove(t: VolunteerTask) {
    if (t._id || t.id) await this.tasksService.remove(t._id || t.id!);
  }
}
