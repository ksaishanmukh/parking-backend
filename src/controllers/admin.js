import Admin from "../models/admin.js";

export default {
    async register(req, res) {
        try {
            const { name, phone, email, password } = req.body;
            const admin = await Admin.register(name, phone, email, password);
            res.status(201).send(admin);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.login(email, password);
            if (!admin) {
                return res.status(404).send({ error: 'Access denied' });
            }
            res.send(admin);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}
