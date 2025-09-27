import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

export interface Role {
    id: string;
    name: 'Admin' | 'Staff' | 'Volunteer' | 'Donor' | 'Seeker' | 'Partner';
    permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class RolesService {
    private _roles = signal<Role[]>([]);
    roles = this._roles.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch() {
        const data = await firstValueFrom(
            this.http.get<Role[]>(`${environment.apiUrl}/admin/roles`)
        ).catch(() => []);
        this._roles.set(data ?? []);
    }

    async create(payload: Partial<Role>) {
        const created = await firstValueFrom(
            this.http.post<Role>(`${environment.apiUrl}/admin/roles`, payload)
        );
        this._roles.set([created, ...this._roles()]);
    }

    async update(id: string, payload: Partial<Role>) {
        const updated = await firstValueFrom(
            this.http.put<Role>(`${environment.apiUrl}/admin/roles/${id}`, payload)
        );
        this._roles.set(this._roles().map(r => r.id === id ? updated : r));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/admin/roles/${id}`));
        this._roles.set(this._roles().filter(r => r.id !== id));
    }
}
