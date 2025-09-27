export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    status: 'active' | 'suspended';
}

export interface Role {
    id: number;
    name: 'Admin' | 'Staff' | 'Volunteer' | 'Donor' | 'Seeker' | 'Partner';
    permissions: string[];
}

export interface AuditLog {
    id: number;
    ts: Date;
    actorId: string;
    action: string;
    target?: string;
}

export interface Config {
    id: string;
    key: string;
    value: string | number | boolean;
}
