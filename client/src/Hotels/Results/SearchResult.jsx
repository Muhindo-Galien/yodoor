import React, { useEffect, useState } from 'react'
import "./results.css"

import queryString from "query-string";
import {Link} from "react-router-dom"
import { searchListings } from '../../redux/actions/hotel';
import SamllCard from '../../component/card/samllcard/SamllCard';
import Filter from '../../component/filter/Filter';

const SearchResult = () => {
  const [searchLocation,setSearchLocation] = useState("")
  const [searchBed,setSearchBed] = useState("")
  const [searchDate,setSearchDate] = useState("")
  const [hotels,setHotels] = useState([])

  useEffect(()=>{
    const {location,date,bed}  = queryString.parse(window.location.search);
    // console.table({location,date,bed})
    searchListings({location,date,bed}).then((res)=>{
      console.log(res.data);
      setHotels(res.data)
    })
  },[])
  return (
    <>
      <div className='results'>
    <Filter/> 
        {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}
        {hotels.map((h)=>(
          <SamllCard key={h._id} h={h}/>
        ))}
      </div>
    </>
  )
}

export default SearchResult