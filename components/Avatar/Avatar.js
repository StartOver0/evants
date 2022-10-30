import Image from "next/image";
import backgroundImage from "/public/images/uuitimg.jpg";

const Avatar = ({ Description, username, photoURL }) => {
  return (
    <div style={{ maxWidth: "800px" }} className="rounded-lg overflow-hidden ">
      <div className="relative h-[200px]">
        <div className="h-[150px] overflow-hidden ">
          <Image src={backgroundImage} alt="something" className="" />
        </div>
        <div className="absolute mx-[auto] left-[50%] translate-x-[-50%]  w-[130px] h-[130px] rounded-full top-[80px]  overflow-hidden">
          <div>
            <Image src={photoURL} alt="something" layout="fill" />
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="inline relative text-center top-[10px] text-xl font-bold ">
          {username}
        </div>
      </div>

      <div className=" pl-[30px] text-center pt-3 pr-[30px] font-thin text-sm">
        {Description}
      </div>
    </div>
  );
};

export default Avatar;
