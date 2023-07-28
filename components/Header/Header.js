import nav from "./Header.module.css";
import Image from "next/image";
import icon from "/public/favicon.ico";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../lib/Context";
import { auth, db } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState(null);
  const { user, username, profileData } = useContext(UserContext);

  const gotoLogin = (e) => {
    router.push(
      {
        pathname: "/login",
        query: { value: 0 },
      },
      "/login"
    );
  };
  const gotoSignUp = (e) => {
    router.push(
      {
        pathname: "/login",
        query: { value: 1 },
      },
      "/login"
    );
  };

  useEffect(() => {
    if (username && user) {
      (async () => {
        let Doc = doc(db, "users", user.uid);
        let snapshot = await getDoc(Doc);
        setProfileImg(snapshot.data().photoURL);
      })();
    }
  }, [username]);

  return (
    <div className={nav.navbar_c}>
      <div className={nav.navbar}>
        <Link href="/">
          <a className={nav.domain_link}>
            <div className={nav.domain_name}>
              <p><span>U</span><span>U</span>-Events</p>
            </div>
            <div className={nav.domain_icon}>
              <div className={nav.icon_container}>
                <Image src={icon} alt="A Logo" width={40} height={40} />
              </div>
            </div>
          </a>
        </Link>

        {user && username && profileImg ? (
          <div className={nav.cover}>
            <button
              onClick={async () => {
                try {
                  await signOut(auth);

                  toast.success("SignOut Sucessfully!");
                } catch (err) {
                  toast.error(err.message.toString());
                }
              }}
              className={nav.logOut}
            >
              Log Out
            </button>
            <Link href="/profile">
              <div className="cursor-pointer text-[0px]">
                <Image
                  src={profileData.photoURL}
                  alt="photo"
                  className="w-[40px] h-[40px] rounded-full overflow-hidden"
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className={nav.navlinks_desktop}>
              <button className={nav.loginButton} onClick={gotoLogin}>
                Login
              </button>
              <button className={nav.signUpButton} onClick={gotoSignUp}>
                Sign Up
              </button>
            </div>
            <div className={nav.navlinks_mobile}>
              <button className={nav.signUpButton} onClick={gotoLogin}>
                Login/Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
