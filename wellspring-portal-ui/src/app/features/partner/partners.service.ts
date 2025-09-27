// src/app/features/partner/partners.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Partner {
    id?: string;
    _id?: string;
    name: string;
    orgType?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class PartnersService {
    private _partners = signal<Partner[]>([]);
    partners = this._partners.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(
            this.http.get<Partner[]>(`${environment.apiUrl}/partners`)
        ).catch(() => []);
        this._partners.set(data ?? []);
    }

    async fetchById(id: string) {
        return await firstValueFrom(this.http.get<Partner>(`${environment.apiUrl}/partners/${id}`));
    }

    async create(payload: Partial<Partner>) {
        const created = await firstValueFrom(this.http.post<Partner>(`${environment.apiUrl}/partners`, payload));
        this._partners.set([created, ...this._partners()]);
    }

    async update(id: string, payload: Partial<Partner>) {
        const updated = await firstValueFrom(this.http.put<Partner>(`${environment.apiUrl}/partners/${id}`, payload));
        this._partners.set(this._partners().map(p => (p.id === id || p._id === id ? updated : p)));
    }

    async remove(id: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/partners/${id}`));
        this._partners.set(this._partners().filter(p => p.id !== id && p._id !== id));
    }
}
