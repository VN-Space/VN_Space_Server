import cloneDeep from 'lodash/cloneDeep'

export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST_ERROR = 400,
    UNAUTHORIZED_ERROR = 401,
    NOT_FOUND_ERROR = 404,
    INTERNAL_SERVER_ERROR = 500
}

export abstract class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational?: boolean;
    public readonly code: string;
    public readonly method: string | undefined;
    public readonly url: string | undefined;
    public readonly query: object | undefined
    public readonly params: object | undefined
    public readonly body: object | undefined
    
    protected constructor(
        name: string,
        httpCode: HttpStatusCode,
        description: string,
        code: string,
        isOperational: boolean,
        method?: string,
        url?: string,
        query?: object,
        params?: object,
        body?: object
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
    
        this.name = name;
        this.httpCode = httpCode;
    
        this.code = code;
        this.url = url;
        this.method = method;
        this.query = cloneDeep(query || {});
        this.params = cloneDeep(params || {});
        this.body = cloneDeep(body || {});
    
        if (isOperational !== undefined) {
            this.isOperational = isOperational;
        }
    
        Error.captureStackTrace(this);
    }
}
