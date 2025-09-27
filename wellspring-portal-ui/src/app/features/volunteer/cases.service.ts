// src/app/features/volunteer/cases.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface CaseRecord {
    id?: string;
    _id?: string;
    caseCode?: string;
    familyName: string;
    hospital?: string;
    doctor?: string;
    status?: string;
    nextStep?: string;
    createdAt?: string;
    // minimal set, expand as needed
}

@Injectable({ providedIn: 'root' })
export class CasesService {
    private _cases = signal<CaseRecord[]>([]);
    cases = this._cases.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(this.http.get<CaseRecord[]>(
            `${environment.apiUrl}/cases`
        )).catch(() => []);
        this._cases.set(data ?? []);
    }

    async fetchById(id: string) {
        return await firstValueFrom(this.http.get<CaseRecord>(`${environment.apiUrl}/cases/${id}`));
    }

    async update(id: string, payload: Partial<CaseRecord>) {
        const updated = await firstValueFrom(this.http.put<CaseRecord>(`${environment.apiUrl}/cases/${id}`, payload));
        this._cases.set(this._cases().map(c => (c._id === id || c.id === id ? updated : c)));
    }

    // optionally create / remove if volunteers can create cases
    async create(payload: Partial<CaseRecord>) {
        const created = await firstValueFrom(this.http.post<CaseRecord>(`${environment.apiUrl}/cases`, payload));
        this._cases.set([created, ...this._cases()]);
    }
}
