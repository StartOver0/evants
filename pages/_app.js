import "../styles/globals.css";
import Header from "/components/Header/Header";
import MainNav from "/components/MainNav/MainNav";
import Footer from "/components/Footer/Footer";
import { UserContext } from "../lib/Context";
import { useUserData } from "../lib/hooks";

export default function MyApp({ Component, pageProps }) {
  let userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <div className="xRoot">
        <Header />
        <MainNav />
        <div className="main_content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}
