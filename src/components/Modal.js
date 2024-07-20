import React, {useState} from "react"
import "../styles/search-page.css"

const Modal = ({buttonName}) => {
    
    // The modal starts off as hidden
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    

    return (
        
        <div className="btn-div">

            <div>
                <button onClick={toggleModal} className="btn-modal">
                    {buttonName}
                </button>
            </div>


        {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>

                    <div className="modal-content">
                        <button className="close-modal" onClick={toggleModal} >Close</button>
                        
                        <h2>{buttonName}</h2>

                        <label className="section-label">Section 1:</label>   <button className="section-add" >Add</button>
                        <br></br>
                        <label className="section-label">Section 2:</label>   <button className="section-add" >Add</button>
                        <br></br>
                        <label className="section-label">Section 3:</label>   <button className="section-add" >Add</button>
                        <br></br>
                        <label className="section-label">Section 4:</label>   <button className="section-add" >Add</button>
                    </div>
                </div>
        )}

        </div>
        


        
        
    )
}

export default Modal 