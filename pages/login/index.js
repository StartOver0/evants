import {signOut, signIn, useSession} from 'next-auth/react';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import '/styles/login.module.css';
import styles from '/styles/loginx.module.css';

export default function Login(){
  const Router = useRouter();
 
  let [isSignUp, setSignUp] = useState(false);

  useEffect(() => {
    if(Router.isReady){
      const {value} = Router.query;
      if(value == 1 && isSignUp == false){
         setSignUp(true);
      }
    }
  }, [])

  // setSignUp(isSignUp);
  // }, [])
  // console.log(value, isSignUp);
  // useEffect(() => {
  //   setSignUp(value)
  //   console.log(value, 'x', isSignUp)
  // }, [])
  // const {data: session} = useSession();

  // console.log(session);
  // return(
  //   <div>

  //   {session ?  
  //     <>
  //       <p> signed in</p>
  //       <button onClick={signOut}> Sign Out</button>
  //     </> :
  //     <>
  //       <p> signed out</p>
  //       <button onClick={signIn}> Sign In</button>
  //     </> 
  //   }
  //   </div>
  // )
 return(
    <div className={styles.container}>

        <div className={styles.text_container}>
                <div className={styles.first_one}></div>
                <h2>Welcome New User</h2>
        </div>

        <div className={styles.form}>
          <div className={styles.toggle}>
            <h3 className={isSignUp ? styles.active_signup: styles.signup} onClick = {() => {setSignUp(true)}}>sign up</h3>
            <h3 className={!isSignUp ? styles.active_login: styles.login} onClick = {() => {setSignUp(false)}}>sign in</h3>
          </div>
          {/* <div className={styles.google_authentication}> */}

              {/* </div> */}

              {/* <div className={styles.empty_div}></div> */}

              
          {isSignUp ?
              (<form className={styles.formi}>
                  <label htmlFor='email'>Email Address:</label><br />
                  <input id = 'email' type='text' placeholder='Enter your email address'/>
                  <label htmlFor='password1'>Password:</label><br />
                  <input id = 'password1' type='text' placeholder='Password should be atleast 6 characters long'/>
                  <label htmlFor='password2'>Confirm Password:</label><br />
                  <input id = 'password2' type='text' placeholder='Re-enter your password'/>
                  <button className={styles.button}>Sign Up</button>
              </form>) :
              (
                <form className={styles.formi}>
                  <label htmlFor='email'>Email Address:</label><br />
                  <input id = 'email' type='text' placeholder='Enter your email'/>
                  <label htmlFor='password1'>Password:</label><br />
                  <input id = 'password1' type='text' placeholder='Enter Password'/>
                  <button className={styles.button}>Login</button>
              </form>
              )}

              <div className={styles.or_div}>
                <hr className={styles.hr} />
                <p>OR</p>
                <hr className={styles.hr} />
              </div>
              <button className={styles.google_authentication}>&copy; Sign with Google</button>

              
        </div>  

       
    </div>
 )
}

// export async function getServerSideProps(context){
//   return{
//     props: {caller: true}
//   }
// }