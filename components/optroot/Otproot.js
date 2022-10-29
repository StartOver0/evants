import { async } from "@firebase/util";
import Image from "next/image";
import React, { useRef, useState } from "react";
import NameChecker from "../NameChecker/NameChecker";
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import processing from "/public/images/processing.png";
import { db } from "../../lib/firebase";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
export default function Otproot({ given }) {
  let otp = useRef("");
  const [loading, setloading] = useState(false);
  const [msz, setMsz] = useState("");
  const [nameCheker, setNameChecker] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setloading(true);
    let fieldValue = otp.current.value;
    let ref = doc(db, "otp", given.email);
    let docSnap;
    try {
      docSnap = await getDoc(ref);
    } catch (err) {
      setloading(false);
      toast.error("Error!");
    }
    const realOtp = docSnap.data().Otp;
    if (realOtp == fieldValue) {
      setMsz("");
      try {
        await createUserWithEmailAndPassword(auth, given.email, given.pass);

        setNameChecker(true);
      } catch (err) {
        toast.error("Error!");
        setloading(false);
        setMsz("email already exists");
      }
    } else {
      setloading(false);
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
          ref={otp}
          className="border-solid block border-black border-3"
          required
        />
        {msz !== "email already exists" ? (
          <p className="text-red-800">{msz}</p>
        ) : (
          <div className="text-blue-600 hover:text-red-600">
            <Link href="/">go to home(Gmail is Taken!)</Link>
          </div>
        )}
        {!loading ? (
          <button className=" my-3 border-solid border-black border-3 p-1 hover:bg-blue-600">
            submit
          </button>
        ) : (
          <div className="w-[100%] h-[100px] flex justify-center items-center">
            <Image
              className="w-[40px] h-[30px] animate-spin"
              src={processing}
              alt="something"
            />
          </div>
        )}
      </form>
    </div>
  );
}
