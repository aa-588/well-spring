import { Schema, model, Document, Types } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface IVolunteer extends Document {
    id?: string;
    _id: Types.ObjectId;
    name: string;
    email?: string;
    phone?: string;
    skills?: string[];
    availability?: string;
    hoursLogged?: number;
    createdAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>({
    name: { type: String, required: true, index: 'text' },
    email: { type: String, index: true, unique: false },
    phone: String,
    skills: [String],
    availability: String,
    hoursLogged: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

withJsonId(VolunteerSchema);
export default model<IVolunteer>('Volunteer', VolunteerSchema);
