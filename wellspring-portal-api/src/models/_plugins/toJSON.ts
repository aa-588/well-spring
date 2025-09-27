import { Schema } from 'mongoose';

// Attach once per schema to expose `id` and hide __v/_id
export function withJsonId<T>(schema: Schema<T>) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret: { _id?: any; id?: string }) => {
            ret.id = ret._id?.toString?.();
            delete ret._id;
            return ret;
        }
    });
}