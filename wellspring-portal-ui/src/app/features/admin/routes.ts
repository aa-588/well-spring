import { adminOnlyGuard } from './shared/admin-only.guard';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    { path: 'users', canActivate: [authGuard], loadComponent: () => import('./users/users.page').then(m => m.UsersPage) },
    { path: 'roles', canActivate: [roleGuard(['Admin'])], loadComponent: () => import('./roles/roles.page').then(m => m.RolesPage) },
    { path: 'audit', canActivate: [adminOnlyGuard], loadComponent: () => import('./audit/audit.page').then(m => m.AuditPage) },
    { path: 'config', canActivate: [adminOnlyGuard], loadComponent: () => import('./config/config.page').then(m => m.ConfigPage) },
    { path: '', pathMatch: 'full', redirectTo: 'users' },
];
