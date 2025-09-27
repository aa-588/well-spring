import { Schema, model, models, Document } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface IDonation extends Document {
    id?: string;
    donorId: string;
    caseId: string;
    amount: number;
    date: Date;
}

const DonationSchema = new Schema<IDonation>({
    donorId: { type: String, required: true, index: true },
    caseId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

withJsonId(DonationSchema);

export default models.Donation || model<IDonation>('Donation', DonationSchema);
