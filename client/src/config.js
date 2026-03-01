export const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:4000' : '');

export const config = {
    apiUrl: API_URL,
    appName: 'BVG Crew Scheduling',
    version: '1.0.0',
};
