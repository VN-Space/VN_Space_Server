export enum TOKEN_TYPE {
    ACCESS_TOKEN = 1,
    REFRESH_TOKEN = 2
}

export interface IAuth {
    refreshToken: string
    userId: string
}

export interface ICreateAccessToken {
    userId: string
    email: string
}

export interface IBasicLogin {
    email: string
    password: string
}