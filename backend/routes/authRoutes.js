import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// ─── POST /api/auth/register ──────────────────────────────────────────────────
// Saves a new user to Firestore 'users' collection.

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required. Please fill in name, email, phone and password.'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // ── Duplicate Email Check ─────────────────────────────────────────────────
    const existingUserSnapshot = await db
      .collection('users')
      .where('email', '==', email.toLowerCase().trim())
      .get();

    if (!existingUserSnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.'
      });
    }

    // ── Save User to Firestore ────────────────────────────────────────────────
    // TODO: In production, hash the password using bcrypt before storing.
    // Example: const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: password, // ⚠️ Plain text — hash with bcrypt in production
      role: 'customer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await db.collection('users').add(newUser);

    console.log(`✅ New user registered: ${newUser.email} (ID: ${docRef.id})`);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Rainbow Traders.',
      userId: docRef.id,
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('❌ Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Authenticates a user against Firestore 'users' collection.

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // ── Default / Demo Accounts Check ──────────────────────────────────────────
    if (cleanEmail === 'admin@rainbowtraders.com') {
      if (password === 'admin123' || password === 'Admin@2026') {
        return res.status(200).json({
          success: true,
          message: 'Login successful! Welcome Admin.',
          userId: 'admin_exec_001',
          user: {
            name: 'Dominic Sterling',
            email: cleanEmail,
            phone: '+1 (800) 555-RAINBOW',
            role: 'admin'
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }
    }

    if (cleanEmail === 'user@rainbowtraders.com' || cleanEmail === 'customer@rainbowtraders.com' || cleanEmail === 'demo@rainbowtraders.com') {
      if (password === 'user123' || password === 'password123' || password === 'demo123' || password === 'password') {
        return res.status(200).json({
          success: true,
          message: 'Login successful! Welcome back.',
          userId: 'cust_demo_777',
          user: {
            name: 'Alexander Vance',
            email: cleanEmail,
            phone: '+1 (555) 234-5678',
            role: 'customer'
          }
        });
      }
    }

    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('email', '==', cleanEmail).get();

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === password) {
          console.log(`✅ User logged in: ${userData.email}`);
          return res.status(200).json({
            success: true,
            message: 'Login successful! Welcome back.',
            userId: userDoc.id,
            user: {
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              role: userData.role
            }
          });
        }
      }
    } catch (dbErr) {
      console.warn('⚠️ Firestore offline/unreachable:', dbErr.message);
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// ─── POST /api/auth/admin-login ───────────────────────────────────────────────
// High-privilege authentication dedicated for Admin Console access.
// Requires email, password, and a 4-digit Security PIN.

router.post('/admin-login', async (req, res) => {
  try {
    const { email, password, securityPin } = req.body;

    if (!email || !password || !securityPin) {
      return res.status(400).json({
        success: false,
        message: 'Admin ID/Email, Password, and 4-digit Security PIN are all required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // ── Default / Demo Admin Account Check ─────────────────────────────────────
    if (cleanEmail === 'admin@rainbowtraders.com') {
      if (password !== 'admin123' && password !== 'Admin@2026') {
        return res.status(401).json({
          success: false,
          message: 'Invalid Admin credentials.'
        });
      }
      if (securityPin !== '7788' && securityPin !== '0000') {
        return res.status(403).json({
          success: false,
          message: 'Invalid 2FA Security Authorization PIN.'
        });
      }

      console.log(`🛡️  Executive Admin logged in: ${cleanEmail}`);
      return res.status(200).json({
        success: true,
        message: 'Executive Security Clearance granted. Welcome Admin.',
        adminToken: `admin_session_${Date.now()}`,
        user: {
          id: 'admin_exec_001',
          name: 'Dominic Sterling',
          email: cleanEmail,
          role: 'admin',
          clearanceLevel: 'Tier-1 Super Admin',
          lastLogin: new Date().toISOString()
        }
      });
    }

    // ── Firestore Admin Check ──────────────────────────────────────────────────
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', cleanEmail).get();

    if (snapshot.empty) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: No Admin account found with this email.'
      });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Ensure account has 'admin' role
    if (userData.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: User does not possess Administrator clearance.'
      });
    }

    if (userData.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin credentials.'
      });
    }

    // Verify 4-digit Security PIN (default to 7788 if not specified on user object)
    const expectedPin = userData.securityPin || '7788';
    if (securityPin !== expectedPin) {
      return res.status(403).json({
        success: false,
        message: 'Invalid 2FA Security Authorization PIN.'
      });
    }

    console.log(`🛡️  Admin logged in via Firestore: ${userData.email}`);

    return res.status(200).json({
      success: true,
      message: 'Admin authorization verified.',
      adminToken: `admin_session_${userDoc.id}_${Date.now()}`,
      user: {
        id: userDoc.id,
        name: userData.name || 'Executive Admin',
        email: userData.email,
        role: 'admin',
        clearanceLevel: 'System Administrator'
      }
    });

  } catch (error) {
    console.error('❌ Admin Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during Admin authentication.'
    });
  }
});

export default router;
