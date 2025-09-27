// src/app/features/seeker/seekers.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Seeker {
    id?: string;
    _id?: string;
    name: string;
    guardianName?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    documents?: { label: string; url: string }[];
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SeekersService {
    private _seekers = signal<Seeker[]>([]);
    seekers = this._seekers.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(
            this.http.get<Seeker[]>(`${environment.apiUrl}/seekers`)
        ).catch(() => []);
        this._seekers.set(data ?? []);
    }

    async fetchById(id: string) {
        return await firstValueFrom(this.http.get<Seeker>(`${environment.apiUrl}/seekers/${id}`));
    }

    async create(payload: Partial<Seeker>) {
        const created = await firstValueFrom(this.http.post<Seeker>(`${environment.apiUrl}/seekers`, payload));
        this._seekers.set([created, ...this._seekers()]);
    }

    async update(id: string, payload: Partial<Seeker>) {
        const updated = await firstValueFrom(this.http.put<Seeker>(`${environment.apiUrl}/seekers/${id}`, payload));
        this._seekers.set(this._seekers().map(s => ((s.id === id || s._id === id) ? updated : s)));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/seekers/${id}`));
        this._seekers.set(this._seekers().filter(s => s.id !== id && s._id !== id));
    }
}
