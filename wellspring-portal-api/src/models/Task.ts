import { Schema, model, Document, Types } from 'mongoose';
import { withJsonId } from './_plugins/toJSON';

export interface ITask extends Document {
    id?: string;
    _id: Types.ObjectId;
    title: string;
    assignedTo: string; // volunteer/staff userId
    caseId?: string;
    status: 'pending' | 'in-progress' | 'done';
    dueDate?: Date;
    createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    assignedTo: { type: String, required: true, index: true },
    caseId: { type: String, index: true },
    status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    dueDate: Date,
    createdAt: { type: Date, default: Date.now }
});

withJsonId(TaskSchema);
export default model<ITask>('Task', TaskSchema);
