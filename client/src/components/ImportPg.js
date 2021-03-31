import FileUpload from './FileUpload'
import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import face from '../faceIcon.png'
const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export const ImportPg = () => {

    const [file, setFile] = useState ();
    //const [fileName, setFileName] = useState ();
    //const [uploadedFile, setUploadedFile] = useState({});
    const [fileScreen, setFileScreen] = useState({});

    let history = useHistory()    

    const onChange = async e => {

        if (e.target.files[0] === undefined) {
            setFile({})
            //setFileName('Please select a Picture')
            setFileScreen (face)
    

        } else{
            setFile(e.target.files[0])
            //setFileName(e.target.files[0].name)
            setFileScreen (URL.createObjectURL(e.target.files[0]))


            
        }

    }

    const onUpload = async e => {
        const formData = await new FormData();
        formData.append('file', file);
        axios.post('http://localhost:5000/uploadRequest', formData)
        .then(res => {
            if(res.data == 'proceed'){
                history.push({
                    pathname:'/goodCharge',
                    money: history.location.money
                })
            } else {
                alert('beep')
            }
        })          
    }
    return (
        <div>
            <h4 className='display-4 text-center mb-4' style={{color:'darkgoldenrod'}}>
                <i /> EyedPay
            </h4>
  
            <div>   
                
                    <form>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile02" onChange = {onChange}/>
                        </div>
                    </form>
            
                <div>
                    <div>
                        <div>
                            {file ? <img className='picInput' src={fileScreen} width="200" height="200" /> :
                            <img className='faceInput' src={face} width="200" height="200" />}

                            <div className='text'>
                                <button className='button' onClick={onUpload}>confirm picture</button>
                            </div>
                        </div>

                    </div>
                </div> 
                
            </div>
    </div>
    )
}

export default ImportPg
