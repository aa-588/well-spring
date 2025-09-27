// src/models/Case.ts
import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface ICase extends Document {
    id?: string;
    caseCode?: string;
    seekerId?: string;               // 👈 link to Seeker
    familyName: string;
    hospital?: string;
    doctor?: string;
    status?: 'active' | 'on-hold' | 'closed';
    nextStep?: string;
    assignedVolunteerId?: string;
    createdAt: Date;
}

const CaseSchema = new Schema<ICase>({
    caseCode: { type: String, index: true },
    seekerId: { type: String, index: true }, // 👈 new
    familyName: { type: String, required: true, index: 'text' },
    hospital: String,
    doctor: String,
    status: { type: String, enum: ['active', 'on-hold', 'closed'], default: 'active' },
    nextStep: String,
    assignedVolunteerId: { type: String, index: true },
    createdAt: { type: Date, default: Date.now },
});

withJsonId(CaseSchema);
export default (models.Case || model<ICase>('Case', CaseSchema));
