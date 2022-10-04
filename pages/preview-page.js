import { useRouter } from "next/router"
import styles from '/styles/PreviewPage.module.css';
import clubIcon from '/public/images/uuit.png';
import Image from "next/image";
export default function PreviewPage() {
    const Router = useRouter();

    const {club, date, description, eligibility, fee, googleFormLink, time, title} = Router.query;
    const buildingName = 'Uttaranchal institute of Technology';
    return (
        <div className={styles.container}>
            <div className={styles.left_div}>
                {/* event details: */}
                <div className={styles.club_data}>
                    <div className={styles.club_image}>
                        <Image src={clubIcon} alt = 'club Icon' objectFit="cover"/>
                    </div>
                    <div className={styles.club_details}>
                        <p>{club}</p>
                        <p>{buildingName}</p>
                    </div>
                </div>
                {/* <h1>{title}</h1>
                <p>{description}</p> */}
                <button className={styles.button}>Request to Post</button>    
            </div>
            <div className={styles.right_div}>event procedure: and status</div>
            
            {/* <div>event details:</div>
            <div>event procedure: and status</div>
            <button>request to post</button> */}
        </div>
    )
}
