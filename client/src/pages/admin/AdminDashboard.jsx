import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function AdminDashboard() {
    const { stats, schedules, runQuantumOptimization, quantumStatus, QUANTUM_RESULT_DB, dbStatus } = useContext(AppContext);
    const schedulesGenerated = Object.keys(schedules).length > 0;

    return (
        <div className="content">
            <div>
                <h1 className="page-title">Schedule Management</h1>
                <p className="page-sub">March 2026 Planning Period · 150 Drivers · 58,676 Rotation Segments</p>
            </div>

            {}
            <div className="workflow">
                <div className="step done">
                    <div className="step-num">✓</div>
                    <div className="step-title">Data Collection</div>
                    <div className="step-desc">Preferences collected, DB populated with March segments</div>
                    <div className="step-status" style={{ color: "var(--green)" }}>Completed Feb 15</div>
                </div>
                <div className={`step ${schedulesGenerated ? "done" : quantumStatus === "running" ? "active" : ""}`}>
                    <div className="step-num">{schedulesGenerated ? "✓" : quantumStatus === "running" ? <span className="spin">⚡</span> : "2"}</div>
                    <div className="step-title">Quantum Optimization</div>
                    <div className="step-desc">Run hybrid solver to generate optimal schedules</div>
                    <div className="step-status" style={{ color: schedulesGenerated ? "var(--green)" : quantumStatus === "running" ? "var(--yellow)" : "var(--sub)" }}>
                        {schedulesGenerated ? "Completed" : quantumStatus === "running" ? "Running..." : "Awaiting run"}
                    </div>
                </div>
                <div className={`step ${stats.responded > 0 ? "active" : ""}`}>
                    <div className="step-num">{stats.accepted === stats.total ? "✓" : "3"}</div>
                    <div className="step-title">Employee Review</div>
                    <div className="step-desc">Employees accept, request alternatives, or reject schedules</div>
                    <div className="step-status" style={{ color: stats.responded > 0 ? "var(--yellow)" : "var(--sub)" }}>
                        {stats.responded > 0 ? `${stats.responded}/${stats.total} responded` : "Waiting for optimization"}
                    </div>
                </div>
                <div className={`step ${stats.accepted > 0 && stats.pending === 0 ? "done" : ""}`}>
                    <div className="step-num">4</div>
                    <div className="step-title">Final Publication</div>
                    <div className="step-desc">Finalize schedules. DB auto-deletes April 1</div>
                    <div className="step-status" style={{ color: "var(--sub)" }}>Due Feb 25</div>
                </div>
            </div>

            {}
            <div className="grid-4 mb-6">
                <div className="stat-card">
                    <div className="stat-label">Schedules Generated</div>
                    <div className="stat-val" style={{ color: "var(--yellow)" }}>{stats.schedulesGenerated}</div>
                    <div className="stat-change text-sub">of {stats.total} drivers</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Responses</div>
                    <div className="stat-val" style={{ color: "var(--blue)" }}>{stats.responded}</div>
                    <div className="stat-change text-sub">{stats.pending} pending</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Accepted</div>
                    <div className="stat-val text-green">{stats.accepted}</div>
                    <div className="stat-change text-sub">driver acceptances</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Alternatives / Rejected</div>
                    <div className="stat-val text-red">{stats.alternative + stats.rejected}</div>
                    <div className="stat-change text-sub">need re-optimization</div>
                </div>
            </div>

            <div className="grid-2">
                {}
                <div className="q-panel">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="card-title" style={{ color: "white", fontSize: 20 }}>⚛️ Quantum Optimization</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Kipu Quantum Hub · Miray Solver</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="pulse" style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
                            <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>Connected</span>
                        </div>
                    </div>

                    <div className="grid-3 mb-4" style={{ gap: 12 }}>
                        {[
                            { label: "Coverage Rate", val: `${QUANTUM_RESULT_DB.coverageRate}%`, color: "var(--green)" },
                            { label: "Preference Match", val: `${QUANTUM_RESULT_DB.preferenceMatch}%`, color: "var(--yellow)" },
                            { label: "Constraints Met", val: `${QUANTUM_RESULT_DB.constraintsMet}%`, color: "var(--green)" },
                            { label: "Qubits Used", val: QUANTUM_RESULT_DB.qubits, color: "var(--purple)" },
                            { label: "Compute Time", val: QUANTUM_RESULT_DB.computationTime, color: "var(--blue)" },
                            { label: "vs Classical", val: QUANTUM_RESULT_DB.speedupVsClassical, color: "var(--orange)" },
                        ].map(m => (
                            <div key={m.label} className="q-metric">
                                <div className="q-label">{m.label}</div>
                                <div className="q-val" style={{ color: m.color }}>{m.val}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`btn w-full btn-lg ${quantumStatus === "running" ? "btn-ghost" : "btn-purple"}`}
                        onClick={runQuantumOptimization}
                        disabled={quantumStatus === "running"}
                    >
                        {quantumStatus === "running" ? <><span className="spin">⚡</span> Running Optimization...</> : "⚡ Run Quantum Optimization"}
                    </button>

                    {quantumStatus === "done" && (
                        <div className="alert alert-success mt-3">
                            <span>✓</span>
                            <span>Schedules generated for all {stats.total} drivers. Employees can now review.</span>
                        </div>
                    )}
                </div>

                {}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">🗄️ Temporary Database</div>
                            <div className="card-sub">Auto-deletion · March 2026 data</div>
                        </div>
                        <span className={`badge ${dbStatus.active ? "badge-green" : "badge-red"}`}>
                            {dbStatus.active ? "Active" : "Deleted"}
                        </span>
                    </div>

                    {[
                        ["Planning Period", "March 2026"],
                        ["DB Created", dbStatus.created],
                        ["Auto-Delete On", dbStatus.deleteDate],
                        ["Rotation Segments", dbStatus.records.toLocaleString()],
                        ["Size", dbStatus.size],
                        ["Encryption", "TLS 1.3"],
                    ].map(([k, v]) => (
                        <div key={k} className="db-item">
                            <span className="db-key">{k}</span>
                            <span className="db-val" style={{ color: k === "Auto-Delete On" ? "var(--red)" : "var(--text)" }}>{v}</span>
                        </div>
                    ))}

                    <div className="alert alert-warn mt-3">
                        <span>⚠️</span>
                        <div>
                            <strong>Auto-deletion scheduled</strong><br />
                            <span style={{ fontSize: 13 }}>All training data purges April 1, 2026. Export before deadline.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
