import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminResponses from "../pages/admin/AdminResponses";
import AdminDatabase from "../pages/admin/AdminDatabase";

export default function AdminShell() {
    const { logout } = useContext(AppContext);
    const [tab, setTab] = useState("dashboard");
    const tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "responses", label: "Employee Responses" },
        { id: "database", label: "Database" },
    ];

    return (
        <div className="app">
            <nav className="nav">
                <div className="nav-brand">
                    <div className="bvg-logo">BVG</div>
                    <div>
                        <div className="nav-title">Crew Scheduling</div>
                        <div className="nav-sub">Admin Portal</div>
                    </div>
                </div>
                <div className="nav-tabs">
                    {tabs.map(t => (
                        <button key={t.id} className={`nav-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="nav-user">
                    <span className="badge-role badge-admin">Admin</span>
                    <div className="avatar">A</div>
                    <button className="btn btn-ghost btn-sm" onClick={logout}>Logout</button>
                </div>
            </nav>
            {tab === "dashboard" && <AdminDashboard />}
            {tab === "responses" && <AdminResponses />}
            {tab === "database" && <AdminDatabase />}
        </div>
    );
}
