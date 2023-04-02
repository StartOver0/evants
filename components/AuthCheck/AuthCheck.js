import Image from "next/image";
import processing from "/public/images/processing.png";
import { useContext } from "react";
import { UserContext } from "/lib/Context";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  const router = useRouter();
  
  return username ? (
    props.children
  ) : (
    <div className="hover:text-red-400 text-blue-400 h-[80vh] flex justify-center items-center">
      <Link classaName="" href="/login">
        For this feature you have to Login
      </Link>
    </div>
  );
}
