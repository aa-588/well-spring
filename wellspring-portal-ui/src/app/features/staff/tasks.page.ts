// src/app/features/staff/staff-tasks.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { TasksService, Task as StaffTask } from './tasks.service';

@Component({
  selector: 'app-staff-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Tasks</h1>
        <p class="text-gray-600">Assign, track, and manage staff tasks.</p>
      </div>

      <!-- Add Task -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Add New Task</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Title</mat-label>
            <input matInput [(ngModel)]="newTask.title" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Assigned To (User ID)</mat-label>
            <input matInput [(ngModel)]="newTask.assignedTo" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full md:col-span-2">
            <mat-label>Description</mat-label>
            <input matInput [(ngModel)]="newTask.description" />
          </mat-form-field>

          <div class="flex justify-end md:col-span-4">
            <button
              mat-flat-button
              color="primary"
              (click)="addTask()"
              [disabled]="!newTask.title?.trim() || !newTask.assignedTo?.trim()"
            >
              Add Task
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Task List -->
      <mat-card class="p-6 shadow rounded-xl">
        <h2 class="text-lg font-medium mb-4">Existing Tasks</h2>

        <table
          mat-table
          [dataSource]="tasksService.tasks()"
          class="min-w-full border rounded"
        >
          <!-- Title -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-50 text-left px-4 py-2">Title</th>
            <td mat-cell *matCellDef="let task" class="px-4 py-2">{{ task.title }}</td>
          </ng-container>

          <!-- Assigned To -->
          <ng-container matColumnDef="assignedTo">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-50 text-left px-4 py-2">Assigned To</th>
            <td mat-cell *matCellDef="let task" class="px-4 py-2">{{ task.assignedTo }}</td>
          </ng-container>

          <!-- Status -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-50 text-left px-4 py-2">Status</th>
            <td mat-cell *matCellDef="let task" class="px-4 py-2">
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                [ngClass]="{
                  'bg-yellow-100 text-yellow-800': task.status === 'pending',
                  'bg-blue-100 text-blue-800': task.status === 'in-progress',
                  'bg-green-100 text-green-800': task.status === 'done'
                }"
              >
                {{ task.status }}
              </span>
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="bg-gray-50 text-right px-4 py-2"></th>
            <td mat-cell *matCellDef="let task" class="px-4 py-2 text-right">
              <button
                mat-stroked-button
                color="warn"
                (click)="deleteTask(task._id || task.id!)"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <!-- Header + Rows -->
          <tr mat-header-row *matHeaderRowDef="['title','assignedTo','status','actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['title','assignedTo','status','actions']" class="hover:bg-gray-50"></tr>

          <!-- No Data -->
          <tr class="mat-row" *matNoDataRow>
            <td colspan="4" class="mat-cell text-center text-gray-500 py-6">
              No tasks available.
            </td>
          </tr>
        </table>
      </mat-card>
    </div>
  `
})
export class StaffTasksPage implements OnInit {
  newTask: Partial<StaffTask> = { title: '', assignedTo: '', description: '', status: 'pending' };

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.fetch();
  }

  async addTask() {
    if (this.newTask.title?.trim() && this.newTask.assignedTo?.trim()) {
      await this.tasksService.create(this.newTask);
      this.newTask = { title: '', assignedTo: '', description: '', status: 'pending' };
    }
  }

  async deleteTask(id: string) {
    await this.tasksService.remove(id);
  }
}
