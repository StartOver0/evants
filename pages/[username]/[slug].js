import {
  collectionGroup,
  getDoc,
  where,
  query,
  getDocs,
  doc,
  collection,
} from "firebase/firestore";
import photo from "/public/images/uuit.png";
import PreviewPage from "/components/PreviewPage/previewPage";
import { db, postToJSON } from "../../lib/firebase";
export default function Slug({ post, ClubInfo }) {
  return <PreviewPage post={post} ClubInfo={ClubInfo} />;
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  let post, ClubInfo;

  const refUid = await getDoc(doc(collection(db, "usernames"), username));
  if (refUid.exists()) {
    const uid = refUid.data().uid;
    const postref = doc(collection(db, `users/${uid}/events`), slug);

    post = await getDoc(postref);
    ClubInfo = (await getDoc(doc(db, `clubs/${post.data().club}`))).data();
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
  if (ClubInfo == undefined) {
    ClubInfo = {
      ClubCode: "Upload this event for clubInfo",
      clubName: "Upload this event for clubInfo",
      clubPhoto: photo,
      social: {
        facebook: "",
        instragram: "",
        linkdin: "",
        twitter: "",
      },
    };
  }
  let full = { post, ClubInfo };
  return { props: { ...full }, revalidate: 3600 };
}
