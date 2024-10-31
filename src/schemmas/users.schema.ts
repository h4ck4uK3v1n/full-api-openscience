import {z} from 'zod';

export const postSchema = z.object({
    body: z.object({
        name: z.string().nonempty('Name is required'),
        email: z.string().email().nonempty('Email is required'),
    })    
});

export const putSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
    }),
    params: z.object({
        id: z.string(),
    }),
});