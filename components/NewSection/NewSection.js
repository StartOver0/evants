import styles from './NewSection.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function NewSection(){
   return(
     <div className={styles.full_width}>
        <div className={styles.container}>
        <h2 className={styles.heading}>Whats's Upcoming</h2>
        <div className={styles.flexitems}>
            <div className={styles.svg}>
                <svg style={{verticalAlign: 'middle', overflow: 'hidden' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={300} height={300}>
                    <path d="M893.672727 777.309091l-183.854545-374.690909V207.127273h32.581818v-69.818182H281.6v69.818182h32.581818v197.818182l-183.854545 372.363636c-23.272727 48.872727-20.945455 107.054545 6.981818 153.6 30.254545 46.545455 79.127273 74.472727 134.981818 74.472727h479.418182c55.854545 0 104.727273-27.927273 134.981818-74.472727 27.927273-46.545455 32.581818-102.4 6.981818-153.6z" fill="#A3CEEF" />
                    <path d="M909.963636 770.327273l-181.527272-372.363637V223.418182h32.581818V121.018182H262.981818v102.4h32.581818v174.545454l-181.527272 372.363637c-27.927273 55.854545-23.272727 118.690909 9.309091 169.890909S211.781818 1024 272.290909 1024h479.418182c60.509091 0 116.363636-30.254545 148.945454-83.781818 32.581818-51.2 34.909091-114.036364 9.309091-169.890909z m-37.236363 153.6c-25.6 41.890909-69.818182 67.490909-121.018182 67.490909H272.290909c-48.872727 0-93.090909-25.6-121.018182-67.490909-25.6-41.890909-27.927273-93.090909-6.981818-137.309091l186.181818-379.345455V188.509091h-32.581818V153.6h428.218182v34.909091h-32.581818v218.763636l186.181818 379.345455c20.945455 44.218182 18.618182 95.418182-6.981818 137.309091z" fill="#86BEDA" />
                    <path d="M535.272727 349.090909m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" fill="#009DCF" />
                    <path d="M535.272727 463.127273m-41.890909 0a41.890909 41.890909 0 1 0 83.781818 0 41.890909 41.890909 0 1 0-83.781818 0Z" fill="#009DCF" />
                    <path d="M442.181818 516.654545m-27.927273 0a27.927273 27.927273 0 1 0 55.854546 0 27.927273 27.927273 0 1 0-55.854546 0Z" fill="#009DCF" />
                    <path d="M446.836364 76.8m-23.272728 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" fill="#009DCF" />
                    <path d="M500.363636 16.290909m-16.290909 0a16.290909 16.290909 0 1 0 32.581818 0 16.290909 16.290909 0 1 0-32.581818 0Z" fill="#009DCF" />
                    <path d="M602.763636 74.472727m-20.945454 0a20.945455 20.945455 0 1 0 41.890909 0 20.945455 20.945455 0 1 0-41.890909 0Z" fill="#009DCF" />
                    <path d="M765.672727 814.545455l-134.981818-251.345455H393.309091L258.327273 814.545455c-18.618182 32.581818 6.981818 72.145455 41.890909 72.145454H721.454545c37.236364 0 62.836364-39.563636 44.218182-72.145454z m-374.690909-55.854546c-16.290909 0-27.927273-11.636364-27.927273-27.927273s11.636364-27.927273 27.927273-27.927272 27.927273 11.636364 27.927273 27.927272c0 13.963636-11.636364 27.927273-27.927273 27.927273z m102.4 65.163636c-13.963636 0-23.272727-11.636364-23.272727-23.272727 0-13.963636 11.636364-23.272727 23.272727-23.272727 13.963636 0 23.272727 11.636364 23.272727 23.272727 0 13.963636-11.636364 23.272727-23.272727 23.272727z m0-81.454545c-23.272727 0-41.890909-18.618182-41.890909-41.890909s18.618182-41.890909 41.890909-41.890909 41.890909 18.618182 41.890909 41.890909-18.618182 41.890909-41.890909 41.890909zM363.054545 356.072727c6.981818 0 13.963636-6.981818 13.963637-13.963636V207.127273c0-6.981818-6.981818-13.963636-13.963637-13.963637s-13.963636 4.654545-13.963636 13.963637v134.981818c0 6.981818 6.981818 13.963636 13.963636 13.963636z" fill="#FCFCFF" />
                    <path d="M363.054545 386.327273m-13.963636 0a13.963636 13.963636 0 1 0 27.927273 0 13.963636 13.963636 0 1 0-27.927273 0Z" fill="#FCFCFF" />
                </svg>
            </div>
            <div className={styles.desc}>
                <h3>In Development</h3>
                <hr className={styles.hr}/>
                <ul>
                    <li>Payment Gateway</li>
                    <li>Analytics integration</li>
                </ul>
                <h3>In Testing</h3>
                <hr className={styles.hr}/>
                <ul>
                    <li>Inbuilt event manager</li>
                    <li>Allow users to access past event details</li>
                </ul>
            </div>
        </div>
        </div>
     </div>

   )
}
