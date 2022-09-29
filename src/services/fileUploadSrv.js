import httpCommon from "./http-common";
class fileUploadSrv{
    Fileupload(file){
        const formData = new FormData();//data
        formData.append('upload',file);
        return httpCommon.post('/fileUplod.php',formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
    }
}
export default new fileUploadSrv();