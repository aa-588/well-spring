import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private _rows = signal<User[]>([]);
    rows = this._rows.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch(q?: string) {
        const data = await firstValueFrom(
            this.http.get<User[]>(`${environment.apiUrl}/admin/users`, { params: q ? { q } : {} })
        ).catch(() => []);
        this._rows.set(data ?? []);
    }

    async create(payload: Partial<User>) {
        const created = await firstValueFrom(this.http.post<User>(`${environment.apiUrl}/admin/users`, payload));
        this._rows.set([created, ...this._rows()]);
    }

    async update(id: number, payload: Partial<User>) {
        const updated = await firstValueFrom(this.http.put<User>(`${environment.apiUrl}/admin/users/${id}`, payload));
        this._rows.set(this._rows().map(r => r.id === id ? updated : r));
    }

    toggle(id: string, status: 'active' | 'suspended') {
        return this.http.patch<User>(`${environment.apiUrl}/admin/users/${id}`, { status });
    }
}
