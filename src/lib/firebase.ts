import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, addDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Connectivity check as per guidelines
async function testConnection() {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase connection failed: Please check your network or configuration.");
    } else if (error instanceof Error && !error.message.includes('insufficient permissions')) {
      // We expect 'insufficient permissions' because we don't allow reading this test path, 
      // but ANY other error (like project not found) should be logged.
      console.warn("Firebase initialization check:", error.message);
    }
  }
}

testConnection();

export interface Lead {
  email: string;
  pricePoint: string;
  createdAt: any;
}

export const saveLead = async (email: string, pricePoint: string) => {
  const leadsRef = collection(db, 'leads');
  return await addDoc(leadsRef, {
    email,
    pricePoint,
    createdAt: serverTimestamp()
  });
};
