import {
  collectionGroup,
  getDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PreviewPage from "../../components/PreviewPage/previewPage";
import { db } from "../../lib/firebase";

export default function Slug() {
  const [post, setPost] = useState("");
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    (async () => {
      if (slug) {
        const ref = query(
          collectionGroup(db, "posts"),
          where("slug", "==", slug)
        );
        const dc = await getDocs(ref);
        dc.forEach((doc) => {
          setPost(doc.data());
        });
      }
    })();
    [];
  });

  return post != "" ? (
    <PreviewPage {...post} />
  ) : (
    <div>no page was created</div>
  );
}
