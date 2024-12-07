import { NextFunction, Request, Response } from 'express';
import { seoSchema } from '../schemmas/seoSchema';
import { StatusCodes } from 'http-status-codes';

export const validateSEOFields = (req: Request, res: Response, next: NextFunction) => {
    const result = seoSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map((e) => ({
            field: e.path[0],
            message: e.message
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    
    next();
};
