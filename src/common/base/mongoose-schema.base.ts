import { Schema } from "mongoose";

export class BaseSchema extends Schema {
    constructor(definition?: any, options?: any) {
        super(definition, options);
        this.set('toJSON', {
            virtuals: true,
            transform: (doc, converted) => {
                delete converted._id;
                delete converted.__v;
            }
        });
    }
    
}