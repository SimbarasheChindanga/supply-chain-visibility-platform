// ============================================
// SUPPLY CHAIN VISIBILITY PLATFORM - BACKEND
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import routes
const testRoutes = require('./src/routes/testRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Import user utilities
const { findUserByUsernameOrEmail, validateUser, createUser } = require('./src/utils/userUtils');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

// Test routes
app.use('/api', testRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// ============================================
// WEBSOCKET CONNECTION
// ============================================

io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    socket.emit('welcome', {
        message: 'Connected to Supply Chain Visibility Platform',
        socketId: socket.id
    });

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
    });

    socket.on('track-shipment', (data) => {
        console.log('📦 Tracking shipment:', data);
        io.emit('shipment-update', data);
    });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket ready for real-time updates`);
    console.log(`🔄 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n📋 Available endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/test`);
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`   POST http://localhost:${PORT}/api/auth/register`);
    console.log(`   POST http://localhost:${PORT}/api/auth/login`);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});