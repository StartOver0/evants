import ClubItem from "/components/ClubItem/ClubItem";
import styles from "/styles/Clubs.module.css";
import { db } from "/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { data } from "autoprefixer";
export default function Clubs({ clubData }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h1 className={styles.heading}>Clubs List</h1>
        {clubData.map((item, idx) => (
          <ClubItem data={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  let arr = [];
  let clubs = await getDocs(collection(db, "clubs"));
  clubs.forEach((doc) => {
    arr.push(doc.data());
  });

  return {
    props: { clubData: arr },
  };
}
