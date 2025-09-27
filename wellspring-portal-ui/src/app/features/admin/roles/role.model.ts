export interface Role {
    id: string;
    name: 'Admin' | 'Staff' | 'Volunteer' | 'Donor' | 'Seeker' | 'Partner';
    permissions: string[]; // e.g. 'users.read', 'users.write', 'payments.refund'
}
