import RangeSetter from './RangeSetter'
import {Link} from 'react-router-dom'

export const SetPay = () => {


    return (
        
    <div>

        <div className = 'text'>
            <h3 className='textB'>Select the maximum values for each payment method</h3>


            <h4>Facial Recognition</h4>
            <RangeSetter></RangeSetter>
            
            <h4 >fingerprint</h4>
            <RangeSetter></RangeSetter>

            <h4 >Phone pin</h4>
            <RangeSetter></RangeSetter>

            <button style ={{color:'gainsboro'}} className='btn'>save</button>

            <Link to='/home'>
            <button style ={{color:'gainsboro'}} className='btn'>cancel</button>
            </Link>

        </div>
    </div>
            
       
    )
}

export default SetPay