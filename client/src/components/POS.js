import RangeSlider from 'react-bootstrap-range-slider';
import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'


export const POS = () => {

    let history = useHistory()

    const [ value, setValue ] = useState(50);

    const onClick = () => {
        history.push({
            pathname:'/checkUser',
            money: value
        })
    }

    return (
        <div>
           <h3>Please select an amount to charge</h3>
            
           <div className='textA'>
            
            <RangeSlider 
            onChange={e => setValue(e.target.value)}
            min = '1'
            max = '1000'  
            />  
            <h5>${value}</h5>

            <button className='button' onClick={onClick}>click me to continue</button>

        </div>

        </div>
    )
}

export default POS
