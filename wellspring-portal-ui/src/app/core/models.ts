export interface Donor { id: string; userId: string; preferences?: string[]; }
export interface Seeker { id: string; name: string; documents: string[]; status: 'pending' | 'verified' | 'rejected'; assignedVolunteerId?: string; }
export interface Case { id: string; seekerId: string; notes: string[]; tasks: string[]; attachments: string[]; status: 'open' | 'in-progress' | 'closed'; }
export interface Donation { id: string; donorId: string; amount: number; paymentId?: string; date: string; allocation?: { caseId: string; amount: number }[]; }
export interface Payment { id: string; gateway: 'razorpay'; reference: string; amount: number; status: 'created' | 'captured' | 'failed' | 'refunded'; receiptUrl?: string; }
