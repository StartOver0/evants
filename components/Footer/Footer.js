import footer from '/styles/Footer.module.css';
import Link from "next/link";

export default function Footer(){
    return (
        <div className={footer.footer}>
            <div className={footer.content}>
                <h3>C.I.K.Y.</h3>
                <Link href="#" ><a>Home</a></Link>
                <Link href="#" ><a>Clubs</a></Link>
                <Link href="#" ><a>Organize</a></Link>
                <Link href="#" ><a>Compete</a></Link>
                <Link href="#" ><a>Privacy Policy</a></Link>
                <Link href="#" ><a>Feedback</a></Link>
            </div>  
            <div className={footer.content}>
                <h3>About Us</h3>
                <Link href="#" ><a>Team Section</a></Link>
                <Link href="#" ><a>Technology </a></Link>
                <Link href="#" ><a>Our Other Projects</a></Link>
            </div>
            <div className={footer.content}>
                <h3>Resources</h3>
                <Link href="#" ><a></a></Link>
                <Link href="#" ><a>Technology </a></Link>
                <Link href="#" ><a>Our Other Projects</a></Link>
            </div>
        </div>
    )
}  