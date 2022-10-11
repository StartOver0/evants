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
} from "firebase/firestore";
import { auth, db, postToJSON } from "../lib/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/Context";
import Link from "next/link";
import toast from "react-hot-toast";
export default function home() {
  let { user, username } = useContext(UserContext);
  let [isAdmin, setIsAdmin] = useState(true);
  let [posts, setPosts] = useState();
  useEffect(() => {
    let adminPostRef = collection(db, "adminPosts/post/post");
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
        }
      })();
    }
  }, [username]);
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
  let posts = Object.values(props);

  if (JSON.stringify(posts) === JSON.stringify([])) {
    return (
      <div className=" h-[70vh] flex items-center justify-center">
        <div className="text-lg text-red-800">No Request</div>
      </div>
    );
  }
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
              <Link href={"/" + post.username + "/" + post.slug}>
                <div className="text-blue-300 hover:text-blue-600">View</div>
              </Link>
              <div
                onClick={async () => {
                  let yes = confirm("Are you sure you want to accept it");
                  if (yes) {
                    let ref = doc(
                      collection(db, "HomePosts/post/post"),
                      post.slug
                    );
                    const clubref = doc(
                      collection(db, `clubs/${post.club}/post`),
                      post.slug
                    );

                    let batch = writeBatch(db);
                    try {
                      batch.set(clubref, post);
                      batch.set(ref, post);
                      let adminPostRef = collection(db, "adminPosts/post/post");
                      toast.success("procesing...");
                      batch.delete(doc(adminPostRef, post.slug));
                      await batch.commit();
                      const el = document.getElementById("id" + "-" + index);
                      el.remove();
                      toast.success("Officially club post");
                    } catch (err) {
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
                      let adminPostRef = collection(db, "adminPosts/post/post");
                      toast.success("procesing...");
                      batch.delete(doc(adminPostRef, post.slug));
                      await batch.commit();
                      const el = document.getElementById("id" + "-" + index);
                      el.remove();
                      toast.success("Deleted");
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
          </div>
        );
      })}
    </div>
  );
  // ) : (
  //   <div className=" h-[70vh] flex items-center justify-center">
  //     <div className="text-lg text-red-800">No Request</div>
  //   </div>
  // );
}

// export async function getServerSideProps() {
//   let adminPostRef = collection(db, "adminPosts/post/post");

//   let info = (
//     await getDoc(doc(collection(db, `users`), auth.currentUser.uid))
//   ).data();
//   let isAdmin = info.isAdmin;
//   let posts = [];
//   if (isAdmin) {
//     let AdminOf = info.AdminOf;
//     for (let i = 0; i < AdminOf.length; i++) {
//       let docs = query(adminPostRef, where("club", "==", AdminOf[i]));
//       let d = await getDocs(doc);
//       d.forEach((e) => {
//         posts.push(postToJSON(e));
//       });
//     }
//   }

//   return {
//     props: { posts, isAdmin }, // will be passed to the page component as props
//   };
// }
