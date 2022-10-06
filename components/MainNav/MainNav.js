import nav from './MainNav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import homeIcon from "/public/nee.png";

export default function MainNav(){
  return(
    <div className={nav.mainNav}>
      <Link href="/">
        <a className={nav.homeLink}>Home</a>
      </Link>
      <Link href="/">
        <div className={nav.homeIcon}>
          <Image src={homeIcon} width={20} height={20} alt="icon"/>
        </div>
      </Link>
      <Link href="/organize"><a>Organize</a></Link>
      <Link href="#"><a>Compete</a></Link>
      <Link href="#"><a className={nav.whiteroom}>Whiteroom</a></Link>
      <Link href="#"><a className={nav.about}>About Us</a></Link>
      <Link href="#"><a>More</a></Link>
    </div>
  );
}
