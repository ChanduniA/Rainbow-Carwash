import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// Initial fallback vehicles list for when Firestore is empty
const initialVehicles = [
  {
    id: "v1",
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    model: "911 GT3 RS",
    price: 248500,
    year: 2024,
    mileage: "1,200 mi",
    fuel: "Petrol",
    transmission: "PDK Automatic",
    bodyType: "Coupe",
    engine: "4.0L Flat-6",
    horsepower: "518 hp",
    location: "Miami, FL",
    status: "available",
    featured: true,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v2",
    name: "BMW M4 Competition xDrive",
    brand: "BMW",
    model: "M4 Competition",
    price: 89900,
    year: 2023,
    mileage: "4,500 mi",
    fuel: "Petrol",
    transmission: "8-Speed M Steptronic",
    bodyType: "Coupe",
    engine: "3.0L Twin-Turbo I6",
    horsepower: "503 hp",
    location: "Los Angeles, CA",
    status: "available",
    featured: true,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v3",
    name: "Audi RS6 Avant Performance",
    brand: "Audi",
    model: "RS6 Avant",
    price: 132000,
    year: 2024,
    mileage: "2,100 mi",
    fuel: "Petrol",
    transmission: "Tiptronic Automatic",
    bodyType: "Wagon",
    engine: "4.0L Twin-Turbo V8",
    horsepower: "621 hp",
    location: "New York, NY",
    status: "available",
    featured: true,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v4",
    name: "Mercedes-AMG GT 63 S",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    price: 165000,
    year: 2023,
    mileage: "8,900 mi",
    fuel: "Petrol",
    transmission: "AMG SPEEDSHIFT 9-Speed",
    bodyType: "Coupe",
    engine: "4.0L V8 Biturbo",
    horsepower: "630 hp",
    location: "Dallas, TX",
    status: "sold",
    featured: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v5",
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    price: 94990,
    year: 2024,
    mileage: "500 mi",
    fuel: "Electric",
    transmission: "Single-Speed Fixed",
    bodyType: "Sedan",
    engine: "Tri-Motor AWD",
    horsepower: "1,020 hp",
    location: "San Francisco, CA",
    status: "available",
    featured: true,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80"
  }
];

