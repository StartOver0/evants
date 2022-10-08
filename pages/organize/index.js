import AuthCheck from "/components/AuthCheck/AuthCheck";
import { UserContext } from "../../lib/Context";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminPostsPage(props) {
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

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();

    const ref = doc(collection(db, `users/${user.uid}/posts/`), slug);

    // Tip: give all fields a default value here
    const data = {
      title: "",
      slug,
      username,
      club: "clubName1",
      askAdmin: false,
      description: "# hello world!",
      eligibility: "",
      googleFormLink: "",
      fee: "",
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
      await setDoc(ref, data);
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
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Article!"
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button
          type="submit"
          className="bg-green-300 p-2 rounded-lg"
          disabled={!isValid}
        >
          Create New Post
        </button>
        <div className="text-red-800">
          <div>*slug use for url purpose </div>
          <div>ex:-slug: hello-there url would be</div>
          <div>evants.vercel.app/{"<username>"}/hello-there</div>
        </div>
      </form>
    </div>
  );
}

function Checking({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-600">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-600">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
