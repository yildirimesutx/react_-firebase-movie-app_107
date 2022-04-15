import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";;

//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings

// yukarıda verilen döküman linki ile yapılmak isenilen ilgili fonksiyon aşağıda olduğu gibi bir fonksiyona tanımlanıyor, bunu async await ile yapıyoruz daha kısa yazılması için.
// her bir ilgili fonksiyonu, giriş kaydı, doğrulama gibi fonksiyonları ilgili sayfalara import ediyoruz. ve ilgili buton veya formda belirtilen fonksiyona dahil ediyoruz.

//  kullanılacak olan key ve anahtarları env dosyasında topluyoruz ve aşağıda belirtildiği şekilde çağırma işlemi yapıyoruz.



const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDZ5NyX6_jVs74Ms1H60ZhTyowAX-UvTlw",
//   authDomain: "movie-app-53e15.firebaseapp.com",
//   projectId: "movie-app-53e15",
//   storageBucket: "movie-app-53e15.appspot.com",
//   messagingSenderId: "944797644565",
//   appId: "1:944797644565:web:dfc5a36455ea49a7391b1c"
// };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, displayName, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
     await updateProfile(auth.currentUser, {
      displayName: displayName,
     })


    navigate("/");
    console.log(userCredential);
  } catch (err) {
    alert(err.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    alert(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
  alert("logged out successfully");
};


// 

export const userObserver = (setCurrentUser)=>{

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
       setCurrentUser(currentUser)

    } else {
      // User is signed out
      setCurrentUser(false)
    }
  });
}

  //* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      // ...
    });
};