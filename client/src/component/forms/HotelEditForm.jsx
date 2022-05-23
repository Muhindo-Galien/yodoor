import React from 'react'
import AlgoliaPlaces from 'algolia-places-react';
import { MdOutlineDownloading } from 'react-icons/md';
import { DatePicker, Select } from 'antd';
import moment from 'moment';



const {Option} = Select;
const config= {
  appId:process.env.REACT_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
  // language: "en",
}
const HotelEditForm = ({
    values,
    setValues,
    handelChange,
    handelImageChange,
    handelSubmit,
    preview
}) => {
    const{title,content,price,location,bed,from,to}=values
    console.log(values);
  return (
    <form id="form-group" class="uploader" onSubmit={handelSubmit} method='post'>
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
   {bed&& <Select 
    onChange={(value)=>setValues({...values,bed:value})}
    className="w-100 m-1"
    size='large'
    placeholder="Number of Beds"
    defaultValue={bed}
    
    >
      <Option key={1}>{1}</Option>
      <Option key={2}>{2}</Option>
      <Option key={3}>{3}</Option>
      <Option key={4}>{4}</Option>
    </Select>}

    <textarea 
     className='inputdata' 
    placeholder="Content..." 
    name='content'
    value={content}
    onChange={handelChange}
    ></textarea>
   
    <div className='containerfluid'>
      
    {location && location.length &&( <AlgoliaPlaces 
      className="w-100 m-1"
      placeholder="Location" 
      defaultValue={location}
      options={config}
      onChange={({suggestion})=> setValues({...values,location:suggestion.value})}
      style={{height:"50px"}}
     />)}

    </div>

    {/* inputdata */}
    {from && (<DatePicker 
    defaultValue={moment(from,"YYYY-MM-DD")}
    placeholder='From Date' 
    className='inputdata' 
    onChange={(data,dataString)=>
    setValues({...values, from:dataString})}
    disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
    />)
    }

    {to &&(<DatePicker 
    defaultValue={moment(to,"YYYY-MM-DD")}
    placeholder='To Date' 
    className='inputdata' 
    onChange={(dataString)=>setValues({...values, to:dataString})}
    disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}
    />)}
    
    <button className='btn btn-outline-primary m-2'  type='submit'>Save</button>
  
   </div>
  </form>
)}

export default HotelEditForm