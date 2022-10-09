import ImageSlider from "../components/ImageSlider/ImageSlider";
import styles from "/styles/Home.module.css";
import Content from "../components/Content/Content";
import TeamSection from "../components/TeamSection/TeamSection";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db, postToJSON } from "/lib/firebase";
const subheadings = ["upcoming events", "past events"];

export default function Home(props) {
  return (
    <div className={styles.main}>
      <ImageSlider /> <hr className={styles.hr} />
      <Content {...props} />
      <TeamSection />
    </div>
  );
}
export async function getServerSideProps() {
  const ref = query(
    collectionGroup(db, "posts"),
    where("askAdmin", "==", false)
  );
  const dc = await getDocs(ref);

  let arr = [];
  dc.forEach((doc) => {
    arr.push(postToJSON(doc));
  });
  return {
    props: { past: arr, future: arr },
  };
}
