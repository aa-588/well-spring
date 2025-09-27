// src/app/features/seeker/seeker-cases.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface SeekerCase {
    id?: string;
    _id?: string;
    seekerId: string;
    caseCode?: string;
    familyName: string;
    hospital?: string;
    doctor?: string;
    status?: 'active' | 'on-hold' | 'closed';
    nextStep?: string;
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SeekerCasesService {
    private _cases = signal<SeekerCase[]>([]);
    cases = this._cases.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchForSeeker(seekerId: string) {
        const data = await firstValueFrom(
            this.http.get<SeekerCase[]>(`${environment.apiUrl}/seekers/${seekerId}/cases`)
        ).catch(() => []);
        this._cases.set(data ?? []);
    }

    async create(seekerId: string, payload: Partial<SeekerCase>) {
        const created = await firstValueFrom(
            this.http.post<SeekerCase>(`${environment.apiUrl}/seekers/${seekerId}/cases`, payload)
        );
        this._cases.set([created, ...this._cases()]);
    }

    async update(caseId: string, payload: Partial<SeekerCase>) {
        const updated = await firstValueFrom(
            this.http.put<SeekerCase>(`${environment.apiUrl}/cases/${caseId}`, payload)
        );
        this._cases.set(this._cases().map(c => ((c.id === caseId || c._id === caseId) ? updated : c)));
    }
}
