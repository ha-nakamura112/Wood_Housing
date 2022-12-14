import {useState} from 'react';
import {Alert, Button} from 'react-bootstrap';
import fileUploadSrv from '../services/fileUploadSrv';
function Fileupload(){
    const [file,setFile] = useState();
    const [show,setShow] = useState(true);
    const fileChange = (event)=>{
        setFile(event.target.files[0]);
    };
    const imageSubmit = (event)=>{
        event.preventDefault();
        if(file!==null){
            fileUploadSrv.Fileupload(file)//event.target
                .then(response=>{console.log(response)})
                .catch(err=>{console.log(err)})
        }
    }
    return(
        <>
            <Alert show={show} variant='primary'>
                <Alert.Heading>How to upload my image</Alert.Heading>
                <p>
                    Click on the Upload button and choose your image. SIMPLE RIGHT!!!
                </p>
                <hr/>
                <div className='d-flex justify-content-end'>
                    <Button onClick={()=>setShow(false)} variant='outline-primary'>
                        Close me y'all!
                    </Button>
                </div>
            </Alert>
            <h1 className='dummy'>Upload an IMAGE</h1>
            <form onSubmit={(event)=>{imageSubmit(event)}}>
                <input type="file" onChange={(event)=>fileChange(event)} required/>
                <button type='submit'>Upload</button>
            </form>
        </>
    )
}
export default Fileupload;