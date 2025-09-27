import { Routes } from '@angular/router';

export const STAFF_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./dashboard.page').then(m => m.StaffDashboardPage) },
    { path: 'users', loadComponent: () => import('./users.page').then(m => m.StaffUsersPage) },
    { path: 'tasks', loadComponent: () => import('./tasks.page').then(m => m.StaffTasksPage) },
    { path: 'reports', loadComponent: () => import('./reports.page').then(m => m.StaffReportsPage) },
]
