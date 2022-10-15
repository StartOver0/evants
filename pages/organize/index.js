import AuthCheck from "/components/AuthCheck/AuthCheck";
import { UserContext } from "../../lib/Context";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import Image from "next/image";
import processing from "/public/images/processing.png";

import {
  collection,
  doc,
  writeBatch,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
export default function AdminPostsPage() {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [loading, setloading] = useState(false);
  const slug = encodeURI(kebabCase(title));

  const createPost = async (e) => {
    e.preventDefault();
    setloading(true);
    const ref = doc(collection(db, `users/${user.uid}/events/`), slug);
    const batch = writeBatch(db);
    const d = new Date();
    let da = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    const data = {
      published: false,
      title: "",
      slug,
      username,
      club: "Choose Club",
      askAdmin: false,
      admin: false,
      description: "# hello world!",
      eligibility: "",
      googleFormLink: "",
      fee: "",
      edate: `${year}-${month}-${da}`,
      date: `${year}-${month}-${da}`,
      time: "",
      venue: "",
      name1: "",
      name2: "",
      contact1: "",
      contact2: "",
      notes: "",
      teamsize: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    let s;
    try {
      s = await getDoc(ref);
    } catch (err) {
      setloading(false);
      toast.error(err.message.toString());
    }
    if (s.exists()) {
      toast.success("Editing Post", { duration: 10000 });
    } else {
      batch.set(ref, data);
      await batch.commit();
      toast.success("Post created!");
    }

    router.push(`/organize/${slug}`);
  };
  function isEmoji(str) {
    var ranges = [
      "[\uE000-\uF8FF]",
      "\uD83C[\uDC00-\uDFFF]",
      "\uD83D[\uDC00-\uDFFF]",
      "[\u2011-\u26FF]",
      "\uD83E[\uDD10-\uDDFF]",
    ];
    if (str.match(ranges.join("|"))) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="h-[70vh] flex items-center flex-col w-[100vw] justify-center">
      <form
        onSubmit={createPost}
        className="border-solid rounded-lg border-4 flex justify-center flex-col border-black p-[30px]"
      >
        <div>
          Choose slug
          <span className="text-red-500 text-xs">
            {" (don't use emoji or special character)"}
          </span>
        </div>
        <input
          className="p-2 rounded-lg border-solid border-black border-3"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 30 && !isEmoji(e.target.value)) {
              let v = e.target.value;

              setTitle(v);
            }
          }}
          placeholder="slug(30 words limit)"
          required
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        {!loading && (
          <button type="submit" className="bg-green-300 p-2 rounded-lg">
            Create New Post
          </button>
        )}
        {loading && (
          <div className="flex items-center justify-center py-2">
            <Image
              className="w-[40px] h-[30px] animate-spin"
              src={processing}
              alt="something"
            />
          </div>
        )}
        <div className="text-red-800">
          <div>*slug use for url purpose </div>
          <div>ex:-slug: hello-there url would be</div>
          <div>{"evants.vercel.app/" + username + "/hello-there"}</div>
          <div>*if you use already use slug</div>
          <div>it will send you to edit that post</div>
        </div>
      </form>
    </div>
  );
}
