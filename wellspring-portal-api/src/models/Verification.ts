import { Schema, model, Document, Types } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface IVerification extends Document {
    id?: string;
    _id: Types.ObjectId;
    caseId: string;
    type: 'document' | 'visit' | 'bill';
    docUrl?: string;
    uploadedBy?: string; // userId
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    createdAt: Date;
}

const VerificationSchema = new Schema<IVerification>({
    caseId: { type: String, required: true, index: true },
    type: { type: String, enum: ['document', 'visit', 'bill'], default: 'document' },
    docUrl: String,
    uploadedBy: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

withJsonId(VerificationSchema);
export default model<IVerification>('Verification', VerificationSchema);
