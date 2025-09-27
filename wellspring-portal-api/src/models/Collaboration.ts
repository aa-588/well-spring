// src/models/Collaboration.ts
import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface ICollaboration extends Document {
    id?: string;
    partnerId: string;
    caseId?: string;
    description: string;
    status?: 'proposed' | 'active' | 'completed' | 'cancelled';
    createdAt: Date;
}

const CollaborationSchema = new Schema<ICollaboration>({
    partnerId: { type: String, required: true, index: true },
    caseId: { type: String, index: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['proposed', 'active', 'completed', 'cancelled'], default: 'proposed' },
    createdAt: { type: Date, default: Date.now },
});

withJsonId(CollaborationSchema);
export default models.Collaboration || model<ICollaboration>('Collaboration', CollaborationSchema);
