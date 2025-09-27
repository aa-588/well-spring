import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Task {
    id?: string;
    _id?: string;
    title: string;
    assignedTo: string;   // ✅ required
    description?: string; // optional if you still want
    status: 'pending' | 'in-progress' | 'done';
    createdAt?: string;
}


@Injectable({ providedIn: 'root' })
export class TasksService {
    private _tasks = signal<Task[]>([]);
    tasks = this._tasks.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch() {
        const data = await firstValueFrom(
            this.http.get<Task[]>(`${environment.apiUrl}/tasks`)
        ).catch(() => []);
        this._tasks.set(data ?? []);
    }

    async create(payload: Partial<Task>) {
        const created = await firstValueFrom(
            this.http.post<Task>(`${environment.apiUrl}/tasks`, payload)
        );
        this._tasks.set([created, ...this._tasks()]);
    }

    async update(id: string, payload: Partial<Task>) {
        const updated = await firstValueFrom(
            this.http.patch<Task>(`${environment.apiUrl}/tasks/${id}`, payload)
        );
        this._tasks.set(this._tasks().map(t => t.id === id ? updated : t));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${id}`));
        this._tasks.set(this._tasks().filter(t => t.id !== id));
    }
}
