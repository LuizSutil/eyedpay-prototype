import '../App.css'
import eye from '../EyedPay.png'

import {Link, Redirect, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';




export const Login = () => {

    const {register, handleSubmit} = useForm();

    let history = useHistory()
    
    const onSubmit= (data)=> {
      const payload = JSON.stringify(data)
      console.log(payload)
      axios.post('http://localhost:5000/login', {
          username: data.username,
          password: data.password,
    })
    .then(function(response){
        if (response.data == "You entered the wrong password.") {
          alert('woops, wrong login or password mate')
        } else {
          history.push('/home')
        }
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
            <div>
              <img src={eye} alt="eye" style={{width:350, height:200}}/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className='textA ' for='username'>Username:
                <input type='text' id='username' name='username' required ref={register}/>
              </label>

              <label className='textA ' for='password'>Password:
                <input type="password" id="password" name="password" required ref={register}/>
              </label>
              <div className="btnPlacer">
                <button className="button" style = {{color: 'gainsboro'}}>Log In</button>
              </div>
            </form>

            <div className="btnPlacer">
              <Link to='/'>        
              <button className="button" onClick={alertt} style = {{color: 'gainsboro'}}>go back</button>
              </Link>    

            </div>

            <footer className='ztelluz'>Powered by Ztelluz</footer>
        </div>
    )
}


export default Login