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
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Import routes
const testRoutes = require('./src/routes/testRoutes');
const authRoutes = require('./src/routes/authRoutes');
const shipmentRoutes = require('./src/routes/shipmentRoutes');

// Import user utilities
const { findUserByUsernameOrEmail, validateUser, createUser } = require('./src/utils/userUtils');

// Initialize app
const app = express();
const server = http.createServer(app);

// ✅ FIXED CORS - Allow all origins for testing
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
});

// ✅ FIXED CORS - Allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

// Test routes
app.use('/api', testRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

app.use('/api/shipments', shipmentRoutes);

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

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing from backend/.env');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('✅ MongoDB connected successfully.');

        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 WebSocket ready for real-time updates`);
            console.log(`🔄 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`\n📋 Available endpoints:`);
            console.log(`   GET  http://localhost:${PORT}/api/test`);
            console.log(`   GET  http://localhost:${PORT}/api/health`);
            console.log(`   GET  http://localhost:${PORT}/api/shipments`);
            console.log(`   POST http://localhost:${PORT}/api/auth/register`);
            console.log(`   POST http://localhost:${PORT}/api/auth/login`);
        });
    } catch (error) {
        console.error('❌ Backend startup failed:', error.message);
        process.exit(1);
    }
}
startServer();

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});