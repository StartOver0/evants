import nav from "./Header.module.css";
import Image from "next/image";
import icon from "/public/favicon.ico";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../lib/Context";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
export default function Header() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  // console.log(router);
  const gotoLogin = (e) => {
    //  Router.push('/login')
    router.push({
      pathname: "/login",
      query: { value: 0 },
    });
  };
  const gotoSignUp = (e) => {
    //  Router.push('/login')

    router.push({
      pathname: "/login",
      query: { value: 1 },
    });
  };
  console.log("username " + username);
  return (
    <div className={nav.navbar}>
      <div className={nav.domain_name}>
        <h1>C . I . K . Y </h1>
      </div>
      <div className={nav.domain_icon}>
        <div className={nav.icon_container}>
          <Image src={icon} alt="A Logo" width={40} height={40} />
        </div>
      </div>
      {user && username ? (
        <div className="flex space-x-5">
          <button
            onClick={async () => {
              try {
                signOut(auth);
              } catch (err) {
                console.log(err);
              }
            }}
            className="bg-red-600 rounded-lg px-[10px]"
          >
            Log out
          </button>
          <img
            src={user.photoURL}
            className="w-[50px] h-[50px] rounded-full"
            alt="photo"
          />
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
            <button className={nav.signUpButton}>Login/Sign Up</button>
          </div>
        </>
      )}
    </div>
  );
}
