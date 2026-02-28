# 🚌 BVG Crew Scheduling Platform

**Full-Stack Dynamic Web Application for Berlin Quantum Hackathon 2026**

A complete scheduling system with dual interfaces (Admin + Employee) featuring real-time preference management, schedule optimization, and quantum hardware integration placeholder.

---

## 📦 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Context API
- **Backend**: Node.js, Express.js, REST API
- **Database**: In-memory (localStorage + Express state) → PostgreSQL ready
- **Quantum**: Kipu Quantum Platform (placeholder API endpoints)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed

### Installation

```bash
# 1. Clone/extract the project
cd bvg-crew-scheduling

# 2. Install all dependencies (root + client + server)
npm run install-all

# 3. Start both frontend and backend concurrently
npm run dev
```

The app will open at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

---

## 📁 Project Structure

```
bvg-crew-scheduling/
│
├── client/                          # React Frontend (Vite + TailwindCSS)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx                  # Main app shell with routing
│   │   ├── main.jsx                 # React entry point
│   │   │
│   │   ├── context/                 # Global state management
│   │   │   └── AppContext.jsx       # Context provider with API calls
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── LoginPage.jsx        # Role-based login
│   │   │   ├── admin/               # Admin portal pages
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminResponses.jsx
│   │   │   │   └── AdminDatabase.jsx
│   │   │   └── employee/            # Employee portal pages
│   │   │       ├── EmployeeSchedule.jsx
│   │   │       └── EmployeePreferences.jsx
│   │   │
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── StepWorkflow.jsx
│   │   │   ├── QuantumPanel.jsx
│   │   │   ├── ScheduleCalendar.jsx
│   │   │   └── ResponseCard.jsx
│   │   │
│   │   ├── data/                    # Hardcoded reference data
│   │   │   └── seedData.js          # Segments, travel times, drivers
│   │   │
│   │   └── styles/                  # Global styles
│   │       └── index.css            # TailwindCSS + custom utilities
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Express Backend API
│   ├── src/
│   │   ├── index.js                 # Main Express server
│   │   │
│   │   ├── routes/                  # API route handlers
│   │   │   ├── drivers.js           # Driver preferences API
│   │   │   ├── schedules.js         # Schedule generation API
│   │   │   ├── responses.js         # Employee responses API
│   │   │   ├── database.js          # DB lifecycle management
│   │   │   └── quantum.js           # Quantum platform placeholder
│   │   │
│   │   ├── data/                    # Hardcoded data (DB seed)
│   │   │   ├── drivers.js           # 5 demo drivers
│   │   │   ├── segments.js          # 10 rotation segments
│   │   │   └── travelTimes.js       # Relief point travel matrix
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   │   └── scheduleGenerator.js # Mock quantum optimizer
│   │   │
│   │   └── config/                  # Configuration
│   │       └── constants.js         # API constants, DB settings
│   │
│   └── package.json
│
├── package.json                     # Root package (scripts for dev)
└── README.md                        # This file
```

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api`

### **Drivers** (Employee Preferences)
```
GET    /api/drivers                 # Get all drivers
GET    /api/drivers/:id             # Get specific driver
PUT    /api/drivers/:id/preferences # Update preferences (DYNAMIC)
```

### **Schedules** (Optimization Results)
```
GET    /api/schedules               # Get all schedules
GET    /api/schedules/:driverId     # Get driver's schedule
POST   /api/schedules/generate      # Run quantum optimizer (DYNAMIC)
DELETE /api/schedules               # Clear all schedules
```

### **Responses** (Employee Feedback)
```
GET    /api/responses               # Get all responses (admin view)
GET    /api/responses/:driverId     # Get specific response
POST   /api/responses/:driverId     # Submit response (DYNAMIC)
```

### **Database** (Lifecycle Management)
```
GET    /api/database/status         # Get DB status
DELETE /api/database                # Delete temp database (DYNAMIC)
POST   /api/database/export         # Export backup
```

### **Quantum** (Kipu Platform Placeholder)
```
GET    /api/quantum/status          # Connection status
POST   /api/quantum/optimize        # Send data to platform
GET    /api/quantum/results/:jobId  # Retrieve results
```

---

## 💻 Development Workflow

### Start Development Servers

```bash
# Terminal 1: Start both servers concurrently
npm run dev
```

OR manually:

```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend
cd client
npm run dev
```

### Available Scripts

```bash
# Root directory
npm run install-all  # Install all dependencies
npm run dev          # Start both servers
npm run client       # Start only frontend
npm run server       # Start only backend
npm run build        # Build frontend for production

