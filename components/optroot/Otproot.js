import { async } from "@firebase/util";
import Image from "next/image";
import React, { useRef, useState } from "react";
import NameChecker from "../NameChecker/NameChecker";
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";
import processing from "/public/images/processing.png";
import { db } from "../../lib/firebase";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import styles from '/styles/Otproot.module.css'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";

export default function Otproot({given}) {
  let otp = useRef("");
  const [loading, setloading] = useState(false);
  const [msz, setMsz] = useState("");
  const [nameCheker, setNameChecker] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setloading(true);
    setMsz("")
    let fieldValue = otp.current.value;
    let ref = doc(db, "otp", given.email);
    let docSnap;
    let regex = /\D/;
    try {
      docSnap = await getDoc(ref);
    } catch (err) {
      setloading(false);
      toast.error("Error!");
    }
    const realOtp = docSnap.data().Otp;
    console.log(auth, given);
    console.log(fieldValue.length);
    if(fieldValue.length != 6 || regex.test(fieldValue)){
      setloading(false);
      setMsz("Incorrect OTP");
    }
    else if (realOtp == fieldValue) {
      try {
        await createUserWithEmailAndPassword(auth, given.email, given.pass);
        setNameChecker(true);
      } catch (err) {
        console.log(err);
        toast.error("Email is already taken");
        setloading(false);
        setMsz("Email is already taken");
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
    <div className={styles.section}>
      <form
        className={`${styles.form} flex-col`}
        onSubmit={submit}
      >
        <p className={styles.securitySvg}><svg xmlns="http://www.w3.org/2000/svg" fill="#4070f4" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" width={70}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        </p>
        <p className={styles.heading}>OTP VERIFICATION</p>
        <p className={styles.text}>We've send a verfication code to your email - {given.email}</p>
        
        <div className={styles.d}>  
            <label htmlFor="otp" className={styles.label}>OTP: {msz ? <span className={`${styles.msz} animate-pulse`}>  ({msz})</span>: null}</label>
        <input
          id = 'otp'
          type="text"
          ref={otp}
          onClick={() => {setMsz("")}}
          className={styles.input}
          placeholder="Enter verification code"
          required
        />

        {!loading ? (
          <button className={styles.button}>
            submit
          </button>
        ) : (
          <div className="w-[100%] h-[55px] flex justify-center items-center">
            <Image
              className="w-[40px] h-[30px] animate-spin"
              src={processing}
              alt="something"
            />
          </div>
        )}
        </div>
      </form>
    </div>
  );
}
