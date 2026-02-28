export function notFoundHandler(req, res) {
    res.status(404).json({ error: 'Endpoint not found' });
}

export function errorHandler(err, req, res, next) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
}
