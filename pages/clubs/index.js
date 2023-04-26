import ClubItem from "/components/ClubItem/ClubItem";
import styles from "/styles/Clubs.module.css";
import { db } from "/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { data } from "autoprefixer";
import Link from "next/link";

export default function Clubs({ clubData }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h1 className={styles.heading}>Clubs List</h1>
        {clubData != 0 ? <div className={styles.clubitems}>
        {clubData.map((item, idx) => (
          <Link key={idx} href={`/clubs/${item.clubCode}`}>
            <a>
              <ClubItem data={item} key={idx} />
            </a>
          </Link>
        ))}
        </div>
        :<div className="h-[55vh] flex flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="silver" width={80}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        <p style={{color:"silver"}}>{"something happened wrong !! "}</p>
      </div>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let arr = [];
  let clubs = await getDocs(collection(db, "clubs"));
  clubs.forEach((doc) => {
    arr.push(doc.data());
  });
  return {
    props: { clubData: arr },
    revalidate: 5000,
  };
}
