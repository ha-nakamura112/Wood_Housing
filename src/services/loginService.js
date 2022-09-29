import httpCommon from "./http-common";
class LoginService{
    login(data){
        return httpCommon.post("/login.php",data);
    }
}
export default new LoginService();