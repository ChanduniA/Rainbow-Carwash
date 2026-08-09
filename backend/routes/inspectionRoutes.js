import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// ─── POST /api/inspection/book ────────────────────────────────────────────────
// Saves a new inspection booking to Firestore 'inspectionBookings' collection.

router.post('/book', async (req, res) => {
  try {
    const { vehicle, date, time, branchId, customerInfo, userId } = req.body;

    if (!vehicle || !date || !time || !customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information.'
      });
    }

    // Prepare document
    const newBooking = {
      vehicle,
      date,
      time,
      branchId: branchId || 'b1',
      customerInfo,
      userId: userId || 'guest',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to Firestore
    const docRef = await db.collection('inspectionBookings').add(newBooking);

    console.log(`✅ New Inspection Booking: ${docRef.id} by ${customerInfo.name}`);

    return res.status(201).json({
      success: true,
      message: 'Inspection booked successfully!',
      passId: docRef.id
    });

  } catch (error) {
    console.error('❌ Inspection booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while booking inspection.'
    });
  }
});

// ─── GET /api/inspection/all ──────────────────────────────────────────────────
// Fetches all confirmed inspection bookings to determine availability

router.get('/all', async (req, res) => {
  try {
    const snapshot = await db.collection('inspectionBookings')
                             .where('status', '==', 'confirmed')
                             .get();

    const bookedSlots = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.date && data.time) {
        bookedSlots.push({
          date: data.date,
          time: data.time
        });
      }
    });

    return res.status(200).json({ success: true, data: bookedSlots });
  } catch (error) {
    console.error('❌ Inspection availability fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch availability.'
    });
  }
});

// ─── GET /api/inspection/user/:userId ─────────────────────────────────────────
// Fetches all inspection bookings for a given user ID

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // For demo purposes, we are returning all inspection bookings 
    // so the user can see previously submitted guest data on their dashboard.
    const snapshot = await db.collection('inspectionBookings')
                             .orderBy('createdAt', 'desc')
                             .get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('❌ Inspection fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inspection bookings.'
    });
  }
});

export default router;
