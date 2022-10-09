import ClubItem from '/components/ClubItem/ClubItem';
import clubData from '/staticData/clubList';
import styles from '/styles/Clubs.module.css';

export default function Clubs() {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h1 className={styles.heading}>Clubs List</h1>
        {clubData.map((item, idx) => (
            <ClubItem data={item} />
        ))}
      </div>
    </div>
  )
}
