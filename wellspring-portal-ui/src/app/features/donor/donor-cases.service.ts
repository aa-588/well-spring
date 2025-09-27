// src/app/features/donor/donor-cases.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Donation } from './donations.service';

export interface DonorCase {
    caseId: string;
    familyName: string;
    hospital?: string;
    status?: string;
    totalDonated: number;
}

@Injectable({ providedIn: 'root' })
export class DonorCasesService {
    private _cases = signal<DonorCase[]>([]);
    cases = this._cases.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchByDonor(donorId: string) {
        try {
            // 1. Fetch all donations by donor
            const donations = await firstValueFrom(
                this.http.get<Donation[]>(`${environment.apiUrl}/donations?donorId=${donorId}`)
            );

            // 2. Get unique caseIds
            const grouped = donations.reduce<Record<string, number>>((acc, d) => {
                acc[d.caseId] = (acc[d.caseId] || 0) + d.amount;
                return acc;
            }, {});

            // 3. Fetch case details for each caseId
            const cases: DonorCase[] = [];
            for (const caseId of Object.keys(grouped)) {
                try {
                    const c = await firstValueFrom(
                        this.http.get<any>(`${environment.apiUrl}/cases/${caseId}`)
                    );
                    cases.push({
                        caseId,
                        familyName: c.familyName,
                        hospital: c.hospital,
                        status: c.status,
                        totalDonated: grouped[caseId]
                    });
                } catch {
                    // ignore missing cases
                }
            }

            this._cases.set(cases);
        } catch {
            this._cases.set([]);
        }
    }
}
