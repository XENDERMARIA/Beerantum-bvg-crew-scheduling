import { Router } from 'express';
import { getResponses, getSchedules } from '../store/dataStore.js';

const router = Router();

router.get('/', (req, res) => {
    res.json(getResponses());
});

router.get('/:driverId', (req, res) => {
    const response = getResponses()[req.params.driverId];
    if (!response) {
        return res.status(404).json({ error: 'No response found for this driver' });
    }
    res.json(response);
});

router.post('/:driverId', (req, res) => {
    const { driverId } = req.params;
    const { type, comment } = req.body;

    if (!['accept', 'alternative', 'reject'].includes(type)) {
        return res.status(400).json({
            error: 'Invalid response type. Must be: accept, alternative, or reject'
        });
    }

    const responses = getResponses();
    responses[driverId] = {
        type,
        comment: comment || '',
        submittedAt: new Date().toISOString()
    };

    const schedules = getSchedules();
    if (schedules[driverId]) {
        schedules[driverId].status = type;
    }

    res.json({
        success: true,
        response: responses[driverId],
        message: 'Response submitted successfully'
    });
});

router.put('/:driverId', (req, res) => {
    const { driverId } = req.params;
    const { type, comment } = req.body;

    const responses = getResponses();
    if (!responses[driverId]) {
        return res.status(404).json({ error: 'No existing response to update' });
    }

    responses[driverId] = {
        ...responses[driverId],
        type: type || responses[driverId].type,
        comment: comment !== undefined ? comment : responses[driverId].comment,
        updatedAt: new Date().toISOString()
    };

    res.json({
        success: true,
        response: responses[driverId],
        message: 'Response updated successfully'
    });
});

export default router;
