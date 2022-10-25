import { getAdditionalUserInfo } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LeaderContext } from "../../lib/Context";
import { auth, db } from "../../lib/firebase";
import processing from "/public/images/processing.png";
export default function BanUser({ back, handle }) {
  const [banuser, setBanuser] = useState("");
  const { current } = useContext(LeaderContext);
  const [unbanuser, setUnbanuser] = useState("");
  async function submit() {
    if (!current.includes(auth?.currentUser?.uid ?? "none")) {
      toast.error("you are not leader");
      return;
    }
    try {
      await toggleBWBanAndUnban(true, banuser);
      setBanuser("");
      toast.success("baned");
    } catch (err) {
      toast.error(err.message.toString());
    }
  }

  async function usubmit() {
    if (!current.includes(auth?.currentUser?.uid ?? "none")) return;
    await toggleBWBanAndUnban(false, unbanuser);
    toast.success("unbaned");
    setUnbanuser("");
  }
  return (
    <div className="h-[70vh] w-[80vw]">
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

      <div className="flex flex-col h-[50vh] items-center justify-around">
        <div className=" flex flex-col ">
          <div className="pb-2">Username</div>
          <input
            value={banuser}
            onChange={(e) => {
              setBanuser(e.target.value);
            }}
            className="border-solid border-3 border-black p-2"
            required
          />
          <button
            className="border-solid border-black border-2 mt-2 hover:bg-red-300"
            onClick={submit}
          >
            Ban User
          </button>
        </div>
        <div className=" flex flex-col ">
          <div className="pb-2">Username</div>
          <input
            onChange={(e) => {
              setUnbanuser(e.target.value);
            }}
            value={unbanuser}
            className="border-solid border-3 border-black p-2"
            required
          />
          <button
            className="border-solid border-black border-2 mt-2 hover:bg-red-300"
            onClick={usubmit}
          >
            Unban User
          </button>
        </div>
      </div>
    </div>
  );
}
async function toggleBWBanAndUnban(bool, banuser) {
  let ref = doc(collection(db, "usernames"), banuser);
  let uid = (await getDoc(ref)).data().uid;
  let uref = doc(collection(db, "users"), uid);
  await updateDoc(uref, { Ban: bool });
}
