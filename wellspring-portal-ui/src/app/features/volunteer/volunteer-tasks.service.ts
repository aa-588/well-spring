// src/app/features/volunteer/volunteer-tasks.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface VolunteerTask {
    id?: string;
    _id?: string;
    title: string;
    description?: string;
    assignedTo?: string; // volunteer id
    caseId?: string;
    dueDate?: string;
    status?: 'pending' | 'in-progress' | 'done';
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class VolunteerTasksService {
    private _tasks = signal<VolunteerTask[]>([]);
    tasks = this._tasks.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(this.http.get<VolunteerTask[]>(
            `${environment.apiUrl}/tasks`
        )).catch(() => []);
        this._tasks.set(data ?? []);
    }

    async create(payload: Partial<VolunteerTask>) {
        const created = await firstValueFrom(this.http.post<VolunteerTask>(`${environment.apiUrl}/tasks`, payload));
        this._tasks.set([created, ...this._tasks()]);
    }

    async update(id: string, payload: Partial<VolunteerTask>) {
        const updated = await firstValueFrom(this.http.patch<VolunteerTask>(`${environment.apiUrl}/tasks/${id}`, payload));
        this._tasks.set(this._tasks().map(t => (t._id === id || t.id === id ? updated : t)));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${id}`));
        this._tasks.set(this._tasks().filter(t => t._id !== id && t.id !== id));
    }
}
