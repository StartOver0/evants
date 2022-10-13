import { useRouter } from "next/router";
import styles from "/styles/PreviewPage.module.css";
import clubIcon from "/public/images/uuit.png";
import Image from "next/image";
import Link from "next/link";
import reactMarkDown from "/styles/reactmarkdown.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export default function PreviewPage({
  club,
  date,
  description,
  eligibility,
  fee,
  username,
  published,
  edate,
  googleFormLink,
  venue,
  teamsize,
  time,
  title,
  name1,
  name2,
  contact1,
  contact2,
  notes,
}) {
  const buildingName = "Uttaranchal institute of Technology";
  const clubCode = "UU-CSC";
  return (
    <div className={styles.container}>
      <div className={styles.left_div}>
        {/* event details: */}
        <div className={styles.club_data}>
          <div className={styles.club_image}>
            <Image src={clubIcon} alt="club Icon" width={40} height={40} />
          </div>
          <div className={styles.club_details}>
            <p className={styles.club_name}>{club}</p>
            <p className={styles.club_code}>{clubCode}</p>
          </div>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <ReactMarkdown
          linkTarget={"_blank"}
          className={reactMarkDown.reactMarkDown}
        >
          {description}
        </ReactMarkdown>

        <h3>Details about the program:</h3>
        <ul className={styles.details_list}>
          <li>
            Starting Date: <span className={styles.details}>{date}</span>{" "}
          </li>
          <li>
            Ending Date: <span className={styles.details}>{edate}</span>{" "}
          </li>
          <li>
            Timing: <span className={styles.details}>{time}</span>{" "}
          </li>
          <li>
            Who can participate:{" "}
            <span className={styles.details}>{eligibility}</span>{" "}
          </li>
          <li>
            Registration Fee: <span className={styles.details}>{fee}</span>{" "}
          </li>
          <li>
            Venue: <span className={styles.details}>{venue}</span>{" "}
          </li>
          <li>
            Team size: <span className={styles.details}>{teamsize}</span>{" "}
          </li>
          <li>
            Author:
            <div className="inline text-lg">
              <Link href={`/${username}`}>
                <a target={"_blank"}>{" @" + username}</a>
              </Link>
            </div>
          </li>
        </ul>

        {notes && (
          <div>
            <h3>Additonal Details:</h3>

            <ReactMarkdown
              linkTarget={"_blank"}
              className={reactMarkDown.reactMarkDown}
            >
              {notes}
            </ReactMarkdown>
          </div>
        )}

        {notes && (
          <>
            <h3>For any query contact:</h3>
            <ul className={styles.details_list}>
              <li>
                {name1}: <span className={styles.details}>{contact1}</span>{" "}
              </li>
              {name2 && contact2 && (
                <li>
                  {name2}: <span className={styles.details}>{contact2}</span>{" "}
                </li>
              )}
            </ul>
          </>
        )}
        {googleFormLink && (
          <div className="flex justify-center">
            <div className="text-white bg-green-400 hover:bg-green-300 p-3 rounded-full">
              <Link href={googleFormLink}>
                <a target={"_blank"}>Google Form Link</a>
              </Link>
            </div>
          </div>
        )}
        {published && (
          <div className="flex justify-end text-green-400">
            <div className="">Published📢</div>
          </div>
        )}
      </div>

      <div className={styles.right_div}>
        <div>
          <div className={styles.rclub}>
            <div>
              <Image src={clubIcon} alt="club Icon" width={60} height={60} />
            </div>
            <div className={styles.club_links}>
              <p>{clubCode}</p>
              <Link href="nowhere">
                <a className={styles.buttonx}>
                  Visit&nbsp;
                  <svg
                    className={styles.arrow}
                    width="12"
                    height="7"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.96324 0.212921C8.70259 0.49699 8.70259 0.957559 8.96324 1.24158L11.7142 4.23839L0.667743 4.23839C0.298923 4.23839 4.92972e-08 4.56411 3.26543e-08 4.96576C1.60077e-08 5.3675 0.298923 5.69314 0.667743 5.69314L11.7172 5.69314L8.90352 8.75832C8.64288 9.04234 8.64288 9.50296 8.90352 9.78698C9.16433 10.071 9.58704 10.071 9.84776 9.78698L13.6758 5.61678C13.6956 5.59524 13.7134 5.57232 13.7301 5.54888C13.8936 5.41649 14 5.20486 14 4.96581C14 4.73414 13.9002 4.52816 13.7452 4.395C13.7418 4.39102 13.7389 4.38697 13.7354 4.38313L9.90732 0.212921C9.64679 -0.0709741 9.22392 -0.0709741 8.96324 0.212921Z"
                      fill="blue"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
          <p>Follow on other platforms:</p>
          <div>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <p>twitter</p>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <p>facebook</p>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <p>instagram</p>
            </a>
          </div>
        </div>
        <div>
          <p>How request process works ?</p>
          <ol className={styles.request_process}>
            <li>
              Request is sent to the president or coordinator of the respective
              club.
            </li>
            <li>
              The request is either be discarded or accepted by the coordinator
              or president.
            </li>
            <li>
              If the request is accepted it will be uploaded to upcoming section
              otherwise it will be discarded.
            </li>
          </ol>
        </div>
      </div>

      {/* <div>event details:</div>
            <div>event procedure: and status</div>
            <button>request to post</button> */}
    </div>
  );
}
