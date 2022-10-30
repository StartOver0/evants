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
        {clubData.map((item, idx) => (
          <Link key={idx} href={`/clubs/${item.clubCode}`}>
            <a>
              <ClubItem data={item} key={idx} />
            </a>
          </Link>
        ))}
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
