import React, { useEffect, useState } from "react";
import home2 from "../../assets/home2.jpg";
import home3 from "../../assets/home3.jpg";
import home1 from "../../assets/home1.jpg";
import "./blog.css";
import { allBlogs } from "../../redux/actions/blog";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  // DATA
  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await allBlogs();
    setBlogs(res.data);
  };
  return (
    <section className="blogs">
      <h1 className="heading">Blogs</h1>
      <div className="box-container">
        {blogs.map((blog, index) => {
          const { title, content, location, images } = blog;
          return (
            <>
              <div className="box">
                <div className="image">
                  <img src={home1} alt="blo1" />
                </div>
                <div className="content">
                  <a href="#" className="title">
                    {" "}
                    {title}
                  </a>
                  <span>by admin | 12nd Feb 2022</span>
                  <p>{content}</p>
                  <a href="#" className="btn">
                    read more
                  </a>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={home3} alt="blo1" />
                </div>
                <div className="content">
                  <a href="#" className="title">
                    {" "}
                    Serena hotel
                  </a>
                  <span>by admin | 12nd Feb 2022</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore, quidem?
                  </p>
                  <a href="#" className="btn">
                    read more
                  </a>
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={home2} alt="blo1" />
                </div>
                <div className="content">
                  <a href="#" className="title">
                    {" "}
                    Serena hotel
                  </a>
                  <span>by admin | 12nd Feb 2022</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore, quidem?
                  </p>
                  <a href="#" className="btn">
                    read more
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;
