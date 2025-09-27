// src/models/Partner.ts
import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface IPartner extends Document {
    id?: string;
    name: string;
    orgType?: string;      // NGO, Hospital, Corporate etc.
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    createdAt: Date;
}

const PartnerSchema = new Schema<IPartner>({
    name: { type: String, required: true, index: 'text' },
    orgType: String,
    contactPerson: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    createdAt: { type: Date, default: Date.now },
});

withJsonId(PartnerSchema);
export default models.Partner || model<IPartner>('Partner', PartnerSchema);
