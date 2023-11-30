import { initializeApp } from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5smaRwrmDTCyqCZN-AAfgINhHi1Lw-Q0",
    authDomain: "crwn-clothing-db-8fe12.firebaseapp.com",
    projectId: "crwn-clothing-db-8fe12",
    storageBucket: "crwn-clothing-db-8fe12.appspot.com",
    messagingSenderId: "175693061174",
    appId: "1:175693061174:web:998174584a51216e814c97"
  };

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userDocSnapshot = await getDoc(userDocRef);

  // if user does not exist in database, create user
  if(!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }


  return userDocSnapshot;

};