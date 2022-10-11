import Avatar from "/components/Avatar/Avatar";
import BlogPreview from "/components/blogPreview/blogPreview";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import Link from "next/link";
export default function Profile() {
  return (
    <AuthCheck>
      <Home />
    </AuthCheck>
  );
}

function Home() {
  const [pdata, setPdata] = useState();
  const [articles, setArticles] = useState();
  useEffect(() => {
    (async () => {
      const ref = collection(db, `users/${auth.currentUser.uid}/posts`);
      const docs = await getDocs(ref);
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
  return (
    articles && (
      <div>
        <Avatar {...pdata} />
        {pdata.isAdmin && (
          <Link href="/askAdmin">
            <div className="flex justify-center items-center  bg-red-600 h-[10vh] hover:bg-red-500 rounded-full mt-[30px]">
              <div className="text-green-400   ">Requests For Publication</div>
            </div>
          </Link>
        )}

        <BlogPreview {...articles} />
      </div>
    )
  );
}
