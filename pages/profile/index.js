import Avatar from "/components/Avatar/Avatar";
import { data } from "/staticData/profiledata.js";
const subheadings = ["upcoming events", "past events"];
import BlogPreview from "/components/blogPreview/blogPreview";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import AuthCheck from "/components/AuthCheck/AuthCheck";
export default function Profile() {
  return (
    <AuthCheck>
      <Home />
    </AuthCheck>
  );
}
function Home() {
  const [pdata,setPdata]=useState();
  const [articles, setArticles] = useState();
  useEffect(() => {
    (async () => {
      const ref = collection(db, `users/${auth.currentUser.uid}/posts`);
      const docs = await getDocs(ref);
      const pref=doc(collection(db,`users`),auth.currentUser.uid);
      const pdoc=await getDoc(pref);
      setPdata(pdoc.data());
      let arti = [];
      docs.forEach((doc) => {
        arti.push(postToJSON(doc));
      });
      setArticles(arti);
    })();
  }, []);
  return (
    articles && (
      <div>
        <Avatar {...pdata} />
        <BlogPreview {...articles} />
      </div>
    )
  );
}
