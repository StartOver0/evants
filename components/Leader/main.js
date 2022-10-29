import { useContext, useEffect, useState } from "react";
import { LeaderContext } from "../../lib/Context";
import { auth } from "../../lib/firebase";
import BanUser from "./banUser";
import DeleteClubEvent from "./DeleteClubEvents";
import UCClub from "./UCClub";

export function Main({ handle }) {
  const [page, setPage] = useState("");
  const { current } = useContext(LeaderContext);
  function _setPage() {
    setPage("");
  }
  useEffect(() => {
    if (!current.includes(auth?.currentUser?.uid ?? "none")) {
      handle(false);
    }
  });
  if (page === "ban") {
    return <BanUser back={_setPage} handle={handle} />;
  } else if (page === "uc") {
    return <UCClub back={_setPage} handle={handle} />;
  } else if (page === "delEv") {
    return <DeleteClubEvent back={_setPage} handle={handle} />;
  }

  return (
    <div className="h-[70vh] flex justify-center items-center flex-col">
      <div className="flex flex-col">
        <div
          className="border-solid border-black border-2 mb-2 p-4 hover:bg-red-300"
          onClick={() => setPage("ban")}
        >
          Ban or Unban User
        </div>
        <div
          onClick={() => {
            setPage("uc");
          }}
          className="border-solid border-black border-2 mb-2 p-4 hover:bg-red-300"
        >
          Update or Create Club
        </div>
        <div
          onClick={() => {
            setPage("delEv");
          }}
          className="hover:bg-red-300 border-solid border-black border-2 mb-2 p-4"
        >
          Delete Club Event
        </div>
        <div
          className="border-solid border-black border-2 mb-2 p-4 hover:bg-red-300"
          onClick={() => handle(false)}
        >
          Exit
        </div>
      </div>
    </div>
  );
}
