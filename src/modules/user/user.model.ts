import { Document, model, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { GENDER_OPTION, IUser, PROVIDER_OPTION } from './user.interface';
import bcrypt from "bcrypt";

const saltRound: number = 12;

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            index: true
        },
        phoneNumber: {
            type: String,
            default: null
        },
        password: {
            type: String,
        },
        fullName: {
            type: String,
        },
        avatar: {
            type: String,
            default: null
        },
        background: {
            type: String,
            default: null
        },
        gender: {
            type: String,
            enum: Object.values(GENDER_OPTION),
            default: GENDER_OPTION.MEN
        },
        dayOfBirth: {
            type: Date,
            default: null
        },
        address: {
            type: String,
            default: null
        },
        provider: {
            type: String,
            enum: Object.values(PROVIDER_OPTION),
            default: PROVIDER_OPTION.EMAIL
        },
        providerId: {
            type: String,
            default: null
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        isRoot: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        id: true
    }
);

// * Hash the password befor it is beeing saved to the database
UserSchema.pre('save', async function (this: IUser, next: (err?: any) => void) {
    // * Make sure you don't hash the hash
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(saltRound)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (err) {
        next(err)
    }
});

UserSchema.plugin(mongoosePaginate);

interface UserModel<T extends Document> extends PaginateModel<T> {
}

const UserModel = model<IUser>('user', UserSchema) as UserModel<IUser>;

export default UserModel;
