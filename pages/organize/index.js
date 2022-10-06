// import {use} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '/styles/Organize.module.css';
import userClubs from '/staticData/userClubs';

export default function Organize(){
 const Router = useRouter();

 const handleFormSubmit = (e) => {
    e.preventDefault();

    const query = {
        club: e.target.club.value,
        title: e.target.title.value,
        description: e.target.description.value,
        eligibility: e.target.eligibility.value,
        date: e.target.date.value,
        time: e.target.time.value,
        // venue: e.target.venue.value,
        // teamsize: e.target.teamSize.value
        fee: e.target.fee.value,
        googleFormLink: e.target.googleFormLink.value,
    }
    Router.push({
        pathname: 'preview-page',
        query: query
    }, )
 }
 return(
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <h2>Event Details:</h2>

            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='club'>Select Club:</label>
                    <select name='club' >
                    {userClubs.map((clubName) => (
                        <option key={`clubname${clubName}`}  value={clubName}>{clubName}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='title'>Event Title:</label>
                    <input type='text' id='title' name='title' />
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='description'>Description:</label>
                    <textarea name='description' id='description' rows='5' spellCheck='false' ></textarea>
                </div>
                <div>
                    <label htmlFor='eligibility'>Who can Participate?:</label>
                    <textarea name='eligibility' id='eligiblity' rows='3' spellCheck='false' ></textarea>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='date'>Date:</label>
                    <input type='date' id='date' name='date' />
                </div>
                <div>
                    <label htmlFor='time'>Time:</label>
                    <input type='text' id='time' name='time' />
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='fee'>Entry Fee:</label>
                    <input type='text' id='fee' name='fee' placeholder='Entry Fee'/>
                </div>
                <div>
                    <label htmlFor='googleFormLink'>Google Form Link:</label>
                    <input type='text' id='googleFormLink' name='googleLinkForm' placeholder='Registration Link'/>
                </div>
            </div>
            

            {/* <label htmlFor='venue'>Venue</label>
            <input type='text' id='venue' name='venue' /> */}

            {/* <label htmlFor='contact'>Venue</label>
            <input type='text' id='contact' name='contact' /> */}

            {/* <label htmlFor='teamSize'>Team Size:</label>
            <input type='text' id='teamSize' name='teamSize' placeholder='Use space for more than 1 teamsize'/> */}

            
            <button className={styles.button}>Proceed</button>
        </form>
    </div>
 )
}
