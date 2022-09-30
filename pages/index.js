import ImageSlider from '../components/ImageSlider/ImageSlider';
import styles from '/styles/Home.module.css';
import Content from '../components/Content/Content';
import TeamSection from '../components/TeamSection/TeamSection';

const subheadings = ['upcoming events', 'past events'];

export default function Home() {
  return (
  <div className={styles.main}>
    <ImageSlider /> <hr className={styles.hr}/>
    <Content heading = "Events and Contests" subheadings={subheadings}/>
    <TeamSection />
  </div>
  )
}
