import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import tradeInRoutes from './routes/tradeInRoutes.js';
import inspectionRoutes from './routes/inspectionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Rainbow Traders Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Auth routes: /api/auth/register, /api/auth/login, etc.
app.use('/api/auth', authRoutes);

// Trade-in routes
app.use('/api/trade-in', tradeInRoutes);

// Inspection routes
app.use('/api/inspection', inspectionRoutes);

// Executive Admin Panel routes: /api/admin/*
app.use('/api/admin', adminRoutes);

// AI Chatbot route: /api/chat
app.use('/api/chat', chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found.` });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚗  Rainbow Traders Backend');
  console.log(`🟢  Server running on http://localhost:${PORT}`);
  console.log(`🔗  Health check: http://localhost:${PORT}/health`);
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use by another running process.`);
    console.error(`💡 Stop the previous node process or choose a different PORT in backend/.env`);
  } else {
    console.error('❌ Server error:', err);
  }
});
