import "../styles/globals.css";
import Header from "/components/Header/Header";
import MainNav from "/components/MainNav/MainNav";
import Footer from "/components/Footer/Footer";
import { UserContext } from "../lib/Context";
import { useUserData } from "../lib/hooks";
import { RouterContext } from "../lib/Context";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
export default function MyApp({ Component, pageProps }) {
  let [path, _setPath] = useState("/");
  let userData = useUserData();
  const setPath = function (value) {
    _setPath(value);
  };
  return (
    <RouterContext.Provider value={{ path, setPath }}>
      <UserContext.Provider value={userData}>
        <div className="xRoot">
          <Header />
          <MainNav />
          <div className="main_content">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <div>
          <Toaster position="bottom-left" reverseOrder={false} />
        </div>
      </UserContext.Provider>
    </RouterContext.Provider>
  );
}
