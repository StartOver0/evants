import {
  collectionGroup,
  getDoc,
  where,
  query,
  getDocs,
  doc,
  collection,
} from "firebase/firestore";
import PreviewPage from "/components/PreviewPage/previewPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogPreview from "../../components/blogPreview/blogPreview";
import UnAuthBlogPreview from "../../components/unAuthBlogPreview/unAuthBlogPreview";
import { db, postToJSON } from "../../lib/firebase";
export default function Slug({ post }) {
  return post !== "not define" ? (
    <PreviewPage {...post} />
  ) : (
    <div className="h-[60vh] flex justify-center items-center text-red-700">
      <div>No event is organize by this slug</div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const { username, slug } = query;
  let post;
  const refUid = await getDoc(doc(collection(db, "usernames"), username));
  if (refUid.exists()) {
    const uid = refUid.data().uid;
    const postref = doc(collection(db, `users/${uid}/posts`), slug);

    post = await getDoc(postref);
    if (post.exists()) {
      post = postToJSON(post);
    } else {
      post = "not define";
    }
  } else {
    post = "not define";
  }

  return { props: { post } };
}
