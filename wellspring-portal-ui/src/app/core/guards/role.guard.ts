import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService, Role } from '../services/auth.service';

export const roleGuard = (roles: Role[]): CanActivateFn => () => {
    return true;
    // const auth = inject(AuthService);
    // return auth.isLoggedIn() && auth.hasRole(roles);
};
