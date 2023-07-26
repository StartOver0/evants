import Image from "next/image";
import Link from "next/link";
import none from "/public/images/404.gif";
import styles from '/styles/error.module.css';
import { useRouter } from "next/router";

export default function Custom404() {

  const router = useRouter();
  return (
    // <div className="min-h-[50vh] flex justify-center flex-col items-center m-5 gap-[2rem]">
    //   <h1 className="font-bold text-xl">
    //   </h1>
    //   <div className="relative">
    //     <h1 className="text-[400px] absolute left-[-115%] top-[-140px] tracking-[270px]">
    //       44
    //     </h1>
    //     <div className="rounded-[45%] border-solid border-black overflow-hidden border-[25px]">
    //       <Image src={none} width={170} height={270} />
    //     </div>
    //   </div>
    //   <Link href="/" className="">
    //     <div className="bg-blue-800 rounded-lg text-3xl flex justify-center text-white">
    //       <button className="p-3 ">Go home</button>
    //     </div>
    //   </Link>
    // </div>
    <div className={styles.container}>

      <div>
        <div >
        {/* style={{position: 'absolute', left: '50%', top: '50%'}}> */}
          <h1 className={styles.notf}>OOPS!</h1>
          <div className={styles.cs404}>
            <p className={styles.text}>404 - This page cannot be found !!</p></div>

        </div>
        <div className={styles.buttondiv}><button className={styles.button} onClick={() => {router.push('/')}}>GO TO HOMEPAGE</button></div>
      </div>
    </div>
  );
}
