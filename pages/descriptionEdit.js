import { useState } from "react";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import processing from "/public/images/processing.png";
import Image from "next/image";
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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    let ref = doc(collection(db, "users"), auth.currentUser.uid);

    try {
      await updateDoc(ref, { Description: input });
      Router.push("/profile");
    } catch (err) {
      toast.error(err.message.toString());
      setLoading(false);
    }
  }
  return (
    <div className="flex rounded-lg px-[20vw] py-[15vh] m-8 border-solid border-black border-2">
      <form onSubmit={submit} className="flex flex-col">
        <div className="">Changed Description</div>
        <textarea
          value={input}
          onChange={(e) => {
            if (e.target.value.length <= 150) setInput(e.target.value);
          }}
          placeholder="description less then 150 character"
          rows="8"
          cols="30"
          className="border-solid border-black border-2 rounded-lg"
        />
        {!loading && (
          <button className="bg-green-400  mt-3 rounded-lg">Change</button>
        )}
        {loading && (
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
