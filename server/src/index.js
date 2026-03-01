import express from 'express';
import cors from 'cors';

// Route modules
import driverRoutes from './routes/driverRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import responseRoutes from './routes/responseRoutes.js';
import databaseRoutes from './routes/databaseRoutes.js';
import quantumRoutes from './routes/quantumRoutes.js';
import referenceRoutes from './routes/referenceRoutes.js';

// Middleware
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Production-ready CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ROUTES

app.use('/api/drivers', driverRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/quantum', quantumRoutes);
app.use('/api', referenceRoutes);

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// ERROR HANDLING

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚌 BVG Crew Scheduling API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Drivers: http://localhost:${PORT}/api/drivers`);
});
