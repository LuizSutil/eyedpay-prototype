import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

export const RangeSetter = () => {

    const [ value, setValue ] = React.useState(50);


    return (
        <div className='textA'>
            
            <RangeSlider 
            onChange={e => setValue(e.target.value)}
            min = '1'
            max = '1000'  
            />  
            <h5>${value}</h5>

        </div>
    )
}

export default RangeSetter
