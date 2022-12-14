import Avatar from "/components/Avatar/Avatar";
import BlogPreview from "/components/blogPreview/blogPreview";
import { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../lib/Context";
export default function Profile() {
  return (
    <AuthCheck>
      <Home />
    </AuthCheck>
  );
}
const li = 3;
function Home() {
  const { profileData } = useContext(UserContext);

  const [pdata, setPdata] = useState();
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);
  const [wholeL, setWholeL] = useState(true);
  useEffect(() => {
    (async () => {
      const ref = collection(db, `users/${auth.currentUser.uid}/events`);
      const q = query(ref, orderBy("updatedAt", "desc"), limit(li));

      const docs = await getDocs(q);

      setPdata(profileData);
      let arti = [];
      docs.forEach((doc) => {
        arti.push(postToJSON(doc));
      });
      setArticles(arti, pdata);
      if (arti.length < li) {
        setPostEnd(true);
      }
      setWholeL(false);
    })();
  }, []);
  if (wholeL) {
    return (
      <div className="flex items-center justify-center py-2 h-[80vh] ">
        <Image
          className="w-[40px] h-[30px] animate-spin"
          src={processing}
          alt="something"
        />
      </div>
    );
  }
  async function getMore() {
    setLoading(true);
    const last = articles[articles.length - 1];
    console.log(last.updatedAt);
    const cursor = Timestamp.fromMillis(last.updatedAt);

    const ref = collection(db, `users/${auth.currentUser.uid}/events`);
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
          <div className="flex  justify-around flex-col sm:flex-row">
            <Link href="/askAdmin">
              <div className="tracking-wider flex justify-center items-center  bg-red-600 h-[6vh] hover:bg-red-500 rounded-full mt-[30px] p-2">
                <div className="text-white  ">Requests For Publication</div>
              </div>
            </Link>

            <Link href="/DeleteHome">
              <div className="tracking-wider flex justify-center items-center  p-2 bg-red-600 h-[6vh] hover:bg-red-500 rounded-full sm:mt-[30px] mt-1">
                <div className="text-white  ">Delete Post from Home page</div>
              </div>
            </Link>
            <Link href="/descriptionEdit">
              <div className="tracking-wider flex justify-center items-center  p-2 bg-red-600 h-[6vh] hover:bg-red-500 rounded-full sm:mt-[30px] mt-1">
                <div className="text-white  ">Edit description</div>
              </div>
            </Link>
          </div>
        )}
        {!pdata.isAdmin && (
          <Link href="/descriptionEdit">
            <div className="tracking-wider m-2 flex justify-center rounded-full items-center  ">
              <div className="w-[300px] flex justify-center  bg-red-600 hover:bg-red-900 p-2 h-[6vh] rounded-full">
                <div className="text-white ">Edit description</div>
              </div>
            </div>
          </Link>
        )}

        <BlogPreview {...articles} />

        {!loading &&
          !postEnd &&
          JSON.stringify(articles) !== JSON.stringify([]) && (
            <div
              onClick={getMore}
              className="  max-w-[100vw] tracking-wider flex justify-center items-center mb-4 bg-color cursor-pointer "
            >
              <div className="w-[180px] text-white bg-red-600 hover:bg-red-900 flex p-2 rounded-full items-center justify-center">
                <div>Load more</div>
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
