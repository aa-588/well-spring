import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Donation {
    id?: string;
    _id?: string;
    donorId: string;
    caseId: string;
    amount: number;
    date: string;
}

@Injectable({ providedIn: 'root' })
export class DonationsService {
    private _donations = signal<Donation[]>([]);
    donations = this._donations.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchByDonor(donorId: string) {
        const data = await firstValueFrom(
            this.http.get<Donation[]>(`${environment.apiUrl}/donations?donorId=${donorId}`)
        ).catch(() => []);
        this._donations.set(data ?? []);
    }

    async create(payload: Partial<Donation>) {
        const created = await firstValueFrom(
            this.http.post<Donation>(`${environment.apiUrl}/donations`, payload)
        );
        this._donations.set([created, ...this._donations()]);
    }
}
