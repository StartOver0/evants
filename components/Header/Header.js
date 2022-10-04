import nav from'./Header.module.css';
import Image from 'next/image';
import icon from '/public/favicon.ico';
import Router, {useRouter} from 'next/router';

export default function Header(){
    const router = useRouter();

    // console.log(router);
    const gotoLogin = (e) => {
        //  Router.push('/login')
        
        router.push({
                pathname: "/login",
                query: {value: 0}
        }, '/login')
    }
    const gotoSignUp = (e) => {
        //  Router.push('/login')
        
        router.push({
                pathname: "/login",
                query: {value: 1}
        }, '/login')
    }
    return (
        <div className={nav.navbar}>
            <div className={nav.domain_name}>
                <h1>C . I . K . Y </h1>
            </div>
            <div className={nav.domain_icon}>
                <div className={nav.icon_container}>
                    <Image src={icon} alt="A Logo" width={40} height={40} />
                </div>
            </div>
            <div className={nav.navlinks_desktop}>
                <button className={nav.loginButton} onClick={gotoLogin}>Login</button>
                <button className={nav.signUpButton} onClick={gotoSignUp}>Sign Up</button>
            </div>
            <div className={nav.navlinks_mobile}>
                <button className={nav.signUpButton} onClick={gotoSignUp}>Login/Sign Up</button>
            </div>
        </div>
    )                   
}