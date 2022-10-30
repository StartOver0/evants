import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import processing from "/public/images/processing.png";
import { auth, db } from "../../lib/firebase";
import Image from "next/image";
import { LeaderContext } from "../../lib/Context";
export default function DeleteClubEvent({ back, handle }) {
  const [input, setinput] = useState("");
  const { current } = useContext(LeaderContext);

  const [loading, setloading] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (!current.includes(auth?.currentUser?.uid ?? "none")) {
      toast.error("you are not leader");
      return;
    }

    setloading(true);
    const part = input.split("/");
    const clubname = part[4];
    const username = part[5];
    const slug = part[6];
    if (clubname && username && slug) {
      let ref = doc(
        collection(db, `clubs/${clubname}/events/${username}/un`),
        slug
      );

      try {
        let data = await getDoc(ref);
        if (data.exists()) {
          await deleteDoc(ref);
          toast.success("deleted");
        } else {
          toast.error("not present!");
        }
      } catch (err) {
        toast.error(err.message.toString());
        setloading(false);
      }
    } else {
      toast.error("not present");
    }
    setinput("");
    setloading(false);
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
      <div className="h-[50vh] flex justify-center items-center">
        <form onSubmit={submit} className=" flex flex-col">
          <div className="m-2">Url of Club Post</div>
          <input
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            className="m-2 border-solid border-black border-3 p-2"
            required
          />
          <div className="text-sm m-2 text-red-600">
            {"ex:- https://evants.vercel.app/clubs/clubname/username/slug"}
          </div>
          {loading ? (
            <div className="w-[100%] h-[100px] flex justify-center items-center">
              <Image
                className="w-[40px] h-[30px] animate-spin"
                src={processing}
                alt="something"
              />
            </div>
          ) : (
            <button className="m-2 border-solid border-2 border-black hover:bg-red-300">
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
