import Mall from '../models/malls.js';

export default {
    async getAll(res) {
        try {
            const malls = await Mall.getAllLocations();
            console.log(malls);
            if(!malls) {
                return res.status(404).send({ error: 'Malls not found' });
            }
            res.send(malls);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async getAllByLocation(req, res) {
        try {
            const { location } = req.query;
            const malls = await Mall.getAllByLocation(location);
            res.send(malls);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const { admin_id, name, location } = req.body;
            const mall = await Mall.create(admin_id, name, location);
            res.status(201).send(mall);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, location } = req.body;
            await Mall.update(id, name, location);
            res.send({ message: 'Mall updated successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Mall.delete(id);
            res.send({ message: 'Mall deleted successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}
