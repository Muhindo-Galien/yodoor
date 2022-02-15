import React from 'react'

const Contact = () => {
  return (
    <section className='contact'>
        <h1 className="heading">
            Contact <span>us</span>
        </h1>
        <div className="row">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo placeat numquam autem eveniet asperiores earum, perferendis non aliquam, ipsum porro neque cum quam mollitia totam, corrupti accusantium modi inventore vero.
            </p>

            <form action="">
                <div className='inputBox'>
                    <span className="fas fa-user"></span>
                    <input type="text" ></input>
                </div>
                <div className='inputBox'>
                    <span className="fas fa-envelope"></span>
                    <input type="text" ></input>
                </div>
                <div className='inputBox'>
                    <span className="fas fa-phone"></span>
                    <input type="text" ></input>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Contact