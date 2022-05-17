import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from "react-router";
import "./editHotel.css"
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
// import { DatePicker, Select } from 'antd';
import { read, updateHotel } from '../../redux/actions/hotel';
import HotelEditForm from '../../component/forms/HotelEditForm';

const EditHotel = () => {
    const alert = useAlert()
  const navigate = useNavigate()
    let { hotelId } = useParams();
    const [preview,setPreview]=useState("")
  const token = useSelector(state => state.token);
    const [values,setValues] = useState({
      title:"",
      content:"",
      location:"",
      images:"",
      price:"",
      from:"",
      to:"",
      bed:"",
    })
const {title,content,images,price,from,to,bed,location} = values;

    useEffect(()=>{
        loadSellerHotel()
    },[])
    const loadSellerHotel =async()=>{
        let res = await read(hotelId)
        setValues({...values,...res.data})
        setPreview(res.data.images[0].url)
    }
    console.log(values);

    const handelImageChange = (e)=>{
      // console.log(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]))
      setValues({...values, images:e.target.files})
  
    }
    const handelChange = (e)=>{
      setValues({...values, [e.target.name]: e.target.value});
      // console.log(values);
    }
    const handelSubmit = async(e)=>{
      e.preventDefault()
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
    try {
      let res = await updateHotel(token,hotelData,hotelId);
      console.log(res);
      alert.success(`${res.data.hotel.title} is updated`)
      navigate("/dashboard/seller")

    } catch (err) {
      // alert.error(error)
      console.log(err);
    }
       
    }

   
    

  return (
    <div className='edit'>
         <div className='dashboard-text'>
            <h1>Edit Hotel</h1>
          </div>
          <div className="container-fluid">
            <div className="row">
             <HotelEditForm
              values = {values}
              setValues={setValues}
              handelChange={handelChange}
              handelImageChange={handelImageChange}
              handelSubmit={handelSubmit}
              preview={preview}
              />  
            
              
            </div>
          </div>
        
    </div>
  )
}

export default EditHotel