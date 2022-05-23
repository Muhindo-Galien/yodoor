import React from 'react'
import { TiWarning  } from 'react-icons/ti';


const StripeCancel = () => {
  return (
    <div className='dashboard'>
        <div className="col">
            <h2 className='text-center p-5 headingH2c'><TiWarning className="cancel"/> Payment Failed, Try again!</h2>
        </div>
    </div>
  )
}

export default StripeCancel