# Client directory
cd client
npm run dev          # Start dev server (Vite)
npm run build        # Production build
npm run preview      # Preview production build

# Server directory
cd server
npm start            # Start Express server
npm run dev          # Start with nodemon (auto-reload)
```

---

## 🎯 What's Dynamic vs Hardcoded

### ✅ **DYNAMIC** (Real-time, database-backed):

**Employee Side:**
- 📝 Preference form (all inputs update state)
- 📊 Schedule response (Accept/Alternative/Reject + comments)
- 💾 Save preferences → hits Express API
- 🔄 Submit response → saved to backend

**Admin Side:**
- ⚡ Run quantum optimization → generates schedules
- 📈 Response tracking (real-time stats)
- 👥 Employee list with response status
- 🗑️ Delete database → wipes all data
- 📊 Dashboard metrics update live

**System:**
- 🔐 Login/logout with role-based access
- 💾 localStorage persistence (survives refresh)
- 🔄 State management via Context API
- 🌐 REST API communication

### 📦 **HARDCODED** (Static reference data):

Would be from PostgreSQL in production:
- 🚌 Rotation segments (10 demo, represents 58,676)
- 👥 Driver list (5 demo, represents 150)
- 📍 Travel time matrix between relief points
- ⚛️ Quantum result metrics (percentages, speedup)
- 🔌 Quantum API (placeholder, not connected)

---

## 🎬 Demo Workflow

### Full Scenario Walkthrough:

1. **Login as Admin**
   - Username: `admin`, Password: `admin`
   - See empty dashboard

2. **Generate Schedules**
   - Click "⚡ Run Quantum Optimization"
   - 3-second simulated processing
   - 5 schedules generated

3. **Switch to Employee**
   - Logout → Login as "Anna Schmidt"
   - Password: `driver`
   - See proposed schedule with 92% match score

4. **Update Preferences**
   - Go to "Preferences" tab
   - Change route, shift pattern, hours
   - Toggle weekend off, split duties
   - Click "💾 Save Preferences"
   - Updates saved to backend

5. **Submit Response**
   - Go to "My Schedule" tab
   - Choose: Accept / Request Alternative / Reject
   - Add optional comment
   - Click "Submit Response"
   - Response saved immediately

6. **Back to Admin**
   - Logout → Login as admin
   - Go to "Employee Responses" tab
   - See Anna's response with timestamp
   - View statistics: accepted, rejected, pending

7. **Database Management**
   - Go to "Database" tab
   - See lifecycle info (auto-delete April 1)
   - Optional: click "Delete Database"
   - All schedules/responses wiped

---

## 🔐 Login Credentials

### Admin Portal
- **Username**: `admin`
- **Password**: `admin`

### Employee Portal
Choose any driver:
- Anna Schmidt (DRV-001)
- Michael Weber (DRV-002)
- Sarah Müller (DRV-003)
- Thomas Fischer (DRV-004)
- Lisa Wagner (DRV-005)

**Password for all**: `driver`

---

## 🎨 TailwindCSS Customization

All styles use inline Tailwind classes for easy customization:

```jsx
// Example: Change button color
<button className="bg-yellow-400 hover:bg-yellow-500 text-black">
  Click me
</button>

// Change to blue
<button className="bg-blue-500 hover:bg-blue-600 text-white">
  Click me
</button>
```

**Custom colors defined in `tailwind.config.js`:**
```js
colors: {
  bvg: {
    yellow: '#FFD500',
    dark: '#0F0F0F',
    gray: '#1C1C1C',
  }
}
```

---

## 🚢 Production Deployment

### Build for Production

```bash
# Build frontend
cd client
npm run build
# Output: client/dist/

