import React, { useState } from 'react'
import AlgoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import{ useNavigate} from "react-router-dom";
import "./search.css"

// desctructuring range picker from date picker
const {RangePicker} =  DatePicker;
const {Option} = Select;
const config= {
    appId:process.env.REACT_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
    // language: "en",
  }

  
  const Search = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [bed, setBed] = useState('')

    const handelSubmit=()=>{
        navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }

  return (
    <div className='d-flex pb-4'>
        <div className="w-100">
        <AlgoliaPlaces 
            placeholder="Location" 
            options={config}
            onChange={({suggestion})=> setLocation(suggestion.value)}
            style={{height:"50px"}}
        />
        </div>

     <RangePicker 
        className="w-100"
        onChange={(value,dataString)=>setDate(dataString)}
        disabledDate = {(current)=> current && current.valueOf( )< moment().subtract(1,'days')}/>

    <Select 
        onChange={(value)=>setBed(value)}
        className="w-100"
        size='large'
        placeholder="Number of Beds">
      <Option key={1}>{1}</Option>
      <Option key={2}>{2}</Option>
      <Option key={3}>{3}</Option>
      <Option key={4}>{4}</Option>
    </Select>

    <SearchOutlined className='btn btn-square' onClick={handelSubmit}/>
 
    </div>
  )
}

export default Search