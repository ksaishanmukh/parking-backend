import User from '../models/users.js';

export default {
    async create(req, res) {
        try {
            const user = await User.create(req.body.name, req.body.phone);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            await User.update(req.params.id, req.body.name, req.body.phone);
            res.send({ message: 'User updated successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.params.id);
            res.send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}
