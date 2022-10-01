import footer from '/styles/Footer.module.css';
import Link from "next/link";
import { useState } from 'react';

export default function Footer(){
    const [suggestionGiven, setSuggestionGiven] = useState(true);

    return (
        <div className={footer.container}>
            <div className={footer.footer}>
                <div className={footer.suggestion_div}>
                    <h3 className={footer.head}>Have&nbsp;suggestions?</h3>
                    {suggestionGiven ? <textarea rows='4' className={footer.suggestion} placeholder="Write something ..."></textarea>
                    :(<div className={footer.submitted}>Your suggestion is recorded :)</div>)}
                    <button className={footer.button} onClick={() => {setSuggestionGiven(false)}}>Submit</button>
                </div>
                
                <hr />
                <div className={footer.navigation}>
                    <div className={footer.navlist}>
                        <h3>C.I.K.Y.</h3>
                        <Link href="#" ><a>Home</a></Link>
                        <Link href="#" ><a>Clubs</a></Link>
                        <Link href="#" ><a>Organize</a></Link>
                        <Link href="#" ><a>Compete</a></Link>
                        <Link href="#" ><a>Feedback</a></Link>
                    </div>  
                    <hr />
                    <div className={footer.navlist}>
                        <h3>About Us</h3>
                        <Link href="#" ><a>Team Section</a></Link>
                        <Link href="#" ><a>Technology </a></Link>
                        <Link href="#" ><a>Our Other Projects</a></Link>
                    </div>
                </div>
                <hr />
                
            </div>
        </div>
    )
}  
