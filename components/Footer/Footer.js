import footer from "/styles/Footer.module.css";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../lib/Context";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import toast from "react-hot-toast";
import { connectStorageEmulator } from "firebase/storage";

export default function Footer() {
  const { user, username } = useContext(UserContext);
  const [suggestionGiven, setSuggestionGiven] = useState(false);
  const [msz, setMsz] = useState("Please Sign with your Google account"); //Your suggestion is recorded :)
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  let ref;
  if (user && username) {
    ref = doc(collection(db, "feedback"), username);
  }
  async function submit(e) {
    e.preventDefault();

    if (!suggestionGiven && open) {
      console.log("inside here");
      try {
        setDoc(ref, { feedback: input });
        setOpen(false);
        toast.success("Thank you for giving suggestion");
        setMsz("Your suggestion is recorded :)");
        setSuggestionGiven(false);
      } catch (err) {
        toast.error(err.message.toString());
      }
    } else {
      console.log("hello world");
    }
  }

  useEffect(() => {
    if (username) {
      (async () => {
        let ans = await getDoc(ref);
        console.log(ans.exists());
        if (ans.exists()) {
          setSuggestionGiven(false);
          setOpen(false);
          setMsz("Your suggestion is recorded :)");
        } else {
          setOpen(true);
          setSuggestionGiven(true);
        }
      })();
    }
  }, [username]);

  return (
    <div className={footer.container}>
      <div className={footer.footer}>
        <div className={footer.suggestion_div}>
          <h3 className={footer.head}>Have&nbsp;suggestions?</h3>
          <form onSubmit={submit}>
            {suggestionGiven ? (
              <textarea
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                rows="4"
                className={footer.suggestion}
                placeholder="Write something ..."
                required
              ></textarea>
            ) : (
              <div className={footer.submitted}>{msz}</div>
            )}
            <button
              className={footer.button}
              onClick={() => {
                setSuggestionGiven(false);
              }}
            >
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
