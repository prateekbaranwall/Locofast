import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";




export default function Blog() { 
    const [blogData, setblog] = useState([]);
    const {id, blogid} = useParams();
    console.log(useParams());
    const getblog = async() => {
        const resp = await axios.get(`http://localhost:9000/homepage/${id}/${blogid}`)
        // console.log(resp.data);
        setblog(resp.data);
    }
    useEffect(() => {
        getblog();
    },[])
  return (
      <div> 
      <nav className='head'> Locofast</nav>

    <div>{blogData.title}</div> <br/>
    <div>{blogData.content}</div> <br/>
    <div>{blogData.author}</div> <br/> 

    </div>
  )
}
