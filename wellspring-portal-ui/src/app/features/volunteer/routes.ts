import { Routes } from '@angular/router';

export const VOLUNTEER_ROUTES: Routes = [
    { path: 'dashboard', loadComponent: () => import('./volunteer-dashboard.page').then(m => m.VolunteerDashboardPage) },
    { path: 'cases', loadComponent: () => import('./volunteer-cases.page').then(m => m.VolunteerCasesPage) },
    { path: 'cases/:id', loadComponent: () => import('./case-details.page').then(m => m.CaseDetailsPage) },
    { path: 'tasks', loadComponent: () => import('./volunteer-tasks.page').then(m => m.VolunteerTasksPage) },
    { path: 'verification', loadComponent: () => import('./verification-queue.page').then(m => m.VerificationQueuePage) },
    { path: 'matching', loadComponent: () => import('./matching.page').then(m => m.MatchingPage) },
    { path: 'profile', loadComponent: () => import('./volunteer-profile.page').then(m => m.VolunteerProfilePage) },
];
