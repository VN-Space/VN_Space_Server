import { JSONSchemaType } from 'ajv';
import { IBasicLogin } from "../../modules";

export const validateLogin: JSONSchemaType<IBasicLogin> = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            minLength: 5,
            maxLength: 255
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 25
        }
    },
    additionalProperties: false,
    errorMessage: {
        type: 'Invalid input',
        properties: {
            email: 'Email không đúng định dạng',
            password: 'Mật khẩu phải từ 8 đến 25 ký tự',
        },
        required: {
            email: 'Email không được để trống',
            password: 'Mật khẩu không được để trống',
        },
        additionalProperties: 'Invalid input',
        _: 'Invalid input'
    }
};
