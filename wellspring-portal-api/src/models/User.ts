import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    id?: string;
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    roles: string[];
    status: 'active' | 'suspended';
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // for auth (later we can hash)
    roles: [{ type: String, enum: ['Admin', 'Staff', 'Volunteer', 'Donor', 'Seeker', 'Partner'] }],
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
