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
  const { user, username } = useContext(UserContext);

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
    <div className={nav.navbar}>
      <Link href="/">
        <a>
          <div className={nav.domain_name}>
            <h1>C . I . K . Y </h1>
          </div>
          <div className={nav.domain_icon}>
            <div className={nav.icon_container}>
              <Image src={icon} alt="A Logo" width={40} height={40} />
            </div>
          </div>
        </a>
      </Link>

      {user && username && profileImg ? (
        <div className="flex w-[225px] mr-4 justify-around">
          <button
            onClick={async () => {
              try {
                await signOut(auth);

                toast.success("SignOut Sucessfully!");
              } catch (err) {
                toast.error(err.message.toString());
              }
            }}
            className="hover:bg-red-600 ml-6 border-2 hover:text-white border-red-700 border-solid leading-[2px] px-[30px] "
          >
            Log out
          </button>
          <Link href="/profile">
            <div className="cursor-pointer">
              <Image
                src={profileImg}
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
  );
}
