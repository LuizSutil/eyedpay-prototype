import '../App.css'
import eye from '../EyedPay.png'
import {Link, useHistory} from 'react-router-dom'

const axios = require('axios')  
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export const Home = () => {

    let history = useHistory()

    const logOut = () => {
        axios.get('http://localhost:5000/logout')
        .then(response => {
            console.log(response)
            history.push('/')
        })
        .catch(err => console.log(err))

    }

    const alertt = () => {
        axios.get('http://localhost:5000/protected-route')
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    return (
        <div>
        <h2 className ='text' style= {{color:'gainsboro'}} >Welcome Back</h2>
        <h2 className ='text' style= {{color:'gainsboro'}}>Roddy!</h2>

        <div className="btnPlacer">
            <Link to='limits'>
                <button className="button" style = {{color: 'gainsboro'}}>Limits</button>  
            </Link>   
        </div>
        
        <div className="btnPlacer">
            <button className="button" onClick={alertt} style = {{color: 'gainsboro'}}>Security **</button>     
        </div>
        
        <div className="btnPlacer">
            <Link to='/AccountInfo'>
            <button className="button" style = {{color: 'gainsboro'}}>Account</button>  
            </Link>   
        </div>
        
        <div className="btnPlacer">
            
            <button className="button"  onClick ={logOut} style = {{color: 'gainsboro'}}>Logout</button>
            
        </div>
      </div>
    )
}

export default Home