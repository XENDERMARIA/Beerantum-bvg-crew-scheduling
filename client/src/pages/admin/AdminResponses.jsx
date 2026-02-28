import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function AdminResponses() {
    const { drivers, schedules, responses, runQuantumOptimization, quantumStatus } = useContext(AppContext);
    const schedulesGenerated = Object.keys(schedules).length > 0;

    if (!schedulesGenerated) {
        return (
            <div className="content">
                <h1 className="page-title">Employee Responses</h1>
                <p className="page-sub">Run quantum optimization first to generate schedules</p>
                <div className="empty-state">
                    <div className="empty-icon">⚛️</div>
                    <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No schedules generated yet</p>
                    <p style={{ marginBottom: 24 }}>Run the quantum optimizer to generate schedules for all drivers</p>
                    <button className="btn btn-purple btn-lg" onClick={runQuantumOptimization} disabled={quantumStatus === "running"}>
                        {quantumStatus === "running" ? <><span className="spin">⚡</span> Running...</> : "⚡ Run Optimization Now"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="content">
            <h1 className="page-title">Employee Responses</h1>
            <p className="page-sub">Track how employees are responding to their proposed March schedules</p>

            <div className="grid-3 mb-6">
                {[
                    { label: "Accepted", count: Object.values(responses).filter(r => r.type === "accept").length, color: "var(--green)", icon: "✓" },
                    { label: "Alternative Requested", count: Object.values(responses).filter(r => r.type === "alternative").length, color: "var(--blue)", icon: "🔄" },
                    { label: "Rejected", count: Object.values(responses).filter(r => r.type === "reject").length, color: "var(--red)", icon: "✗" },
                ].map(s => (
                    <div key={s.label} className="stat-card flex items-center gap-4">
                        <div style={{ fontSize: 36, fontWeight: 800, color: s.color }}>{s.count}</div>
                        <div>
                            <div style={{ fontWeight: 700 }}>{s.label}</div>
                            <div style={{ fontSize: 13, color: "var(--sub)" }}>{s.icon} drivers</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Driver</th>
                            <th>Route</th>
                            <th>Match Score</th>
                            <th>Response</th>
                            <th>Comment</th>
                            <th>Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map(d => {
                            const sched = schedules[d.id];
                            const resp = responses[d.id];
                            const matchScore = sched?.matchScore || "—";
                            return (
                                <tr key={d.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{d.name}</div>
                                        <div style={{ fontSize: 12, color: "var(--sub)" }}>{d.id}</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${d.route === "M29" ? "badge-yellow" : "badge-green"}`}>{d.route}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 700, color: matchScore > 85 ? "var(--green)" : matchScore > 70 ? "var(--yellow)" : "var(--red)" }}>
                                            {sched ? `${matchScore}%` : "—"}
                                        </span>
                                    </td>
                                    <td>
                                        {resp ? (
                                            <span className={`badge ${resp.type === "accept" ? "badge-green" : resp.type === "alternative" ? "badge-blue" : "badge-red"}`}>
                                                {resp.type === "accept" ? "✓ Accepted" : resp.type === "alternative" ? "🔄 Alternative" : "✗ Rejected"}
                                            </span>
                                        ) : (
                                            <span className="badge badge-sub">⏳ Pending</span>
                                        )}
                                    </td>
                                    <td style={{ maxWidth: 200, color: "var(--sub)", fontSize: 13 }}>
                                        {resp?.comment ? `"${resp.comment.slice(0, 60)}${resp.comment.length > 60 ? "..." : ""}"` : "—"}
                                    </td>
                                    <td style={{ fontSize: 12, color: "var(--sub)" }}>
                                        {resp ? new Date(resp.submittedAt).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }) : "—"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
