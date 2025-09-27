import { Schema, model, Document, Types } from 'mongoose';

export interface IAudit extends Document {
    id?: string;
    _id: Types.ObjectId;
    actorId: string;
    action: string;
    target?: string;
    ts: Date;
}

const AuditSchema = new Schema<IAudit>({
    actorId: { type: String, required: true },
    action: { type: String, required: true },
    target: { type: String },
    ts: { type: Date, default: Date.now },
}, { timestamps: true });

export default model<IAudit>('Audit', AuditSchema);
