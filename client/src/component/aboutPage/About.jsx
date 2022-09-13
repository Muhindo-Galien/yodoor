import React from 'react'
import home4 from '../../assets/hom5.jpg';
import './about.css';

 
const About = () => {
  return (
    <section className="about">
      <h1 className="heading">
        <span>about</span> us
      </h1>
      <div className="row">
        <div className="image">
          <img src={home4} alt="" />
        </div>
        <div className="content">
          <h3>What makes Yodoor a good choice?</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
            provident mollitia tenetur fuga consectetur minima alias, non, illo
            in unde rerum! Debitis exercitationem voluptas magnam maiores veniam
            adipisci maxime corporis!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
            provident mollitia tenetur fuga consectetur minima alias, non, illo
            in unde rerum! Debitis exercitationem voluptas magnam maiores veniam
            adipisci maxime corporis!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About