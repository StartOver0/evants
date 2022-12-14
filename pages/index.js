import ImageSlider from "../components/ImageSlider/ImageSlider";
import styles from "/styles/Home.module.css";
import Content from "../components/Content/Content";
import { useState, useEffect } from "react";
import TeamSection from "../components/TeamSection/TeamSection";
import NewSection from "../components/NewSection/NewSection";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  orderBy,
  collection,
} from "firebase/firestore";
import { db, postToJSON } from "/lib/firebase";
import { DateTime } from "luxon";
import { MainLoading } from "../lib/Context";
import dynamic from "next/dynamic";
const Leader = dynamic(() => import("../components/Leader/leader"));
export default function Home() {
  let [props, setProps] = useState({ current: [], upcoming: [] });
  let [loading, setLoading] = useState(true);
  const [allIn, setAllIn] = useState(false);
  useEffect(() => {
    let pressed = new Set();
    let onkeydown = (event) => {
      pressed.add(event.key);
      for (let code of ["Shift", "Control", ":"]) {
        if (!pressed.has(code)) return;
      }
      pressed.clear();
      setAllIn(true);
    };
    let onkeyup = (event) => {
      pressed.delete(event.key);
    };
    window.addEventListener("keyup", onkeyup);
    window.addEventListener("keydown", onkeydown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
      window.removeEventListener("keyup", onkeyup);
    };
  }, []);
  useEffect(() => {
    (async () => {
      const ref = query(
        collectionGroup(db, "hEvents"),
        orderBy("updatedAt", "desc")
      );
      const dc = await getDocs(ref);

      let upcoming = [],
        current = [];
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
      setProps({ current, upcoming });
      setLoading(false);
    })();
  }, []);
  function handleSetAllIn(bool) {
    setAllIn(bool);
  }
  return allIn ? (
    <Leader handleSetAllIn={handleSetAllIn} />
  ) : (
    <MainLoading.Provider value={{ loading }}>
      <div className={styles.main}>
        <ImageSlider /> <hr className={styles.hr} />
        <Content {...props} />
        {/* <TeamSection /> */}
        <NewSection />
      </div>
    </MainLoading.Provider>
  );
}

function findOut(date, edate) {
  let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  let today = DateTime.now().setZone("Asia/kolkata");

  let arr1 = date.match(reg);

  let starting = DateTime.local(
    parseInt(arr1[1]),
    parseInt(arr1[2]),
    parseInt(arr1[3])
  ).setZone("Asia/kolkata");
  let arr2 = edate.match(reg);
  let endingDate = DateTime.local(
    parseInt(arr2[1]),
    parseInt(arr2[2]),
    parseInt(arr2[3]) + 1
  ).setZone("Asia/kolkata");
  if (today < starting) return "upcoming";
  if (today > endingDate) return "past";
  return "current";
}
/// starting time <today ending time <today   for poast
/// starting
