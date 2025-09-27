import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AppComponent } from './app';

export const routes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'admin',
                loadChildren: () =>
                    import('./features/admin/routes').then(m => m.ADMIN_ROUTES),
            },
            {
                path: 'staff',
                loadChildren: () => import('./features/staff/routes').then(m => m.STAFF_ROUTES)
            },
            {
                path: 'volunteer',
                loadChildren: () => import('./features/volunteer/routes').then(m => m.VOLUNTEER_ROUTES)
            },
            {
                path: 'donor',
                loadChildren: () => import('./features/donor/routes').then(m => m.donorRoutes)
            },
            {
                path: 'seeker',
                loadChildren: () => import('./features/seeker/routes').then(m => m.seekerRoutes)
            },
            {
                path: 'partner',
                loadChildren: () => import('./features/partner/routes').then(m => m.partnerRoutes)
            },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },

    {
        path: '**',
        loadComponent: () =>
            import('./shared/not-found.component').then(m => m.NotFoundComponent),
    },

    // { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
    // { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },

    // {
    //     path: 'donors', canActivate: [authGuard, roleGuard(['Donor', 'Admin'])],
    //     loadChildren: () => import('./features/donors/routes').then(m => m.DONOR_ROUTES)
    // },

    // {
    //     path: 'seekers', canActivate: [authGuard, roleGuard(['Staff', 'Volunteer', 'Admin'])],
    //     loadChildren: () => import('./features/seekers/routes').then(m => m.SEEKER_ROUTES)
    // },

    // {
    //     path: 'matching', canActivate: [authGuard, roleGuard(['Staff', 'Admin'])],
    //     loadChildren: () => import('./features/matching/routes').then(m => m.MATCHING_ROUTES)
    // },

    // {
    //     path: 'payments', canActivate: [authGuard],
    //     loadChildren: () => import('./features/payments/routes').then(m => m.PAYMENT_ROUTES)
    // },

    // {
    //     path: 'cases', canActivate: [authGuard, roleGuard(['Staff', 'Volunteer', 'Admin'])],
    //     loadChildren: () => import('./features/cases/routes').then(m => m.CASE_ROUTES)
    // },

    // {
    //     path: 'community', canActivate: [authGuard],
    //     loadChildren: () => import('./features/community/routes').then(m => m.COMMUNITY_ROUTES)
    // },

    // {
    //     path: 'reports', canActivate: [authGuard, roleGuard(['Admin', 'Accountant', 'Staff'])],
    //     loadChildren: () => import('./features/reports/routes').then(m => m.REPORT_ROUTES)
    // },
];
