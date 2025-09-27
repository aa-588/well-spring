import { Schema, model, Document, Types } from 'mongoose';

export interface IReport extends Document {
    id?: string;
    _id: Types.ObjectId;
    staffId: string;
    content: string;
    createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
    staffId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<IReport>('Report', ReportSchema);
