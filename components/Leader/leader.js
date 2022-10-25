import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LeaderContext } from "../../lib/Context";
import { auth, db } from "../../lib/firebase";
import { BigLoader } from "../loading/loading";
import { Main } from "./main";

export default function Leader({ handleSetAllIn }) {
  const [loading, setLoading] = useState(true);
  let leaders = useRef(null);
  useEffect(() => {
    (async () => {
      const ref = doc(collection(db, "leaders"), "list");
      leaders.current = (await getDoc(ref)).data().leaders ?? [];
      if (auth.currentUser && leaders.current.includes(auth.currentUser.uid)) {
        setLoading(false);
      } else {
        handleSetAllIn(false);
      }
    })();
  }, []);
  return loading ? (
    <BigLoader />
  ) : (
    <LeaderContext.Provider value={leaders}>
      <Main handle={handleSetAllIn} />
    </LeaderContext.Provider>
  );
}
