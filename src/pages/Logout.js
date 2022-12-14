import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
function Logout(props){   
    props.logoutFun('');
    const navigate = useNavigate('');
    sessionStorage.removeItem("sid");
    useEffect(()=>{navigate('/login')},[]);
}
export default Logout;