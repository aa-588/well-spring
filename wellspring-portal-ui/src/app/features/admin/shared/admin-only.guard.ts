import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export const adminOnlyGuard: CanActivateFn = () => {
    // const auth = inject(AuthService);
    // const router = inject(Router);
    return true; // Temporary allow all access to admin routes
    // if (auth.isLoggedIn() && auth.hasRole(['Admin'])) return true;
    // router.navigateByUrl('/login'); return false;
};
