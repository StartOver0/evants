import { auth, db } from "../../lib/firebase";
import kebabCase from "lodash.kebabcase";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { Router, useRouter } from "next/router";
import { UserContext } from "../../lib/Context";
import toast from "react-hot-toast";

export default function Organize(props) {
  return (
    <AuthCheck>
      <CheckSlug />
    </AuthCheck>
  );
}

function CheckSlug() {
  const { user, username } = useContext(UserContext);
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const onSubmit = async (e) => {
    toast.success("processing....", { duration: 5000 });
    e.preventDefault();
    const data = {
      title: "",
      slug: slug,
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
    const post = collection(db, "posts");
    const ref = doc(post, slug);
    const postRef = doc(
      collection(db, `users/${auth.currentUser.uid}/posts`),
      slug
    );

    const batch = writeBatch(db);

    batch.set(ref, { uid: auth.currentUser.uid });

    batch.set(postRef, data);
    try {
      await batch.commit();
      toast.success("Post Created Sucessfully!");
      router.push("/organize/" + slug);
    } catch (err) {
      toast.error(err.message.toString());
    }
  };

  const onChange = (e) => {
    const val = e.target.value;

    if (val.length < 3) {
      setSlug(encodeURI(kebabCase(val)));
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    } else {
      setSlug(encodeURI(kebabCase(val)));
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(slug);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (slug) => {
      if (slug.length >= 3) {
        const ref = doc(collection(db, "posts"), slug);
        console.log(ref);
        const exists = (await getDoc(ref)).exists();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <section className="h-[70vh] flex justify-center items-center">
      <form
        className="border-3 bortder-black border-solid p-[70px]"
        onSubmit={onSubmit}
      >
        <h3>Choose Slug</h3>
        <input
          className="border-solid border-3 border-black"
          placeholder="slug"
          value={formValue}
          onChange={onChange}
        />
        <div>slug:{slug}</div>
        <Checking slug={formValue} isValid={isValid} loading={loading} />
        <button
          type="submit"
          className="bg-green-300 border-solid border-2 p-2 rounded-lg"
          disabled={!isValid}
        >
          Choose
        </button>
      </form>
    </section>
  );
}

function Checking({ slug, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-400">{slug} is available!</p>;
  } else if (slug && !isValid) {
    return <p className="text-red-500">That slug is taken!</p>;
  } else {
    return <p></p>;
  }
}
