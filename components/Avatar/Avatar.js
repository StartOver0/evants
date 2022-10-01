import Image from "next/image";
import Link from "next/link";
const Avatar = ({
  name,
  backgroundImage,
  discription,
  avatar,
  clubMemeber,
}) => {
  return (
    <div className="m-auto  max-w-[650px] rounded-lg overflow-hidden pb-[30px]">
      <div className="relative h-[200px]">
        <div className="h-[150px] overflow-hidden ">
          <Image src={backgroundImage} alt="something" className="" />
        </div>
        <div className="absolute w-[130px] h-[130px] rounded-full top-[80px] left-[20px] overflow-hidden">
          <Image src={avatar} alt="something" />
        </div>
      </div>
      <div className="inline relative left-[30px]">{name}</div>
      <div className="block relative left-[20px]">
        {clubMemeber.map((club, index) => {
          return (
            <div
              key={index}
              className="text-sm text-blue-800 hover:underline inline "
            >
              <Link href="/profile">{club + " "}</Link>
            </div>
          );
        })}
      </div>

      <div className=" pl-[20px] pr-[30px] font-thin text-sm">
        {discription}
      </div>
    </div>
  );
};

export default Avatar;
