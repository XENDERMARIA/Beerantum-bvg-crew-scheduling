import { Router } from 'express';
import { getDrivers, findDriver, findDriverIndex, updateDriver } from '../store/dataStore.js';

const router = Router();

router.get('/', (req, res) => {
    res.json(getDrivers());
});

router.get('/:id', (req, res) => {
    const driver = findDriver(req.params.id);
    if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
});

router.put('/:id/preferences', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const index = findDriverIndex(id);
    if (index === -1) {
        return res.status(404).json({ error: 'Driver not found' });
    }

    const drivers = getDrivers();
    updateDriver(index, {
        ...drivers[index],
        ...updates,
        updatedAt: new Date().toISOString()
    });

    res.json({
        success: true,
        driver: getDrivers()[index],
        message: 'Preferences updated successfully'
    });
});

export default router;
