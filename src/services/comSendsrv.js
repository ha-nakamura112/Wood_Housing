import httpCommon from "./http-common";

class CommentService{
    send(data){
        return httpCommon.post("/comments.php",data);
    }
}
export default new CommentService();