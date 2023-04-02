import styles from '/styles/About.module.css';
import TeamSection from '/components/TeamSection/TeamSection';

export default function About() {
  return (
  <div >
    <div className={styles.about_container}>
        <div className={styles.about}>
            <h2 className={styles.title}> And now a whole page <span>About Us</span></h2>
            <p className={styles.about_first}>We are enthusiastic individuals curious about learning and working.</p>
            <p className={styles.about_second}> We are students, currently pursuing B.Tech from Uttaranchal University. </p>
            <div className={styles.about_third}>
              And also, We are&nbsp;
              <div className={styles.list}>
                <div className={styles.first}>Web&nbsp;Developers</div>
                <div>Students</div>
                <div>Coders</div>
                <div>Below&nbsp;this&nbsp;section</div>
              </div>
            </div>
        </div>
    </div>
      <TeamSection />
    {/* <div className={styles.about_container}>
        <div className={styles.about}>
          <h2 className={styles.title}>Our other <span>works</span></h2>
          <div>
            java wale ka website.
          </div>
          <div>
            Ek or bnalenge koi.
          </div>
        </div>
    </div> */}
  </div>
  )
}