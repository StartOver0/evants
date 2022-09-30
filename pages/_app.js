import '../styles/globals.css'
import Header from '/components/Header/Header';
import MainNav from '/components/MainNav/MainNav';
import Footer from '/components/Footer/Footer';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
const arr = [];
export default function MyApp({ Component, pageProps }){
  
  return(
    <SessionProvider>
       <div className='xRoot'>
      <Header />
      <MainNav />  
      <div className="main_content">
          <Component {...pageProps} />
      </div>
      <Footer />
     </div>
     </SessionProvider>
  )
}
