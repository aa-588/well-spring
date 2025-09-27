// src/app/features/volunteer/volunteer-profile.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../enviroments/environment';

export interface VolunteerProfile {
    id?: string;
    _id?: string;
    name: string;
    email?: string;
    phone?: string;
    skills?: string[];
    availability?: string;
    hoursLogged?: number;
    createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class VolunteerProfileService {
    private _profiles = signal<VolunteerProfile[]>([]);
    profiles = this._profiles.asReadonly();

    constructor(private http: HttpClient) { }

    async fetchAll() {
        const data = await firstValueFrom(this.http.get<VolunteerProfile[]>(
            `${environment.apiUrl}/volunteers`
        )).catch(() => []);
        this._profiles.set(data ?? []);
    }

    async fetchById(id: string) {
        return await firstValueFrom(this.http.get<VolunteerProfile>(`${environment.apiUrl}/volunteers/${id}`));
    }

    async update(id: string, payload: Partial<VolunteerProfile>) {
        const updated = await firstValueFrom(this.http.put<VolunteerProfile>(`${environment.apiUrl}/volunteers/${id}`, payload));
        this._profiles.set(this._profiles().map(p => (p._id === id || p.id === id ? updated : p)));
    }
}
