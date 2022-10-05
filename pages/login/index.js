import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "/styles/login.module.css";
import styles from "/styles/loginx.module.css";
import { auth, db } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../lib/firebase";
import Image from "next/image";
import processing from "/public/images/processing.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import NameChecker from "../../components/NameChecker/NameChecker";
import { UserContext } from "../../lib/Context";

export default function Login() {
  const { user, username } = useContext(UserContext);
  const [eio, seteio] = useState(false); //everything is okay
  const [gLoading, setGLoading] = useState(false);
  const Router = useRouter();
  let suEmail = useRef("");
  let suPass = useRef("");
  let rSuPass = useRef("");
  let siEmail = useRef("");
  let siPass = useRef("");
  const [loader, settLoader] = useState(false);
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
    console.log(username);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      if (username) {
        Router.push("/");
      } else {
        seteio(true);
      }
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
      settLoader(true);
      try {
        let userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        await setDoc(doc(collectionref, userCredential.user.uid), {
          email: toString(userCredential.user.email),
        });
        seteio(true);
      } catch (err) {
        console.log(err);
        settLoader(false);
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

  if (username && user) {
    Router.push("/");
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
              type="email"
              placeholder="Enter your email address"
              required
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              ref={suPass}
              id="password1"
              type="password"
              placeholder="Password should be atleast 6 characters long"
              required
            />
            <label htmlFor="password2">Confirm Password:</label>
            <br />
            <input
              ref={rSuPass}
              id="password2"
              type="password"
              placeholder="Re-enter your password"
              required
            />
            {passCheck ? (
              <div className="text-red-800 animate-pulse">{msz}</div>
            ) : null}
            {loader && (
              <div className="w-[100%] flex justify-center">
                <Image
                  src={processing}
                  className="w-[40px] h-[30px] animate-spin"
                  alt="something"
                />
              </div>
            )}
            {!loader && <button className={styles.button}>Sign Up</button>}
          </form>
        ) : (
          <form className={styles.formi} onSubmit={SignInSubmit}>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              ref={siEmail}
              id="email"
              type="eamil"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              ref={siPass}
              id="password1"
              type="password"
              placeholder="Enter Password"
              required
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
        {gLoading ? (
          <div className="w-[100%] flex justify-center">
            <Image
              src={processing}
              className="w-[40px] h-[30px] animate-spin"
              alt="something"
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setGLoading(true);
              try {
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
              } catch (err) {
                setGLoading(false);
              }
            }}
            className={styles.google_authentication}
          >
            &copy; Sign with Google
          </button>
        )}
      </div>
    </div>
  );
}

// export async function getServerSideProps(context){
//   return{
//     props: {caller: true}
//   }
// }
