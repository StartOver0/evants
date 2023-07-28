import styles from "./Content.module.css";
import ListItem from "../ListItem/ListItem";
import { BigLoader } from "../loading/loading";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { postToJSON, db } from "../../lib/firebase";
import { useContext } from "react";
import { MainLoading } from "../../lib/Context";

export default function Content({ upcoming, current }) {
  const { loading } = useContext(MainLoading);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{"Events and Contests"}</h2>
      <div>
        <h3 className={styles.subheading}>{"Current events"}</h3>
        <hr className={styles.gray_hr} />
        {loading && (
          <div className="flex justify-center">
            <BigLoader />
          </div>
        )}
        {!loading && JSON.stringify(current) === JSON.stringify([]) && (
          <div>No events</div>
        )}
        {!loading &&
          current.map((post, index) => {
            return <ListItem key={index} post={post} />;
          })}

        <hr className={styles.list_gap} />
      </div>
      <div>
        <h3 className={styles.subheading}>{"Upcoming events"}</h3>
        <hr className={styles.gray_hr} />
        {loading && (
          <div className="flex justify-center">
            <BigLoader />
          </div>
        )}
        {!loading && JSON.stringify(upcoming) === JSON.stringify([]) && (
          <div>No events</div>
        )}
        {!loading &&
          upcoming.map((post, index) => {
            return <ListItem key={index} post={post} />;
          })}
        <hr className={styles.list_gap} />
      </div>
    </div>
  );
}
