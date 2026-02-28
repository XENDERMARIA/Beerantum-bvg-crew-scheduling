import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import EmployeeSchedule from "../pages/employee/EmployeeSchedule";
import EmployeePreferences from "../pages/employee/EmployeePreferences";

export default function EmployeeShell() {
    const { logout, currentUser, drivers } = useContext(AppContext);
    const driver = drivers.find(d => d.id === currentUser);
    const [tab, setTab] = useState("schedule");

    return (
        <div className="app">
            <nav className="nav">
                <div className="nav-brand">
                    <div className="bvg-logo">BVG</div>
                    <div>
                        <div className="nav-title">Crew Scheduling</div>
                        <div className="nav-sub">Employee Portal</div>
                    </div>
                </div>
                <div className="nav-tabs">
                    {[{ id: "schedule", label: "My Schedule" }, { id: "preferences", label: "Preferences" }].map(t => (
                        <button key={t.id} className={`nav-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="nav-user">
                    <span className="badge-role badge-emp">Employee</span>
                    {driver && <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{driver.name}</div>
                        <div style={{ fontSize: 12, color: "var(--sub)" }}>{driver.id}</div>
                    </div>}
                    <div className="avatar">{driver?.name.split(" ").map(n => n[0]).join("")}</div>
                    <button className="btn btn-ghost btn-sm" onClick={logout}>Logout</button>
                </div>
            </nav>
            {tab === "schedule" && <EmployeeSchedule />}
            {tab === "preferences" && <EmployeePreferences />}
        </div>
    );
}
