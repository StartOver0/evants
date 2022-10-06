// import { connectAuthEmulator } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
export function useUserData() {
  // connectAuthEmulator(auth, "https://vercel.com");
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  // console.log(user.displayName);
  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (result) => {
        setUsername(result.data()?.username);
      });
    } else {
      setUsername(null);
    }
    // console.log(username);
    return unsubscribe;
  }, [user]);
  // console.log(username);

  return { user, username };
}
