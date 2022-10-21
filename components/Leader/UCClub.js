import { useForm } from "react-hook-form";
import { cloneElement, useRef, useState } from "react";
import processing from "/public/images/processing.png";
import Image from "next/image";
import clubPhoto from "/public/images/clubphoto.jpg";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export default function UCClub({ back, handle }) {
  let [clubphoto, setClubphoto] = useState(null);
  const [loading, setLoading] = useState(false);
  let form = useRef(null);
  let input = useRef(null);
  let [photo, setPhoto] = useState(null);
  let { handleSubmit, register, watch } = useForm();
  function _setloading(bool) {
    setLoading(bool);
  }
  function submit() {
    setLoading(true);
    let social = GiveSocial(
      watch("twitter"),
      watch("facebook"),
      watch("linkdin"),
      watch("instragram")
    );
    let data = ClubInfo(
      social,
      watch("clubName"),
      watch("clubCode"),
      watch("clubDescription"),
      spliteBySemi(watch("clubAdmin"))
    );

    try {
      (async () => {
        const { clubs, bool } = await ClubExist(data.clubCode);
        let batch = writeBatch(db);
        if (bool) {
          const yes = confirm(
            "Do You Want To Change Information of This Club?"
          );
          if (yes) {
            try {
              let oldAdmins = (
                await getDoc(doc(collection(db, "clubs"), data.clubCode))
              ).data().clubAdmins;

              const oldids = await getUserId(oldAdmins);
              await removeadmin(oldids, batch, data.clubCode);
              await createClub(
                batch,
                clubs,
                form,
                clubphoto,
                _setloading,
                data
              );
              setPhoto(null);
            } catch (err) {
              setLoading(false);
              toast.error(err.message.toString());
            }
          }
        } else {
          await createClub(batch, clubs, form, clubphoto, _setloading, data);
          setPhoto(null);
        }
        setLoading(false);
      })();
    } catch (err) {
      toast.error(err.message.toString(), { duration: 10000 });
      setLoading(false);
    }
  }
  return (
    <div className=" ">
      <div className="flex justify-between">
        <div
          className="text-center text-xl flex items-center font-black rounded-lg hover:bg-red-300"
          onClick={back}
        >
          {"<<<"}
        </div>
        <div
          onClick={() => {
            handle(false);
          }}
          className="hover:bg-red-300 p-2 rounded-lg "
        >
          Exit
        </div>
      </div>

      <form
        ref={form}
        onSubmit={handleSubmit(submit)}
        className="  p-2 flex flex-col   max-w-[600px]"
      >
        Club Name*
        <input
          {...register("clubName")}
          className=" p-2 border-solid border-2 border-black"
          required
        />
        Club Code*
        <input
          {...register("clubCode")}
          className="p-2 border-solid border-2 border-black"
          required
        />
        Club Admins
        <input
          {...register("clubAdmin")}
          className=" p-2 border-solid border-2 border-black"
          required
        />
        Club Description*
        <textarea
          rows={5}
          {...register("clubDescription")}
          className="p-2 border-solid border-2 border-black"
          required
        />
        <div className=" w-[100px] m-2 rounded-full overflow-hidden">
          <Image
            width={100}
            height={100}
            src={(() => photo ?? clubPhoto)()}
            alt="club profile"
          />
        </div>
        Club photoURL*
        <input
          ref={input}
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            console.log(e);
            if (e.target.files[0] && e.target.files[0].size <= 2000000) {
              setClubphoto(e.target.files[0]);
              setPhoto(URL.createObjectURL(e.target.files[0]));
            } else {
              input.current.value = null;
              toast.error("Image size is Greater then 2 mb");
              setClubphoto(null), setPhoto(null);
            }
          }}
          type="file"
          className="p-2 border-solid border-2 border-black"
          required
        />
        <div className=" self-center py-3 font-black">SOCIAL</div>
        Twitter
        <input
          {...register("twitter")}
          className="p-2 border-solid border-2 border-black"
        />
        Instragram
        <input
          {...register("instragram")}
          className="p-2 border-solid border-2 border-black"
        />
        Facebook
        <input
          {...register("facebook")}
          className="p-2 border-solid border-2 border-black"
        />
        Linkdin
        <input
          {...register("linkdin")}
          className="p-2 border-solid border-2 border-black"
        />
        {loading ? (
          <div className="w-[100%] h-[100px] flex justify-center items-center">
            <Image
              className="w-[40px] h-[30px] animate-spin"
              src={processing}
              alt="something"
            />
          </div>
        ) : (
          <button className=" border-solid border-2 bg-red-100 border-black hover:bg-red-300 my-3 mt-5 p-2 self-center">
            Create Club
          </button>
        )}
      </form>
    </div>
  );
}
function rDuplicate(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
function spliteBySemi(str) {
  return str.split(",");
}
function GiveSocial(twitter, facebook, linkdin, instragram) {
  return { twitter, facebook, linkdin, instragram };
}
function ClubInfo(social, clubName, clubCode, clubDescription, clubAdmins) {
  return { social, clubName, clubCode, clubDescription, clubAdmins };
}
async function ClubExist(clubcode) {
  let ref = doc(collection(db, "club"), "clubname");
  let clubs = (await getDoc(ref)).data().clubs ?? [];
  let bool = clubs.includes(clubcode);
  return { bool, clubs };
}
async function getUserId(arr) {
  let ids = [];
  for (let i = 0; i < arr.length; i++) {
    let a = (await getDoc(doc(collection(db, "usernames"), arr[i]))).data().uid;
    ids.push(a);
  }
  return ids;
}
async function makeAdmin(ids, batch, clubCode) {
  for (let i = 0; i < ids.length; i++) {
    const ref = doc(collection(db, "users"), ids[i]);
    const old = (await getDoc(ref)).data().AdminOf ?? [];
    batch.update(ref, {
      isAdmin: true,
      AdminOf: rDuplicate([...old, clubCode]),
    });
  }
}
async function removeadmin(ids, batch, clubcode) {
  for (let i = 0; i < ids.length; i++) {
    const ref = doc(collection(db, "users"), ids[i]);
    const old = (await getDoc(ref)).data().AdminOf ?? [];
    let isAdmin = true;
    let AdminOf = remove(old, clubcode);
    if (AdminOf.length === 0) {
      isAdmin = false;
    }
    batch.update(ref, {
      isAdmin,
      AdminOf,
    });
  }
}
function remove(arr, value) {
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== value) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
async function profile(file, clubCode) {
  const fileExtension = file.type;
  const extension = fileExtension.replace(/(.*)\//g, "");
  const imgref = ref(storage, `images/${clubCode}.${extension}`);
  const uploadedfile = await uploadBytes(imgref, file);
  const url = await getDownloadURL(imgref);
  return url;
}
async function createClub(batch, clubs, form, clubphoto, _setloading, data) {
  try {
    data.clubPhoto = await profile(clubphoto, data.clubCode);
    let ids = await getUserId(data.clubAdmins);
    await makeAdmin(ids, batch, data.clubCode);
    batch.set(doc(collection(db, "club"), "clubname"), {
      clubs: rDuplicate([...clubs, data.clubCode]),
    });
    batch.set(doc(collection(db, "clubs"), data.clubCode), data);
    await batch.commit();
    toast.success("sucessfully created");
    form.current.reset();
  } catch (err) {
    toast.error(err.message.toString());
    console.log(err);
    _setloading(false);
  }
}
