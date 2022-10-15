import { Schema, Types, model } from 'mongoose';
import { IAuth } from './auth.interface';

const authSchema: Schema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            required: true,
            index: true
        },
        refreshToken: {
            type: String,
            required: true
        },
    },
    {
        id: false,
    }
);

const AuthModel = model<IAuth>('auth', authSchema);

export default AuthModel;
