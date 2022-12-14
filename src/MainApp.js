import { BrowserRouter, Routes, Route} from "react-router-dom";
import RoutingLayout from "./pages/RoutingLayout";
import Yourpost from "./pages/Yourpost";
import Showpost from "./pages/Showpost";
import Findpost from "./pages/Findpost";
import Login from "./pages/Login";
import Nopage from "./pages/Nopage";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile"
import { useEffect, useState } from 'react';
import $, { data } from 'jquery';
import Fileupload from './pages/Fileupload';
import userInfoSrv from './services/userInfoSrv';
import { useNavigate } from 'react-router-dom';

export default function MainApp(){
    const [user,setUser] = useState('');
    //change
    const LoginFunction = (userInput) =>{
      setUser(userInput);
    };

    const LogoutFunction = () =>{
      useEffect(()=>{setUser('')},[]);
  }
    const pageLoad = ()=>{
        let sid = sessionStorage.getItem("sid");
        // console.log(sid);
        if(sid!=null){
            userInfoSrv.loadInfo(sid)
                .then(response=>{
                    setUser(response.data);
                    // console.log(user);
                })
                .catch(err=>{console.log(err)});
      }
    };
    useEffect(()=>{pageLoad()},[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoutingLayout loggedUser={user}/>}>
        {/* homepage replacement*/}
          <Route  index  element = { <Login loginFun={LoginFunction}/>}/>
          <Route path="login" element = {<Login loginFun={LoginFunction}/>}/>
          <Route path="yourpost" element={<Yourpost loggedUser={user}/>}/>
          <Route path="logout" element = {<Logout loggedUser={user} logoutFun={LogoutFunction}/>}/>
          <Route path="profile" element = { <Profile loggedUser={user} />}/>
          <Route path="register" element = {<Register loggedUser={user}/>}/>
          <Route path="showpost" element = {<Showpost loggedUser={user}/>}/>
          {/* <Route path="findpost" element = {<Findpost loggedUser={user}/>}/> */}
          <Route path="*" element = { <Nopage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
