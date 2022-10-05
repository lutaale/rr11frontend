import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDDbZExQ_qApoi2hMXeuqYkUeNQH-lF4FQ",
    authDomain: "gspacerr11.firebaseapp.com",
    projectId: "gspacerr11",
    storageBucket: "gspacerr11.appspot.com",
    messagingSenderId: "718340117121",
    appId: "1:718340117121:web:13d4ee52ccde94bcd23380",
    measurementId: "G-FLTJ7Y88XK"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;