import { Router } from 'express';
import { getDrivers, getSchedules, setSchedules, setResponses } from '../store/dataStore.js';
import { generateScheduleFor } from '../utils/scheduleGenerator.js';

const router = Router();

router.get('/', (req, res) => {
    res.json(getSchedules());
});

router.get('/:driverId', (req, res) => {
    const schedule = getSchedules()[req.params.driverId];
    if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found for this driver' });
    }
    res.json(schedule);
});

router.post('/generate', (req, res) => {
    setTimeout(() => {
        const newSchedules = {};
        getDrivers().forEach(driver => {
            newSchedules[driver.id] = generateScheduleFor(driver);
        });

        setSchedules(newSchedules);
        setResponses({});

        res.json({
            success: true,
            count: Object.keys(newSchedules).length,
            schedules: newSchedules,
            message: 'Schedules generated successfully'
        });
    }, 100);
});

router.delete('/', (req, res) => {
    setSchedules({});
    res.json({
        success: true,
        message: 'All schedules deleted'
    });
});

export default router;
