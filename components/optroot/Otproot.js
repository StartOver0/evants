import { async } from "@firebase/util";
import React, { useRef, useState } from "react";
import NameChecker from "../NameChecker/NameChecker";
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default function Otproot({ given }) {
  let opt = useRef("");
  const [msz, setMsz] = useState("");
  const [nameCheker, setNameChecker] = useState(false);
  async function submit(e) {
    e.preventDefault();
    // console.log(given);
    let fieldValue = opt.current.value;
    console.log(given.pass);
    let ref = doc(db, "opt", given.email);
    const docSnap = await getDoc(ref);
    const realOpt = docSnap.data().Opt;
    if (realOpt == fieldValue) {
      setMsz("");
      try {
        await createUserWithEmailAndPassword(auth, given.email, given.pass);

        setNameChecker(true);
      } catch (err) {
        console.log(err);
        setMsz("email already exists");
      }
    } else {
      setMsz("Incorrect OTP");
    }
  }
  if (nameCheker) {
    return <NameChecker />;
  }
  return (
    <div className="h-[70vh] w-[100vw] flex  justify-center items-center">
      <form
        className="border-solid border-black border-3 p-[60px]"
        onSubmit={submit}
      >
        <label className="block">Enter OTP</label>

        <input
          type="text"
          ref={opt}
          className="border-solid block border-black border-3"
        />
        {msz !== "email already exists" ? (
          <p className="text-red-800">{msz}</p>
        ) : (
          <div>
            <Link href="/">go to home(you already have account)</Link>
          </div>
        )}

        <button className=" my-3 border-solid border-black border-3 p-1 hover:bg-blue-600">
          submit
        </button>
      </form>
    </div>
  );
}
