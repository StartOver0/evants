import Image from "next/image";
import Link from "next/link";
import none from "/public/images/404.gif";
export default function Custom404() {
  return (
    <div className="min-h-[50vh] flex justify-center flex-col items-center m-5 gap-[2rem]">
      <h1 className="font-bold text-xl">
        {/* <span className="text-2xl font-bold">404:- </span> */}
        {/* {"Page Doesn't Exist"} */}
      </h1>
      <div className="relative">
        <h1 className="text-[400px] absolute left-[-115%] top-[-140px] tracking-[270px]">
          44
        </h1>
        <div className="rounded-[45%] border-solid border-black overflow-hidden border-[25px]">
          <Image src={none} width={170} height={270} />
        </div>
      </div>
      <Link href="/" className="">
        <div className="bg-blue-800 rounded-lg text-3xl flex justify-center text-white">
          <button className="p-3 ">Go home</button>
        </div>
      </Link>
    </div>
  );
}
