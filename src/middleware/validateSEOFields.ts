import { NextFunction, Request, Response } from 'express';
import { seoSchema } from '../schemaValidator/seoSchema'

export const validateSEOFields = (req: Request, res: Response, next: NextFunction) => {

    const { error } = seoSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((e:any) => ({ field: e.context?.key, message: e.message })) });
    }
    next();
};
