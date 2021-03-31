import {Link, useHistory} from 'react-router-dom'
const axios = require('axios');
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';



export const ConfirmReg = () => {

    let history = useHistory()

    const test = () => {
        let arcticMonkeys = history.location.userData
        console.log(arcticMonkeys)

        axios.all([
            axios.post('http://localhost:5000/addUser', arcticMonkeys),

            axios.post('http://localhost:5000/register', {
            username:history.location.userData.username,
            email: history.location.userData.email,
            password: history.location.userData.password,
            ccnumber: history.location.userData.ccnumber
        })
        .then(axios.spread((resPic, resData) =>{
            console.log(resPic) //correct
            console.log(resData) //correct
            history.push('/login')
        }))


        ])
        
    }

    const onSubmit= (data)=> {
        axios.post('http://localhost:5000/register', {
            username: data.username,
            email: data.email,
            password: data.password,
            ccnumber: data.ccnumber
        })
        .then(function (response) {
            if (response.data == `user ${data.username} created`) {
                console.log('sucess');
            } else{
                console.log('failure :(')
            }
             
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
    return (
        <div>
            <h2 className='textA'>Please confirm stuff</h2>
            <h4>username: {history.location.userData.username}</h4>
            <h4>email: {history.location.userData.email}</h4>
            <h4>ccnumber: {history.location.userData.ccnumber}</h4>
            <h4>password: {history.location.userData.password}</h4>
            <img src={history.location.picture} className='faceInput' width="200" height="200" ></img>
            <div className='btnPlacer'>
            <button className='button' onClick={test}>click</button>
            </div>
            
        </div>
    )
}

export default ConfirmReg

