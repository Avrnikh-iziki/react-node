import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbCrn-GQ03KbiZWY8ZMxm6NRzLzdJ4F9A",
    authDomain: "react-node-d8e75.firebaseapp.com",
    projectId: "react-node-d8e75",
    storageBucket: "react-node-d8e75.appspot.com",
    messagingSenderId: "936222763312",
    appId: "1:936222763312:web:68cca4b289a737e35680f5"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };