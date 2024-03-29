import footer from "/styles/Footer.module.css";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../lib/Context";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import toast from "react-hot-toast";
import { connectStorageEmulator } from "firebase/storage";

export default function Footer() {
  const { profileData } = useContext(UserContext);
  const { user, username } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [login, setLogin] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (e.target.value == "") {
      return;
    }
    if (!auth.currentUser) {
      return;
    }
    let ref = collection(db, `feedback/${auth.currentUser.uid}/feed`);
    let d = doc(ref, Date.now().toString());
    toast.success("Thank you for sending feedback");
    setDoc(d, {
      input,
      time: Date.now(),
      username: profileData.username,
      uid: auth.currentUser.uid,
    });
    setInput("");
  }

  useEffect(() => {
    if (username) {
      setLogin(true);
    }
  }, [username]);
  return (
    <div className={footer.container}>
      <div >
        <div className={footer.footer}> 
          <div className={footer.suggestion_div}>
            <h3 className={footer.head}>Have&nbsp;suggestions?</h3>
            <form onSubmit={submit}>
              {login ? (
                <textarea 
                  onChange={(e) => {
                    if (e.target.value.length <= 300) setInput(e.target.value);
                  }}
                  value={input}
                  rows="4"

                  className={footer.suggestion}
                  placeholder="Write something ..."
                  required
                ></textarea>
              ) : (
                <div className={footer.submitted}>
                  {"Please Sign in with your Google account"}
                </div>
              )}
              <button disabled={!login} className={login ? footer.button: footer.buttonn}>
                Submit
              </button>
            </form>
          </div>

          <hr />
          <div className={footer.navigation}>
            <div className={footer.navlist}>
              <h3>UUEvents</h3>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/clubs">
                <a>Clubs</a>
              </Link>
              <Link href="/organize">
                <a>Organize</a>
              </Link>
              <Link href="/about">
                <a>About us</a>
              </Link>
            </div>
            <hr />
            <div className={footer.navlist}>
              <h3>References</h3>
              <a target="_blank" href="https://nextjs.org/docs">NextJs</a>
              <a target="_blank" href="https://firebase.google.com/docs">Firebase</a>
              <a target="_blank" href="https://tailwindcss.com/">Tailwind</a>
            </div>
          </div>
          <hr className={footer.d}/>
        </div>
        <div className={footer.reserves}>
          <hr />
          Copyright &copy; 2022-2023 UUEvents Inc.
          <div ><button>Terms of Use</button>
          <button>Privacy Policy</button>
          </div>

        </div>
      </div>
    </div>
  );
}
