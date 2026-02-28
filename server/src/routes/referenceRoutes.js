import { Router } from 'express';
import { ROTATION_SEGMENTS } from '../data/segments.js';
import { TRAVEL_TIMES } from '../data/travelTimes.js';

const router = Router();

router.get('/segments', (req, res) => {
    res.json({
        total: 10,
        represents: 58676,
        segments: ROTATION_SEGMENTS,
        note: 'This is demo data. Production would have 58,676 segments.'
    });
});

router.get('/travel-times', (req, res) => {
    res.json(TRAVEL_TIMES);
});

export default router;
