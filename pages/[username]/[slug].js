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
import UnAuthBlogPreview from "../../components/unAuthBlogPreview/UnAuthBlogPreview";
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
export async function getStaticPaths() {
  let ref = collection(db, "HomePosts/post/post");
  let snapshot = await getDocs(ref);
  let paths = [];
  snapshot.forEach((doc) => {
    const { slug, username } = doc.data();
    let params = { slug, username };
    paths.push({ params });
  });
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { username, slug } = params;
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

  return { props: { post }, revalidate: 5000 };
}
