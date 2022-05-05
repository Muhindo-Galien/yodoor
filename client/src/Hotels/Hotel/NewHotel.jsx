import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./newhotel.css"
// import '../../component/auth/login/login.css'
import AlgoliaPlaces from 'algolia-places-react';
import { useAlert } from 'react-alert'
import { MdOutlineDownloading } from 'react-icons/md';

const config= {
  appId:process.env.REACT_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
  language: "en",
  countries:["ug"]
 }

const NewHotel = () => {
  const alert = useAlert()
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);
  const [preview,setPreview]=useState("")
  const [values,setValues] = useState({
    title:"",
    content:"",
    location:"",
    image:"",
    price:"",
    from:"",
    to:"",
    bed:"",
  })

  const handelSubmit = (e)=>{

  }

  const handelImageChange = (e)=>{
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
    setValues({...values, image:e.target.files[0]})

  }
  const handelChange = (e)=>{
    setValues({...values, [e.target.name]: e.target.value});
    // console.log(values);
  }

  const {title,content,location,image,price,from,to,bed} = values;

  const handelForm=()=>
    // Upload
    (<form id="file-upload-form" class="uploader" onSubmit={handelSubmit}>
      <input id="file-upload" type="file" name="fileUpload"  onChange={handelImageChange} accept="image/*"/>

      <label for="file-upload" id="file-drag">
      {preview===""?"":<img id="file-image" src={preview} alt="Preview" class=" img img-fluid"/>}
        <div id="start">
        
       
          {preview==="" &&(
           <>
              <div>Select a file (png,jpeg,jpg)</div>
              <MdOutlineDownloading class="download" aria-hidden="true"/>
            </>
          )}
          <span id="file-upload-btn" class="btn btn-primary">{preview==="" ?"Select a file":"change image"}</span>
        </div>
      </label>
      {/* added */}
     <div className='lol'>
     <input 
     type="text" 
     name="title"
     onChange={handelChange}
     className="inputdata" 
     placeholder="Title"
     value={title}
      />
      <input 
      type="number"  
      placeholder="Price"
      name='price'  
      value={price}
      className="inputdata"
      onChange={handelChange}
      />
      <input 
      type="number"  
      placeholder="Number of Beds"
      name='bed'  
      value={bed}
      className="inputdata"
      onChange={handelChange}
      />
 

      <textarea 
      placeholder="Content..." 
      name='content'
      value={content}
      onChange={handelChange}
      className="inputdata" 
      ></textarea>
         <div className="containerfluid">
      
      <AlgoliaPlaces 
        className="addressBox"
        placeholder="Location" 
        defaultValue={location}
        options={config}
        onChange={({suggestion})=> setValues({...values, location:suggestion})}
     
        />
      </div>
      <button  onclick="thanks()">Submit</button>
     </div>
    </form>)
  
  return (
    <div className='hotel'>
        <div className='dashboard-text'>
          <h1>Post a Hotel</h1>
      </div>
        {handelForm()}
        
        {/* <p>{JSON.stringify(auth)}</p> */}
    </div>
  )
}

export default NewHotel