# The backend doesn't need building (Node.js)
```

### Deploy Checklist

- [ ] Replace in-memory storage with PostgreSQL
- [ ] Add JWT authentication
- [ ] Connect real Kipu Quantum API
- [ ] Set up CORS for production domain
- [ ] Add environment variables (.env)
- [ ] Add input validation and sanitization
- [ ] Set up auto-deletion cron job (April 1)
- [ ] Import full 58,676 rotation segments
- [ ] Add all 150 BVG drivers
- [ ] Deploy backend to cloud (AWS, Heroku, Railway)
- [ ] Deploy frontend to CDN (Vercel, Netlify)

---

## 📊 Database Schema (Future PostgreSQL)

```sql
-- Drivers table
CREATE TABLE drivers (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100),
  route VARCHAR(10),
  shift VARCHAR(20),
  hours_per_day DECIMAL(3,1),
  hours_per_week INT,
  weekend_off BOOLEAN,
  preferred_relief VARCHAR(100),
  consecutive_days_off INT,
  split_duty BOOLEAN,
  rotation_dir VARCHAR(20),
  updated_at TIMESTAMP
);

-- Schedules table
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  driver_id VARCHAR(20) REFERENCES drivers(id),
  week_start DATE,
  schedule JSONB,
  match_score INT,
  status VARCHAR(20),
  generated_at TIMESTAMP
);

-- Responses table
CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  driver_id VARCHAR(20) REFERENCES drivers(id),
  schedule_id INT REFERENCES schedules(id),
  response_type VARCHAR(20),
  comment TEXT,
  submitted_at TIMESTAMP
);

-- Rotation segments table (58,676 records)
CREATE TABLE rotation_segments (
  id VARCHAR(20) PRIMARY KEY,
  line VARCHAR(10),
  start_location VARCHAR(100),
  end_location VARCHAR(100),
  start_time TIME,
  end_time TIME,
  duration INT
);
```

---

## ⚛️ Quantum Integration

### Current Implementation (Placeholder)

The quantum endpoints are **placeholders** ready for Kipu Quantum integration:

```javascript
// server/src/routes/quantum.js

// POST /api/quantum/optimize
// In production: forward req.body to Kipu Quantum API
router.post('/optimize', async (req, res) => {
  const jobId = uuidv4();
  
  // TODO: Send to Kipu Quantum
  // const kipuResponse = await fetch('https://kipu-quantum.com/api/optimize', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${KIPU_API_KEY}` },
  //   body: JSON.stringify(req.body)
  // });
  
  res.json({ jobId, status: 'queued', estimatedTime: '14 minutes' });
});
```

### Integration Steps

1. Get Kipu Quantum API credentials
2. Add endpoint URL to `.env`
3. Uncomment API calls in `server/src/routes/quantum.js`
4. Update frontend to poll `/api/quantum/results/:jobId`
5. Parse real optimization results

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 4000 (backend)
npx kill-port 4000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure backend is running and CORS is configured:

```javascript
// server/src/index.js
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
```

---

## 📝 Notes for Hackathon Judges

### What's Functional:

✅ Complete dual interface (Admin + Employee)  
✅ Dynamic preference form with live updates  
✅ Real-time schedule generation  
✅ Employee response system (Accept/Alternative/Reject)  
✅ Admin response tracking dashboard  
✅ Database lifecycle management  
✅ Role-based authentication  
✅ REST API with Express  
✅ State persistence (localStorage)  
✅ TailwindCSS styling (fully customizable)

### What's Simulated:

📦 5 demo drivers (represents 150)  
📦 10 rotation segments (represents 58,676)  
📦 3-second fake optimization delay  
📦 Quantum API placeholder (Kipu Quantum not connected)  
📦 Hardcoded result metrics (96.8% coverage, 19× speedup)

---

## 📄 License

MIT License - Feel free to use and modify

---

## 🏆 Built For

**Berlin Quantum Hackathon 2026**  
Challenge: BVG Crew Scheduling Optimization  
Platform: Kipu Quantum Hub

---

## 🤝 Contributing

This is a hackathon project. To expand:

1. Add more drivers (currently 5 → 150)
2. Import full rotation segments (10 → 58,676)
3. Connect to PostgreSQL
4. Integrate real Kipu Quantum API
5. Add JWT authentication
6. Add email notifications
7. Deploy to production

---

**Questions?** Check the inline comments in the code — every file is documented!
