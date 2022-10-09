import nav from './MainNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import homeIcon from "/public/nee.png";
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

export default function MainNav(){

  const [chosen, setChosen] = useState("");
  const Router = useRouter();
  useEffect(() => {
      const splitPath = Router.pathname.split('/');

      setChosen(splitPath[1]);
  }, [Router])
  
  return(
    <div className={nav.mainNav}>
      <div className={nav.cover} >
          <Link href="/">
              <div className={nav.homeLink}>
                <a className={chosen == '' ? nav.active: ''}>Home</a>
              </div>
          </Link>
          <Link href="/">
              <div className={nav.homeIcon}>
                  <a className={chosen == '' ? nav.active: ''}><Image src={homeIcon} width={20} height={20} alt="icon"/></a>
              </div>
          </Link>
      </div>
      <div className={nav.cover} >
        <Link href="/organize">
            <a className={chosen == 'organize' ? nav.active: ''}>Organize</a>
        </Link>
      </div>
      <div className={nav.cover} >
        <Link href="/events">
            <a className={chosen == 'events' ? nav.active: ''}>Events</a>
        </Link>
      </div>
      <div className={nav.cover} >
        <Link  href="/clubs">
            <a className={chosen == 'clubs' ? nav.active: ''} >Clubs</a>
        </Link>
      </div>
      <div className={nav.cover} >
        <Link  href="/about">
            <a className={chosen == 'about' ? nav.active: ''}>About Us</a>
        </Link>
      </div>
      {/* <Link href="#"></Link>
      <Link href="/clubs"><a className={chosen == 'home' ? nav.active: ''} className={nav.whiteroom}>Club</a></Link>
      <Link href="/about"><a className={chosen == 'home' ? nav.active: ''} className={nav.about}>About Us</a></Link>
      <Link href="#"><a className={chosen == 'home' ? nav.active: ''}>More</a></Link> */}
    </div>
  );
}
