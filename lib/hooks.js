// import { connectAuthEmulator } from "firebase/auth";
import { signOut } from "firebase/auth";
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
        if (result.data()?.Ban === true) {
          signOut(auth);
          setUsername(null);
        } else {
          setUsername(result.data()?.username);
          setProfileData(result.data());
        }
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);
  if (username === null) {
    return { user: null, username: null, profileData: null };
  }
  return { user, username, profileData };
}
