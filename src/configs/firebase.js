import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2FWJKwNFLnVRc7SASMC2GVuqp-_0-83o",
    authDomain: "sociotub.firebaseapp.com",
    databaseURL: "https://sociotub.firebaseio.com",
    projectId: "sociotub",
    storageBucket: "sociotub.appspot.com",
    messagingSenderId: "204995793979",
    appId: "1:204995793979:web:e34d1f81b6418b2dfa781e",
    measurementId: "G-1GBQFGS2ZV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;