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
        venue: e.target.venue.value,
        teamsize: e.target.teamSize.value,
        fee: e.target.fee.value,
        googleFormLink: e.target.googleFormLink.value,
        name1: e.target.name1.value,
        name2: e.target.name2.value,
        contact1: e.target.contact1.value,
        contact2: e.target.contact2.value,
        notes: e.target.extra_notes.value
    }

    Router.push({
        pathname: '/previewPage',
        query: query
    }, '/previewPage')
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
                    <input type='text' id='title' name='title' spellCheck='false' required/>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='description'>Description:</label>
                    <textarea name='description' id='description' rows='5' spellCheck='false' required ></textarea>
                </div>
                <div>
                    <label htmlFor='eligibility'>Who can Participate?:</label>
                    <textarea name='eligibility' id='eligiblity' rows='3' spellCheck='false' required ></textarea>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='date'>Date:</label>
                    <input type='date' id='date' name='date' spellCheck='false' required />
                </div>
                <div>
                    <label htmlFor='time'>Time:</label>
                    <input type='text' id='time' name='time' placeholder='for ex: 10:00am to 1:00pm' spellCheck='false' required/>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='venue'>Venue</label>
                    <input type='text' id='venue' name='venue' spellCheck='false' required/>
                </div>
                <div>
                    <label htmlFor='teamSize'>Team Size:</label>
                    <input type='text' id='teamSize' name='teamSize' placeholder='Use space for more than 1 teamsize' spellCheck='false' required/>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                    <label htmlFor='fee'>Entry Fee:</label>
                    <input type='text' id='fee' name='fee' placeholder='Entry Fee' spellCheck='false' required/>
                </div>
                <div>
                    <label htmlFor='googleFormLink'>Google Form Link:</label>
                    <input type='text' id='googleFormLink' name='googleLinkForm' placeholder='Registration Link' spellCheck='false' required/>
                </div>
            </div>
            <div className={styles.outer_div}> 
                <div>
                <label htmlFor='first'>Contact No:</label><br />
                    <div className={styles.contact}>
                        <div className={styles.inner_div}>
                            <input type='text' className={styles.name} name='name1' placeholder='Name1' spellCheck='false' required/>
                            <input type='text' className={styles.contact} name='contact1' placeholder='Contact No. 1' spellCheck='false' required/>
                        </div>
                        <div className={styles.inner_div}>
                            <input type='text' className={styles.name} name='name2' placeholder='Name2' spellCheck='false' />
                            <input type='text' className={styles.contact} name='contact2' placeholder='Contact No. 2' spellCheck='false' />
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className={styles.notes}> 
                <div>
                    <label htmlFor='extra_notes'>Additional Notes:</label>
                    <textarea  name='extra_notes' id='extra_notes' rows='4' spellCheck='false'></textarea>
                </div>
            </div>

        
            <button className={styles.button}>Proceed</button>
        </form>
    </div>
 )
}
