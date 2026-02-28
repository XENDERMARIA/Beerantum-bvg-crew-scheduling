import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function LoginPage() {
    const { login, drivers } = useContext(AppContext);
    const [role, setRole] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const result = login(role, role === "admin" ? "admin" : selectedDriver, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="login-wrap">
            <div className="login-card">
                <div className="login-logo">BVG</div>
                <h1 className="login-title">Crew Scheduling</h1>
                <p className="login-sub">Berlin Quantum Hackathon 2026 · Demo Platform</p>

                <div className="role-grid">
                    <div className={`role-card${role === "admin" ? " sel" : ""}`} onClick={() => { setRole("admin"); setSelectedDriver(null); setPassword(""); setError(""); }}>
                        <div className="role-icon">🏢</div>
                        <div className="role-title">Company Admin</div>
                        <div className="role-sub">Manage schedules & optimization</div>
                    </div>
                    <div className={`role-card${role === "employee" ? " sel" : ""}`} onClick={() => { setRole("employee"); setPassword(""); setError(""); }}>
                        <div className="role-icon">👤</div>
                        <div className="role-title">Employee</div>
                        <div className="role-sub">View schedule & preferences</div>
                    </div>
                </div>

                {role === "employee" && (
                    <div className="mb-4">
                        <p className="form-label" style={{ textAlign: "left", marginBottom: "12px" }}>Select your profile to demo:</p>
                        <div className="driver-select">
                            {drivers.slice(0, 4).map(d => (
                                <div key={d.id} className={`driver-option${selectedDriver === d.id ? " sel" : ""}`} style={selectedDriver === d.id ? { borderColor: "var(--yellow)", background: "rgba(255,213,0,0.06)" } : {}} onClick={() => { setSelectedDriver(d.id); setError(""); }}>
                                    <div className="d-avatar">{d.name.split(" ").map(n => n[0]).join("")}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
                                        <div style={{ fontSize: 12, color: "var(--sub)" }}>{d.id} · {d.route}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(role === "admin" || (role === "employee" && selectedDriver)) && (
                    <div className="mb-4 fade-in">
                        <p className="form-label" style={{ textAlign: "left", marginBottom: "8px" }}>Password:</p>
                        <input
                            type="password"
                            className="form-input"
                            placeholder={role === "admin" ? "Enter 'admin'" : "Enter '1234'"}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                        {error && <p style={{ color: "var(--red)", fontSize: "12px", textAlign: "left", marginTop: "4px" }}>{error}</p>}
                    </div>
                )}

                <button
                    className="btn btn-yellow btn-lg w-full"
                    disabled={!role || (role === "employee" && !selectedDriver) || !password}
                    style={{ opacity: (!role || (role === "employee" && !selectedDriver) || !password) ? 0.4 : 1 }}
                    onClick={handleLogin}
                >
                    {role ? `Enter as ${role === "admin" ? "Admin" : "Employee"}` : "Select a role to continue"} →
                </button>
            </div>
        </div>
    );
}
