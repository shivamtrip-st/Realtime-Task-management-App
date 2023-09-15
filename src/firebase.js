import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyD_X5CUW0JEHPo2_uqHw_uyE4O9ZZQdGxk",
  authDomain: "task-manager-761dc.firebaseapp.com",
  databaseURL: "https://task-manager-761dc-default-rtdb.firebaseio.com",
  projectId: "task-manager-761dc",
  storageBucket: "task-manager-761dc.appspot.com",
  messagingSenderId: "404238392543",
  appId: "1:404238392543:web:473947b38a9f40c37a9d6a",
  measurementId: "G-RNB6P5P2Y7"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const realtimeDb = getDatabase(app);
  
  export { auth, db, realtimeDb };;
  
  
  
  
 