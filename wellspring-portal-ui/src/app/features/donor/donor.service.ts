// src/app/features/donor/donor.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Donor {
    id?: string;
    _id?: string;
    name: string;
    email?: string;
    phone?: string;
    preferences?: string[];
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class DonorService {
    private _donors = signal<Donor[]>([]);
    donors = this._donors.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(
            this.http.get<Donor[]>(`${environment.apiUrl}/donors`)
        ).catch(() => []);
        this._donors.set(data ?? []);
    }

    async fetchById(id: string) {
        return await firstValueFrom(
            this.http.get<Donor>(`${environment.apiUrl}/donors/${id}`)
        );
    }

    async create(payload: Partial<Donor>) {
        const created = await firstValueFrom(
            this.http.post<Donor>(`${environment.apiUrl}/donors`, payload)
        );
        this._donors.set([created, ...this._donors()]);
    }

    async update(id: string, payload: Partial<Donor>) {
        const updated = await firstValueFrom(
            this.http.put<Donor>(`${environment.apiUrl}/donors/${id}`, payload)
        );
        this._donors.set(this._donors().map(d => (d.id === id || d._id === id ? updated : d)));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/donors/${id}`));
        this._donors.set(this._donors().filter(d => d.id !== id && d._id !== id));
    }
}
