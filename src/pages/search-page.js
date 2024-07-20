import '@/styles/search-page.css'
import { useState, useEffect } from 'react'
import Modal from "@/components/Modal"



const Search = () => {

    
    const [value, setValue] = useState('')  

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const testName = "John"

    
    
    return (
    <div>
        <div className='main-div'>
            <h1>Search for a Class</h1>
            <div className='search-conatiner'>
                <div className='search-inner'>
                    <input type='text' value={value} onChange={onChange}></input>
                </div>

            </div>

            
        </div>

        
        
        <div className='prof-div'>
            <p>or...</p>
            <b></b>
            <h2 >Search for a Proffessor</h2>
        </div>

        <div className='dept-div'>
            <p>or..</p>
            <b></b>
            <h2>Search in a Department</h2>
        </div>
        

    </div>
    
        
    )
    
}

export default Search