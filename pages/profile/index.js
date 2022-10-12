import Avatar from "/components/Avatar/Avatar";
import BlogPreview from "/components/blogPreview/blogPreview";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import processing from "/public/images/processing.png";
import { fromMillis } from "firebase/firestore";
import Link from "next/link";
export default function Profile() {
  return (
    <AuthCheck>
      <Home />
    </AuthCheck>
  );
}
const li = 3;
function Home() {
  const [pdata, setPdata] = useState();
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);
  useEffect(() => {
    (async () => {
      const ref = collection(db, `users/${auth.currentUser.uid}/posts`);
      const q = query(ref, orderBy("updatedAt", "desc"), limit(li));

      const docs = await getDocs(q);
      const pref = doc(collection(db, `users`), auth.currentUser.uid);
      const pdoc = await getDoc(pref);
      setPdata(pdoc.data());
      let arti = [];
      docs.forEach((doc) => {
        arti.push(postToJSON(doc));
      });
      setArticles(arti, pdata);
    })();
  }, []);
  async function getMore() {
    setLoading(true);
    const last = articles[articles.length - 1];
    console.log(last.updatedAt);
    const cursor = Timestamp.fromMillis(last.updatedAt);

    const ref = collection(db, `users/${auth.currentUser.uid}/posts`);
    const q = query(
      ref,
      orderBy("updatedAt", "desc"),
      limit(li),
      startAfter(cursor)
    );
    let newpost = [];
    let docs = await getDocs(q);
    docs.forEach((doc) => {
      newpost.push(postToJSON(doc));
    });
    setArticles(articles.concat(newpost));
    setLoading(false);
    if (newpost.length < li) {
      setPostEnd(true);
    }
  }
  return (
    articles && (
      <div>
        <Avatar {...pdata} />
        {pdata.isAdmin && (
          <Link href="/askAdmin">
            <div className="tracking-wider flex justify-center items-center  bg-red-600 h-[10vh] hover:bg-red-500 rounded-full mt-[30px]">
              <div className="text-white  ">Requests For Publication</div>
            </div>
          </Link>
        )}
        <BlogPreview {...articles} />

        {!loading &&
          !postEnd &&
          JSON.stringify(articles) !== JSON.stringify([]) && (
            <div className="  max-w-[100vw] tracking-wider flex justify-center items-center mb-4 bg-color cursor-pointer ">
              <div className="w-[180px] text-white bg-red-600 flex p-2 rounded-full items-center justify-center">
                <div onClick={getMore}>Load more</div>
              </div>
            </div>
          )}
        {loading && (
          <div className="w-[100%] h-[100px] flex justify-center items-center">
            <Image
              src={processing}
              className="w-[40px] h-[30px] animate-spin"
              alt="something"
            />
          </div>
        )}
      </div>
    )
  );
}
