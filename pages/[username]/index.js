import Avatar from "/components/Avatar/Avatar";
import BlogPreview from "/components/blogPreview/blogPreview";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db, postToJSON } from "../../lib/firebase";
import UnAuthBlogPreview from "../../components/unAuthBlogPreview/UnAuthBlogPreview";
import { Router, useRouter } from "next/router";
import { confirmPasswordReset } from "firebase/auth";
export default function Profile(props) {
  return <Home {...props} />;
}
const li = 3;
function Home({ user, post }) {
  return (
    <div style={{boxShadow: "0px 0px 10px -6px black", paddingBottom: "20px"}} >
      <Avatar {...user} />
      <UnAuthBlogPreview {...post} />
    </div>
  );
}
export async function getServerSideProps(context) {
  const { username } = context.query;
  let user,
    arr = [];
  const refUid = await getDoc(doc(collection(db, "usernames"), username));
  if (refUid.exists()) {
    const uid = refUid.data().uid;
    const ref = collection(db, `users/${uid}/events`);
    const q = query(
      ref,
      where("published", "==", true),
      orderBy("updatedAt", "desc"),
      limit(li)
    );
    const docs = await getDocs(q);
    const pref = doc(collection(db, `users`), uid);
    const pdoc = await getDoc(pref);
    docs.forEach((doc) => {
      doc.username = username;
      arr.push(postToJSON(doc));
    });
    user = pdoc.data();
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: { user, post: arr },
  };
}
