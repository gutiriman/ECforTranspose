import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const config = {
   apiKey: "AIzaSyDdelaYCqx3fmx88CiFMQxiJ5UfVt_BvgQ",
   authDomain: "react-ec-5b0b3.firebaseapp.com",
   projectId: "react-ec-5b0b3",
   storageBucket: "react-ec-5b0b3.appspot.com",
   messagingSenderId: "470638572178",
   appId: "1:470638572178:web:cd49f300cdcaa58e356c4b",
   measurementId: "G-SB5897NTQR"
};

// Init firebase services
const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export {
   auth,
   firestore,
   storage,
   analytics
};
