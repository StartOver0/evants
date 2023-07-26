import Image from "next/image";
import backgroundImage from "/public/images/uuitimg.jpg";
import styles from './Avatar.module.css';
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { collection, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "/lib/firebase";

const Avatar = ({ Description, username, photoURL }) => {
  const [editDesc, setEditDesc] = useState(false);
  const [profileimg, setProfileimg] = useState(photoURL);
  const [file, setfile] = useState(null);
  const input = useRef(null);
  const desc = useRef();

  async function changeDesc() {
    if(desc.current.innerText == Description) return;
    let ref = doc(collection(db, "users"), auth.currentUser.uid);

    try {
      await updateDoc(ref, { Description: desc.current.innerText});
    } catch (err) {
      toast.error("Error"); 
    }
  }

 
  return (
    <div style={{ maxWidth: "800px" }} className={styles.pcontainer}>
      <div className={styles.img_container}>
        <div className={styles.bg_img}>
          <Image priority={true} src={backgroundImage} alt="something" className="" />
        </div>
        <div className={styles.user_img}>
          <div>
            <Image src={profileimg} alt="something" layout="fill" />
          </div>
          <span onClick={() => {input.current.click(); }} className={styles.choose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
          </span>
                <input
                    ref={input}
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      setfile(event.target.files[0]);
                      setProfileimg(URL.createObjectURL(event.target.files[0]));
                    }}
                />
        </div>
      </div>

      <div className={styles.username}>
        {username}
      </div>

      <div className={styles.desc_container}>
        <div contentEditable={`${editDesc}`} suppressContentEditableWarning={true} ref={desc} className={styles.desc} spellCheck="false">{Description.trim() ? Description : "No description Avalaible"}</div>
        
        {!editDesc?<div className={styles.edit} onClick={() => {setEditDesc(true); setTimeout(()=>{desc.current.focus();},10) }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg><span style={{backgroundColor: "rgb(14, 149, 227)"}}>Edit</span></div>
        :<div className={styles.edit} onClick={() => {setEditDesc(false); changeDesc();}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(0, 170, 0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><span style={{backgroundColor: "rgb(0, 170, 0)"}}>Save</span></div>}
      </div>
    </div>
  );
};

export default Avatar;
