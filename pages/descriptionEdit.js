import { useState } from "react";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import processing from "/public/images/processing.png";
import Image from "next/image";
import styles from '/styles/descriptionEdit.module.css';
import toast from "react-hot-toast";
import { collection, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import Router from "next/router";
export default function Home() {
  return (
    <AuthCheck>
      <Description />
    </AuthCheck>
  );
}

function Description() {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    let ref = doc(collection(db, "users"), auth.currentUser.uid);

    try {
      await updateDoc(ref, { Description: desc});
      Router.push("/profile");
    } catch (err) {
      toast.error("Error"); 
      setLoading(false);
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.heading}>Edit Details:</div>
        
        <div className={styles.fields}>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <textarea
            value={desc}
            id = 'description'
            onChange={(e) => {
              if (e.target.value.length <= 150) setDesc(e.target.value);
            }}
            placeholder="description less then 150 character"
            spellCheck="false"
            rows="7"
            cols="30"
            className={styles.input}
            required
          />
        </div>
        {!loading && (
          <button className={styles.btn}>Save Changes</button>
        )}
        {loading && (
          <div className="w-[100%] h-[60px] flex justify-center items-center">
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
