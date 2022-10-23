import { BaseError, HttpStatusCode } from '.';

class InternalServerErrorException extends BaseError {
    constructor(message: string = 'Internal Server Error Exception') {
        super('InternalServerErrorException', HttpStatusCode.INTERNAL_SERVER_ERROR, message, 'E500', true);
    }
}

export default InternalServerErrorException;
