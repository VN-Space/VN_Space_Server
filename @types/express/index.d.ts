import { Express } from 'express'

declare global {
    declare namespace Express {
        interface Request {
            loggedUser: {
                userId: string,
                email: string,
                refreshKey: string
            }
        }
    }
}

