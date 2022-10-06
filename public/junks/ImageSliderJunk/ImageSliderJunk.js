import styles from './ImageSliderJunk.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import data from "./data";
import { addRequestMeta } from 'next/dist/server/request-meta';

export default function ImageSlider(){
   const [sliderIndex, setSliderIndex] = useState(0);
  // console.log(data[slideCounter]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSlideCounter((slideCounter+1)%2)
  //     console.log(slideCounter)
  //   }, 7000)
  // })

  const shifts = {
    // animation: 'all 2000ms',
    // transform: 'translateX(100px)',
    marginLeft: `${-(sliderIndex-1)*25}%`,
    color: 'aqua'
  }
  console.log(shifts.marginLeft)
  return(
    <>
    <div className={styles.slider_div}>
      <div className={`${styles.ex_di} ${sliderIndex !== 0? styles.animate: ''}`} key={Math.random()}>
      <div className={` ${styles.slider_effect}`} style={shifts} key={Math.random()}>
            <Link href="#"><a>
                <div className={styles.first_image}>
                    <Image src={data[0].img} height={430} width={880} alt="notdount"/>
                </div></a>
            </Link>
            <div className={styles.image_text}>
                <h2 className={styles.head}>{data[0].heading}</h2>
                <div className={styles.desc_div}>
                  <p className={styles.desc}>{data[0].content}</p>
                </div>
                <Link href="#">
                    <a className={styles.link_text}>
                        <div className={styles.arrow_div}>
                          More
                          <span className={styles.arrow}>&rarr;</span>
                        </div>
                    </a>
                </Link>
            </div>
          </div>
        {data.map((elem, index) => {
           if(index == 0) return <></>
           return (
            <div className={` ${styles.slider_effect}`} key={index}>
            <Link href="#"><a>
                <div className={styles.first_image}>
                    <Image src={elem.img} height={430} width={880} alt="notdount"/>
                </div></a>
            </Link>
            <div className={styles.image_text}>
                <h2 className={styles.head}>{elem.heading}</h2>
                <div className={styles.desc_div}>
                  <p className={styles.desc}>{elem.content}</p>
                </div>
                <Link href="#">
                    <a className={styles.link_text}>
                        <div className={styles.arrow_div}>
                          More
                          <span className={styles.arrow}>&rarr;</span>
                        </div>
                    </a>
                </Link>
            </div>
          </div>
           )
        })}
      </div>
      <div className = {styles.button_section}>
          {sliderIndex !== 0 && <button 
          onClick={()=>{
            e.preventPropogation()
             setSliderIndex(sliderIndex-1)
          }}
          >left</button> }
          {sliderIndex !== data.length-1 && <button 
          onClick={(e)=>{
             e.preventPropogation()
             setSliderIndex(sliderIndex+1)
          }}
          >right</button>}
      </div>
    </div>
    </>
  );
}
import styles from './ImageSlider.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import data from "./data";
import { addRequestMeta } from 'next/dist/server/request-meta';

export default function ImageSlider(){
   const [sliderIndex, setSliderIndex] = useState(0);
  // console.log(data[slideCounter]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSlideCounter((slideCounter+1)%2)
  //     console.log(slideCounter)
  //   }, 7000)
  // })

  const shifts = {
    // animation: 'all 2000ms',
    // transform: 'translateX(100px)',
    marginLeft: `${-(sliderIndex-1)*25}%`,
    color: 'aqua'
  }
  console.log(shifts.marginLeft)
  return(
    <>
    <div className={styles.slider_div}>
      <div className={`${styles.ex_di} ${sliderIndex !== 0? styles.animate: ''}`} key={Math.random()}>
      <div className={` ${styles.slider_effect}`} style={shifts} key={Math.random()}>
            <Link href="#"><a>
                <div className={styles.first_image}>
                    <Image src={data[0].img} height={430} width={880} alt="notdount"/>
                </div></a>
            </Link>
            <div className={styles.image_text}>
                <h2 className={styles.head}>{data[0].heading}</h2>
                <div className={styles.desc_div}>
                  <p className={styles.desc}>{data[0].content}</p>
                </div>
                <Link href="#">
                    <a className={styles.link_text}>
                        <div className={styles.arrow_div}>
                          More
                          <span className={styles.arrow}>&rarr;</span>
                        </div>
                    </a>
                </Link>
            </div>
          </div>
        {data.map((elem, index) => {
           if(index == 0) return <></>
           return (
            <div className={` ${styles.slider_effect}`} key={index}>
            <Link href="#"><a>
                <div className={styles.first_image}>
                    <Image src={elem.img} height={430} width={880} alt="notdount"/>
                </div></a>
            </Link>
            <div className={styles.image_text}>
                <h2 className={styles.head}>{elem.heading}</h2>
                <div className={styles.desc_div}>
                  <p className={styles.desc}>{elem.content}</p>
                </div>
                <Link href="#">
                    <a className={styles.link_text}>
                        <div className={styles.arrow_div}>
                          More
                          <span className={styles.arrow}>&rarr;</span>
                        </div>
                    </a>
                </Link>
            </div>
          </div>
           )
        })}
      </div>
      <div className = {styles.button_section}>
          {sliderIndex !== 0 && <button 
          onClick={()=>{
            e.preventPropogation()
             setSliderIndex(sliderIndex-1)
          }}
          >left</button> }
          {sliderIndex !== data.length-1 && <button 
          onClick={(e)=>{
             e.preventPropogation()
             setSliderIndex(sliderIndex+1)
          }}
          >right</button>}
      </div>
    </div>
    </>
  );
}
/*
  // setSignUp(isSignUp);
  // }, [])
  // console.log(value, isSignUp);
  // useEffect(() => {
  //   setSignUp(value)
  //   console.log(value, 'x', isSignUp)
  // }, [])
  // const {data: session} = useSession();

  // console.log(session);
  // return(
  //   <div>

  //   {session ?
  //     <>
  //       <p> signed in</p>
  //       <button onClick={signOut}> Sign Out</button>
  //     </> :
  //     <>
  //       <p> signed out</p>
  //       <button onClick={signIn}> Sign In</button>
  //     </>
  //   }
  //   </div>
  // )
*/