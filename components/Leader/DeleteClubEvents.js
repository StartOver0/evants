export default function DeleteClubEvent({ back, handle }) {
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
    </div>
  );
}
