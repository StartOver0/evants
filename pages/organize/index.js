import AuthCheck from "/components/AuthCheck/AuthCheck";
import { UserContext } from "../../lib/Context";
import { serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import Image from "next/image";
import processing from "/public/images/processing.png";
import styles from '/styles/Slug.module.css';
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
      uid: auth.currentUser.uid,
      title: "",
      slug,
      username,
      club: "Choose Club",
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

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://evants.vercel.app/${username}/${slug}`)
      .then(() => {
        alert("successfully copied");
      })
      .catch(() => {
        alert("something went wrong");
      });
  }

  return (
    <div className={styles.fullwidth}>
        
        <div className={styles.cover}>
            <div className={styles.updo} ></div>
            <div className={styles.leri} ></div>
            <div className={styles.lerix} ></div>
            <form
              onSubmit={createPost}
              className={styles.form}
            >
              <div className="text-red-500 text-xs">
                      {" (Don't use any emoji or special characters)"}
              </div>
              <div className="flex flex-col ">
                  <label htmlFor="name" className="tracking-[.25px]">Page Name:</label>
                  <input
                      className={styles.input}
                      value={title}
                      onChange={(e) => {
                          if (e.target.value.length <= 40 && !isEmoji(e.target.value)) {
                              let v = e.target.value;
                              setTitle(v);
                          }
                      }}
                      placeholder="slug has 40 words limit"
                      required
                      spellCheck = 'false'
              />

              {!loading && (
                <button type="submit" className="bg-green-300 font-['poppins'] text-[14px] py-[6px] rounded-lg my-[4px]">
                  Create Post
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
              </div>
              <div className="mt-[4px] cursor-pointer" onClick={handleCopy}>
                <button className="bg-blue-300 font-['poppins'] text-[13px] py-[2px] px-[8px] rounded-[3px] my-[4px]">{'Copy URL'}</button>
                <strong><span className="text-[14px] break-all tracking-[.5px]">{" :  evants.vercel.app/" + username +'/'+ slug}</span></strong>
              </div>
              <div className="text-red-800 w-[320x] text-[13px]">
                <p>*if you use already use slug it will send you to edit that post</p>
              </div>
            </form>
        </div>
    </div>
  );
}
