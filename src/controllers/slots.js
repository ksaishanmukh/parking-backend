import Slot from "../models/slots.js";

export default {
    async getFloors(req, res) {
        try {
            const { mall_id } = req.query;
            const floors = await Slot.getFloors(mall_id);
            res.send(floors);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async getSlotsByFloor(req, res) {
        try {
            const { mall_id, floor_no } = req.query;
            const slots = await Slot.getSlotsByFloor(mall_id, floor_no);
            res.send(slots);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async isAvailable(req, res) {
        try {
            const { id } = req.params;
            const isAvailable = await Slot.isAvailable(id);
            res.send({ isAvailable });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const { mall_id, floor_no, slot_no, is_available } = req.body;
            const slot = await Slot.create(mall_id, floor_no, slot_no, is_available);
            res.status(201).send(slot);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id, is_available } = req.body;
            await Slot.update(id, is_available);
            res.send({ message: 'Slot updated successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Slot.delete(id);
            res.send({ message: 'Slot deleted successfully' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}
