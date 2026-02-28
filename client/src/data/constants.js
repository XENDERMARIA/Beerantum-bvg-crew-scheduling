export const ROTATION_SEGMENTS_DB = [
    { id: "SEG-001", line: "M29", start: "Cicerostraße Depot", end: "U Wittenbergplatz", startTime: "05:50", endTime: "06:25", duration: 35 },
    { id: "SEG-002", line: "M29", start: "U Wittenbergplatz", end: "U Moritzplatz", startTime: "06:25", endTime: "07:10", duration: 45 },
    { id: "SEG-003", line: "M29", start: "U Moritzplatz", end: "U Hermannplatz", startTime: "07:10", endTime: "07:45", duration: 35 },
    { id: "SEG-004", line: "M41", start: "Britz Depot", end: "S+U Hauptbahnhof", startTime: "06:00", endTime: "06:50", duration: 50 },
    { id: "SEG-005", line: "M41", start: "S+U Hauptbahnhof", end: "U Hallesches Tor", startTime: "06:50", endTime: "07:30", duration: 40 },
    { id: "SEG-006", line: "M41", start: "U Hallesches Tor", end: "U Hermannplatz", startTime: "07:30", endTime: "08:05", duration: 35 },
    { id: "SEG-007", line: "M29", start: "U Hermannplatz", end: "S Halensee", startTime: "14:00", endTime: "14:55", duration: 55 },
    { id: "SEG-008", line: "M41", start: "U Hermannplatz", end: "S Sonnenallee", startTime: "14:00", endTime: "14:40", duration: 40 },
    { id: "SEG-009", line: "M29", start: "S Halensee", end: "Cicerostraße Depot", startTime: "20:00", endTime: "20:40", duration: 40 },
    { id: "SEG-010", line: "M41", start: "S+U Hauptbahnhof", end: "Indira-Gandhi Depot", startTime: "22:30", endTime: "23:10", duration: 40 },
];

export const QUANTUM_RESULT_DB = {
    lastRun: "2026-02-16 14:23",
    computationTime: "14 min",
    qubits: 128,
    coverageRate: 96.8,
    preferenceMatch: 87,
    constraintsMet: 100,
    speedupVsClassical: "19x",
    status: "optimal",
};

export const TRAVEL_TIMES = {
    "U Wittenbergplatz-U Moritzplatz": 12,
    "U Moritzplatz-U Hermannplatz": 8,
    "S+U Hauptbahnhof-U Hallesches Tor": 10,
    "U Hallesches Tor-U Hermannplatz": 9,
    "U Hermannplatz-S Halensee": 15,
    "U Hermannplatz-S Sonnenallee": 12,
};

export const INITIAL_DRIVERS = [
    { id: "DRV-001", name: "Anna Schmidt", route: "M29", shift: "morning", hoursPerDay: 8, hoursPerWeek: 40, weekendOff: true, preferredRelief: "U Wittenbergplatz", consecutiveDaysOff: 2, splitDuty: false, rotationDir: "same", password: "1234" },
    { id: "DRV-002", name: "Michael Weber", route: "M41", shift: "morning", hoursPerDay: 8, hoursPerWeek: 38, weekendOff: false, preferredRelief: "S+U Hauptbahnhof", consecutiveDaysOff: 1, splitDuty: true, rotationDir: "forward", password: "1234" },
    { id: "DRV-003", name: "Sarah Müller", route: "M29", shift: "evening", hoursPerDay: 8.5, hoursPerWeek: 40, weekendOff: false, preferredRelief: "U Moritzplatz", consecutiveDaysOff: 2, splitDuty: false, rotationDir: "backward", password: "1234" },
    { id: "DRV-004", name: "Thomas Fischer", route: "M41", shift: "evening", hoursPerDay: 8, hoursPerWeek: 40, weekendOff: true, preferredRelief: "U Hallesches Tor", consecutiveDaysOff: 2, splitDuty: false, rotationDir: "same", password: "1234" },
    { id: "DRV-005", name: "Lisa Wagner", route: "M29", shift: "day", hoursPerDay: 8, hoursPerWeek: 40, weekendOff: true, preferredRelief: "S Halensee", consecutiveDaysOff: 2, splitDuty: false, rotationDir: "forward", password: "1234" },
];
