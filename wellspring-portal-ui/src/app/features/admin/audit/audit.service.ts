import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';

export interface AuditLog { id: string; ts: string; actorId: string; action: string; target?: string; meta?: Record<string, unknown> }

@Injectable({ providedIn: 'root' })
export class AuditService {
    private _rows = signal<AuditLog[]>([]);
    rows = this._rows.asReadonly();

    constructor(private http: HttpClient) { }

    async fetch(q?: string) {
        const data = await firstValueFrom(
            this.http.get<AuditLog[]>(`${environment.apiUrl}/admin/audit`, {
                params: q ? { q } : {}
            })
        ).catch(() => []);
        this._rows.set(data ?? []);
    }

    exportCsv() {
        const rows = this._rows();
        const header = ['id', 'ts', 'actorId', 'action', 'target'];
        const csv = [header.join(',')]
            .concat(rows.map(r => [r.id, r.ts, r.actorId, r.action, r.target ?? ''].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')))
            .join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `audit-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    }
}
