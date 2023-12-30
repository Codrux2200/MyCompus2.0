import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyCTvwkzlTtIxxsrtmg0lJh8NhuPLTObn1M",
  authDomain: "mycampus-74605.firebaseapp.com",
  databaseURL: "https://mycampus-74605-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mycampus-74605",
  storageBucket: "mycampus-74605.appspot.com",
  messagingSenderId: "241661623705",
  appId: "1:241661623705:web:d4138efcc4c8dcc47f2708",
  measurementId: "G-L8RHVVT26F"
};

export const app = initializeApp(firebaseConfig);