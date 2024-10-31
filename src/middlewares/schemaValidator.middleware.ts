import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidationMiddleware = 
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Validando solicitud:", {
                body: req.body,
                params: req.params,
            });
            schema.parse({
                body: req.body,
                params: req.params
            });
            console.log("Solicitud validada exitosamente.");
            next();
        } catch (error) {
            if(error instanceof ZodError){
                console.error("Error de validación:", error.errors);
                res.status(400).json(error);
            }else {
                console.error("Error inesperado:", error);
                res.status(500).json({ message: "Error Interno del Servidor" });
            }
        }
        
    }