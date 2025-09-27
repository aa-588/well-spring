import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen">
      <!-- Sidebar -->
      <nav class="w-64 bg-gray-100 p-4 space-y-2">
        <h2 class="text-lg font-bold mb-4">Wellspring Portal</h2>

        <!-- Admin Links -->
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Admin</h3>
          <a routerLink="/admin/users" routerLinkActive="font-bold" class="block py-1">Users</a>
          <a routerLink="/admin/roles" routerLinkActive="font-bold" class="block py-1">Roles</a>
          <a routerLink="/admin/audit" routerLinkActive="font-bold" class="block py-1">Audit</a>
          <a routerLink="/admin/config" routerLinkActive="font-bold" class="block py-1">Config</a>
        </div>

        <!-- Staff Links -->
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Staff</h3>
          <a routerLink="/staff/dashboard" routerLinkActive="font-bold" class="block py-1">Dashboard</a>
          <a routerLink="/staff/users" routerLinkActive="font-bold" class="block py-1">Users</a>
          <a routerLink="/staff/tasks" routerLinkActive="font-bold" class="block py-1">Tasks</a>
          <a routerLink="/staff/reports" routerLinkActive="font-bold" class="block py-1">Reports</a>
        </div>

        <!-- Volunteer Links -->
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Volunteer</h3>
          <a routerLink="/volunteer/dashboard" routerLinkActive="font-bold" class="block py-1">Dashboard</a>
          <a routerLink="/volunteer/cases" routerLinkActive="font-bold" class="block py-1">Cases</a>
          <a routerLink="/volunteer/tasks" routerLinkActive="font-bold" class="block py-1">Tasks</a>
          <a routerLink="/volunteer/matching" routerLinkActive="font-bold" class="block py-1">Matching</a>
          <a routerLink="/volunteer/profile" routerLinkActive="font-bold" class="block py-1">Profile</a>
        </div>

        <!-- Donor Links -->
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Donor</h3>
          <a routerLink="/donor/dashboard" routerLinkActive="font-bold" class="block py-1">Dashboard</a>
          <a routerLink="/donor/cases" routerLinkActive="font-bold" class="block py-1">Cases</a>
          <a routerLink="/donor/donations" routerLinkActive="font-bold" class="block py-1">Donations</a>
          <a routerLink="/donor/matching" routerLinkActive="font-bold" class="block py-1">Matching</a>
          <a routerLink="/donor/profile" routerLinkActive="font-bold" class="block py-1">Profile</a>
        </div>

        <!-- ✅ Seeker Links -->
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Seeker</h3>
          <a routerLink="/seeker/dashboard" routerLinkActive="font-bold" class="block py-1">Dashboard</a>
          <!-- If you want "My Cases" tied to the current seeker -->
          <a [routerLink]="['/seeker/cases', currentSeekerId]" routerLinkActive="font-bold" class="block py-1">My Cases</a>
          <a routerLink="/seeker/profile" routerLinkActive="font-bold" class="block py-1">Profile</a>
        </div>

        <div class="mt-4">
  <h3 class="text-sm font-semibold text-gray-600 mb-1">Partner</h3>
  <a routerLink="/partner/dashboard" routerLinkActive="font-bold" class="block py-1">Dashboard</a>
  <a routerLink="/partner/manage" routerLinkActive="font-bold" class="block py-1">Manage Partners</a>
  <a routerLink="/partner/collaborations/123" routerLinkActive="font-bold" class="block py-1">Collaborations</a>
  <a routerLink="/partner/browse" routerLinkActive="font-bold" class="block py-1">Browse Cases</a>
  <a routerLink="/partner/profile" routerLinkActive="font-bold" class="block py-1">Profile</a>
</div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  // TODO: replace with actual value from AuthService/session
  currentSeekerId = '123';
}


