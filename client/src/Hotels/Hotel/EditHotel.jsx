import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { DatePicker, Select } from 'antd';
import { read } from '../../redux/actions/hotel';
const {Option} = Select;

const EditHotel = (match) => {
    const alert = useAlert()
    let { hotelId } = useParams();
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
const {title,content,image,price,from,to,bed} = values;

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

    useEffect(()=>{
        loadSellerHotel()
    },[])
    const loadSellerHotel =async()=>{
        let res = await read(hotelId)
        setValues({...values,...res.data})
        
    }
  return (
    <div className='hotel'>
         <div className='dashboard-text'>
          <h1>Edit Hotel</h1>
      </div>
        
    </div>
  )
}

export default EditHotel