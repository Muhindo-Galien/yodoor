import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./newhotel.css"
// import '../../component/auth/login/login.css'
import AlgoliaPlaces from 'algolia-places-react';
import { useAlert } from 'react-alert'
import { MdOutlineDownloading } from 'react-icons/md';


import { DatePicker, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';


const {Option} = Select;
const config= {
  appId:process.env.REACT_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
  language: "en",
  countries:["ug"]
}

const NewHotel = () => {
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);
  const [preview,setPreview]=useState("")
  const [values,setValues] = useState({
    title:"",
    content:"",
    image:"",
    price:"",
    from:"",
    to:"",
    bed:"",
  })

  const [location,setLocation] = useState();
  const alert = useAlert()


  const handelSubmit = async(e)=>{
    e.preventDefault()
    // console.log(values);
    // console.log(location);
    let hotelData = new FormData();

    hotelData.append("title",title);
    hotelData.append("content",content);
    hotelData.append("location",location);
    hotelData.append("price",price);
    image && hotelData.append("image",image);
    hotelData.append("from",from);
    hotelData.append("to",to);
    hotelData.append("bed",bed);

 
    fetch('/api/create-hotel',{
          method:'POST',
          body:hotelData, headers: {Authorization: token}
        }).then((res)=>{
          console.log("see")
          if(res.status===200){
              alert.success("New room posted")
              setTimeout(()=>{
                    window.location.reload();
              },1000)
          }else
          {

            alert.error("fill each field")
          }
          
        }).catch((err)=>{
          console.log(err)
          alert.error(err)
        })


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

  const {title,content,image,price,from,to,bed} = values;

  const handelForm=()=>
    // Upload
    (<form id="form-group" class="uploader" onSubmit={handelSubmit} method='post'>
      <input id="file-upload" type="file" name="image"   onChange={handelImageChange} accept="image/*"/>

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
     className='form-control m-2'  
     placeholder="Title"
     value={title}
      />
      <input 
      type="number"  
      placeholder="Price"
      name='price'  
      value={price}
      className='form-control m-2' 
      onChange={handelChange}
      />
      {/* <input 
      type="number"  
      placeholder="Number of Beds"
      name='bed'  
      value={bed}
      className='form-control m-2' 
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
      placeholder="Content..." 
      name='content'
      value={content}
      onChange={handelChange}
      className='form-control m-2' 
      ></textarea>
     
      
      <AlgoliaPlaces 
        className='form-control m-2' 
        placeholder="Location" 
        defaultValue={location}
        options={config}
        onChange={({suggestion})=> 
        setLocation(suggestion.value)
       }
       />

      {/* form-control m-2 */}
      <DatePicker 
      placeholder='From Date' 
      className='form-control m-2' 

      onChange={(data,dataString)=>
      setValues({...values, from:dataString})}
      disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
      />

      <DatePicker 
      placeholder='To Date' 
      className='form-control m-2' 
      onChange={(data,dataString)=>setValues({...values, to:dataString})}
      disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
      
      />
      
      <button className='btn btn-outline-primary m-2'  type='submit'>Save</button>
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