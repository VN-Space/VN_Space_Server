import { Document } from 'mongoose'

export enum GENDER_OPTION {
    MEN = 'men',
    WOMEN = 'women',
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
}

export interface IUserRegister {
    email: string
    password: string
    fullName: string
    provider: PROVIDER_OPTION
}

export interface ISignIn {
    email: string
    password: string
}