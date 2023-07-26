import Image from "next/image";
import processing from "/public/images/processing.png";
import { useContext } from "react";
import { UserContext } from "/lib/Context";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  
  const stylebtn = {
    padding: '.3rem .85rem',
    margin: '0 2px',
    fontSize: '16px',
    background: "cornflowerblue",
    fontWeight: '600',
    color: 'white',
    borderRadius: '4px',
    border: '2px solid cornflowerblue',
    cursor: 'pointer'
  }
  return username ? (
    props.children
  ) : (
    <div className="hove:text-red-400 text-blue-400 h-[80vh] flex justify-center items-center">
      <Link classaName="" href="/login">
        <p>For this feature you have to first <span className="hover:bg-white hover:text-blue-400" style={stylebtn}>Login</span></p>
      </Link>
    </div>
  );
}
