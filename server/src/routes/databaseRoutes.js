import { Router } from 'express';
import { getSchedules, getResponses, getDrivers, isDbActive, getDbInfo, setDbActive, setSchedules, setResponses } from '../store/dataStore.js';

const router = Router();

router.get('/status', (req, res) => {
    res.json({
        active: isDbActive(),
        ...getDbInfo(),
        currentRecords: Object.keys(getSchedules()).length,
        responseCount: Object.keys(getResponses()).length
    });
});

router.delete('/', (req, res) => {
    setDbActive(false);
    setSchedules({});
    setResponses({});

    res.json({
        success: true,
        deletedAt: new Date().toISOString(),
        message: 'Database deleted successfully'
    });
});

router.post('/export', (req, res) => {
    const backup = {
        drivers: getDrivers(),
        schedules: getSchedules(),
        responses: getResponses(),
        exportedAt: new Date().toISOString()
    };

    res.json({
        success: true,
        backup,
        message: 'Database exported successfully'
    });
});

export default router;
