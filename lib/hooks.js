// import { connectAuthEmulator } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { initScriptLoader } from "next/script";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, postToJSON } from "./firebase";
export function useUserData() {
  const [profileData, setProfileData] = useState(null);
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    let unsubscribe;
    if (user) {
      const ref = doc(db, "users", user.uid);
      unsubscribe = onSnapshot(ref, (result) => {
        setUsername(result.data()?.username);

        setProfileData(result.data());
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username, profileData };
}
