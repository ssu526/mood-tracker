
import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from './firebase-config';

const signup = (e, signupEmail, signupPassword, setSignupEmail, setSignupPassword, setCurrentUser, setAuthError)=> {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential)=>{
          const user = userCredential.user;
          setCurrentUser(user);
          setSignupEmail("");
          setSignupPassword("");
        })
        .catch((error) => {
          setAuthError(error.message);
        });
    
  }

  const login = (e, loginEmail, loginPassword, setLoginEmail, setLoginPassword, setCurrentUser, setAuthError) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
          const user = userCredential.user;
          setCurrentUser(user);
          setLoginEmail("");
          setLoginPassword("");
        })
        .catch((error) => {
          setAuthError(error.message);
        });
  }

  const signout = (setCurrentUser)=> signOut(auth).then(() => {
    setCurrentUser(null);
  }).catch((error) => {
    console.log(error.message);
  });


export {signup, login, signout}
  