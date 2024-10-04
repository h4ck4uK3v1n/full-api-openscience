import express from 'express';
import { UserWrapper } from '../../data/interfaces/user-wrapper';

const UserRoutes = (database: UserWrapper) => {
    const userRoutes = express.Router();
    userRoutes.get('/users', async (req, res) => {
        // Create a new user
        const userList = database.find();
        res.status(201).json({ userList });
    });
    userRoutes.post('/users', async (req, res) => {
        // Create a new user
        const user = database.create(req.body);
        res.status(201).json({ user });
    });
    userRoutes.get('/users/:id', async (req, res) => {
        // Get a user by id
        const user = database.findById(req.params.id);
        res.status(200).json({ user });
    });
    userRoutes.put('/users/:id', async (req, res) => {
        // Update a user by id
        const user = database.update(req.body, req.params.id);
        res.status(200).json({ user });
    });
    return userRoutes;
}
export default UserRoutes;