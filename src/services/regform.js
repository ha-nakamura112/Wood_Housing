import httpCommon from "./http-common";
class regform{
    send(formData){
        return httpCommon.post("/insert.php",formData);
    }
}
export default new regform();