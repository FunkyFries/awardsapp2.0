import firebase from "firebase/app";
import "firebase/auth";

// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
//   tenantId: process.env.REACT_APP_TENANT_ID,
// };

export const firebaseConfig = {
  apiKey: "AIzaSyBIfdiJeP_3AqGzSJE_vQ5WoCszNLeIMZ8",
  authDomain: "ccs-awards-app.firebaseapp.com",
  projectId: "ccs-awards-app",
  storageBucket: "ccs-awards-app.appspot.com",
  messagingSenderId: "837275336172",
  appId: "1:837275336172:web:1d9dd710e24cf8f3d154c9",
  measurementId: "G-53PV2DD2R0",
};

export const SignOut = () => {
  firebase
    .auth()
    .signOut()
    .then((result) => {
      console.log(result);
    })
    .catch((e) => console.log(e.message));
};
