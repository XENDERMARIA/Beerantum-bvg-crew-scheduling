import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function EmployeeSchedule() {
    const { currentUser, drivers, schedules, responses, submitResponse } = useContext(AppContext);
    const driver = drivers.find(d => d.id === currentUser);
    const sched = schedules[currentUser];
    const existingResponse = responses[currentUser];
    const [selected, setSelected] = useState(existingResponse?.type || null);
    const [comment, setComment] = useState(existingResponse?.comment || "");
    const [submitted, setSubmitted] = useState(!!existingResponse);

    if (!driver) return null;

    const handleSubmit = () => {
        if (!selected) return;
        submitResponse(currentUser, selected, comment);
        setSubmitted(true);
    };

    const totalHours = sched ? sched.schedule.reduce((s, d) => s + d.hours, 0) : 0;
    const daysOff = sched ? sched.schedule.filter(d => d.off).length : 0;

    return (
        <div className="content">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="page-title">My March Schedule</h1>
                    <p className="page-sub">Proposed schedule for March 2026 · Review and respond by February 20</p>
                </div>
                {sched && (
                    <div className="flex items-center gap-4">
                        <div className="match-ring" style={{ borderColor: sched.matchScore > 85 ? "var(--green)" : "var(--yellow)" }}>
                            {sched.matchScore}%
                        </div>
                        <div>
                            <div style={{ fontWeight: 700 }}>Preference Match</div>
                            <div style={{ fontSize: 13, color: "var(--sub)" }}>Based on your settings</div>
                        </div>
                    </div>
                )}
            </div>

            {!sched ? (
                <div className="empty-state card">
                    <div className="empty-icon">⏳</div>
                    <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Schedule not yet generated</p>
                    <p>The admin hasn't run the quantum optimizer yet. Check back soon.</p>
                </div>
            ) : (
                <>
                    {}
                    <div className="grid-4 mb-6">
                        {[
                            { label: "Total Hours", val: `${totalHours.toFixed(1)}h`, color: "var(--yellow)" },
                            { label: "Avg / Week", val: `${(totalHours / 4).toFixed(1)}h`, color: "var(--blue)" },
                            { label: "Shifts", val: 7 - daysOff, color: "var(--green)" },
                            { label: "Days Off", val: daysOff, color: "var(--purple)" },
                        ].map(s => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-val" style={{ color: s.color }}>{s.val}</div>
                            </div>
                        ))}
                    </div>

                    {}
                    <div className="card mb-6">
                        <div className="card-header">
                            <div className="card-title">📅 Week 1: March 3–9, 2026</div>
                            <span className={`badge ${driver.route === "M29" ? "badge-yellow" : "badge-green"}`}>Line {driver.route}</span>
                        </div>
                        <div className="cal-grid">
                            <div className="cal-head label">Driver</div>
                            {["Mon 3", "Tue 4", "Wed 5", "Thu 6", "Fri 7", "Sat 8", "Sun 9"].map(d => (
                                <div key={d} className="cal-head">{d}</div>
                            ))}
                            <div style={{ background: "var(--muted)", padding: "20px", display: "flex", flexDirection: "column", gap: 4 }}>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>{driver.name}</div>
                                <div style={{ fontSize: 12, color: "var(--sub)" }}>{driver.id}</div>
                            </div>
                            {sched.schedule.map((day, i) => (
                                <div key={i} className={`cal-cell${day.off ? " off" : ""}`}>
                                    {day.off ? (
                                        <span style={{ color: "var(--green)", fontSize: 13, fontWeight: 700 }}>✓ Day Off</span>
                                    ) : (
                                        <div className={`shift-pill${driver.route === "M41" ? " m41" : ""}`}>
                                            <div className="shift-time">{day.start} – {day.end}</div>
                                            <div className="shift-info">{day.line} · {day.hours}h</div>
                                            <div className="shift-info">{driver.preferredRelief}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {}
                    {submitted ? (
                        <div className="alert alert-success mb-4" style={{ padding: "20px 24px", borderRadius: 10 }}>
                            <span style={{ fontSize: 24 }}>{selected === "accept" ? "✅" : selected === "alternative" ? "🔄" : "❌"}</span>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 4 }}>Response submitted!</div>
                                <div style={{ fontSize: 14 }}>
                                    You {selected === "accept" ? "accepted" : selected === "alternative" ? "requested an alternative for" : "rejected"} this schedule.
                                    {comment && <> Comment: "{comment}"</>}
                                </div>
                                <button className="btn btn-ghost btn-sm mt-2" onClick={() => setSubmitted(false)}>Edit Response</button>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">📝 Your Response</div>
                                <span className="badge badge-warn" style={{ background: "rgba(255,75,75,0.15)", color: "var(--red)", border: "1px solid rgba(255,75,75,0.3)" }}>Due Feb 20</span>
                            </div>

                            <div className="response-grid mb-6">
                                {[
                                    { id: "accept", cls: "accept", icon: "✅", title: "Accept Schedule", desc: "I'm happy with this schedule and confirm availability for all assigned shifts." },
                                    { id: "alternative", cls: "alt", icon: "🔄", title: "Request Alternative", desc: "I'd like to see different options that better match my preferences." },
                                    { id: "reject", cls: "reject", icon: "❌", title: "Reject Schedule", desc: "This schedule doesn't work for me. I need significant changes." },
                                ].map(r => (
                                    <div key={r.id} className={`response-card ${r.cls}${selected === r.id ? " sel" : ""}`} onClick={() => setSelected(r.id)}>
                                        <div className="response-icon">{r.icon}</div>
                                        <div className="response-title">{r.title}</div>
                                        <div className="response-desc">{r.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Additional Comments (Optional)</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Tell us why you're accepting, requesting changes, or rejecting this schedule..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </div>

                            <button
                                className={`btn btn-lg ${selected ? "btn-yellow" : "btn-ghost"} w-full`}
                                onClick={handleSubmit}
                                disabled={!selected}
                                style={{ opacity: selected ? 1 : 0.4 }}
                            >
                                Submit Response →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
