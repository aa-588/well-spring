export const donorRoutes = [
    { path: 'dashboard', loadComponent: () => import('./donor-dashboard.page').then(m => m.DonorDashboardPage) },
    { path: 'cases', loadComponent: () => import('./donor-cases.page').then(m => m.DonorCasesPage) },
    { path: 'donations', loadComponent: () => import('./donor-donations.page').then(m => m.DonorDonationsPage) },
    { path: 'profile', loadComponent: () => import('./donor-profile.page').then(m => m.DonorProfilePage) },
    {
        path: 'matching',
        loadComponent: () => import('./donor-matching.page').then(m => m.DonorMatchingPage)
    }
];