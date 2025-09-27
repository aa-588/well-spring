// src/models/Seeker.ts
import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface ISeeker extends Document {
    id?: string;
    name: string;
    guardianName?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    documents?: { label: string; url: string }[];
    createdAt: Date;
}

const SeekerSchema = new Schema<ISeeker>({
    name: { type: String, required: true, index: 'text' },
    guardianName: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    documents: [{ label: String, url: String }],
    createdAt: { type: Date, default: Date.now },
});

withJsonId(SeekerSchema);
export default (models.Seeker || model<ISeeker>('Seeker', SeekerSchema));
