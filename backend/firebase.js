import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your downloaded Firebase service account key JSON
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

let app;

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'rainbow-traders-31141'
    });

    console.log('✅ Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('❌ Firebase Admin SDK initialization failed.');
    console.error('   Make sure serviceAccountKey.json exists in the backend/ folder.');
    console.error('   Download it from: Firebase Console → Settings → Service Accounts → Generate New Private Key');
    process.exit(1);
  }
} else {
  app = admin.app();
}

// Firestore database instance
export const db = admin.firestore();

export default app;
