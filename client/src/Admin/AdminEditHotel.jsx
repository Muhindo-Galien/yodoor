import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from "react-router";
import "./editHotel.css"
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
// import { DatePicker, Select } from 'antd';
import { read, updateHotel } from '../redux/actions/hotel';
import AdminHotelEditForm from "../component/forms/AdminHotelEditForm";
import { adminUpdateHotel } from '../redux/actions/admin';

const AdminEditHotel = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  let { hotelId } = useParams();
  const [preview, setPreview] = useState("");
  const token = useSelector((state) => state.token);
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    images: "",
    price: "",
    from: "",
    to: "",
    bed: "",
    verified:"",
  });
  const {
    title,
    content,
    images,
    price,
    from,
    to,
    bed,
    location,
    verified,
  } = values;

  useEffect(() => {
    loadSellerHotel();
  }, []);
  const loadSellerHotel = async () => {
    let res = await read(hotelId);
    setValues({ ...values, ...res.data });
    setPreview(res.data.images[0].url);
  };
  console.log(values);

  const handelImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, images: e.target.files });
  };
  const [role,setRole] = useState("");
  const handelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);
    hotelData.append("verified", verified);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        hotelData.append("images", images[i]);
      }
    }
    try {
      let res = await adminUpdateHotel(token, hotelData, hotelId);
      console.log(res);
      alert.success(`${res.data.hotel.title} is verified`);
      navigate("/admin");
    } catch (err) {
      // alert.error(error)
      console.log(err);
    }
  };

  return (
    <div className="edit">
      <div className="dashboard-text">
        <h1>Update Room</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <AdminHotelEditForm
            values={values}
            setValues={setValues}
            handelChange={handelChange}
            handelImageChange={handelImageChange}
            handelSubmit={handelSubmit}
            preview={preview}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEditHotel;