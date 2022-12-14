import {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import globalIP from '../services/globalIp';
import loginService from '../services/loginService';
import {FloatingLabel, Form} from 'react-bootstrap';
// import style from '../style/mytemplate.module.css';
function Login(props){    
    const passInput = useRef();
    const [logFlag,setLogin] = useState(false);
    const [Ip,setIp] = useState();
    const [err,setErr] = useState();
    const navigate = useNavigate();
    const login = (event) =>{
        event.preventDefault();
        
        const formData = new FormData(event.target);
        formData.append('gip',Ip);
        loginService.login(formData)
            .then(response=>{
                setLogin(true);
                props.loginFun(response.data);
                // console.log(response.data)
                sessionStorage.setItem("sid",response.data.sid);
                setErr(null);
                navigate('/yourpost');
            })
            .catch(err=>{
                setErr(err.response.data);
            });
    }

    useEffect(()=>{
        globalIP.getIP().then(data=>{setIp(data)});
    },[]);

    const inputFocus = (event)=>{
        if(event.target.innerText == "Show Password"){
            passInput.current.type = "text";
            event.target.innerText = "Hide Password";
        }else{
            passInput.current.type = "password";
            event.target.innerText = "Show Password";
        }
    }
    const bgChanger = (event) =>{
        switch(event.type){
            case "focus":
                event.target.style.backgroundColor = "yellow";
                break;
            case "blur":
                if(event.target.value==""){
                    event.target.style.backgroundColor = "red";    
                }else{
                    event.target.style.backgroundColor = "white";
                }
                break;
        }
    }
    return(
        <>
        <div className='loginMain'>
            <h1 className='loginPage'>Login</h1>
            <form onSubmit={(event)=>login(event)}>
                <Form.Control className="loginForm" type="email" name="uName" placeholder="Youremail@email.com" onFocus={(event)=>bgChanger(event)}  onBlur={(event)=>bgChanger(event)} required/>
                <input className="loginFormPass" type="password" name="pass" ref={passInput} placeholder="Password" onFocus={(event)=>bgChanger(event)}  onBlur={(event)=>bgChanger(event)} required/>
             
                <div className='loginBtnWrap'>
                <button className="showPassBtn" type='button' onClick={(event)=>inputFocus(event)}>Show Password</button>                
                <button className="LoginFormBtn" type="submit">Login</button>
                </div>
            </form>
            {err!==null ? <h1>{err}</h1> : null}
            </div>
            
        </>

    )
}
export default Login;