import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { BigLoader } from "../../../../components/loading/loading";
export default function Home() {
  let router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    if (username) router.push("/" + username);
  }, [router]);

  return <BigLoader />;
}
