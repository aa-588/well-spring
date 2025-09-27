import { Injectable, signal } from '@angular/core';

export type Role = 'Donor' | 'Seeker' | 'Volunteer' | 'Staff' | 'Admin' | 'Partner';
export interface User { id: string; name: string; email: string; roles: Role[]; }

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _user = signal<User | null>(null);
    user = this._user.asReadonly();
    isLoggedIn = () => !!this._user();

    login(token: string, user: User) { localStorage.setItem('access', token); this._user.set(user); }
    logout() { localStorage.removeItem('access'); this._user.set(null); }
    hasRole = (roles: Role[]) => !!this._user() && this._user()!.roles.some(r => roles.includes(r));
}
