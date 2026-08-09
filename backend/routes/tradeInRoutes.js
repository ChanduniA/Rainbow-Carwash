import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// ─── POST /api/trade-in/request ───────────────────────────────────────────────
// Saves a new trade-in request to Firestore 'tradeInRequests' collection.

router.post('/request', async (req, res) => {
  try {
    const { formData, images, userId } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: 'Form data is required.'
      });
    }

    // Validate required fields
    const requiredFields = ['brand', 'model', 'year', 'fullName', 'emailAddress', 'phoneNumber'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }

    // Prepare document
    const newRequest = {
      ...formData,
      userId: userId || 'guest',
      images: images || [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Firestore
    const docRef = await db.collection('tradeInRequests').add(newRequest);

    console.log(`✅ New Trade-In Request submitted: ${docRef.id} by ${formData.fullName}`);

    return res.status(201).json({
      success: true,
      message: 'Trade-In Request submitted successfully!',
      referenceId: docRef.id
    });

  } catch (error) {
    console.error('❌ Trade-In submit error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// ─── GET /api/trade-in/user/:userId ───────────────────────────────────────────
// Fetches all trade-in requests for a given user ID

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // For demo purposes, we are returning all trade-in requests 
    // so the user can see previously submitted guest data on their dashboard.
    const snapshot = await db.collection('tradeInRequests')
                             .orderBy('createdAt', 'desc')
                             .get();

    if (snapshot.empty) {
      return res.status(200).json({ success: true, data: [] });
    }

    const tradeIns = [];
    snapshot.forEach(doc => {
      tradeIns.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json({ success: true, data: tradeIns });
  } catch (error) {
    console.error('❌ Trade-In fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch trade-in requests.'
    });
  }
});

export default router;
