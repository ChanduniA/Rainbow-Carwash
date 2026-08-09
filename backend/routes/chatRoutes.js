// backend/routes/chatRoutes.js
//
// Handles POST /api/chat
// Flow: user message -> pull relevant cars from Firestore -> ask Groq -> return reply
//
// No extra npm package needed — Groq's API is OpenAI-compatible, so we just
// use the built-in fetch() that comes with Node.js 18+.

import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// Same fallback list used in adminRoutes.js, so the chatbot still works
// even if Firestore is empty or unreachable during a demo.
const fallbackVehicles = [
  { id: 'v1', name: 'Porsche 911 GT3 RS', brand: 'Porsche', model: '911 GT3 RS', price: 248500, year: 2024, mileage: '1,200 mi', fuel: 'Petrol', transmission: 'PDK Automatic', bodyType: 'Coupe', location: 'Miami, FL', status: 'available' },
  { id: 'v2', name: 'BMW M4 Competition xDrive', brand: 'BMW', model: 'M4 Competition', price: 89900, year: 2023, mileage: '4,500 mi', fuel: 'Petrol', transmission: '8-Speed M Steptronic', bodyType: 'Coupe', location: 'Los Angeles, CA', status: 'available' },
  { id: 'v3', name: 'Audi RS6 Avant Performance', brand: 'Audi', model: 'RS6 Avant', price: 132000, year: 2024, mileage: '2,100 mi', fuel: 'Petrol', transmission: 'Tiptronic Automatic', bodyType: 'Wagon', location: 'New York, NY', status: 'available' },
  { id: 'v4', name: 'Mercedes-AMG GT 63 S', brand: 'Mercedes-Benz', model: 'AMG GT 63 S', price: 165000, year: 2023, mileage: '8,900 mi', fuel: 'Petrol', transmission: 'AMG SPEEDSHIFT 9-Speed', bodyType: 'Coupe', location: 'Dallas, TX', status: 'sold' },
  { id: 'v5', name: 'Tesla Model S Plaid', brand: 'Tesla', model: 'Model S Plaid', price: 94990, year: 2024, mileage: '500 mi', fuel: 'Electric', transmission: 'Single-Speed Fixed', bodyType: 'Sedan', location: 'San Francisco, CA', status: 'available' },
];

// ─── Helper: get all vehicles from Firestore (or fallback) ───────────────────
async function getAllVehicles() {
  try {
    const snapshot = await db.collection('vehicles').get();
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  } catch (e) {
    console.warn('⚠️ Chatbot: using fallback vehicle list (Firestore unreachable)');
  }
  return fallbackVehicles;
}

// ─── Helper: find cars relevant to the user's message ─────────────────────────
// Simple keyword matching against fuel type, brand, model, body type, status.
function findRelevantVehicles(message, vehicles) {
  const text = message.toLowerCase();

  const fuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];
  const mentionedFuel = fuelTypes.find((f) => text.includes(f));

  const mentionedAvailability = text.includes('available') || text.includes('in stock')
    ? 'available'
    : text.includes('sold')
    ? 'sold'
    : null;

  let matches = vehicles.filter((car) => {
    let ok = true;
    if (mentionedFuel) ok = ok && (car.fuel || '').toLowerCase() === mentionedFuel;
    if (mentionedAvailability) ok = ok && (car.status || '').toLowerCase() === mentionedAvailability;

    // Brand/model mention check
    const brandMatch = car.brand && text.includes(car.brand.toLowerCase());
    const modelMatch = car.model && text.includes(car.model.toLowerCase());
    if (!mentionedFuel && !mentionedAvailability && !brandMatch && !modelMatch) {
      // no specific filter detected — don't force a match here, handled below
      return null;
    }
    return ok && (brandMatch || modelMatch || mentionedFuel || mentionedAvailability);
  }).filter(Boolean);

  // If nothing detected in the message at all, just send a general snapshot
  // (first 8 cars) so the AI still has real data to work with.
  if (matches.length === 0 && !mentionedFuel && !mentionedAvailability) {
    matches = vehicles.slice(0, 8);
  }

  return matches.slice(0, 10); // keep the prompt small
}

// ─── Helper: detect if the user is asking to book/trade-in, so we can give ───
// them a real button to the actual page instead of letting the AI pretend
// it can do it.
function detectActionLink(message) {
  const text = message.toLowerCase();

  const inspectionKeywords = ['inspection', 'inspect', 'book an appointment', 'schedule a visit', 'test drive'];
  const tradeInKeywords = ['trade-in', 'trade in', 'trade my', 'appraisal', 'sell my car', 'sell my vehicle'];

  if (inspectionKeywords.some((k) => text.includes(k))) {
    return { label: 'Go to Inspection Booking', url: '/inspection' };
  }
  if (tradeInKeywords.some((k) => text.includes(k))) {
    return { label: 'Go to Trade-In Page', url: '/trade-in' };
  }
  return null;
}

// ─── POST /api/chat ────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ success: false, message: 'GROQ_API_KEY is not set in backend/.env' });
    }

    const allVehicles = await getAllVehicles();
    const relevantCars = findRelevantVehicles(message, allVehicles);

    const inventoryText = relevantCars.length
      ? relevantCars
          .map(
            (c) =>
              `- ${c.year} ${c.brand} ${c.model} | Price: $${c.price} | Mileage: ${c.mileage} | Fuel: ${c.fuel} | Transmission: ${c.transmission} | Body: ${c.bodyType} | Location: ${c.location} | Status: ${c.status}`
          )
          .join('\n')
      : 'No matching vehicles found in current inventory.';

    const systemPrompt = `You are the Rainbow Traders AI Concierge, a helpful assistant for a resale/used car dealership.
Only answer using the inventory data provided below — never invent cars, prices, or availability that aren't listed.
These are all resale (used) vehicles, so do not mention manufacturer warranties.
If the user asks something unrelated to cars, trade-ins, or the dealership, politely redirect them.
Keep replies concise and friendly.

IMPORTANT — things you must NEVER do:
- You cannot book, schedule, confirm, or cancel a vehicle inspection appointment. You have no access to the booking system.
- You cannot start, submit, or process a trade-in appraisal or trade-in request. You have no access to that system.
- Never say things like "I've booked your inspection", "your appointment is confirmed", "I've submitted your trade-in", or anything implying you performed an action on the user's behalf. This never happened and would be a lie to the user.
- Your job is only to answer questions with information (prices, specs, availability, general process explanations).

When it is the right move:
- If the user wants to book/schedule a vehicle inspection, tell them you can't book it for them and that they should go to the Inspection Booking page to schedule it themselves.
- If the user wants a trade-in appraisal or wants to submit their vehicle, tell them you can't process it for you and that they should go to the Trade-In page to submit it themselves.

Current relevant inventory:
${inventoryText}`;

    // Groq uses an OpenAI-compatible chat completions endpoint.
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.4,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error('Groq API error:', errText);
      return res.status(502).json({ success: false, message: 'AI service error. Please try again.' });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
    const actionLink = detectActionLink(message);

    return res.status(200).json({ success: true, reply, actionLink });
  } catch (error) {
    console.error('❌ Chat route error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
