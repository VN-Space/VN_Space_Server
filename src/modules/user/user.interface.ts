import { Document } from 'mongoose'

export enum GENDER_OPTION {
    MAN = 'man',
    WOMAN = 'woman',
    UNISEX = 'unisex',
    BOTH = 'both'
}

export enum PROVIDER_OPTION {
    FACBOOK = 'facebook',
    GOOGLE = 'google',
    EMAIL = 'email',
    OTHER = 'other'
}

export interface IUser extends Document {
    id: string
    email: string
    password: string
    fullName: string
    gender: GENDER_OPTION,
    provider: PROVIDER_OPTION
    isActive: boolean
}

export interface IUserRegister {
    email: string
    password: string
    fullName: string
}

export interface ISignIn {
    email: string
    password: string
}