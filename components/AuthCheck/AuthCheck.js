import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  const router = useRouter();
  return username ? (
    props.children
  ) : (
    <div className="w-[100%] flex justify-center">
      <Image
        src={processing}
        alt="somthing"
        className="w-[100px] h-[100px] animate-spin"
      />
      {(() => {
        toast.success("Login Sucessfully!");
        router.push("/login");
      })()}
    </div>
  );
}
