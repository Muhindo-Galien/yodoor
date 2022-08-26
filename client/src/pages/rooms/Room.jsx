import React from "react";
import home4 from "../../assets/home4.jpg";
import home2 from "../../assets/home2.jpg";
import home3 from "../../assets/home3.jpg";
import "./room.css";
import Footer from "../../component/footer/Footer";
import Press from "../../component/press/Press";
import Filter from "../../component/filter/Filter";
import { allHotelRooms } from "../../redux/actions/hotel";
import SamllCard from "../../component/card/samllcard/SamllCard";
import { useEffect, useState } from "react";

const Room = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async () => {
    let res = await allHotelRooms();
    setHotels(res.data);
  };

  return (
    <>
      <section className="rooms">
        <Filter />
        {/* <pre>{JSON.stringify(hotels,null,4)}</pre> */}
        {hotels && hotels.map((h) => <SamllCard key={h._id} h={h} />)}
      </section>
      <Press />
      <Footer />
    </>
  );
};

export default Room;
