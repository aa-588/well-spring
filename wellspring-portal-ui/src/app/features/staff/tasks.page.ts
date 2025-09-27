import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TasksService, Task as StaffTask } from './tasks.service';

@Component({
  selector: 'app-staff-tasks-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule],
  template: `
    <h2 class="text-xl font-bold mb-4">Tasks</h2>

    <div class="flex gap-2 mb-4">
      <input matInput placeholder="Title" [(ngModel)]="newTask.title">
      <input matInput placeholder="Assigned To (User ID)" [(ngModel)]="newTask.assignedTo">
      <input matInput placeholder="Description" [(ngModel)]="newTask.description">
      <button mat-flat-button color="primary" (click)="addTask()">Add</button>
    </div>

    <table mat-table [dataSource]="tasksService.tasks()" class="w-full">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Title </th>
        <td mat-cell *matCellDef="let task">{{ task.title }}</td>
      </ng-container>

      <ng-container matColumnDef="assignedTo">
        <th mat-header-cell *matHeaderCellDef> Assigned To </th>
        <td mat-cell *matCellDef="let task">{{ task.assignedTo }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let task">{{ task.status }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let task">
          <button mat-button color="warn" (click)="deleteTask(task._id || task.id!)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['title','assignedTo','status','actions']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['title','assignedTo','status','actions']"></tr>
    </table>
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
