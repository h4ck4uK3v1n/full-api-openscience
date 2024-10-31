import {z} from 'zod';

export const postSchema = z.object({
    body: z.object({
        roleType: z.string().nonempty('role is required'),
    })    
});

export const putSchema = z.object({
    body: z.object({
        roleType: z.string().nonempty('role is required'),
    }),
    params: z.object({
        id: z.string(),
    }),
});