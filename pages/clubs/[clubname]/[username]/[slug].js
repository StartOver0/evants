import { collection, doc, getDoc } from "firebase/firestore";
import BlogPreview from "../../../../components/PreviewPage/previewPage";
import { db, postToJSON } from "../../../../lib/firebase";
export default function Home({ ClubInfo, post }) {
  return <BlogPreview post={post} ClubInfo={ClubInfo} />;
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { clubname, username, slug } = params;

  let post;
  const postref = doc(
    collection(db, `clubs/${clubname}/events/${username}/un`),
    slug
  );

  post = await getDoc(postref);
  let clubmeta = await getDoc(doc(db, `clubs/${clubname}`));
  let ClubInfo = clubmeta.data();
  if (!post.exists() || !clubmeta.exists()) {
    return {
      notFound: true,
    };
  }
  post = postToJSON(post);
  let full = { ClubInfo, post };
  return { props: { ...full }, revalidate: 3600 };
}
