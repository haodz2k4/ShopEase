import { Request, Response, NextFunction } from "express";
import { pick } from "../utils/pick";
import Joi, {ObjectSchema, ValidationResult} from "joi";
import ApiError from "../utils/ApiError";
interface ValidationSchema {
    params?: ObjectSchema,
    query?: ObjectSchema,
    body?: ObjectSchema
}

export const validate = (schema: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validSchema = pick(schema, ['params','query','body'])
        const object = pick(req, Object.keys(validSchema) as Array<keyof Request>);
        const compileSchema = Joi.object(validSchema) 

        const {value, error}: ValidationResult = compileSchema
        .prefs({errors: {label: 'key'}, abortEarly: false})
        .validate(object)
        if (error) {
            const errorMessage = error.details.map((details) => details.message).join(', ');
            return next(new ApiError(400,errorMessage));
        }
        
        Object.assign(req, value);
        
        next();
    }
}
