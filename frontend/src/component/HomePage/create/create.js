import React from 'react'
import "./create.css"
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export default function Create({setContacts}) {
    const navigate = useNavigate();
    const init = { title:"", author:"", content:"", userid:""};
    const [formValues, setFormValues] = useState(init);
    const [isSubmit, setIsSubmit] = useState(false);
    const [Errors, setErrors] = useState("");
    const {id} = useParams();
    // console.log(userID)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);

    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setErrors("");
        if(formValues.title === "" || formValues.author === "" || formValues.content === "" ) {
            setErrors("All fields are requires");
        }
        setIsSubmit(true);
    };

    useEffect(() => {
        if(isSubmit && Errors === "") {
            formValues.userid = id;
            // console.log(formValues.userid)
            axios.post("http://localhost:9000/create", formValues)
            .then(res => {
                if(res.data.message === "Successfully Added") {
                    alert(res.data.message);
                    navigate(`/homepage/${id}`)
                }
            })
        }
    })

    return (
        <div>
            <div className="main1">
                <h3 id='m2'>Create Blog</h3>
                <div className="com1">
                        <div className="des"> 
                            <label htmlFor=""> Title</label> <br />
                            <input type="text" name='title' value={formValues.title} placeholder='Enter Title' onChange={handleChange} />
  
                        </div>
                        <div className="des">
                            <label htmlFor=""> Author Name</label> <br />
                            <input type="text" name='author' value={formValues.author} placeholder='Enter Author Name' onChange={handleChange}/>
         
                        </div>
                </div>
               
               <div className="com1">
                        <div className="des">
                                <label htmlFor=""> Content</label> <br /> 
                                <textarea type="text" id="w3review" name="content" value={formValues.content} onChange={handleChange} rows="7" cols="75"></textarea>
                            </div>
                            
               </div> 
               <div className="a1">

               <p className='valid1'>{Errors}</p>
               </div>
               

                <div className="com1" id='button'>
                   <button className="button-3" id='cancel' onClick={()=>{navigate(`/homepage/${id}`)}}>Cancel</button>
                   <button className="button-3"  onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}
