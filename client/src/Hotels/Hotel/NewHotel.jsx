import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./newhotel.css"
// import '../../component/auth/login/login.css'
import AlgoliaPlaces from 'algolia-places-react';
import { useAlert } from 'react-alert'
import { MdOutlineDownloading } from 'react-icons/md';


import { DatePicker, Select, Upload } from 'antd';
import moment from 'moment';
const axios = require('axios').default;


const {Option} = Select;
const config= {
  appId:process.env.REACT_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
  language: "en",
  countries:["ug"]
}

const NewHotel = () => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate()
  const [preview,setPreview]=useState("")
  const [loading,setLoading]=useState(false)
  const [values,setValues] = useState({
    title:"",
    content:"",
    images:"",
    price:"",
    from:"",
    to:"",
    bed:"",
  })
  const {title,content,images,price,from,to,bed} = values;

  const [location,setLocation] = useState();
  const alert = useAlert()

  const handelImageChange = (e)=>{
    console.log(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]))
    setValues({...values, images:e.target.files})

  }
  const handelSubmit = async(e)=>{
    e.preventDefault()


    try {
      setLoading(true);
      let hotelData = new FormData();
      hotelData.append("title",title);
      hotelData.append("content",content);
      hotelData.append("location",location);
      hotelData.append("price",price);
      hotelData.append("from",from);
      hotelData.append("to",to);
      hotelData.append("bed",bed);
      if(images) {
        for (let i = 0;i <images.length; i++){
          hotelData.append('images',images[i])
    }}
    console.log([...hotelData]);
    const res =await fetch(`/api/create-hotel`,{
      method:"POST",
      body:hotelData,
      headers: {Authorization: token}
  })

  if(res.ok){
    setLoading(false);
    setValues({})
    setTimeout(()=>{
      navigate("/dashboard/seller")
    },1000)
    alert.success("Room created!")
    setValues({
      title:"",
      content:"",
      images:"",
      price:"",
      from:"",
      to:"",
      bed:"",
    })
}
    console.log(res)
    } catch (error) {
    alert.error(error.massage)
      setLoading(false);
      console.log(error);
    }
  }



  const handelChange = (e)=>{
    setValues({...values, [e.target.name]: e.target.value});
    // console.log(values);
  }

  

  const handelForm=()=>
    // Upload
    (<form id="form-group" class="uploader" onSubmit={handelSubmit} method='post'>
      <input id="file-upload" type="file" name="images" accept='image/*' multiple onChange={handelImageChange} />

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
     className='inputdata'  
     placeholder="Title"
     value={title}
     
      />
      <input 
      type="number"  
      placeholder="Price"
      name='price'  
      value={price}
      className='inputdata' 
      onChange={handelChange}
    
      />
      {/* <input 
      type="number"  
      placeholder="Number of Beds"
      name='bed'  
      value={bed}
      className='inputdata' 
      onChange={handelChange}
      /> */}
 
      <Select 
      onChange={(value)=>setValues({...values,bed:value})}
      className="w-100 m-1"
      size='large'
      placeholder="Number of Beds"
      
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <textarea 
       className='inputdata' 
      placeholder="Content..." 
      name='content'
      value={content}
      onChange={handelChange}
      ></textarea>
     
      <div className='containerfluid'>
        
      <AlgoliaPlaces 
 
        className="w-100 m-1"
        placeholder="Location" 
        defaultValue={location}
        options={config}
        onChange={({suggestion})=> 
        setLocation(suggestion.value)
        
       }
       />
  
      </div>

      {/* inputdata */}
      <DatePicker 
      
      placeholder='From Date' 
      className='inputdata' 

      onChange={(data,dataString)=>
      setValues({...values, from:dataString})}
      disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
      />

      <DatePicker 

      placeholder='To Date' 
      className='inputdata' 
      onChange={(dataString)=>setValues({...values, to:dataString})}
      disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
      
      />
      
      {!title || !content || !location || !price || !from || !bed || !images || loading?
      <button disabled className='btn btn-outline-primary m-2'  type='submit'>Save</button>:
      <button className='btn btn-outline-primary m-2'  type='submit'>Save</button>
    }
     </div>
    </form>)
  
  return (
    <div className='hotel'>
        <div className='dashboard-text'>
          <h1>Add a room</h1>
      </div>
        {handelForm()}
        
        <prev>{JSON.stringify(values, null , 4)}</prev>
        <prev>{JSON.stringify(location)}</prev>
    </div>
  )
}

export default NewHotel