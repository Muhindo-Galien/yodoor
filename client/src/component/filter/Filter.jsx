import './filter.css'

const Filter = () => {
  return (
    <section className='filter'>
        <h3><b>Check avaibility</b></h3>
        <form action="" className='filter-form'>
            <div className='inputBox'>
                <input type="text" placeholder='location'></input>
                <span className="fas fa-location-dot"></span>
            </div>
            <div className='inputBox'>
                <input type="text" placeholder='start'></input>
                <span className="fas fa-calendar"></span>
            </div>
            <div className='inputBox'>
                <input type="text" placeholder='number of beds'></input>
                <span className="fas fa-calendar"></span>
            </div>
           
                <input type="submit" value='Check' className='search'/>
         
        </form>
    </section>
  )
}

export default Filter