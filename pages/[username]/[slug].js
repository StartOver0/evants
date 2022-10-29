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
  return <PreviewPage {...post} />;
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  let post;

  const refUid = await getDoc(doc(collection(db, "usernames"), username));
  if (refUid.exists()) {
    const uid = refUid.data().uid;
    const postref = doc(collection(db, `users/${uid}/events`), slug);

    post = await getDoc(postref);
    if (post.exists()) {
      post = postToJSON(post);
    } else {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }

  return { props: { post }, revalidate: 3600 };
}
