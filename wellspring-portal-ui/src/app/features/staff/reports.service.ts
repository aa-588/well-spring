import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface Report {
    id: string;
    staffId: string;
    content: string;
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
    private _reports = signal<Report[]>([]);
    reports = this._reports.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch() {
        const data = await firstValueFrom(
            this.http.get<Report[]>(`${environment.apiUrl}/reports`)
        ).catch(() => []);
        this._reports.set(data ?? []);
    }

    async create(payload: Partial<Report>) {
        const created = await firstValueFrom(
            this.http.post<Report>(`${environment.apiUrl}/reports`, payload)
        );
        this._reports.set([created, ...this._reports()]);
    }
}
