// src/app/features/volunteer/volunteer-tasks.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerTasksService, VolunteerTask } from './volunteer-tasks.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-volunteer-tasks-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule],
    template: `
    <h2 class="text-xl font-bold mb-4">My Tasks</h2>

    <div class="mb-4 flex gap-2">
      <input matInput placeholder="Title" [(ngModel)]="newTask.title">
      <input matInput placeholder="Case ID" [(ngModel)]="newTask.caseId">
      <input matInput placeholder="Assigned To (you)" [(ngModel)]="newTask.assignedTo">
      <button mat-flat-button color="primary" (click)="createTask()">Create</button>
    </div>

    <table mat-table [dataSource]="tasksService.tasks()" class="w-full">
      <ng-container matColumnDef="title">
        <td mat-cell *matCellDef="let t">{{ t.title }}</td>
      </ng-container>
      <ng-container matColumnDef="case">
        <td mat-cell *matCellDef="let t">{{ t.caseId }}</td>
      </ng-container>
      <ng-container matColumnDef="status">
        <td mat-cell *matCellDef="let t">{{ t.status }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <td mat-cell *matCellDef="let t">
          <button mat-button (click)="markDone(t)">Mark Done</button>
          <button mat-button color="warn" (click)="remove(t)">Delete</button>
        </td>
      </ng-container>

      <tr mat-row *matRowDef="let row; columns: ['title','case','status','actions']"></tr>
    </table>
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

    async markDone(t: VolunteerTask) {
        if (t._id || t.id) await this.tasksService.update(t._id || t.id!, { status: 'done' });
    }

    async remove(t: VolunteerTask) {
        if (t._id || t.id) await this.tasksService.remove(t._id || t.id!);
    }
}
