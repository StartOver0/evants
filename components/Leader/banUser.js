import { useState } from "react";

export default function BanUser({ back, handle }) {
  const [input, setInput] = useState(null);
  function submit() {}
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

      <div className="flex h-[50vh] items-center justify-center">
        <div className=" flex flex-col ">
          <div className="pb-2">Username</div>
          <input className="border-solid border-3 border-black p-2" />
          <button
            className="border-solid border-black border-2 mt-2 hover:bg-red-300"
            onClick={() => submit}
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}
