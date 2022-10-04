import { signOut, signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "/styles/login.module.css";
import styles from "/styles/loginx.module.css";
import { auth, db } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import NameChecker from "../../components/NameChecker/NameChecker";

export default function Login() {
  const [eio, seteio] = useState(false); //everything is okay
  const Router = useRouter();
  let suEmail = useRef("");
  let suPass = useRef("");
  let rSuPass = useRef("");
  let siEmail = useRef("");
  let siPass = useRef("");
  const [passCheckSi, setPasscheckSi] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  let [isSignUp, setSignUp] = useState(false);
  const [msz, setmsz] = useState("Password are not same");
  useEffect(() => {
    if (Router.isReady) {
      const { value } = Router.query;
      if (value == 1 && isSignUp == false) {
        setSignUp(true);
      }
    }
  }, []);
  async function SignInSubmit(event) {
    event.preventDefault();
    let email = siEmail.current.value;
    let pass = siPass.current.value;
    try {
      let userCredential = await signInWithEmailAndPassword(auth, email, pass);
      console.log("yea we loged in");
    } catch (err) {
      setPasscheckSi(true);
      console.log(err.message);
    }
  }
  async function SignUpSubmit(event) {
    const collectionref = collection(db, "users");
    event.preventDefault();
    let email = suEmail.current.value;
    let pass = suPass.current.value;
    let rpass = rSuPass.current.value;

    if (pass == rpass) {
      setPassCheck(false);
      try {
        let userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        console.log(collectionref);
        console.log(userCredential.user.uid);
        await setDoc(doc(collectionref, userCredential.user.uid), {
          email: toString(userCredential.user.email),
        });
        seteio(true);
      } catch (err) {
        console.log(err);
        setmsz("email already exits");
        setPassCheck(true);
      }
    } else {
      setmsz("Password are not same");
      setPassCheck(true);
    }
  }
  if (eio) {
    return <NameChecker />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <div className={styles.first_one}></div>
        <h2>Welcome New User</h2>
      </div>

      <div className={styles.form}>
        <div className={styles.toggle}>
          <h3
            className={isSignUp ? styles.active_signup : styles.signup}
            onClick={() => {
              setSignUp(true);
            }}
          >
            sign up
          </h3>
          <h3
            className={!isSignUp ? styles.active_login : styles.login}
            onClick={() => {
              setSignUp(false);
            }}
          >
            sign in
          </h3>
        </div>
        {/* <div className={styles.google_authentication}> */}

        {/* </div> */}

        {/* <div className={styles.empty_div}></div> */}

        {isSignUp ? (
          <form className={styles.formi} onSubmit={SignUpSubmit}>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              ref={suEmail}
              id="email"
              type="text"
              placeholder="Enter your email address"
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              ref={suPass}
              id="password1"
              type="text"
              placeholder="Password should be atleast 6 characters long"
            />
            <label htmlFor="password2">Confirm Password:</label>
            <br />
            <input
              ref={rSuPass}
              id="password2"
              type="text"
              placeholder="Re-enter your password"
            />
            {passCheck ? (
              <div className="text-red-800 animate-pulse">{msz}</div>
            ) : null}
            <button className={styles.button}>Sign Up</button>
          </form>
        ) : (
          <form className={styles.formi} onSubmit={SignInSubmit}>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              ref={siEmail}
              id="email"
              type="text"
              placeholder="Enter your email"
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              ref={siPass}
              id="password1"
              type="text"
              placeholder="Enter Password"
            />
            {passCheckSi ? (
              <div className="text-red-800 animate-pulse">
                {"Passworld is not matching"}
              </div>
            ) : null}
            <button className={styles.button}>Login</button>
          </form>
        )}

        <div className={styles.or_div}>
          <hr className={styles.hr} />
          <p>OR</p>
          <hr className={styles.hr} />
        </div>
        <button
          onClick={() => {
            const collectionref = collection(db, "users");
            signInWithPopup(auth, provider).then(async (result) => {
              const ref = doc(db, "users", result.user.uid);
              const docSnap = await getDoc(ref);
              if (docSnap.exists()) {
                // console.log("yes done it");
                Router.push("/");
              } else {
                seteio(true);
              }
            });
          }}
          className={styles.google_authentication}
        >
          &copy; Sign with Google
        </button>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context){
//   return{
//     props: {caller: true}
//   }
// }
