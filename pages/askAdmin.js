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
import { async } from "@firebase/util";
export default function Home() {
  let { user, username, profileData } = useContext(UserContext);
  let [isAdmin, setIsAdmin] = useState(true);
  let [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      if (username) {
        if ("isAdmin" in profileData && profileData.isAdmin) {
          let clubs = profileData.AdminOf;
          let Events = await getClubsEvents(clubs);
          setPosts(Events);
        }
      }
    })();
  }, [username]);
  async function getClubsEvents(clubs) {
    let adminPostRef = collectionGroup(db, "aEvents");
    let Events = [];
    for (let i = 0; i < clubs.length; i++) {
      let q = query(adminPostRef, where("club", "==", clubs[i]));
      let docs = await getDocs(q);
      docs.forEach((doc) => Events.push(doc.data()));
    }
    return Events;
  }
  if (!posts) {
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
      {profileData.isAdmin ? (
        <Posts ps={posts} />
      ) : (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="text-red-800">You are not admin</div>
        </div>
      )}
    </AuthCheck>
  );
}
function Posts({ ps }) {
  const [posts, setPosts] = useState(ps);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    setPosts(ps);
  }, []);
  if (JSON.stringify(posts) === JSON.stringify([])) {
    return (
      <div className=" h-[70vh] flex items-center justify-center">
        <div className="text-lg text-red-800">No Request</div>
      </div>
    );
  }
  function handleBlock(bool) {
    setIsBlocked(bool);
  }
  function HandlePosts(pos) {
    let newPosts = posts.filter((po) => {
      return po.slug !== pos.slug;
    });
    setPosts(newPosts);
    setIsBlocked(false);
  }
  return (
    <div className="min-h-[70vh]">
      {posts.map((post, index) => {
        return (
          <List
            handleBlock={handleBlock}
            isBlocked={isBlocked}
            key={index}
            post={post}
            HandlePosts={HandlePosts}
          />
        );
      })}
    </div>
  );
}
function List({ post, HandlePosts, isBlocked, handleBlock }) {
  const [loading, setloading] = useState(false);
  return (
    <div className="flex   justify-between border-solid w-[90vw] border-black rounded-lg border-2 min-h-[10vh] items-center sm:m-3 sm:flex-row flex-col mt-4">
      <div className="sm:p-2 overflow-hidden">{post.title}</div>
      {!loading && (
        <>
          <div className="flex justify-around sm:w-[40vw] w-[90vw]  ">
            <Link href={"/" + post.username + "/" + post.slug}>
              <a target={"_blank"}>
                <div className="text-blue-300 hover:text-blue-600">View</div>
              </a>
            </Link>
            <div
              onClick={async () => {
                if (isBlocked) {
                  toast.success("Waiting for previous task to complete...");
                  return;
                }
                let yes = confirm("Are you sure you want to accept it");
                if (yes) {
                  handleBlock(true);
                  post.updatedAt = serverTimestamp();
                  post.published = true;
                  console.log(post);
                  setloading(true);
                  let ref = doc(
                    collection(db, `homeEvents/${post.username}/hEvents`),
                    post.slug
                  );
                  const clubref = doc(
                    collection(
                      db,
                      `clubs/${post.club}/events/${post.username}/un`
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
                    handleBlock(false);
                    toast.error("Unable to accept it. Try Again");
                  }
                }
              }}
              className="text-green-400 hover:text-green-700 "
            >
              accept
            </div>
            <div
              onClick={async () => {
                if (isBlocked) {
                  toast.success("Waiting for previous task to complete...");
                  return;
                }
                let yes = confirm("Are you sure you want to reject it");
                if (yes) {
                  handleBlock(true);
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
                    console.log(err);
                    handleBlock(false);

                    setloading(false);
                    toast.error("Unable to Delete it. Try again");
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
