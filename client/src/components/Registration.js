import {Link, Redirect, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
const axios = require('axios');


export const Registration = () => {

    const {register, handleSubmit} = useForm();

    let history = useHistory()

    const onSubmit= (data)=> {
        //const payload = JSON.stringify(data)
        console.log(data)
        history.push({
            pathname:'/regPic',
            userData: data
        })
    }
    

    return (
        <div>
            <h2 className='textA'>Hello there!</h2>
            <h4 className='text'>We need some information for your registration</h4>

       
            <div className='text'>
                <form onSubmit={handleSubmit(onSubmit)}>
                
                    <label for='username'>Username:
                    <input type='text' id='username' name='username' required ref={register}/>
                    </label>

                    <label for='email'>Email:
                    <input type="email" id="email" name="email" required ref={register}/>
                    </label>

                    <label for='password'>Password:
                    <input type='password' id='password' name='password'required ref={register}/>
                    </label>

                    <label for='ccnumber'>CC Number
                    <input type='text' id='ccnumber'
                             name='ccnumber' minLength='16' maxLength='16' 
                             required ref={register}/>
                    </label>
                    
                    
                    <button className='button' type='submit'>All set!</button>
                  


                </form>
        
                <div>
                    
            
                </div>
            </div>

            
      
    </div>
    )
}

export default Registration
