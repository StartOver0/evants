import profileImage from '/public/images/uuit.png';
import Image from 'next/image';
import styles from '/styles/ClubPage.module.css';
import backgroundImage from "/public/images/uuitimg.jpg";
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogPreview from '../components/blogPreview/blogPreview';
import { isAdmin } from '@firebase/util';
import Link from 'next/link';
import ExternalLinks from '/components/ExternalLinks/ExternalLinks';

export default function Clubs() {
  // just for random checks
  const instagram = "https://instagram.com";
  const twitter = "https://twitter.com";
  const linkedin = "https://linkedin.com";
  const facebook = "https://facebook.com";
  const links = {
      instagram: instagram, 
      twitter: twitter,
      linkedin: linkedin,
      facebook: facebook
  }

  const clubAdmin = ['my name is khan', 'ek tha basoodiwala', 'the unknown cow', 'the wonderer in disguise'];
  const isFollowing = false;
  const startDate = "10/12/2010"
  return (
    
    <div className={styles.outer}>
    <div className={styles.container}>
      <Script src="https://kit.fontawesome.com/cfa12a970c.js" crossorigin="anonymous"></Script>
      <div className={styles.first_container}>
        {/* Here the background image, the profile image and the content will be added. */}
            <div className={styles.background_image}>
                <div>
                <Image src={backgroundImage} alt='background-image'  objectFit='cover' />
                </div>
            </div>
            <div className={styles.cover}>
                <div>
                    <div className={styles.exdiv}>
                        <div className={styles.club}>
                            <div className={styles.ptext}>
                                <div className={styles.profile_image}>
                                    <Image src={profileImage} alt='background-image' objectFit='cover'/>
                                </div>
                                <p className={styles.clubcode1}>UU-CSC</p>
                            </div>
                            <div className={styles.club_details}>
                                <p className={styles.clubname}>UTTARANCHAL UNIVERSITY  COMPUTER SCIENCE CLUB</p>
                                <p className={styles.clubcode}>UU-CSC</p>
                            </div>
                        </div>
                        <div className={styles.follow_div}>
                          {isFollowing ?
                            <button className={styles.follow} style={{'background-color':'#2fb390'}}> following </button>
                            :<button className={styles.follow}> follow&nbsp;+ </button>
                          }
                        </div>
                    </div>
                    <div className={styles.desc}>Today i am very proud to share that i now have the motivation to make this club page. The main motivator for me was pradep who everyday asked me about the club page.</div>
                </div>
                <div className={styles.onlytocenter}>
                  <div className={styles.fc}>
                      <p>Follow on other sites:</p>
                      <ExternalLinks links={links} />
                  </div>
                </div>
            </div>
      </div>
      <div className={styles.second_container} style={{'margin-bottom':'16px'}}>
          <div className={styles.admin_block}>
            <p>Started on: {startDate}</p>
              
              <div className={styles.esas}>
              <div>
                <p>Admin list :</p>
                <ul className={styles.admin_list}>
                    {clubAdmin.map((person, index) => (
                      <li key={index}><Link href='linktoprofile'><a>{person}</a></Link></li>
                    ))}
                </ul>
              </div>
              <div>
                  <p>Query :</p>
                  <ul className={styles.admin_list}>
                      <li>name: number</li>
                      <li>name: number</li>
                  </ul>
              </div>
              </div>
          </div>
          <div><BlogPreview /></div>
      </div>
    </div>    
    </div>
  )
}

