import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

export interface ConfigKV { key: string; value: string }

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private _items = signal<ConfigKV[]>([]);
    items = this._items.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch() {
        const data = await firstValueFrom(this.http.get<ConfigKV[]>(`${environment.apiUrl}/admin/config`)).catch(() => []);
        this._items.set(data ?? []);
    }

    async set(key: string, value: string) {
        const updated = await firstValueFrom(this.http.put<ConfigKV>(`${environment.apiUrl}/admin/config/${encodeURIComponent(key)}`, { value }));
        this._items.set(this._items().map(i => i.key === key ? updated : i));
    }

    async create(key: string, value: string) {
        const created = await firstValueFrom(this.http.post<ConfigKV>(`${environment.apiUrl}/admin/config`, { key, value }));
        this._items.set([created, ...this._items()]);
    }

    async remove(key: string) {
        await firstValueFrom(this.http.delete(`${environment.apiUrl}/admin/config/${encodeURIComponent(key)}`));
        this._items.set(this._items().filter(i => i.key !== key));
    }
}
