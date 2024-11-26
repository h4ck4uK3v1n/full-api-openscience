import express from 'express';
import { SEOWrapper } from '../../data/interfaces/seo-wrapper';
import { validateSEOFields } from '../../middlewares/validateSEOFields'

export const SEORoutes = (database: SEOWrapper) => {
    const seoRoutes = express.Router();
    seoRoutes.get('/seo', async (req, res) => {
        // Create a new user
        const seoList = await database.find();
        res.status(201).json({ seoList });
    });
    seoRoutes.post('/seo', validateSEOFields, async (req, res) => {
        // Create a new user
        const seo = await database.create(req.body);
        res.status(201).json({ seo });
    });
    seoRoutes.get('/seo/:id', async (req, res) => {
        // Get a user by id
        const seo = await database.findById(req.params.id);
        if(!seo) return res.status(404).json({ message: 'Seo not Found' });
        
        res.status(200).json({ seo });
    });
    seoRoutes.put('/seo/:id',validateSEOFields, async (req, res) => {
        // Update a user by id
        const seo = await database.update(req.body, req.params.id);

        res.status(200).json({ seo });
    });
    seoRoutes.delete('/seo/:id', async (req, res) => {
        // Delete a user by id
        const seo = await database.remove(req.params.id);

        if(seo.deletedCount === 0) return res.status(404).json({ message: 'Seo not Found' });
        res.status(200).json({ seo });
    });

    return seoRoutes;
}
