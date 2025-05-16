import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDt1juBGcq-y4pcW6WV3jt4h4gqUHnXejk",
  authDomain: "e-com-e88fa.firebaseapp.com",
  projectId: "e-com-e88fa",
  storageBucket: "e-com-e88fa.firebasestorage.app",
  messagingSenderId: "232868521943",
  appId: "1:232868521943:web:18a82dd320bbae649f4d92",
  measurementId: "G-VY1LS4XK6M"
};

const app = initializeApp(firebaseConfig);

export default app