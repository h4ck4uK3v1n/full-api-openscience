import { z } from 'zod'

export const ArticleSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        date: z.date(),
        brief: z.string(),
        images: z.array(z.object({
            title: z.string(),
            url: z.string()
        })),
        authors: z.array(z.object({
            name: z.string(),
            email: z.string().email()
        })),
        tables: z.array(z.object({
            title: z.string(),
            // content: z.array(z.array(z.string()))
        }))

    })
})