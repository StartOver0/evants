import styles from './ImageSlider.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import data from "/staticData/data";
import Head from 'next/head';

export default function ImageSlider(){
   const [sliderIndex, setSliderIndex] = useState(0);

   const setIndex = (val) => {setSliderIndex(val)}
  // console.log(data[slideCounter]);

  useEffect(() => {
    const id = setTimeout(() => {
      setSliderIndex((sliderIndex+1)%data.length)
    }, 10000);
    return () => {
      clearInterval(id);
    }
  })

  const shift = {
    marginLeft: `-${100 * sliderIndex}%`
  }
  console.log(shift)
  return(
    
    <div className={styles.xoxo}>
      <Head>
        <title>UUEvents</title>
      </Head>
      <div className={styles.slider_container}> 
          <div className={styles.slider_div}>
              <div className={styles.img_div}>{data.map((entity, index) => {
                return (
                  <Link href="#"><a>
                    <div className={`${styles.first_image__mobile}`} style={shift} >
                        <Image src={entity.imgM} objectFit='contain' alt="notdount"/>
                    </div>
                  </a></Link>
                )
              })}
              </div>
              
              <div className={styles.image_text}>
                  <h2 className={styles.head}>{data[sliderIndex].heading}</h2>
                  <div className={styles.desc_div}>
                      <p className={styles.desc}>{data[sliderIndex].content}</p>
                  </div>
                  <Link href="#">
                      <a className={styles.link_text}>
                          <div className={styles.arrow_div}>
                            More
                            <span className={styles.arrow}>
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.96324 0.212921C8.70259 0.49699 8.70259 0.957559 8.96324 1.24158L11.7142 4.23839L0.667743 4.23839C0.298923 4.23839 4.92972e-08 4.56411 3.26543e-08 4.96576C1.60077e-08 5.3675 0.298923 5.69314 0.667743 5.69314L11.7172 5.69314L8.90352 8.75832C8.64288 9.04234 8.64288 9.50296 8.90352 9.78698C9.16433 10.071 9.58704 10.071 9.84776 9.78698L13.6758 5.61678C13.6956 5.59524 13.7134 5.57232 13.7301 5.54888C13.8936 5.41649 14 5.20486 14 4.96581C14 4.73414 13.9002 4.52816 13.7452 4.395C13.7418 4.39102 13.7389 4.38697 13.7354 4.38313L9.90732 0.212921C9.64679 -0.0709741 9.22392 -0.0709741 8.96324 0.212921Z" fill="#2A67B1"/>
                            </svg>
                            </span>
                          </div>
                      </a>
                  </Link>
              </div>
          </div>
          <p className={styles.image_number} >0{sliderIndex+1}&nbsp;/&nbsp;0{data.length}</p>
          <div className = {styles.button_section}>
              <div className={styles.LRbutton}>
                  <button 
                    className={styles.button_l}
                    onClick={()=>{
                      setSliderIndex((sliderIndex-1+data.length)%data.length)
                    }}
                    disabled = {sliderIndex == 0}
                  ><svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.2757 13.1844C10.2293 13.3103 10.2099 13.4447 10.2195 13.5794L10.2196 13.5815C10.2367 13.8062 10.3333 14.0139 10.4851 14.1722L14.8227 18.7146C14.9115 18.8076 15.0171 18.8815 15.1325 18.9335C15.248 18.9855 15.372 19.0151 15.4977 19.0214C15.6234 19.0277 15.7495 19.0106 15.8694 18.9707C15.9892 18.9308 16.1015 18.8684 16.1992 18.7856C16.297 18.7028 16.3785 18.6008 16.4376 18.4843C16.4967 18.3678 16.5316 18.2398 16.539 18.1078C16.5464 17.9759 16.5261 17.8444 16.48 17.7215C16.4339 17.5987 16.3634 17.4878 16.2745 17.3946L12.5653 13.5113L16.2746 9.62794C16.3635 9.53475 16.4339 9.424 16.48 9.30117C16.5261 9.17823 16.5464 9.04681 16.539 8.91485C16.5316 8.78291 16.4967 8.6549 16.4376 8.53832C16.3785 8.42188 16.297 8.31988 16.1992 8.23702C16.1015 8.15422 15.9892 8.09183 15.8694 8.05192C15.7495 8.01201 15.6233 7.99498 15.4977 8.00128C15.372 8.00757 15.248 8.03715 15.1325 8.08917C15.017 8.1412 14.9114 8.21513 14.8225 8.30827L10.4847 12.8509C10.3937 12.9457 10.322 13.0589 10.2757 13.1844ZM10.6239 13.3762C10.6284 13.3593 10.6336 13.3426 10.6397 13.3262C10.6662 13.2542 10.7078 13.188 10.762 13.1315L15.1004 8.58828C15.1534 8.5328 15.2173 8.48769 15.2888 8.45553C15.3602 8.42336 15.4376 8.40476 15.5166 8.4008C15.5957 8.39684 15.6748 8.40759 15.7494 8.43244C15.824 8.45729 15.8927 8.49576 15.9516 8.54563C16.0104 8.59551 16.0583 8.65584 16.0924 8.72315C16.1265 8.79046 16.1463 8.86345 16.1505 8.93794C16.1534 8.99034 16.1486 9.04276 16.1364 9.09372C16.1486 9.04279 16.1534 8.9904 16.1504 8.93804C16.1462 8.86355 16.1265 8.79055 16.0924 8.72324C16.0583 8.65593 16.0104 8.59561 15.9516 8.54573C15.8927 8.49585 15.824 8.45739 15.7494 8.43254C15.6748 8.40769 15.5957 8.39694 15.5166 8.4009C15.4376 8.40486 15.3601 8.42346 15.2887 8.45562C15.2173 8.48779 15.1533 8.5329 15.1004 8.58838L10.762 13.1316C10.7078 13.1881 10.6662 13.2543 10.6397 13.3263C10.6336 13.3427 10.6284 13.3593 10.6239 13.3762ZM16.1393 18.1677C16.1451 18.1404 16.1489 18.1127 16.1504 18.0848C16.1546 18.0103 16.1432 17.9358 16.1168 17.8654C16.0905 17.7951 16.0496 17.7304 15.9967 17.6749L12.0198 13.5114L12.0199 13.5114L15.9967 17.6748C16.0497 17.7303 16.0905 17.795 16.1169 17.8653C16.1432 17.9357 16.1547 18.0102 16.1505 18.0847C16.1489 18.1127 16.1451 18.1404 16.1393 18.1677Z" fill="#363636"/>
                  </svg>
                  </button> 
                  <button 
                    className={styles.button_r}
                    onClick={()=>{
                      setSliderIndex((sliderIndex+1)%data.length)
                    }}
                    disabled = {sliderIndex == data.length-1}
                  ><svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform:'rotate(180deg)'}}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.2757 13.1844C10.2293 13.3103 10.2099 13.4447 10.2195 13.5794L10.2196 13.5815C10.2367 13.8062 10.3333 14.0139 10.4851 14.1722L14.8227 18.7146C14.9115 18.8076 15.0171 18.8815 15.1325 18.9335C15.248 18.9855 15.372 19.0151 15.4977 19.0214C15.6234 19.0277 15.7495 19.0106 15.8694 18.9707C15.9892 18.9308 16.1015 18.8684 16.1992 18.7856C16.297 18.7028 16.3785 18.6008 16.4376 18.4843C16.4967 18.3678 16.5316 18.2398 16.539 18.1078C16.5464 17.9759 16.5261 17.8444 16.48 17.7215C16.4339 17.5987 16.3634 17.4878 16.2745 17.3946L12.5653 13.5113L16.2746 9.62794C16.3635 9.53475 16.4339 9.424 16.48 9.30117C16.5261 9.17823 16.5464 9.04681 16.539 8.91485C16.5316 8.78291 16.4967 8.6549 16.4376 8.53832C16.3785 8.42188 16.297 8.31988 16.1992 8.23702C16.1015 8.15422 15.9892 8.09183 15.8694 8.05192C15.7495 8.01201 15.6233 7.99498 15.4977 8.00128C15.372 8.00757 15.248 8.03715 15.1325 8.08917C15.017 8.1412 14.9114 8.21513 14.8225 8.30827L10.4847 12.8509C10.3937 12.9457 10.322 13.0589 10.2757 13.1844ZM10.6239 13.3762C10.6284 13.3593 10.6336 13.3426 10.6397 13.3262C10.6662 13.2542 10.7078 13.188 10.762 13.1315L15.1004 8.58828C15.1534 8.5328 15.2173 8.48769 15.2888 8.45553C15.3602 8.42336 15.4376 8.40476 15.5166 8.4008C15.5957 8.39684 15.6748 8.40759 15.7494 8.43244C15.824 8.45729 15.8927 8.49576 15.9516 8.54563C16.0104 8.59551 16.0583 8.65584 16.0924 8.72315C16.1265 8.79046 16.1463 8.86345 16.1505 8.93794C16.1534 8.99034 16.1486 9.04276 16.1364 9.09372C16.1486 9.04279 16.1534 8.9904 16.1504 8.93804C16.1462 8.86355 16.1265 8.79055 16.0924 8.72324C16.0583 8.65593 16.0104 8.59561 15.9516 8.54573C15.8927 8.49585 15.824 8.45739 15.7494 8.43254C15.6748 8.40769 15.5957 8.39694 15.5166 8.4009C15.4376 8.40486 15.3601 8.42346 15.2887 8.45562C15.2173 8.48779 15.1533 8.5329 15.1004 8.58838L10.762 13.1316C10.7078 13.1881 10.6662 13.2543 10.6397 13.3263C10.6336 13.3427 10.6284 13.3593 10.6239 13.3762ZM16.1393 18.1677C16.1451 18.1404 16.1489 18.1127 16.1504 18.0848C16.1546 18.0103 16.1432 17.9358 16.1168 17.8654C16.0905 17.7951 16.0496 17.7304 15.9967 17.6749L12.0198 13.5114L12.0199 13.5114L15.9967 17.6748C16.0497 17.7303 16.0905 17.795 16.1169 17.8653C16.1432 17.9357 16.1547 18.0102 16.1505 18.0847C16.1489 18.1127 16.1451 18.1404 16.1393 18.1677Z" fill="#363636"/>
                  </svg></button>
              </div>
              <div className={styles.slider_navigator}>
                  <div className={styles.circle_navigation}>
                    {
                        data.map((ele, index) => (
                          <button onClick={() => setIndex(index)} className = {sliderIndex === index? styles.active: ""} key=
                          {Math.random()}></button>
                        ))
                    }
                  </div>
              </div>
          </div>  
      </div>
    </div>
  );
}
