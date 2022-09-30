import styles from './uselse.module.css';

export default function uselse(){
  return(
    <div suppressHydrationWarning> cbb
      <a href='haha' className={styles.details_button}>
          REGISTER
          <span className={styles.tail_blue}>&#62;</span> 
      </a> 
 
      <button className={styles.details_button}>
          REGISTER
          <span className={styles.tail_blue}>&#62;</span>
      </button> 
    </div>
  );
}
