import footer from "/styles/Footer.module.css";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../lib/Context";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import toast from "react-hot-toast";
import { connectStorageEmulator } from "firebase/storage";

export default function Footer() {
  const { user, username } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [login, setLogin] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (e.target.value == "") {
      return;
    }
    let ref = collection(db, `feedback/${username}/feedback`);
    let d = doc(ref, toString(Math.ceil(Math.random() * 1000000)));
    toast.success("Thank you for sending feedback");
    await setDoc(d, { input });
    setInput("");
  }

  useEffect(() => {
    if (username) {
      setLogin(true);
    }
  }, [username]);
  return (
    <div className={footer.container}>
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
                {"Please Sign with your Google account"}
              </div>
            )}
            <button disabled={!login} className={footer.button}>
              Submit
            </button>
          </form>
        </div>

        <hr />
        <div className={footer.navigation}>
          <div className={footer.navlist}>
            <h3>C.I.K.Y.</h3>
            <Link href="#">
              <a>Home</a>
            </Link>
            <Link href="#">
              <a>Clubs</a>
            </Link>
            <Link href="#">
              <a>Organize</a>
            </Link>
            <Link href="#">
              <a>Compete</a>
            </Link>
            <Link href="#">
              <a>Feedback</a>
            </Link>
          </div>
          <hr />
          <div className={footer.navlist}>
            <h3>About Us</h3>
            <Link href="#">
              <a>Team Section</a>
            </Link>
            <Link href="#">
              <a>Technology </a>
            </Link>
            <Link href="#">
              <a>Our Other Projects</a>
            </Link>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
