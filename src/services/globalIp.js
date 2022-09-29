import axios from "axios";

class FindGlobalIP{
  async getIP(){
    const res = await axios.get("https://geolocation-db.com/json/");
    return res.data.IPv4;
  }
}

export default new FindGlobalIP();
