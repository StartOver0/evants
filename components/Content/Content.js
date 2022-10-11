import styles from "./Content.module.css";
import ListItem from "../ListItem/ListItem";

import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { postToJSON, db } from "../../lib/firebase";
export default function Content({ upcoming, current }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{"Events and Contests"}</h2>
      <div>
        <h3 className={styles.subheading}>{"Current events"}</h3>
        <hr className={styles.gray_hr} />
        {current.map((post, index) => {
          return <ListItem key={index} post={post} />;
        })}

        <hr className={styles.list_gap} />
      </div>
      <div>
        <h3 className={styles.subheading}>{"Upcoming events"}</h3>
        <hr className={styles.gray_hr} />
        {upcoming.map((post, index) => {
          return <ListItem key={index} post={post} />;
        })}

        <hr className={styles.list_gap} />
      </div>
    </div>
  );
}
