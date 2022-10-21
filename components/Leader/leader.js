import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../../lib/firebase";
import { BigLoader } from "../loading/loading";
import { Main } from "./main";

export function Leader({ handleSetAllIn }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const ref = doc(collection(db, "leaders"), "list");
      const leaders = (await getDoc(ref)).data().leaders ?? [];
      if (auth.currentUser && leaders.includes(auth.currentUser.uid)) {
        setLoading(false);
      } else {
        handleSetAllIn(false);
      }
    })();
  }, []);
  return loading ? <BigLoader /> : <Main handle={handleSetAllIn} />;
}
