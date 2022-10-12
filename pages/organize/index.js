import AuthCheck from "/components/AuthCheck/AuthCheck";
import { UserContext } from "../../lib/Context";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
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

  const slug = encodeURI(kebabCase(title));

  const createPost = async (e) => {
    e.preventDefault();

    const ref = doc(collection(db, `users/${user.uid}/posts/`), slug);
    const batch = writeBatch(db);
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
      edate: "2022-10-20",
      date: "2022-10-20",
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
    let s = await getDoc(ref);
    if (s.exists()) {
      toast.success("Editing Post", { duration: 10000 });
    } else {
      batch.set(ref, data);
      await batch.commit();
      toast.success("Post created!");
    }

    router.push(`/organize/${slug}`);
  };

  return (
    <div className="h-[70vh] flex items-center flex-col w-[100vw] justify-center">
      <form
        onSubmit={createPost}
        className="border-solid border-2 border-black p-[30px]"
      >
        <input
          className="border-solid border-black border-3"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= 100) setTitle(e.target.value);
          }}
          placeholder="slug"
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" className="bg-green-300 p-2 rounded-lg">
          Create New Post
        </button>
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
