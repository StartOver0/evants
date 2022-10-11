import ImageSlider from "../components/ImageSlider/ImageSlider";
import styles from "/styles/Home.module.css";
import Content from "../components/Content/Content";
import TeamSection from "../components/TeamSection/TeamSection";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db, postToJSON } from "/lib/firebase";
import { DateTime } from "luxon";

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
  const ref = collection(db, "HomePosts/post/post");
  const dc = await getDocs(ref);

  let upcoming = [],
    current = [];
  console.log("helo world");
  dc.forEach((doc) => {
    let date = doc.data().date;
    let edate = doc.data().edate;
    let ans = findOut(date, edate);
    if (ans == "current") {
      current.push(postToJSON(doc));
    }
    if (ans == "upcoming") {
      upcoming.push(postToJSON(doc));
    }

    // arr.push(postToJSON(doc));
  });
  return {
    props: { current: current, upcoming: upcoming },
  };
}
function findOut(date, edate) {
  let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  let today = DateTime.now().setZone("Asia/kolkata");
  let todayTs = BigInt(today.ts.toString());
  let arr1 = date.match(reg);
  let starting = DateTime.local(
    parseInt(arr1[1]),
    parseInt(arr1[2]),
    parseInt(arr1[3])
  ).setZone("Asia/kolkata");
  let startingTs = BigInt(starting.ts.toString());
  let arr2 = edate.match(reg);
  let endingDate = DateTime.local(
    parseInt(arr2[1]),
    parseInt(arr2[2]),
    parseInt(arr2[3]) + 1
  ).setZone("Asia/kolkata");
  let endingDateTs = BigInt(endingDate.ts.toString());
  if (todayTs > endingDate && todayTs > startingTs) {
    return "past";
  }
  if (todayTs < endingDateTs && todayTs < startingTs) {
    return "upcoming";
  }
  if (todayTs >= startingTs && todayTs < endingDateTs) {
    return "current";
  }
}
/// starting time <today ending time <today   for poast
/// starting
