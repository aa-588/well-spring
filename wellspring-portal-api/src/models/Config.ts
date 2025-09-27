import { Schema, model, Document, Types } from 'mongoose';

export interface IConfig extends Document {
    id?: string;
    _id: Types.ObjectId;
    siteName: string;
    allowRegistrations: boolean;
}

const ConfigSchema = new Schema<IConfig>({
    siteName: { type: String, default: 'Wellspring Portal' },
    allowRegistrations: { type: Boolean, default: true },
}, { timestamps: true });

export default model<IConfig>('Config', ConfigSchema);
