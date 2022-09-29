import httpCommon from "./http-common";
class userInfoSrv{
    loadInfo(sid){
        let formdata = new FormData();
        formdata.append("sid",sid);
        return httpCommon.post('/sidChk.php',formdata,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
    }
}
export default new userInfoSrv();