import React, { useRef } from "react";
import { UserContext } from "../../lib/Context";
import { useContext, useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import processing from "/public/images/processing.png";
// Username form
import profilePic from "/public/images/user.png";
import { storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Router } from "react-router-dom";
export default function NameChecker() {
  const input = useRef(null);
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileimg, setProfileimg] = useState(profilePic);
  const [file, setfile] = useState(null);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { user, username } = useContext(UserContext);
  const imageRef = useRef();
  const onSubmit = async (e) => {
    e.preventDefault();
    let photoURL = null;
    if (file) {
      try {
        setLoader(true);
        let fileExtension = file.type;
        let extension = fileExtension.replace(/(.*)\//g, "");
        const imgRef = ref(storage, `images/${formValue}.${extension}`);
        let snapshot = await uploadBytes(imgRef, file);
        let profilePhotoRef = ref(storage, `images/${formValue}.${extension}`);

        let url = await getDownloadURL(profilePhotoRef);
        photoURL = url;
      } catch (err) {
        console.log(err);
      }
    }

    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", formValue);
    const batch = writeBatch(db);

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL ?? photoURL,
      displayName: user.displayName ?? "",
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
    router.push("/");
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    } else {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, "usernames", username);
        const docSnap = await getDoc(ref);
        console.log("Firestore read executed!");
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );
  const style = {
    height: "40px",
    width: "100%",
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    background: "rgba(0,0,0,0.7)",
    color: "red",
    fontSize: "1rem",
    fontWeight: "800",
  };
  return !username ? (
    <section className="w-[100vw] h-[70vh] flex items-center justify-center">
      <div className="border-solid border-black border-3 p-[60px] ">
        <form onSubmit={onSubmit}>
          {!user.photoURL && (
            <div className="overflow-hidden ">
              <div className="w-[100%] flex justify-center items-center">
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                  <div className="w-[100px] h-[100px]">
                    <Image
                      ref={imageRef}
                      className=" m-0 p-0"
                      src={profileimg}
                      layout="fill"
                      alt="profile picture"
                    />
                  </div>

                  <div
                    className="pb-[60px]"
                    style={style}
                    onClick={() => {
                      input.current.click();
                    }}
                  >
                    choose
                  </div>
                </div>
                <input
                  ref={input}
                  accept=".png, .jpg, .jpeg"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    setfile(event.target.files[0]);
                    setProfileimg(URL.createObjectURL(event.target.files[0]));
                  }}
                  required
                />
              </div>
              <div className="h-[30px]"></div>
            </div>
          )}
          <div className="">Choose Name</div>
          <input
            className="border-solid border-2 border-black"
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <div className="h-[5px]"></div>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <div className="flex items-center">
            {!loader && (
              <button
                type="submit"
                className="bg-green-300 p-[10px] rounded-lg"
                disabled={!isValid}
              >
                Choose
              </button>
            )}

            {loader && (
              <div className="w-[100%] flex justify-center">
                <Image
                  src={processing}
                  className="w-[40px]  h-[30px] animate-spin"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  ) : (
    <div className="w-[100%] flex justify-center">
      <Image src={processing} className="w-[100px] h-[100px] animate-spin" />
    </div>
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-600">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-600">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}