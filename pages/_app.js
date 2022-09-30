import '../styles/globals.css'
import Header from '/components/Header/Header';
import MainNav from '/components/MainNav/MainNav';
import Footer from '/components/Footer/Footer';


export default function MyApp({ Component, pageProps }){
  
  return(
       <div className='xRoot'>
      <Header />
      <MainNav />  
      <div className="main_content">
          <Component {...pageProps} />
      </div>
      <Footer />
     </div>

  )
}
