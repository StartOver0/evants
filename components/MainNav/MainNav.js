import nav from "./MainNav.module.css";
import Link from "next/link";
import Image from "next/image";
import homeIcon from "/public/nee.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MainNav() {
  const [chosen, setChosen] = useState("");
  const Router = useRouter();

  useEffect(() => {
    const splitPath = Router.pathname.split("/");
    setChosen(splitPath[1]);
  }, [Router]);

  return (
    <div className={nav.mainNav}>
      <Link href="/">
        <div className={nav.cover}>
          <div className={nav.homeLink}>
            <a className={chosen == "" ? nav.active : ""}>Home</a>
          </div>
          <div className={nav.homeIcon}>
            <a className={chosen == "" ? nav.active : ""}>
              <Image src={homeIcon} width={20} height={20} alt="icon" />
            </a>
          </div>
        </div>
      </Link>

      <Link href="/organize">
        <div className={nav.cover}>
          <a className={chosen == "organize" ? nav.active : ""}>Organize</a>
        </div>
      </Link>

      <Link href="/clubs">
        <div className={nav.cover}>
          <a className={chosen == "clubs" ? nav.active : ""}>Clubs</a>
        </div>
      </Link>

      <Link href="/about">
        <div className={nav.cover}>
          <a className={chosen == "about" ? nav.active : ""}>About Us</a>
        </div>
      </Link>
    </div>
  );
}
