import Link from 'next/link';
import styles from '/styles/Events.module.css';
import Image from 'next/image';
import img from '/public/images/uuit.png';

export default function events(){
    return (
        // <div className={styles.extra}>
            <div className={styles.container}>  
                <div className={styles.circle}></div>
                <h2 className={styles.heading}> Recent Contests</h2>
                <div className={styles.list_item}>
                    {/* <table className={styles.info_table}>
                        <thead>
                            <tr>
                                <th>Club Code</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Participants</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Club</td>
                                <td>Event Name</td>
                                <td>Date</td>
                                <td>Participants</td>
                            </tr>
                        </tbody>
                    </table> */}
                    <div className={styles.logo}>
                        <Image src={img} objectFit = 'contain' alt='something is nothing'/>
                        <p>code</p>
                    </div>
                    <div>Club Name</div>
                </div>
            </ div>
        // </div>
    )
}