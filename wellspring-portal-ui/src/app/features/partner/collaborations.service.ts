// src/app/features/partner/collaborations.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Collaboration {
    id?: string;
    _id?: string;
    partnerId: string;
    caseId?: string;
    description: string;
    status?: 'proposed' | 'active' | 'completed' | 'cancelled';
    createdAt?: string;
}

export interface CaseBrief {
    id?: string;
    _id?: string;
    familyName: string;
    hospital?: string;
    status?: string;
    nextStep?: string;
}

@Injectable({ providedIn: 'root' })
export class CollaborationsService {
    private _collabs = signal<Collaboration[]>([]);
    collabs = this._collabs.asReadonly();

    private _availableCases = signal<CaseBrief[]>([]);
    availableCases = this._availableCases.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchForPartner(partnerId: string) {
        const data = await firstValueFrom(
            this.http.get<Collaboration[]>(`${environment.apiUrl}/partners/${partnerId}/collaborations`)
        ).catch(() => []);
        this._collabs.set(data ?? []);
    }

    async fetchAvailableCases(partnerId: string) {
        const data = await firstValueFrom(
            this.http.get<CaseBrief[]>(`${environment.apiUrl}/partners/${partnerId}/available-cases`)
        ).catch(() => []);
        this._availableCases.set(data ?? []);
    }

    async joinCase(partnerId: string, caseId: string, description?: string) {
        const collab = await firstValueFrom(
            this.http.post<Collaboration>(`${environment.apiUrl}/partners/${partnerId}/join-case`, { caseId, description })
        );
        this._collabs.set([collab, ...this._collabs()]);
    }

    async create(partnerId: string, payload: Partial<Collaboration>) {
        const created = await firstValueFrom(
            this.http.post<Collaboration>(`${environment.apiUrl}/partners/${partnerId}/collaborations`, payload)
        );
        this._collabs.set([created, ...this._collabs()]);
    }
}