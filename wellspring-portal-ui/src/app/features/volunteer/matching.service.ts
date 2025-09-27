// src/app/features/volunteer/matching.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface MatchCandidate {
    donorId: string;
    donorName?: string;
    suitabilityScore?: number;
    notes?: string;
}

@Injectable({ providedIn: 'root' })
export class MatchingService {
    private _candidates = signal<MatchCandidate[]>([]);
    candidates = this._candidates.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchCandidatesForCase(caseId: string) {
        const data = await firstValueFrom(this.http.get<MatchCandidate[]>(
            `${environment.apiUrl}/matching/candidates?caseId=${caseId}`
        )).catch(() => []);
        this._candidates.set(data ?? []);
    }

    // manual assignment (override)
    async assignDonor(caseId: string, donorId: string, reason?: string) {
        const resp = await firstValueFrom(this.http.post(`${environment.apiUrl}/matching/assign`, { caseId, donorId, reason }));
        // you may want to refresh candidates or case after this
        return resp;
    }
}
