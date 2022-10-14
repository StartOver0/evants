import Image from "next/image";
import Link from "next/link";
import none from "/public/images/404.gif";
export default function Custom404() {
  return (
    <main className="h-[80vh] flex justify-center flex-col items-center">
      <h1 className="font-bold text-xl">
        <span className="text-2xl font-bold">404:- </span>
        {"Page Doesn't Exist"}
      </h1>
      <div>
        <Image src={none} width={500} height={400} />
      </div>
      <Link href="/">
        <div className="bg-blue-800 rounded-lg text-3xl flex justify-center text-white">
          <button className="p-3 ">Go home</button>
        </div>
      </Link>
    </main>
  );
}
