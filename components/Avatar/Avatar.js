import Image from "next/image";
import backgroundImage from "/public/images/uuitimg.jpg";
import styles from './Avatar.module.css';
import Link from "next/link";

const Avatar = ({ Description, username, photoURL }) => {
  return (
    <div style={{ maxWidth: "800px" }} className={styles.pcontainer}>
      <div className={styles.img_container}>
        <div className={styles.bg_img}>
          <Image src={backgroundImage} alt="something" className="" />
        </div>
        <div className={styles.user_img}>
          <div>
            <Image src={photoURL} alt="something" layout="fill" />
          </div>
        </div>
      </div>

      <div className={styles.username}>
        {username}
      </div>

      <div className={styles.desc_container}>
        <div>{Description.trim() ? Description : "No description Avalaible"}</div>
        <Link href="/descriptionEdit"><div className={styles.edit}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></div></Link>
      </div>
    </div>
  );
};

export default Avatar;
