import Avatar from "/components/Avatar/Avatar";
import BlogPreview from "/components/blogPreview/blogPreview";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import AuthCheck from "/components/AuthCheck/AuthCheck";
import UnAuthBlogPreview from "../../components/unAuthBlogPreview/unAuthBlogPreview";
import { Router, useRouter } from "next/router";
import { confirmPasswordReset } from "firebase/auth";
export default function Profile(props) {
  return <Home {...props} />;
}
function Home({ user, post }) {
  return user !== "not define" ? (
    <div>
      <Avatar {...user} />
      <UnAuthBlogPreview {...post} />
    </div>
  ) : (
    <div className="h-[60vh] flex justify-center items-center text-green-600">
      <div>no user this name exists</div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const { username } = query;
  let user,
    arr = [];
  const refUid = await getDoc(doc(collection(db, "usernames"), username));
  if (refUid.exists()) {
    const uid = refUid.data().uid;
    const ref = collection(db, `users/${uid}/posts`);
    const docs = await getDocs(ref);
    const pref = doc(collection(db, `users`), uid);
    const pdoc = await getDoc(pref);

    docs.forEach((doc) => {
      doc.username = username;
      arr.push(postToJSON(doc));
    });
    // const post = arr;
    user = pdoc.data();
  } else {
    user = "not define";
  }

  return {
    props: { user, post: arr },
  };
}
