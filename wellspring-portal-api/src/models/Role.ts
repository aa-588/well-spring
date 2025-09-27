import { Schema, model, Document, Types } from 'mongoose';

export interface IRole extends Document {
    id?: string;
    _id: Types.ObjectId;
    name: 'Admin' | 'Staff' | 'Volunteer' | 'Donor' | 'Seeker' | 'Partner';
    permissions: string[];
}

const RoleSchema = new Schema<IRole>({
    name: {
        type: String,
        enum: ['Admin', 'Staff', 'Volunteer', 'Donor', 'Seeker', 'Partner'],
        required: true
    },
    permissions: [{ type: String }],
}, { timestamps: true });

export default model<IRole>('Role', RoleSchema);
