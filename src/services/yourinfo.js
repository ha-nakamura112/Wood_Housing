import httpCommon from "./http-common";
class YourInfoSrv{
    loadInfo(sid){
        let formdata = new FormData();
        formdata.append("sid",sid);
        return httpCommon.post('/yourPost.php',formdata,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
      }

    loadpostuser(id){
        let formdata = new FormData();
        formdata.append("user_id",id);
        return httpCommon.post('/showuser.php',formdata,{
            headers:{
                'content-type':'multipart/form-data'
            }
        });
      }
    }
    export default new YourInfoSrv();