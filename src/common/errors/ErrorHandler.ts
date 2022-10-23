import { Response } from 'express';
import { BaseError, HttpStatusCode } from '.';
import { ERROR_CODE } from "../../constants";

class ErrorHandler {
    public isTrustedError(error: Error): boolean {
        if (error instanceof BaseError) {
            return <boolean>error?.isOperational;
        }
        return false;
    }
    
    public handleError(err: BaseError, res: Response) {
        if (this.isTrustedError(err) && res) {
            this.handleTrustedError(err as BaseError, res);
        } else {
            this.handleCriticalError(err, res);
        }
    }
    
    private handleTrustedError(err: BaseError, res: Response) {
        res.status(err.httpCode).json({
            status: 'error',
            message: err.message ? err.message : 'Unknown error',
            code: err.code || ERROR_CODE.E111
        })
    }
    
    private handleCriticalError(err: BaseError, res?: Response) {
        if (res) {
            res.status(err.httpCode).json({
                status: 'error',
                message: err.message ? err.message : 'Critical error',
                code: err.code || ERROR_CODE.E111
            })
        }
    }
}

export const errorHandler = new ErrorHandler();
