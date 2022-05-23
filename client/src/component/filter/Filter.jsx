import React, { useState } from 'react'
import './filter.css'
import AlgoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import{ useNavigate} from "react-router-dom";


// desctructuring range picker from date picker
const {RangePicker} =  DatePicker;
const {Option} = Select;
const config= {
    appId:process.env.REACT_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
    // language: "en",
  }


const Filter = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [bed, setBed] = useState('')

    const handelSubmit=()=>{
        navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }
  return (
    <section className='filter'>
        {/* <h3><b>Check avaibility</b></h3> */}
        <form action="" className='filter-form'>
            <div className='inputBox'>
                {/* <input type="text" placeholder='location'></input>
                <span className="fas fa-location-dot"></span> */}
                <div className="input">
                    
                <AlgoliaPlaces 
                    placeholder="Location" 
                    options={config}
                    onChange={({suggestion})=> setLocation(suggestion.value)}
                    style={{height:"50px"}}
                 />
                </div>
            </div>
            <div className='inputBox'>
               
                <div className="input">
                <RangePicker 

                    onChange={(value,dataString)=>setDate(dataString)}
                    disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}/>
                </div>
            </div>
            <div className='inputBox'>
                <div className="input">     
                <Select 
                    onChange={(value)=>setBed(value)}
                    size='large'
                    placeholder="Number of Beds">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>
                </div>
            </div>
           
                <button onClick={handelSubmit} className='search'>search</button>
         
        </form>
    </section>
  )
}

export default Filter