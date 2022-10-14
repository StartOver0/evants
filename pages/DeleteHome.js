import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/Context";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import processing from "/public/images/processing.png";
import Image from "next/image";
import { DateTime } from "luxon";
import { BigLoader } from "../components/loading/loading";
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
      <div className="w-[100%] h-[80vh] flex justify-center items-center">
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
function findOut(date, edate) {
  let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  let today = DateTime.now().setZone("Asia/kolkata");

  let arr1 = date.match(reg);

  let starting = DateTime.local(
    parseInt(arr1[1]),
    parseInt(arr1[2]),
    parseInt(arr1[3])
  ).setZone("Asia/kolkata");
  let arr2 = edate.match(reg);
  let endingDate = DateTime.local(
    parseInt(arr2[1]),
    parseInt(arr2[2]),
    parseInt(arr2[3]) + 1
  ).setZone("Asia/kolkata");
  if (today < starting) return "upcoming";
  if (today > endingDate) return "past";
  return "current";
}
function NewPost(posts) {
  let upcoming = [],
    current = [];
  posts.forEach((dc) => {
    let date = dc.date;
    let edate = dc.edate;
    let ans = findOut(date, edate);
    if (ans == "current") {
      current.push(dc);
    }
    if (ans == "upcoming") {
      upcoming.push(dc);
    }
  });
  console.log(current.concat(upcoming));
  return current.concat(upcoming);
}
function Home(props) {
  const [posts, setposts] = useState(NewPost(Object.values(props)));
  function handlePosts(newpost) {
    setposts(newpost);
  }

  if (JSON.stringify(posts) === JSON.stringify([])) {
    return (
      <div className=" h-[70vh] flex items-center justify-center">
        <div className="text-lg text-red-800">
          NO post are in your Home page from your club
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[70vh]">
      {posts.map((post, index) => {
        return (
          <List
            key={index}
            post={post}
            posts={posts}
            handlePosts={handlePosts}
          />
        );
      })}
    </div>
  );
}
function List({ post, handlePosts, posts }) {
  const [loading, setloading] = useState(false);
  return (
    <div className="flex   justify-between border-solid w-[90vw] border-black rounded-lg border-2 min-h-[10vh] items-center m-3 sm:flex-row flex-col ">
      <div className="p-2 overflow-hidden">{post.title}</div>
      <div className="flex justify-around sm:w-[40vw] w-[90vw]  ">
        {!loading && (
          <div
            onClick={async () => {
              let yes = confirm(
                "Are you sure you want to remove this post from home"
              );

              if (yes) {
                setloading(true);
                const ref = doc(
                  collection(db, "HomePosts/post/post"),
                  post.slug
                );

                let batch = writeBatch(db);
                try {
                  let uidRef = doc(collection(db, "usernames"), post.username);
                  let uid = (await getDoc(uidRef)).data().uid;
                  batch.update(
                    doc(collection(db, `users/${uid}/posts`), post.slug),
                    { published: false }
                  );
                  batch.delete(ref);
                  await batch.commit();
                  let newPosts = posts.filter((po) => {
                    return po.slug !== post.slug;
                  });
                  toast.success("sucessful!");
                  handlePosts(newPosts);
                  setloading(false);
                } catch (err) {
                  setloading(false);
                  toast.error(err.message.toString());
                }
              }
            }}
            className="text-red-400 hover:text-red-700 "
          >
            Delete
          </div>
        )}
        {loading && <BigLoader />}
      </div>
    </div>
  );
}
