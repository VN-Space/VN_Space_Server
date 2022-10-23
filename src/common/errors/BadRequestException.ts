import { BaseError, HttpStatusCode } from '.';

class BadRequestException extends BaseError {
    constructor(
        code: string,
        message: string = 'BadRequestException',
        errorCode: HttpStatusCode = HttpStatusCode.NOT_FOUND_ERROR,
        isOperational: boolean = true
    ) {
        super('BadRequestException', errorCode, message, code, isOperational);
    }
}

export default BadRequestException;
