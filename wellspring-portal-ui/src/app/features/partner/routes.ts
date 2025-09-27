import { Routes } from '@angular/router';

export const partnerRoutes: Routes = [
    { path: 'dashboard', loadComponent: () => import('./partner-dashboard.page').then(m => m.PartnerDashboardPage) },
    { path: 'manage', loadComponent: () => import('./partners.page').then(m => m.PartnersPage) },
    { path: 'collaborations/:id', loadComponent: () => import('./collaborations.page').then(m => m.CollaborationsPage) },
    { path: 'profile', loadComponent: () => import('./partner-profile.page').then(m => m.PartnerProfilePage) },
    { path: 'browse', loadComponent: () => import('./partner-browse-cases.page').then(m => m.PartnerBrowseCasesPage) }
];