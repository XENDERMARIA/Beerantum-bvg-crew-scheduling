import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function EmployeePreferences() {
    const { currentUser, drivers, savePreferences } = useContext(AppContext);
    const driver = drivers.find(d => d.id === currentUser);
    const [prefs, setPrefs] = useState({ ...driver });
    const [saved, setSaved] = useState(false);

    const update = (field, value) => {
        setPrefs(p => ({ ...p, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        savePreferences(currentUser, prefs);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!driver) return null;

    return (
        <div className="content">
            <h1 className="page-title">My Preferences</h1>
            <p className="page-sub">Your preferences are used by the quantum optimizer to generate better schedules</p>

            {saved && (
                <div className="alert alert-success mb-6">
                    <span>✅</span>
                    <span><strong>Preferences saved!</strong> These will be used in the next optimization run.</span>
                </div>
            )}

            <div className="grid-2">
                {}
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">⏰ Working Hours</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Desired Daily Hours</label>
                        <div className="range-val">{prefs.hoursPerDay}h</div>
                        <input type="range" min="6" max="10" step="0.5" value={prefs.hoursPerDay} onChange={e => update("hoursPerDay", parseFloat(e.target.value))} className="form-range" />
                        <div className="flex justify-between mt-2" style={{ fontSize: 12, color: "var(--sub)" }}>
                            <span>6h</span><span>8h</span><span>10h</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Desired Weekly Hours</label>
                        <div className="range-val">{prefs.hoursPerWeek}h</div>
                        <input type="range" min="30" max="48" step="1" value={prefs.hoursPerWeek} onChange={e => update("hoursPerWeek", parseInt(e.target.value))} className="form-range" />
                        <div className="flex justify-between mt-2" style={{ fontSize: 12, color: "var(--sub)" }}>
                            <span>30h</span><span>40h</span><span>48h</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Preferred Shift Pattern</label>
                        <div className="grid-3" style={{ gap: 10 }}>
                            {["morning", "day", "evening"].map(s => (
                                <div key={s} onClick={() => update("shift", s)} style={{
                                    padding: "14px", borderRadius: 8, textAlign: "center", cursor: "pointer",
                                    border: `2px solid ${prefs.shift === s ? "var(--yellow)" : "var(--border)"}`,
                                    background: prefs.shift === s ? "rgba(255,213,0,0.08)" : "var(--muted)", transition: "all 0.2s"
                                }}>
                                    <div style={{ fontSize: 22, marginBottom: 6 }}>{s === "morning" ? "🌅" : s === "day" ? "☀️" : "🌆"}</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>{s}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {}
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">🚌 Route & Days Off</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Preferred Route</label>
                        <select className="form-select" value={prefs.route} onChange={e => update("route", e.target.value)}>
                            <option value="M29">Line M29</option>
                            <option value="M41">Line M41</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Preferred Relief Point</label>
                        <select className="form-select" value={prefs.preferredRelief} onChange={e => update("preferredRelief", e.target.value)}>
                            {prefs.route === "M29"
                                ? ["S Halensee", "U Wittenbergplatz", "U Moritzplatz", "U Hermannplatz"].map(r => <option key={r} value={r}>{r}</option>)
                                : ["S+U Hauptbahnhof", "U Hallesches Tor", "S Sonnenallee", "U Hermannplatz"].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Consecutive Days Off Preferred</label>
                        <div className="flex gap-3">
                            {[1, 2, 3].map(n => (
                                <div key={n} onClick={() => update("consecutiveDaysOff", n)} style={{
                                    flex: 1, padding: "12px", borderRadius: 8, textAlign: "center", cursor: "pointer",
                                    border: `2px solid ${prefs.consecutiveDaysOff === n ? "var(--yellow)" : "var(--border)"}`,
                                    background: prefs.consecutiveDaysOff === n ? "rgba(255,213,0,0.08)" : "var(--muted)",
                                    fontWeight: 700, fontSize: 16, transition: "all 0.2s"
                                }}>
                                    {n}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Weekend Preferences</label>
                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "14px 16px", borderRadius: 8, background: "var(--muted)", cursor: "pointer",
                            border: `1px solid ${prefs.weekendOff ? "var(--green)" : "var(--border)"}`,
                        }} onClick={() => update("weekendOff", !prefs.weekendOff)}>
                            <span>Prefer weekends off</span>
                            <div style={{
                                width: 44, height: 24, borderRadius: 12, position: "relative", transition: "all 0.2s",
                                background: prefs.weekendOff ? "var(--green)" : "var(--muted)",
                                border: `2px solid ${prefs.weekendOff ? "var(--green)" : "var(--border)"}`,
                            }}>
                                <div style={{
                                    position: "absolute", top: 2, left: prefs.weekendOff ? 20 : 2, width: 16, height: 16,
                                    borderRadius: "50%", background: "white", transition: "all 0.2s",
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {}
            <div className="card mt-4">
                <div className="card-header">
                    <div className="card-title">🔄 Work Pattern</div>
                </div>
                <div className="grid-2" style={{ gap: 32 }}>
                    <div className="form-group">
                        <label className="form-label">Rotation Direction</label>
                        <div className="grid-3" style={{ gap: 10 }}>
                            {[
                                { id: "forward", label: "Forward", desc: "Early → Late", icon: "→" },
                                { id: "same", label: "Same Pattern", desc: "Consistent times", icon: "═" },
                                { id: "backward", label: "Backward", desc: "Late → Early", icon: "←" },
                            ].map(r => (
                                <div key={r.id} onClick={() => update("rotationDir", r.id)} style={{
                                    padding: 16, borderRadius: 8, textAlign: "center", cursor: "pointer",
                                    border: `2px solid ${prefs.rotationDir === r.id ? "var(--yellow)" : "var(--border)"}`,
                                    background: prefs.rotationDir === r.id ? "rgba(255,213,0,0.08)" : "var(--muted)", transition: "all 0.2s"
                                }}>
                                    <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.label}</div>
                                    <div style={{ fontSize: 12, color: "var(--sub)" }}>{r.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Split Duties</label>
                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "14px 16px", borderRadius: 8, background: "var(--muted)", cursor: "pointer",
                            border: `1px solid ${prefs.splitDuty ? "var(--blue)" : "var(--border)"}`,
                        }} onClick={() => update("splitDuty", !prefs.splitDuty)}>
                            <div>
                                <div style={{ fontWeight: 600 }}>Accept split duties</div>
                                <div style={{ fontSize: 12, color: "var(--sub)" }}>Shifts with a long break in the middle</div>
                            </div>
                            <div style={{
                                width: 44, height: 24, borderRadius: 12, position: "relative", transition: "all 0.2s",
                                background: prefs.splitDuty ? "var(--blue)" : "var(--muted)",
                                border: `2px solid ${prefs.splitDuty ? "var(--blue)" : "var(--border)"}`,
                            }}>
                                <div style={{
                                    position: "absolute", top: 2, left: prefs.splitDuty ? 20 : 2, width: 16, height: 16,
                                    borderRadius: "50%", background: "white", transition: "all 0.2s",
                                }} />
                            </div>
                        </div>

                        <div className="alert alert-info mt-4">
                            <span>ℹ️</span>
                            <div style={{ fontSize: 13 }}>
                                <strong>How preferences are used:</strong> The quantum optimizer uses your preferences as soft constraints. Hard constraints (legal work-time rules) always take priority.
                            </div>
                        </div>

                        {}
                        <div style={{ marginTop: 20 }}>
                            <div className="form-label">Current Preference Tags</div>
                            <div>
                                <span className="tag">{prefs.route}</span>
                                <span className="tag">{prefs.shift} shift</span>
                                <span className="tag">{prefs.hoursPerDay}h/day</span>
                                <span className="tag">{prefs.hoursPerWeek}h/week</span>
                                {prefs.weekendOff && <span className="tag green">Weekend Off</span>}
                                <span className="tag blue">{prefs.rotationDir} rotation</span>
                                {prefs.splitDuty && <span className="tag blue">Split OK</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-yellow btn-lg w-full mt-4" onClick={handleSave}>
                💾 Save Preferences
            </button>
        </div>
    );
}
