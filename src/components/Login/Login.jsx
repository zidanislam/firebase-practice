import {
    GithubAuthProvider,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(user);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubLogIn = () =>{
    signInWithPopup(auth, gitHubProvider)
    .then(result=>{
        const loggedUser = result.user;
        setUser(loggedUser)
    })
    .catch(error =>{
        console.log(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(null);
      })
      .cath((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign-Out</button>
      ) : (
        <div>
            <button onClick={handleGoogleLogin}>Sign-in</button>
            <button onClick={handleGithubLogIn}>Git-in</button>
        </div>
      )}

      {user && (
        <div>
          <h2>Name{user.displayName}</h2>
          <p>email:{user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
