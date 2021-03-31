import { useState, useEffect } from 'react';

import eye from '../EyedPay.png'
import {Link, useHistory} from 'react-router-dom'

const axios = require('axios');
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';




export const GoodCharge = () => {

    let history = useHistory()

    const [result, setResult] = useState()
    //const [sim, setSim] = useState('Ipsum')
    
        useEffect( () => {

            const response = axios.get('http://localhost:5000/compare')
            .then((response)=> {
                    if(response.data.length === 0){
                    history.push('/checkUser')
                    alert('user not found')
                } else {
                    let name = response.data[0][0].name
                    setResult(name)

                    //setSim(response.data[0][0].sim)
                }
            })
            //
        })    

    const onClick = async()=>{
       axios.post('http://localhost:5000/charge', {
           username: result,
           money: history.location.money
       })
       .then(response => {
           history.push('/')
       })
    }

    return (
        
        <div>
            

            {result && 
            <>
            <h4 className='display-4 text-center mb-4' style={{color:'darkgoldenrod'}}>EyedPay</h4> 
            <div>
            <h3 className='text'>charge</h3>
            <h3 className='text' style={{color:'darkgoldenrod'}}>{result}</h3>
            <h4 className='text'>${history.location.money}?</h4>
            <div className='text'>
            <button className='button' onClick={onClick}>Charge!</button>
            </div>
            </div>
            </>
            }
            
            
        </div>

    )
}

export default GoodCharge