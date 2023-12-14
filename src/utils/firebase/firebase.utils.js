import { initializeApp }  from 'firebase/app';
import { 
    getAuth, 
    signInWithRediect, 
    signInWithPopup, 
    GoogleAuthProvider,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBkSl_B1ZqBnr62oHle4hiTQtR0mY3QI18",
    authDomain: "hersi-clothing.firebaseapp.com",
    projectId: "hersi-clothing",
    storageBucket: "hersi-clothing.appspot.com",
    messagingSenderId: "150840770000",
    appId: "1:150840770000:web:eccb49e5b56ef878d84dd5"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};