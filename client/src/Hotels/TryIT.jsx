import axios, { Axios } from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const TryIT = () => {
    // here we try
const [file,setFile] = useState()
const [name,setName] = useState()
console.log(file);
const token = useSelector(state => state.token);

const send = (e)=>{
  let data = new FormData();
  data.append('file',file);
  data.append('name',name);
  e.preventDefault()
  // console.log(data);    
  fetch('/api/create-hotel',{
    method:'POST',
    body:data, headers: {Authorization: token}
  }).then(res=>console.log("res",res.data)).catch(err=>console.log(err))
}
  return (
    <div className='hotel'>
              {/* here */}
      <div>

<form method='post' >
    <input type="text" placeholder='Name' name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
  <input type="file" id='file' placeholder='file' name='file'  onChange={e=>{
    const file= e.target.files[0];
    setFile(file)
  }} accept="image/*"/>
</form>
<button onClick={send} type="submit">Upload</button>
</div>
{/* there */}
    </div>
  )
}

export default TryIT