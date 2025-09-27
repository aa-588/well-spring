// src/app/features/donor/donor-matching.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface DonorMatchCandidate {
    caseId: string;
    familyName: string;
    hospital?: string;
    needAmount?: number;
    suitabilityScore?: number;
}

@Injectable({ providedIn: 'root' })
export class DonorMatchingService {
    private _candidates = signal<DonorMatchCandidate[]>([]);
    candidates = this._candidates.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchCandidatesForDonor(donorId: string) {
        const data = await firstValueFrom(
            this.http.get<DonorMatchCandidate[]>(`${environment.apiUrl}/matching/candidates?donorId=${donorId}`)
        ).catch(() => []);
        this._candidates.set(data ?? []);
    }

    async pledgeSupport(donorId: string, caseId: string, amount: number) {
        const donation = await firstValueFrom(
            this.http.post(`${environment.apiUrl}/matching/pledge`, { donorId, caseId, amount })
        );
        return donation;
    }
}
