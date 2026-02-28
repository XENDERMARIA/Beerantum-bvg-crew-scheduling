import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function AdminDatabase() {
    const { dbStatus, deleteDatabase, ROTATION_SEGMENTS_DB, TRAVEL_TIMES } = useContext(AppContext);
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div className="content">
            <h1 className="page-title">Database Management</h1>
            <p className="page-sub">Temporary training database · Auto-deletes April 1, 2026</p>

            <div className="grid-2 mb-6">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">🗄️ Active Database Status</div>
                            <div className="card-sub">March 2026 Training Data</div>
                        </div>
                        <span className={`badge ${dbStatus.active ? "badge-green" : "badge-red"}`}>
                            {dbStatus.active ? "● Active" : "● Deleted"}
                        </span>
                    </div>
                    {[
                        ["Planning Period", "March 2026"],
                        ["Created", "February 15, 2026"],
                        ["Auto-Deletion", "April 1, 2026"],
                        ["Records", "58,676 segments"],
                        ["Employee Prefs", "150 records"],
                        ["Optimization Results", "1 run stored"],
                        ["Size on Disk", dbStatus.size],
                        ["Encryption", "AES-256 at rest"],
                        ["Transfer Protocol", "TLS 1.3"],
                    ].map(([k, v]) => (
                        <div key={k} className="db-item">
                            <span className="db-key">{k}</span>
                            <span className="db-val" style={{ color: k === "Auto-Deletion" ? "var(--red)" : undefined }}>{v}</span>
                        </div>
                    ))}

                    {dbStatus.active ? (
                        <div className="flex gap-3 mt-4">
                            <button className="btn btn-ghost">📥 Export Backup</button>
                            {!confirmDelete ? (
                                <button className="btn btn-red" onClick={() => setConfirmDelete(true)}>🗑️ Delete Now</button>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <span style={{ fontSize: 13, color: "var(--red)" }}>Are you sure?</span>
                                    <button className="btn btn-red btn-sm" onClick={() => { deleteDatabase(); setConfirmDelete(false); }}>Yes, Delete</button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="alert alert-error mt-4">
                            <span>🗑️</span>
                            <span>Database was deleted on {dbStatus.deletedAt ? new Date(dbStatus.deletedAt).toLocaleDateString() : "—"}. All training data has been purged.</span>
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-title">⏱️ Travel Time Matrix</div>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 16 }}>Hardcoded travel times between relief points (minutes)</p>
                    {Object.entries(TRAVEL_TIMES).map(([route, mins]) => (
                        <div key={route} className="db-item">
                            <span className="db-key mono" style={{ fontSize: 12 }}>{route}</span>
                            <span className="db-val">{mins} min</span>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="card-title">📊 Sample Rotation Segments</div>
                        <div className="card-sub">Showing 10 of 58,676 total segments (hardcoded sample)</div>
                    </div>
                    <span className="badge badge-yellow">Static DB</span>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Segment ID</th>
                            <th>Line</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ROTATION_SEGMENTS_DB.map(seg => (
                            <tr key={seg.id}>
                                <td className="mono" style={{ fontSize: 12 }}>{seg.id}</td>
                                <td><span className={`badge ${seg.line === "M29" ? "badge-yellow" : "badge-green"}`}>{seg.line}</span></td>
                                <td style={{ fontSize: 13 }}>{seg.start}</td>
                                <td style={{ fontSize: 13 }}>{seg.end}</td>
                                <td className="mono">{seg.startTime}</td>
                                <td className="mono">{seg.endTime}</td>
                                <td>{seg.duration} min</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
