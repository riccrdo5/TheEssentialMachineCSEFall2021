import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBQTbXc53An-a8Uq0N9pNapM6XvqDKVfB0",
  authDomain: "the-essential-machine.firebaseapp.com",
  databaseURL: "https://the-essential-machine-default-rtdb.firebaseio.com",
  projectId: "the-essential-machine",
  storageBucket: "the-essential-machine.appspot.com",
  messagingSenderId: "944367937162"
};

  export const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ experimentalForceLongPolling: true });

