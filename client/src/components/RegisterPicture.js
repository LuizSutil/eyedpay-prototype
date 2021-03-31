import {useState} from 'react'

import FileUpload from './FileUpload'
import {Link, useHistory} from 'react-router-dom'
import face from '../faceIcon.png'
const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


export const RegisterPicture = () => {

    const [file, setFile] = useState ();
    const [fileName, setFileName] = useState ();
    const [uploadedFile, setUploadedFile] = useState({});
    const [fileScreen, setFileScreen] = useState({});

    let history = useHistory()

    const tester = () => {
        console.log(history.location.userData)
        //console.log(fileScreen)
        //console.log(uploadedFile)
    }

    


    const onChange = async e => {

        if (e.target.files[0] === undefined) {
            setFile({})
            setFileName('Please select a Picture')
            setFileScreen (face)
            
            const formData = new FormData();
            formData.append('file', file);


        } else{
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
            setFileScreen (URL.createObjectURL(e.target.files[0]))
        }

    }

    const onUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)
        axios.post('http://localhost:5000/upload', formData)
        history.push({
            pathname: '/regConfirm',
            userData: history.location.userData,
            picture: fileScreen,
            picData: formData
        }
            )
       
    }

    return (
        <div>
            <h2 className='textB'>Picture for the database!</h2>
            <div>   
                <div>
                    <form>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile02" onChange = {onChange}/>
                        </div>
                    </form>
            
                {uploadedFile && <div>
                    <div>
                        {file ? <img className='picInput' src={fileScreen} width="200" height="200" /> :
                        <img className='faceInput' src={face} width="200" height="200" />}
                    </div>
                </div> 
                }
            </div>
                <h4 className='textA'>Is this you?</h4>
                    <div className='btnPlacer'>
                        <button className='button' onClick={onUpload}>That's me!</button>
                    </div>
            </div>
      

    </div>
    )
}

export default RegisterPicture