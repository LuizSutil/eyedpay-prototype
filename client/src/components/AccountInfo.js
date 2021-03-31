
import {Link} from 'react-router-dom'
import { useState, useLayoutEffect } from "react";

const axios = require('axios')
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export const AccountInfo = () => {

    const [username, setUsername]= useState('user')
    const [email, setEmail]= useState('loading')
    const [ccnumber, setCCnumber]= useState('loading')
    const [id, setId]= useState('loading')

    
    useLayoutEffect(()=> {
        axios.get('http://localhost:5000/getUserInfo')
        .then(response => {
            setUsername(response.data.username)
            setEmail(response.data.email)
            setCCnumber(response.data.ccnumber)

            console.log(username)
        })
        .catch(err => console.log(err))

    })

    return (
        
        <div>

            <div>
            <h2 className='textB'>Here's your info!</h2>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>Account Name: <span style={{color: 'rgb(151, 100, 5)'}}>{username}</span></h6>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>CC Number: <span style={{color: 'rgb(151, 100, 5)'}}>{ccnumber}</span></h6>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>CPF: <span style={{color: 'rgb(151, 100, 5)'}}>example</span> </h6>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>Member Since: <span style={{color: 'rgb(151, 100, 5)'}}>example</span></h6>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>Email: <span style={{color: 'rgb(151, 100, 5)'}}>{email}</span></h6>
            <h6 style={{color: 'rgb(10, 185, 216)'}}>Telephone: <span style={{color: 'rgb(151, 100, 5)'}}>+55 (48) 98809-7616</span></h6>
            </div>

            <div className='textInput'>
            <Link to='/home'>
            <button className='button' style= {{color: 'rgb(151, 100, 5)'}}>Go back!</button>
            </Link>
            </div>
        </div>
    )
}

export default AccountInfo