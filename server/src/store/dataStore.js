import { driversData } from '../data/drivers.js';

let drivers = [...driversData];
let schedules = {};
let responses = {};
let dbActive = true;

const dbInfo = {
    created: '2026-02-15',
    deleteDate: '2026-04-01',
    records: 58676,
    size: '247 MB'
};

export const getDrivers = () => drivers;
export const getSchedules = () => schedules;
export const getResponses = () => responses;
export const isDbActive = () => dbActive;
export const getDbInfo = () => dbInfo;

export const setDrivers = (newDrivers) => { drivers = newDrivers; };
export const setSchedules = (newSchedules) => { schedules = newSchedules; };
export const setResponses = (newResponses) => { responses = newResponses; };
export const setDbActive = (active) => { dbActive = active; };

export const updateDriver = (index, data) => { drivers[index] = data; };
export const findDriverIndex = (id) => drivers.findIndex(d => d.id === id);
export const findDriver = (id) => drivers.find(d => d.id === id);
