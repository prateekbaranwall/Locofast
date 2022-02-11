import React from 'react'
import "./homepage.css"
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import Edit from "./edit.png";
import Delete from "./delete.png";


export default function Homepage({setIsAdd}) {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    
    const [blogid, setID] = useState("");
    const {id} = useParams();
    const [key,setkey] = useState();

    useEffect(() => {
      getCandidate();
    }, []);

    let num = 1;

    const handleChange = (e) => {
        const { value } = e.target;
        setkey(value);
        // console.log(key);
    };

    const [blogs, setblogs] = useState([]);
    

    const handleDelete = async(e) => {
        await axios.delete(`http://localhost:9000/homepage/${id}/${blogid}`)
        .then(res => {
            alert(res.data.message)
            getCandidate();
        })
        
    }
    
    const getCandidate = async() => {
        const resp = await axios.get('http://localhost:9000/homepage')
        // console.log(resp.data);
        setblogs(resp.data);
    }

    const handlefind = async() => {
        // console.log(key)
        if(key=="") { getCandidate();
        } else  {
        const resp=await axios.get(`http://localhost:9000/homepage/${id}/search/${key}`)
            setblogs(resp.data);
        }
        // })
        
    }
    return (
        <div>
            <nav className='head'> Locofast</nav>
            <form action=""></form>
            <input type="text" onChange={handleChange} />
            <button className="button-4" onClick={handlefind}> Search</button>
            {/* <div className='candidateList'> Candidates List : {users.length}</div> */}
            <table>
                <thead>
                    <tr>
                        <th id='idx_1'></th>
                        <th className='con_1'>Title</th>
                        <th className='con_1'>Author</th>
                    </tr>
                </thead>

                <tbody>
                    { 
                        blogs.map(blog => (
                            // if(key==="" || key===blog.title) {
                            <tr>
                                <td>{num++}</td>
                                <td onClick={()=>navigate(`/homepage/${id}/${blog._id}`)}> {blog.title} </td>
                                <td>{blog.author}</td>
                                <td>
                                    <img src={Edit} className='btn-1' onClick={()=>{
                                        if(blog.userid===id) {
                                        navigate(`/edit/${id}/${blog._id}`)}
                                        else {alert('Not allowed')}}}/>
                                    <img src={Delete} className='btn-1' onClick={ () => { setID(blog._id); handleDelete()}  }/> 
                                </td>
                            </tr>
                            // }
                            ))
                        
                    }
                </tbody>
            </table>
            <span className='sw' id='new' onClick={()=>{navigate(`/create/${id}`)}}> Add New</span>
            
        </div>
    )
    
}
