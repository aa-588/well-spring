import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface IDonor extends Document {
    id?: string;
    name: string;
    email?: string;
    phone?: string;
    preferences?: string[];
    createdAt: Date;
}

const DonorSchema = new Schema<IDonor>({
    name: { type: String, required: true },
    email: { type: String, index: true },
    phone: String,
    preferences: [String],
    createdAt: { type: Date, default: Date.now }
});

withJsonId(DonorSchema);

export default models.Donor || model<IDonor>('Donor', DonorSchema);
