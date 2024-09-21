import styles from "@/styles/components.module.css";
import { useState } from "react";



const TrackButton = ({classTrackName}) => {
    
    const [clicked, setClicked] = useState(false);
    
    classTrackName = classTrackName.replace(' ','-')
    // Just here if you need it for the backend



    return (
        <div className={styles.trackOuterDiv}>
        <button className={styles.modalTrackDiv} onClick={() => setClicked(true)}>
        Track 
        <div className={styles.modalTrackBar}></div>
        </button>
        {clicked ? <div className={styles.checkMark}>&#x2713;</div> : ""}
        
        </div>
        
    )
}

export default TrackButton;