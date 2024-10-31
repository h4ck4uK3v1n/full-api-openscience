import { log } from 'console';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const schemaValidationMiddleware = 
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {

            schema.parse({
                body: req.body,
                params: req.params
            });

            next();
        } catch (error) {
            if(error instanceof ZodError){
                log(`Validation error: ${JSON.stringify({
                    errors: error.errors,
                    body: req.body,
                    params: req.params,
                })}`);
                res.status(400).json(error);
            }else {
                log(`Unexpected error: ${JSON.stringify(error)}`);
                res.status(500).json({ message: 'Error Interno del Servidor' });
            }
        }
        
    }