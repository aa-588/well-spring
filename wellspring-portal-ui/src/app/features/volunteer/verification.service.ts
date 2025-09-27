// src/app/features/volunteer/verification.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface VerificationItem {
    id?: string;
    _id?: string;
    caseId: string;
    docUrl?: string;
    type?: string;
    status?: 'pending' | 'approved' | 'rejected';
    notes?: string;
    uploadedBy?: string;
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class VerificationService {
    private _items = signal<VerificationItem[]>([]);
    items = this._items.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchPending() {
        const data = await firstValueFrom(this.http.get<VerificationItem[]>(
            `${environment.apiUrl}/verifications?status=pending`
        )).catch(() => []);
        this._items.set(data ?? []);
    }

    async approve(id: string, notes?: string) {
        const updated = await firstValueFrom(this.http.post<VerificationItem>(`${environment.apiUrl}/verifications/${id}/approve`, { notes }));
        this._items.set(this._items().map(i => (i._id === id || i.id === id ? updated : i)));
    }

    async reject(id: string, notes?: string) {
        const updated = await firstValueFrom(this.http.post<VerificationItem>(`${environment.apiUrl}/verifications/${id}/reject`, { notes }));
        this._items.set(this._items().map(i => (i._id === id || i.id === id ? updated : i)));
    }
}
