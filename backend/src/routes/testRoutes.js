// ============================================
// TEST ROUTES - For verifying API is working
// ============================================

const express = require('express');
const router = express.Router();

// GET /api/test - Simple test endpoint
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Supply Chain Visibility API is working!',
        timestamp: new Date().toISOString(),
        endpoints: {
            'GET /api/test': 'Test this endpoint',
            'GET /api/shipments': 'Get all shipments (coming soon)',
            'POST /api/shipments': 'Create new shipment (coming soon)',
            'GET /api/shipments/:id': 'Get shipment by ID (coming soon)',
            'PUT /api/shipments/:id/status': 'Update shipment status (coming soon)'
        }
    });
});

// GET /api/health - Health check
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

module.exports = router;