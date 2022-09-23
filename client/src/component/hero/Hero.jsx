import React,{useState} from 'react'
import AlgoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import{ useNavigate} from "react-router-dom"
import './hero.css'

// desctructuring range picker from date picker
const {RangePicker} =  DatePicker;
const {Option} = Select;
const config= {
    appId:process.env.REACT_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_ALGOLIA_APP_API_KEY,
    // language: "en",
  }

const Hero = () => {

  const navigate = useNavigate();
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [bed, setBed] = useState('')

  const handelSubmit=()=>{
      navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
  }

  return (
    <section className="hero">
      <div className="content">
        {/* <div className="row"> */}
        <div className="hero-left">
          <h3>Find cute rooms</h3>
          <p>
            {" "}
            Get yourself a comfortable room around Goma town. For a secure and
            fast booking
          </p>
          <a href="/rooms" className="btn">
            Book it now
          </a>
        </div>
        <div className="hero-right">
          <AlgoliaPlaces
            placeholder="Location"
            options={config}
            onChange={({ suggestion }) => setLocation(suggestion.value)}
            style={{ height: "50px" }}
          />
          <RangePicker
            onChange={(value, dataString) => setDate(dataString)}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
          <Select
            onChange={(value) => setBed(value)}
            size="large"
            placeholder="Number of Beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
          <button onClick={handelSubmit} className="search">
            search
          </button>
        </div>

        {/* </div> */}
      </div>
    </section>
  );
}

export default Hero