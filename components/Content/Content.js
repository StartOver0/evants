import styles from './Content.module.css';
import ListItem from '../ListItem/ListItem';

export default function Content({heading, subheadings}){
  return(
    <div className={styles.container}>  
        <h2 className={styles.heading} >{heading}</h2>
        {subheadings.map((subheading) => (
          <div key={Math.random()}>
            <h3 className={styles.subheading}>{subheading}</h3>
            <hr className={styles.gray_hr}/>  
            <ListItem /> 
            <ListItem />
            <hr className={styles.list_gap} />
          </div>   
        ))}       
    </div>
  );
}
