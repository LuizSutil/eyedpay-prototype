import React, { useState} from 'react'
import axios from 'axios'
import face from '../faceIcon.png'


const FileUpload = () =>{

    const [file, setFile] = useState ();
    const [fileName, setFileName] = useState ();
    const [uploadedFile, setUploadedFile] = useState({});
    const [fileScreen, setFileScreen] = useState({});


    const onChange = e => {

        if (e.target.files[0] === undefined) {
            setFile({})
            setFileName('Please select a Picture')
            setFileScreen (face)
            
        } else{
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
            setFileScreen (URL.createObjectURL(e.target.files[0]))
        }

    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);


        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })

            const { fileName, filePath} = res.data

            setUploadedFile({fileName, filePath});
            
        }catch (err){
            if(err.response.status === 500) {
                console.log('Error 500')
            } else {
                console.log(err.response.data.msg)
            }
        }
    }


    return (
        <>
            <form onSubmit = {onSubmit}>
                <div className="input-group mb-3">

                <input type="file" className="form-control" id="inputGroupFile02" onChange = {onChange}/>
                <button className="input-group-text" htmlFor="inputGroupFile02">Upload</button>

                </div>
                
            </form>
            
            {uploadedFile && <div>
                <div>
                    <h3 className="text" style={{color:'gold'}}>{fileName}</h3>

                    {file ? <img className='picInput' src={fileScreen} width="200" height="200" /> :
                    <img className='faceInput' src={face} width="200" height="200" />
            }
                </div>
            </div> 
            }
        </>
    )
}

export default FileUpload