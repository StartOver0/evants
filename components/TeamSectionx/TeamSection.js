import styles from './TeamSection.module.css';
import Image from 'next/image';
import teamMember1 from '/public/images/mdl.jpg';
import teamMember2 from '/public/images/nar.jpg';
import teamMember3 from '/public/images/ichi.jpg';

export default function TeamSection(){
  return(
    <div className={styles.full_width}>
        <div className={styles.card}>
            <div className={styles.first_one}>
                <div className={styles.img_container}>
                    <div className={styles.img}>
                        <Image src={teamMember1} objectFit='contain' alt="notdount"/>
                    </div>
                </div>
                {/* <div className={styles.content}>
                    <h3 className={styles.name}>Monkey D. Luffy</h3>
                    <p className={styles.pos}>One Piece</p>
                </div>  */}
                <div className={styles.links}>
                        <a href='#'>fb</a>
                        <a href='#'>tw</a>
                        <a href='#'></a>
                </div> 
            </div>
            <div className={styles.second_one}>
                <h2 className={styles.name}>Harshit Rawat</h2>
                <p className={styles.desc}>how do you do?</p>
            </div>
        </div>
        <div className={styles.card}>
            <div className={styles.first_one}>
                <div className={styles.img_container}>
                    <div className={styles.img}>
                        <Image src={teamMember2} objectFit='contain' alt="notdount"/>
                    </div>
                </div>
                <div className={styles.links}>
                        <a href='#'>fb</a>
                        <a href='#'>tw</a>
                        <a href='#'></a>
                </div> 
            </div>

            <div className={styles.second_one}>
                <h2 className={styles.name}>pradep Bisht</h2>
                <p className={styles.desc}>how do you do?</p>
            </div>
        </div>

        {/* <div className={styles.card}>
            <div className={styles.img_container}>
            <div className={styles.img}>
                <Image src={teamMember2} objectFit='contain' alt="notdount"/>
            </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>Uzumaki Naruto</h3>
                <p className={styles.pos}>Naruto</p>
            </div> 
            <div className={styles.links}>
                <a href='#'>fb</a>
                <a href='#'>tw</a>
                <a href='#'></a>
            </div>
        </div> */}
    </div>

    
  );
}

