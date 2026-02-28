import { useState, useEffect, useContext, createContext, useCallback } from "react";
import { INITIAL_DRIVERS, QUANTUM_RESULT_DB, ROTATION_SEGMENTS_DB, TRAVEL_TIMES } from "../data/constants";
import { generateSchedule } from "../utils/scheduleGenerator";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [view, setView] = useState("login");
    const [userRole, setUserRole] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const [drivers, setDrivers] = useState(() => {
        try { return JSON.parse(localStorage.getItem("bvg_drivers")) || INITIAL_DRIVERS; } catch { return INITIAL_DRIVERS; }
    });
    const [schedules, setSchedules] = useState(() => {
        try { return JSON.parse(localStorage.getItem("bvg_schedules")) || {}; } catch { return {}; }
    });
    const [responses, setResponses] = useState(() => {
        try { return JSON.parse(localStorage.getItem("bvg_responses")) || {}; } catch { return {}; }
    });
    const [dbStatus, setDbStatus] = useState(() => {
        try { return JSON.parse(localStorage.getItem("bvg_db")) || { active: true, created: "2026-02-15", deleteDate: "2026-04-01", size: "247 MB", records: 58676 }; } catch { return { active: true, created: "2026-02-15", deleteDate: "2026-04-01", size: "247 MB", records: 58676 }; }
    });
    const [quantumStatus, setQuantumStatus] = useState("idle");

    useEffect(() => { localStorage.setItem("bvg_drivers", JSON.stringify(drivers)); }, [drivers]);
    useEffect(() => { localStorage.setItem("bvg_schedules", JSON.stringify(schedules)); }, [schedules]);
    useEffect(() => { localStorage.setItem("bvg_responses", JSON.stringify(responses)); }, [responses]);
    useEffect(() => { localStorage.setItem("bvg_db", JSON.stringify(dbStatus)); }, [dbStatus]);

    const login = (role, id, password) => {
        if (role === "admin") {
            if (password === "admin") {
                setUserRole("admin");
                setCurrentUser("admin");
                setView("admin");
                return { success: true };
            }
            return { success: false, message: "Incorrect admin password" };
        } else {
            const driver = drivers.find(d => d.id === id);
            if (driver && driver.password === password) {
                setUserRole("employee");
                setCurrentUser(id);
                setView("employee");
                return { success: true };
            }
            return { success: false, message: "Incorrect password" };
        }
    };
    const logout = () => { setUserRole(null); setCurrentUser(null); setView("login"); };

    const savePreferences = (driverId, prefs) => {
        setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, ...prefs } : d));
    };

    const runQuantumOptimization = useCallback(() => {
        setQuantumStatus("running");
        setTimeout(() => {
            const newSchedules = {};
            drivers.forEach(d => { newSchedules[d.id] = generateSchedule(d); });
            setSchedules(newSchedules);
            setResponses({});
            setQuantumStatus("done");
        }, 3000);
    }, [drivers]);

    const submitResponse = (driverId, type, comment) => {
        setResponses(prev => ({ ...prev, [driverId]: { type, comment, submittedAt: new Date().toISOString() } }));
    };

    const deleteDatabase = () => {
        setDbStatus(prev => ({ ...prev, active: false, deletedAt: new Date().toISOString() }));
        setSchedules({});
        setResponses({});
    };

    const stats = {
        total: drivers.length,
        responded: Object.keys(responses).length,
        accepted: Object.values(responses).filter(r => r.type === "accept").length,
        rejected: Object.values(responses).filter(r => r.type === "reject").length,
        alternative: Object.values(responses).filter(r => r.type === "alternative").length,
        pending: drivers.length - Object.keys(responses).length,
        schedulesGenerated: Object.keys(schedules).length,
    };

    return (
        <AppContext.Provider value={{ view, setView, userRole, currentUser, login, logout, drivers, setDrivers, schedules, responses, dbStatus, quantumStatus, stats, QUANTUM_RESULT_DB, ROTATION_SEGMENTS_DB, TRAVEL_TIMES, savePreferences, runQuantumOptimization, submitResponse, deleteDatabase }}>
            {children}
        </AppContext.Provider>
    );
}