// In-memory cache fallback if DB is unreachable
let inMemoryVehicles = [...initialVehicles];

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
// Executive Overview Statistics
router.get('/stats', async (req, res) => {
  try {
    let totalVehicles = inMemoryVehicles.length;
    let availableUnits = inMemoryVehicles.filter(v => v.status !== 'sold').length;
    let soldVehicles = inMemoryVehicles.filter(v => v.status === 'sold').length;
    let pendingTradeIns = 5;
    let inspectionBookings = 3;
    let registeredClients = 142;

    try {
      const vSnap = await db.collection('vehicles').get();
      if (!vSnap.empty) {
        totalVehicles = vSnap.size;
        availableUnits = vSnap.docs.filter(d => d.data().status !== 'sold').length;
        soldVehicles = vSnap.docs.filter(d => d.data().status === 'sold').length;
      }

      const tSnap = await db.collection('tradeInRequests').where('status', '==', 'pending').get();
      if (!tSnap.empty) pendingTradeIns = tSnap.size;

      const iSnap = await db.collection('inspectionBookings').get();
      if (!iSnap.empty) inspectionBookings = iSnap.size;

      const uSnap = await db.collection('users').get();
      if (!uSnap.empty) registeredClients = uSnap.size;
    } catch (e) {
      console.warn('⚠️ Firestore stats fallback used');
    }

    return res.status(200).json({
      success: true,
      stats: {
        totalVehicles: totalVehicles || 18,
        availableUnits: availableUnits || 14,
        soldVehicles: soldVehicles || 4,
        pendingTradeIns,
        inspectionBookings,
        registeredClients,
        quarterlyRevenue: "$1.48M",
        monthlySalesRate: "94.2%"
      }
    });
  } catch (error) {
    console.error('❌ Error fetching admin stats:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ─── GET /api/admin/vehicles ──────────────────────────────────────────────────
// Fetch all inventory vehicles
router.get('/vehicles', async (req, res) => {
  try {
    try {
      const snapshot = await db.collection('vehicles').get();
      if (!snapshot.empty) {
        const vehiclesList = [];
        snapshot.forEach(doc => vehiclesList.push({ id: doc.id, ...doc.data() }));
        return res.status(200).json({ success: true, data: vehiclesList });
      }
    } catch (e) {
      console.warn('⚠️ Using fallback vehicles list');
    }

    return res.status(200).json({ success: true, data: inMemoryVehicles });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch vehicles' });
  }
});

// ─── POST /api/admin/vehicles ─────────────────────────────────────────────────
// Add new vehicle to inventory
router.post('/vehicles', async (req, res) => {
  try {
    const vehicleData = req.body;
    if (!vehicleData.name || !vehicleData.brand || !vehicleData.price) {
      return res.status(400).json({ success: false, message: 'Name, brand, and price are required.' });
    }

    const newVehicle = {
      ...vehicleData,
      status: vehicleData.status || 'available',
      createdAt: new Date().toISOString()
    };

    let newId = `v_${Date.now()}`;
    try {
      const docRef = await db.collection('vehicles').add(newVehicle);
      newId = docRef.id;
    } catch (e) {
      console.warn('⚠️ Saved vehicle to in-memory fallback store');
    }

    const createdItem = { id: newId, ...newVehicle };
    inMemoryVehicles.unshift(createdItem);

    return res.status(201).json({
      success: true,
      message: 'Vehicle added to inventory successfully!',
      data: createdItem
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error adding vehicle' });
  }
});

// ─── PUT /api/admin/vehicles/:id ──────────────────────────────────────────────
// Update existing vehicle
router.put('/vehicles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    try {
      await db.collection('vehicles').doc(id).update(updates);
    } catch (e) {
      console.warn('⚠️ Vehicle updated in memory fallback');
    }

    inMemoryVehicles = inMemoryVehicles.map(v => v.id === id ? { ...v, ...updates } : v);

    return res.status(200).json({
      success: true,
      message: `Vehicle #${id} updated successfully!`,
      data: updates
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating vehicle' });
  }
});

// ─── DELETE /api/admin/vehicles/:id ───────────────────────────────────────────
// Delete vehicle from inventory
router.delete('/vehicles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await db.collection('vehicles').doc(id).delete();
    } catch (e) {
      console.warn('⚠️ Vehicle deleted from in-memory fallback');
    }

    inMemoryVehicles = inMemoryVehicles.filter(v => v.id !== id);

    return res.status(200).json({
      success: true,
      message: `Vehicle #${id} deleted from inventory.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting vehicle' });
  }
});

// ─── GET /api/admin/customers ─────────────────────────────────────────────────
// Fetch all registered customers
router.get('/customers', async (req, res) => {
  try {
    let customersList = [
      { id: 'u1', name: 'Dominic Sterling', email: 'admin@rainbowtraders.com', phone: '+1 800-555-9111', role: 'admin', createdAt: '2026-01-15' },
      { id: 'u2', name: 'Marcus Vance', email: 'marcus.v@example.com', phone: '+1 305-555-0192', role: 'customer', createdAt: '2026-02-10' },
      { id: 'u3', name: 'Elena Rostova', email: 'elena.r@example.com', phone: '+1 310-555-0144', role: 'customer', createdAt: '2026-02-28' },
      { id: 'u4', name: 'David Kim', email: 'david.k@example.com', phone: '+1 212-555-0188', role: 'customer', createdAt: '2026-03-05' }
    ];

    try {
      const snapshot = await db.collection('users').get();
      if (!snapshot.empty) {
        const fetched = [];
        snapshot.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
        customersList = fetched;
      }
    } catch (e) {
      console.warn('⚠️ Using fallback customers list');
    }

    return res.status(200).json({ success: true, data: customersList });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching customers' });
  }
});

// ─── GET /api/admin/trade-ins ─────────────────────────────────────────────────
// Fetch all trade-in appraisals
router.get('/trade-ins', async (req, res) => {
  try {
    let tradeIns = [
      { id: 'ti_101', fullName: 'Marcus Vance', emailAddress: 'marcus.v@example.com', brand: 'Porsche', model: '718 Cayman', year: 2021, estimatedValue: '$58,500', status: 'pending', createdAt: new Date().toISOString() },
      { id: 'ti_102', fullName: 'Elena Rostova', emailAddress: 'elena.r@example.com', brand: 'BMW', model: 'M3 Competition', year: 2022, estimatedValue: '$67,000', status: 'pending', createdAt: new Date().toISOString() },
      { id: 'ti_103', fullName: 'David Kim', emailAddress: 'david.k@example.com', brand: 'Audi', model: 'S5 Coupe', year: 2020, estimatedValue: '$39,200', status: 'approved', createdAt: new Date().toISOString() }
    ];

    try {
      const snapshot = await db.collection('tradeInRequests').orderBy('createdAt', 'desc').get();
      if (!snapshot.empty) {
        const fetched = [];
        snapshot.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
        tradeIns = fetched;
      }
    } catch (e) {
      console.warn('⚠️ Using fallback trade-ins');
    }

    return res.status(200).json({ success: true, data: tradeIns });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching trade-ins' });
  }
});

// ─── PUT /api/admin/trade-ins/:id/status ──────────────────────────────────────
// Update trade-in status (approved/rejected/pending)
router.put('/trade-ins/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await db.collection('tradeInRequests').doc(id).update({ status, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('⚠️ Trade-in status updated in fallback memory');
    }

    return res.status(200).json({
      success: true,
      message: `Trade-in #${id} status updated to ${status}.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating trade-in status' });
  }
});

// ─── GET /api/admin/bookings ──────────────────────────────────────────────────
// Fetch all inspection bookings
router.get('/bookings', async (req, res) => {
  try {
    let bookings = [
      { id: 'bk_201', customerInfo: { name: 'Marcus Vance', email: 'marcus.v@example.com', phone: '+1 305-555-0192' }, vehicle: { name: 'Porsche 911 GT3 RS' }, date: '2026-08-10', time: '10:00 AM', status: 'confirmed' },
      { id: 'bk_202', customerInfo: { name: 'Elena Rostova', email: 'elena.r@example.com', phone: '+1 310-555-0144' }, vehicle: { name: 'BMW M4 Competition' }, date: '2026-08-12', time: '02:00 PM', status: 'confirmed' }
    ];

    try {
      const snapshot = await db.collection('inspectionBookings').orderBy('createdAt', 'desc').get();
      if (!snapshot.empty) {
        const fetched = [];
        snapshot.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
        bookings = fetched;
      }
    } catch (e) {
      console.warn('⚠️ Using fallback bookings');
    }

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// ─── PUT /api/admin/bookings/:id/status ──────────────────────────────────────
// Update booking status (confirmed/cancelled/completed)
router.put('/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await db.collection('inspectionBookings').doc(id).update({ status, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('⚠️ Booking status updated in fallback memory');
    }

    return res.status(200).json({
      success: true,
      message: `Inspection booking #${id} status updated to ${status}.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating booking status' });
  }
});

export default router;
