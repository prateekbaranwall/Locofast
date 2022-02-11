import React from 'react'
import "./create.css"
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export default function Edit({setContacts}) {
    const navigate = useNavigate();
    const init = { title:"", author:"", content:""};
    const [formValues, setFormValues] = useState(init);
    const [isSubmit, setIsSubmit] = useState(false);
    const [Errors, setErrors] = useState("");

    const {id,blogid} = useParams();
    console.log(useParams());
    const loadData = async() => {
       const resp = await axios.get(`http://localhost:9000/edit/${id}/${blogid}`)
       setFormValues(resp.data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);

    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        // alert("Hi")
        if(formValues.title === "" || formValues.author === "" || formValues.content === "") {
            // Errors = "All fields are requires";
            setErrors("All fields are requires");
        } else {
            axios.put(`http://localhost:9000/edit/${id}/${blogid}`, formValues)
            .then(res => {
                if(res.data.message === "Successfully Updated") {
                    alert(res.data.message);
                    navigate(`/homepage/${id}`)
                }
            })
        }
        setIsSubmit(true);
        // const { email, mobile, password } = formValues;
    };

    useEffect(() => {
        loadData();
    },[])

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
                            {/* <input type="text" name='age' value={formValues.age} placeholder='enter your age' onChange={handleChange}/> */}
                            <textarea type="text" id="w3review" name="content" value={formValues.content} onChange={handleChange} rows="7" cols="75"></textarea>
                        </div>
                        
           </div> 
           <div className="a1">

           <p className='valid1'>{Errors}</p>
           </div>
           

            <div className="com1" id='button'>
               <button className="button-3" id='cancel' onClick={()=>{navigate(`/homepage/${id}`)}}>Cancel</button>
               <button className="button-3"  onClick={handleSubmit}>Update</button>
            </div>
        </div>
    </div>
    )
}
