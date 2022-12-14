
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext } from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import comSendsrv from "../services/comSendsrv";


const userContext = createContext();
function ProfileInfo() {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);

    const loggedUser = useContext(userContext);
    
    return (
        <>
            <section className="profileWrap">
                <img className="profile-page-img" src={window.location.origin + `/img/profile_img/${loggedUser.profImg}`} />
                <section className="profileSection">
                    <h1 className="fname">Hi, I'm {loggedUser.firstName} {loggedUser.lastName}</h1>
                    <div className="badges">
                        {loggedUser.atype === 'Student' ? <button className="aBadge" type="button"><FontAwesomeIcon icon={faGraduationCap} />Student</button> : loggedUser.atype === 'Landlord' ? <button className="aBadge" type="button"><FontAwesomeIcon icon={faHouse} /> Landlord</button> : null}
 

                        {loggedUser.badge1 === 'waiting' ? <button className="badgeW" type='button'>Waiting</button> : loggedUser.badge1 === 'varified' ? <button className="badgeV1" type='button'>Verified</button> : null}
                        {loggedUser.badge2 === 'waiting' ? <button className="badgeW" type='button'>Waiting</button> : loggedUser.badge2 === 'verified' ? <button className="badgeV2" type='button'>Verified</button> : null}
                    </div>
                </section>
            </section>
            <p className="paragraph">{loggedUser.profileContent}</p>

            {/* VOTE SECTION */}
            <div className="vote-wrap">
                <h2 className="Vh2">Badeges from Students / Landlords</h2>
                <div className="vote-wrap2">
                    <div className="vote">
                        <p className="vote-num">{loggedUser.res}</p>
                        <button className="vote-icon" onClick={() => setValue1(value1 + 1)}><FontAwesomeIcon color="red" className="icon1" icon={faHeart} /></button>
                        {value1}
                        <h3 className="Vh3">RESPONSIVE</h3>
                    </div>
                    <div className="vote">
                        <p className="vote-num">{loggedUser.pro}</p>
                        <button className="vote-icon" onClick={() => setValue2(value2 + 1)}><FontAwesomeIcon icon={faHeart} /></button>
                        {value2}
                        <h3 className="Vh3">PROPERTY VIEWED IN PERSON</h3>
                    </div>
                    <div className="vote">
                        <p className="vote-num">{loggedUser.acc}</p>
                        <button className="vote-icon" onClick={() => setValue3(value3 + 1)}><FontAwesomeIcon icon={faHeart} /></button>
                        {value3}
                        <h3 className="Vh3">ACCURATE DESCRIPTION</h3>
                    </div>
                </div>
            </div>
       
        </>
    )
}

function Profile(props) {
    const loggedUser = props.loggedUser;
    return (
        <article className='show-art'>
            <userContext.Provider value={loggedUser}>
                <ProfileInfo />
            </userContext.Provider>
        </article>
    )
}


export default Profile;