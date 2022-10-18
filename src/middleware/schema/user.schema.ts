import { JSONSchemaType } from 'ajv';
import { IUserRegister, PROVIDER_OPTION } from "../../modules";

export const validateRegister: JSONSchemaType<IUserRegister> = {
    type: 'object',
    required: ['fullName', 'email', 'password'],
    properties: {
        fullName: {
            type: 'string',
            maxLength: 255
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 5,
            maxLength: 255
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
        provider: {
            type: "string",
            enum: Object.values(PROVIDER_OPTION),
            nullable: true
        }
    },
    errorMessage: {
        type: 'Invalid input',
        properties: {
            email: 'Email không đúng định dạng',
            password: 'Mật khẩu phải từ 8 đến 25 ký tự',
        },
        required: {
            fullName: 'Họ và tên không được để trống',
            email: 'Email không được để trống',
            password: 'Mật khẩu không được để trống',
        },
        additionalProperties: 'Invalid input',
        _: 'Invalid input'
    }
};
