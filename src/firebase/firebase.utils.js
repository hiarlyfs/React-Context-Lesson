import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDiExzfH669RywzabQcfEem05UcsnQjCdE",
  authDomain: "crwn-db-290ff.firebaseapp.com",
  databaseURL: "https://crwn-db-290ff.firebaseio.com",
  projectId: "crwn-db-290ff",
  storageBucket: "crwn-db-290ff.appspot.com",
  messagingSenderId: "989602988942",
  appId: "1:989602988942:web:c2d3c64b6de344d6791adf",
  measurementId: "G-FHTFHJXHYT",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
