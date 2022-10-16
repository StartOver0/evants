import AuthCheck from "/components/AuthCheck/AuthCheck";
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
  collectionGroup,
} from "firebase/firestore";
import { BigLoader } from "../components/loading/loading";
import Image from "next/image";
import processing from "/public/images/processing.png";

import { auth, db, postToJSON } from "../lib/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/Context";
import Link from "next/link";
import toast from "react-hot-toast";
export default function Home() {
  let { user, username } = useContext(UserContext);
  let [isAdmin, setIsAdmin] = useState(true);
  let [loading, setLoading] = useState(true);
  let [posts, setPosts] = useState();
  useEffect(() => {
    let adminPostRef = collectionGroup(db, "aEvents");
    setLoading(true);
    if (username) {
      (async () => {
        let ad = await getDocs(adminPostRef);
        console.log(ad);
        ad.forEach((el) => {
          console.log(el.data());
        });
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
        }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [username]);
  if (loading) {
    return (
      <div className="w-[100%] h-[80vh] flex justify-center items-center">
        <Image
          className="w-[40px] h-[30px] animate-spin"
          src={processing}
          alt="something"
        />
      </div>
    );
  }
  return (
    <AuthCheck>
      {isAdmin ? (
        <Posts {...posts} />
      ) : (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="text-red-800">You are no admin</div>
        </div>
      )}
    </AuthCheck>
  );
}
function Posts(props) {
  const [posts, setPosts] = useState(() => Object.values(props));

  if (JSON.stringify(posts) === JSON.stringify([])) {
    return (
      <div className=" h-[70vh] flex items-center justify-center">
        <div className="text-lg text-red-800">No Request</div>
      </div>
    );
  }
  function HandlePosts(pos) {
    let newPosts = posts.filter((po) => {
      return po.slug !== pos.slug;
    });
    setPosts(newPosts);
  }
  return (
    <div className="min-h-[70vh]">
      {posts.map((post, index) => {
        return (
          <List
            key={index}
            posts={posts}
            post={post}
            HandlePosts={HandlePosts}
          />
        );
      })}
    </div>
  );
}
function List({ post, HandlePosts, posts }) {
  const [loading, setloading] = useState(false);
  return (
    <div className="flex   justify-between border-solid w-[90vw] border-black rounded-lg border-2 min-h-[10vh] items-center sm:m-3 sm:flex-row flex-col mt-4">
      <div className="sm:p-2 overflow-hidden">{post.title}</div>
      {!loading && (
        <>
          <div className="flex justify-around sm:w-[40vw] w-[90vw]  ">
            <Link href={"/" + post.username + "/" + post.slug}>
              <div className="text-blue-300 hover:text-blue-600">View</div>
            </Link>
            <div
              onClick={async () => {
                let yes = confirm("Are you sure you want to accept it");
                if (yes) {
                  post.updatedAt = serverTimestamp();
                  setloading(true);
                  let ref = doc(
                    collection(db, `homeEvents/${post.username}/hEvents`),
                    post.slug
                  );
                  const clubref = doc(
                    collection(
                      db,
                      `clubs/${post.club}/events/username/${post.username}`
                    ),
                    post.slug
                  );

                  let batch = writeBatch(db);
                  try {
                    batch.set(clubref, post);
                    batch.set(ref, post);
                    let uidRef = doc(
                      collection(db, "usernames"),
                      post.username
                    );
                    let uid = (await getDoc(uidRef)).data().uid;
                    batch.update(
                      doc(collection(db, `users/${uid}/events`), post.slug),
                      { published: true }
                    );
                    let adminPostRef = collection(
                      db,
                      `adminEvents/${post.username}/aEvents`
                    );
                    batch.delete(doc(adminPostRef, post.slug));
                    await batch.commit();

                    HandlePosts(post);
                    setloading(false);
                    toast.success("Officially club post");
                  } catch (err) {
                    setloading(false);
                    toast.error(err.message);
                  }
                }
              }}
              className="text-green-400 hover:text-green-700 "
            >
              accept
            </div>
            <div
              onClick={async () => {
                let yes = confirm("Are you sure you want to reject it");
                if (yes) {
                  let batch = writeBatch(db);
                  try {
                    setloading(true);
                    let adminPostRef = collection(
                      db,
                      `adminEvents/${post.username}/aEvents`
                    );
                    batch.delete(doc(adminPostRef, post.slug));
                    await batch.commit();
                    HandlePosts(post);
                    setloading(false);
                    toast.success("rejected");
                  } catch (err) {
                    toast.error(err.message);
                  }
                }
              }}
              className="text-red-400 hover:text-red-700 "
            >
              reject
            </div>
          </div>
        </>
      )}
      {loading && <BigLoader />}
    </div>
  );
}
