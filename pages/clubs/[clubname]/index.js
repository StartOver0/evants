import profileImage from "/public/images/uuit.png";
import Image from "next/image";
import styles from "/styles/ClubPage.module.css";
import backgroundImage from "/public/images/uuitimg.jpg";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogPreview from "../../../components/blogPreview/blogPreview";
import Link from "next/link";
import ExternalLinks from "/components/ExternalLinks/ExternalLinks";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
import { db, postToJSON } from "../../../lib/firebase";
import UnAuthBlogPreview from "../../../components/unAuthBlogPreviewForClub/index";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  startAfter,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BigLoader } from "../../../components/loading/loading";
const li = 3;

export default function Home() {
  let [loading, setloading] = useState(false);
  let [postEnd, setPostEnd] = useState(false);
  let [data, setData] = useState();
  let router = useRouter();
  const { clubname } = router.query;
  useEffect(() => {
    (async () => {
      if (clubname) {
        let ClubInfo = (await getDoc(doc(db, `clubs/${clubname}`))).data();
        let PostsRef = collectionGroup(db, "un");
        const q = query(
          PostsRef,
          where("club", "==", clubname),
          orderBy("createdAt", "desc"),
          limit(li)
        );
        const p = await getDocs(q);
        let post = [];
        p.forEach((doc) => {
          post.push(postToJSON(doc));
        });
        if (post.length < li) {
          setPostEnd(true);
        }
        let allin = { ClubInfo, post };
        setData(allin);
      }
    })();
  }, [router]);
  async function getMore() {
    setloading(true);
    const last = data.post[data.post.length - 1];
    const cursor = Timestamp.fromMillis(last.createdAt);

    const ref = collectionGroup(db, `un`);
    const q = query(
      ref,
      where("club", "==", clubname),
      orderBy("createdAt", "desc"),

      limit(li),
      startAfter(cursor)
    );
    let newpost = [];
    let docs = await getDocs(q);
    docs.forEach((doc) => {
      newpost.push(postToJSON(doc));
    });
    setData({ ClubInfo: data.ClubInfo, post: [...data.post, ...newpost] });
    setloading(false);
    if (newpost.length < li) {
      setPostEnd(true);
    }
  }

  if (!data) {
    return <BigLoader />;
  }
  return (
    <Clubs
      allData={data}
      loadmore={loading}
      getMore={getMore}
      postEnd={postEnd}
    />
  );
}

function Clubs(props) {
  const { ClubInfo, post } = props.allData;
  const { loadmore, postEnd, getMore } = props;
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <Script
          src="https://kit.fontawesome.com/cfa12a970c.js"
          crossorigin="anonymous"
        ></Script>
        <div className={styles.first_container}>
          {/* Here the background image, the profile image and the content will be added. */}
          <div className={styles.background_image}>
            <div>
              <Image
                src={backgroundImage}
                alt="background-image"
                objectFit="cover"
              />
            </div>
          </div>
          <div className={styles.cover}>
            <div>
              <div className={styles.exdiv}>
                <div className={styles.club}>
                  <div className={styles.ptext}>
                    <div className={styles.profile_image}>
                      <Image
                        src={ClubInfo.clubPhoto}
                        alt="background-image"
                        layout="fill"
                      />
                    </div>
                    <p className={styles.clubcode1}>{ClubInfo.clubCode}</p>
                  </div>
                  <div className={styles.club_details}>
                    <p className={styles.clubname}>{ClubInfo.clubName}</p>
                    <p className={styles.clubcode}>{ClubInfo.clubCode}</p>
                  </div>
                </div>
                <div className={styles.follow_div}></div>
              </div>
              <div className={styles.desc}>{ClubInfo.clubDescription}</div>
            </div>
            <div className={styles.onlytocenter}>
              <div className={styles.fc}>
                <p>Follow on other sites:</p>
                <ExternalLinks links={ClubInfo.social} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.second_container}
          style={{ marginBottom: "16px" }}
        >
          <div className={styles.admin_block}>
            <div className={styles.esas}>
              <div>
                <p>Admin list :</p>
                <ul className={styles.admin_list}>
                  {ClubInfo.clubAdmins.map((person, index) => (
                    <li key={index}>
                      <Link href={`/${person}`}>
                        <a>{person}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <UnAuthBlogPreview {...post} />
            {!loadmore && !postEnd && (
              <div
                onClick={getMore}
                className="  max-w-[100vw] tracking-wider flex justify-center items-center mb-4 bg-color cursor-pointer "
              >
                <div className="w-[180px] text-white bg-red-600 hover:bg-red-900 flex p-2 rounded-full items-center justify-center">
                  <div>Load more</div>
                </div>
              </div>
            )}
            {loadmore && (
              <div className="flex justify-center items-center">
                <BigLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
