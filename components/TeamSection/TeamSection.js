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
                  {person.website && (
                    <a href={person.website} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>

                    </a>
                  )}
                  {person.github && (
                    <a href={person.github} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
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
