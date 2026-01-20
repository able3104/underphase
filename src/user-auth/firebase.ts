// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

export class file {}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new OAuthProvider('Kakao');
signInWithRedirect(auth, provider);
getRedirectResult(auth)
  .then((result) => {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.

    if (!result) return;

    // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(result);
    if (!credential) return;

    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
  })
  .catch((error) => {
    // Handle error.
  });
