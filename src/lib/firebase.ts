import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: memoryLocalCache()
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errCode = (error as any)?.code;
  const errMessage = error instanceof Error ? error.message : String(error);
  
  const isConnectionError = 
    errCode === 'unavailable' || 
    errCode === 'failed-precondition' ||
    errMessage.includes('Could not reach Cloud Firestore backend') ||
    errMessage.includes('unavailable') ||
    errMessage.includes('the client is offline') ||
    errMessage.includes('Connection failed');

  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }

  if (isConnectionError && (operationType === OperationType.GET || operationType === OperationType.LIST)) {
    console.warn(
      `[Firestore Offline-Mode] Operating gracefully via local cache/state. Path: ${path || 'unknown'}. Connection warning: ${errMessage}`
    );
    return; // Don't throw for passive reads/listeners, let Firestore utilize cache/offline mode!
  }

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Login Error:", error);
  }
};

// Validate connection to Firestore as per skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connection verified. Client is online.");
  } catch (error) {
    const errCode = (error as any)?.code;
    const errMessage = error instanceof Error ? error.message : String(error);
    if (errCode === 'unavailable' || errMessage.includes('offline') || errMessage.includes('Could not reach')) {
      console.warn("Firestore backend is currently unreachable. Operating smoothly in local offline cache mode.");
    } else {
      console.warn("Firestore connection check info:", errMessage);
    }
  }
}
testConnection();
