import styles from "./TeamSection.module.css";
import Image from "next/image";
import teamData from "/staticData/teamData";
import { useEffect, useState } from "react";
const harshitGithubName = "startover0";
const pradeepGithubName = "pradeep800";
export default function TeamSection() {
  const [pradeepInfo, setPradeepInfo] = useState();
  const [harshitInfo, setHarshitInfo] = useState();
  useEffect(() => {
    const pradeepInfoPromise = fetch(
      `https://api.github.com/users/${pradeepGithubName}`
    ).then((res) => res.json());
    const harshitInfoPromise = fetch(
      `https://api.github.com/users/${harshitGithubName}`
    ).then((res) => res.json());
    (async () => {
      const [harshitAllInfoValue, pardeepAllInfoValue] =
        await Promise.allSettled([harshitInfoPromise, pradeepInfoPromise]);
      const harshitAllInfo = harshitAllInfoValue?.value;
      const pradeepAllInfo = pardeepAllInfoValue?.value;
      if (!harshitAllInfo || !pradeepAllInfo) {
        return;
      }
      setPradeepInfo({
        name: pradeepAllInfo?.name,
        profilePhoto: pradeepAllInfo?.avatar_url,
        github_name: pradeepAllInfo?.login,
        twitter_name: pradeepAllInfo.twitter_username,
      });
      setHarshitInfo({
        name: harshitAllInfo?.name,
        profilePhoto: harshitAllInfo?.avatar_url,
        github_name: harshitAllInfo?.login,
        twitter_name: harshitAllInfo.twitter_username,
      });
    })();
  }, []);
  console.log(harshitInfo, pradeepInfo);
  if (!harshitInfo || !pradeepInfo) {
    //you can add skeleton here
    return null;
  }
  return (
    <div className={styles.full_width}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Team and Contributors</h2>
        <div className={styles.card_div}>
          {teamData.map((person, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.img_container}>
                <div className={styles.img}>
                  <Image src={person.img} objectFit="contain" alt="notdount" />
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.pos}>{person.work}</p>
              </div>
              <div className={styles.links}>
                <div className={styles.external_links}>
                  {person.instagram && (
                    <a href={person.instagram} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  )}
                  {person.facebook && (
                    <a href={person.facebook} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                  )}

                  {person.linkedin && (
                    <a href={person.linkedin} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  )}
                  {person.twitter && (
                    <a href={person.twitter} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
