export enum AUTH_ERROR_CODE {
    A_001 = 'A_001',
    A_002 = 'A_002'
}

export const AUTH_ERROR_MESSAGE = {
    [AUTH_ERROR_CODE.A_001]: 'Invalid token',
    [AUTH_ERROR_CODE.A_002]: 'Email hoặc mật khẩu không chính xác.'
};