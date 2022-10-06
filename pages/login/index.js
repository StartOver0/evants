import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "/styles/login.module.css";
import styles from "/styles/loginx.module.css";
import { auth, db } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../lib/firebase";
import Image from "next/image";
import processing from "/public/images/processing.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import NameChecker from "../../components/NameChecker/NameChecker";
import { UserContext } from "../../lib/Context";
import Otproot from "../../components/optroot/Otproot";
import toast from "react-hot-toast";
export default function Login() {
  const { user, username } = useContext(UserContext);
  const [eio, seteio] = useState(false); //everything is okay
  const Router = useRouter();
  let [suEmail, setSuEmail] = useState("");
  let [suPass, setSuPass] = useState("");
  let [rSuPass, setRsuPass] = useState("");
  let [siEmail, setsiEmail] = useState("");
  let [siPass, setsiPass] = useState("");
  const [loaderSi, setLoaderSi] = useState(false);
  const [optroot, setOtproot] = useState(false);
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
    let email = siEmail;
    let pass = siPass;
    setLoaderSi(true);
    try {
      let cred = await signInWithEmailAndPassword(auth, email, pass);

      const ref = doc(db, "users", cred.user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        toast.success("Login Sucessfully!");
        Router.push("/");
      } else {
        seteio(true);
      }
    } catch (err) {
      setLoaderSi(false);
      setPasscheckSi(true);
      toast.error(err.message.toString(), { duration: 5000 });
    }
  }
  async function SignUpSubmit(event) {
    settLoader(true);
    const collectionref = collection(db, "users");
    event.preventDefault();
    if (suPass === rSuPass) {
      setPassCheck(false);
      const verifiedEmail = doc(db, "verifiedEmail", suEmail);
      const docSnap = await getDoc(verifiedEmail);
      if (docSnap.exists()) {
        if (docSnap.data().byGoogle) {
          setmsz("You already have a account(Sign with Google)");
          settLoader(false);
          setPassCheck(true);
        } else {
          try {
            await signInWithEmailAndPassword(auth, suEmail, suPass);
            toast.success("Login sucessfully!");

            Router.push("/");
          } catch (err) {
            setmsz("Account already exits but password is wrong");
            setPassCheck(true);
            settLoader(false);
            toast.error(err.message.toString(), { duration: 5000 });
          }
        }
      } else {
        try {
          let email = suEmail;
          let response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          if (response.status != "200") {
            settLoader(true);
            toast.error("Unable to send gmail to ur account", {
              duration: 5000,
            });
            setmsz("Unable to send gmail to ur account");
            setPassCheck(true);
          } else {
            setOtproot(true);
          }
        } catch (err) {
          toast.error(err.message.toString(), { duration: 5000 });
        }
      }
    } else {
      settLoader(false);
      toast.error("password are not same", { duration: 5000 });
      setmsz("Password are not same");
      setPassCheck(true);
    }
  }
  // console.log(suEmail);
  if (optroot) {
    return <Otproot given={{ email: suEmail, pass: suPass }} />;
  }
  if (eio) {
    toast.success("Choose your name");
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
            send otp
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
              value={suEmail}
              onChange={(e) => {
                setSuEmail(e.target.value);
              }}
              id="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              value={suPass}
              onChange={(e) => {
                setSuPass(e.target.value);
              }}
              id="password1"
              type="password"
              placeholder="Password should be atleast 6 characters long"
              required
            />
            <label htmlFor="password2">Confirm Password:</label>
            <br />
            <input
              value={rSuPass}
              onChange={(e) => {
                setRsuPass(e.target.value);
              }}
              id="password2"
              type="password"
              placeholder="Re-enter your password"
              required
            />
            {passCheck ? (
              <div className="text-red-800 animate-pulse">{msz}</div>
            ) : null}
            {loader && (
              <div className="w-[100%] h-[100px] flex justify-center items-center">
                <Image
                  src={processing}
                  className="w-[40px] h-[30px] animate-spin "
                  alt="something"
                />
              </div>
            )}
            {!loader && <button className={styles.button}> send otp</button>}
          </form>
        ) : (
          <form className={styles.formi} onSubmit={SignInSubmit}>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              value={siEmail}
              onChange={(e) => {
                setsiEmail(e.target.value);
              }}
              id="email"
              type="eamil"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password1">Password:</label>
            <br />
            <input
              value={siPass}
              onChange={(e) => {
                setsiPass(e.target.value);
              }}
              id="password1"
              type="password"
              placeholder="Enter Password"
              required
            />

            {passCheckSi ? (
              <div className="text-red-800 animate-pulse">
                {"Wrong password"}
              </div>
            ) : null}
            {!loaderSi && <button className={styles.button}>Login</button>}
          </form>
        )}
        {loaderSi && (
          <div className="w-[100%] h-[100px] flex justify-center items-center">
            <Image
              className="w-[40px] h-[30px] animate-spin"
              src={processing}
              alt="something"
            />
          </div>
        )}
        <>
          {" "}
          <div className={styles.or_div}>
            <hr className={styles.hr} />
            <p>OR</p>
            <hr className={styles.hr} />
          </div>
          <button
            onClick={() => {
              try {
                const collectionref = collection(db, "users");
                signInWithPopup(auth, provider).then(async (result) => {
                  const ref = doc(db, "users", result.user.uid);
                  const docSnap = await getDoc(ref);
                  if (docSnap.exists()) {
                    // console.log("yes done it");
                    toast.success("LogIn with Google Sucessful");
                    Router.push("/");
                  } else {
                    seteio(true);
                  }
                });
              } catch (err) {
                setPassCheck(true);
                toast.error(err.message.toString(), { duration: 5000 });
                setmsz("google error");
              }
            }}
            className={styles.google_authentication}
          >
            &copy; Sign with Google
          </button>
          <div className="text-red-700 text-sm pt-2">
            *if you unable to login with your account with gmail and password
            please try sign with google (no data will be lost if you had
            account)
          </div>
        </>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context){
//   return{
//     props: {caller: true}
//   }
// }
