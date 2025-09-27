import { Routes } from '@angular/router';

export const seekerRoutes: Routes = [
    { path: 'dashboard', loadComponent: () => import('./seeker-dashboard.page').then(m => m.SeekerDashboardPage) },
    { path: 'manage', loadComponent: () => import('./seekers.page').then(m => m.SeekersPage) },          // admin/staff view of seekers
    { path: 'cases/:id', loadComponent: () => import('./seeker-cases.page').then(m => m.SeekerCasesPage) },
    { path: 'profile', loadComponent: () => import('./seeker-profile.page').then(m => m.SeekerProfilePage) },
];