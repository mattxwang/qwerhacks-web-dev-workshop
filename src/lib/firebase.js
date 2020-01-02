import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBV6QuxKFGEpS0IRmlcTfYyvA8xw79thjQ",
    authDomain: "qwer-hacks-2020.firebaseapp.com",
    databaseURL: "https://qwer-hacks-2020.firebaseio.com",
    projectId: "qwer-hacks-2020",
    storageBucket: "qwer-hacks-2020.appspot.com",
    messagingSenderId: "968678842798",
    appId: "1:968678842798:web:f15f7c354f55f5e91d683f"
};

firebase.initializeApp(config);

export default firebase;