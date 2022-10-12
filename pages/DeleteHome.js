import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/Context";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import processing from "/public/images/processing.png";
import Image from "next/image";
import {
  doc,
  collection,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
  writeBatch,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { auth, db, postToJSON } from "../lib/firebase";
import toast from "react-hot-toast";
import { Router } from "next/router";
export default function DeleteHome() {
  const { user, username } = useContext(UserContext);
  const [posts, setPosts] = useState();
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let adminPostRef = collection(db, "HomePosts/post/post");
    if (username) {
      (async () => {
        let info = (
          await getDoc(doc(collection(db, `users`), user.uid))
        ).data();
        if (info.isAdmin) {
          let AdminOf = info.AdminOf;
          let p = [];
          for (let i = 0; i < AdminOf.length; i++) {
            let docs = query(adminPostRef, where("club", "==", AdminOf[i]));

            let d = await getDocs(docs);
            d.forEach((e) => {
              p.push(postToJSON(e));
            });
          }
          setIsAdmin(info.isAdmin);
          setPosts(p);
          setLoading(false);
        } else {
          setPosts({});
          setLoading(false);
        }
      })();
    }
  }, [username]);
  if (loading) {
    return (
      <div className="w-[100%] h-[100px] flex justify-center items-center">
        <Image
          className="w-[40px] h-[30px] animate-spin"
          src={processing}
          alt="something"
        />
      </div>
    );
  }
  return isAdmin ? (
    <AuthCheck>
      <Posts {...posts} />
    </AuthCheck>
  ) : (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-red-800">You are no admin</div>
    </div>
  );
}
function Posts(props) {
  let posts = props;
  if (JSON.stringify(posts) == JSON.stringify({})) {
    return (
      <div className=" h-[70vh] flex items-center justify-center">
        <div className="text-lg text-red-800">
          NO post are in your Home page from your club
        </div>
      </div>
    );
  } else {
    return <Home {...posts} />;
  }
}
function Home(props) {
  let posts = Object.values(props);

  return (
    <div className="min-h-[70vh]">
      {posts.map((post, index) => {
        return (
          <div
            key={index}
            id={`id-${index}`}
            className="flex   justify-between border-solid w-[90vw] border-black rounded-lg border-2 min-h-[10vh] items-center m-3 sm:flex-row flex-col "
          >
            <div className="p-2 overflow-hidden">{post.title}</div>
            <div className="flex justify-around sm:w-[40vw] w-[90vw]  ">
              <div
                onClick={async () => {
                  let yes = confirm(
                    "Are you sure you want to remove this post from home"
                  );

                  if (yes) {
                    const ref = doc(
                      collection(db, "HomePosts/post/post"),
                      post.slug
                    );
                    console.log(ref);
                    const el = document.getElementById("id" + "-" + index);
                    el.remove();
                    let batch = writeBatch(db);
                    try {
                      let uidRef = doc(
                        collection(db, "usernames"),
                        post.username
                      );
                      let uid = (await getDoc(uidRef)).data().uid;
                      batch.update(
                        doc(collection(db, `users/${uid}/posts`), post.slug),
                        { published: false }
                      );
                      batch.delete(ref);
                      await batch.commit();
                    } catch (err) {
                      Router.reload(window.location.pathname);
                      toast.error(err.message.toString());
                    }
                  }
                }}
                className="text-red-400 hover:text-red-700 "
              >
                Delete
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
