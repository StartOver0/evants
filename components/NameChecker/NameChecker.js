import React, { useRef } from "react";
import { UserContext } from "../../lib/Context";
import { useContext, useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import toast from "react-hot-toast";
import processing from "/public/images/processing.png";
// Username form
import profilePic from "/public/images/user.png";
import { storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function NameChecker() {
  const input = useRef(null);
  const [des, setDes] = useState();
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileimg, setProfileimg] = useState(profilePic);
  const [file, setfile] = useState(null);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { user, username } = useContext(UserContext);
  const imageRef = useRef();
  function isEmoji(str) {
    var ranges = [
      "[\uE000-\uF8FF]",
      "\uD83C[\uDC00-\uDFFF]",
      "\uD83D[\uDC00-\uDFFF]",
      "[\u2011-\u26FF]",
      "\uD83E[\uDD10-\uDDFF]",
    ];
    if (str.match(ranges.join("|"))) {
      return true;
    } else {
      return false;
    }
  }
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
        toast.error("Erorr!");
      }
    }

    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", formValue);
    const batch = writeBatch(db);
    const verifiedEmail = doc(db, "verifiedEmail", user.email);
    batch.set(verifiedEmail, { byGoogle: false });
    batch.set(userDoc, {
      gmail: user.email,
      AdminOf: [],
      isAdmin: false,
      username: formValue,
      photoURL: user.photoURL ?? photoURL,
      displayName: user.displayName ?? "",
      Description: des,
      Ban: false,
    });
    batch.set(usernameDoc, { uid: user.uid });
    try {
      await batch.commit();
    } catch (error) {
      toast.error("Error!");
    }
    toast.success("Login Sucessfully!");
    router.push("/");
  };

  const onChange = (e) => {
    const val = e.target.value;
    if (val.length > 15 && !isEmoji(val)) {
    } else if (val.length < 3) {
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
    if (!isEmoji(formValue)) checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, "usernames", username);
        let docSnap;
        try {
          docSnap = await getDoc(ref);
        } catch (err) {
          toast.error(err.message.toString());
        }

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
          {user != null && (
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
                    Choose
                  </div>
                </div>
                <input
                    ref={input}
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    className="hidden "
                    onChange={(event) => {
                      setfile(event.target.files[0]);
                      setProfileimg(URL.createObjectURL(event.target.files[0]));
                    }}
                    required
                />
              </div>
              {/* <div className="h-[30px]"></div> */}
            </div>
          )}
          <div className="">Choose Name</div>
          <div className="text-sm text-red-500">
            {"don't use any special character or emoji"}
          </div>
          <input
            className="border-solid border-2 border-black"
            name="username"
            placeholder="less then 15 character"
            value={formValue}
            onChange={onChange}
          />
          <div className="h-[5px]"></div>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <div>description</div>
          <textarea
            type="text"
            placeholder="description less then 150 character"
            value={des}
            onChange={(e) => {
              if (e.target.value.length <= 150) {
                setDes(e.target.value);
              }
            }}
            className="border-solid border-2 border-black"
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
                  alt="something"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  ) : (
    <div className="w-[100%] flex justify-center">
      <Image
        src={processing}
        alt="somthing"
        className="w-[100px] h-[100px] animate-spin"
      />
      {(() => {
        toast.success("Login Sucessfully!");
        router.push("/");
      })()}
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
