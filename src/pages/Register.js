import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import '../style/style.css'
import regform from "../services/regform";
const Register=()=>{
    // const {registerUser, wait} = useContext(UserContext);
    let history = useNavigate();
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        pass:""
    })
    const handleChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        // formData.append();
        regform.send(formData)
        .then(result=>{
            // console.log(result)
            if(result.data.Status == 'Invalid'){
            alert('Invalid User');
        }else{
            history('/');
        }
        })
        .catch(err=>{console.log(err)});

    }
    return(
 <div className="regform-wrap">
       <div className="regform">
            <h2 className="SignUpTittle">Sign Up</h2>
            <form className="SignUpForm" onSubmit={submitForm}>
              <div className="NameWrap">
              <div className="FirstName">
                <label htmlFor="name">First Name:</label>
                <input type="text" name="firstName" placeholder="First name" id="firstName" onChange={handleChange} value={data.firstName} required />
                </div>
                <div className="LastName">
                <label htmlFor="name">Last Name:</label>
                <input type="text" name="lastName" placeholder="Last name" id="lastName" onChange={handleChange} value={data.lastName} required />
                </div>
                </div>
                <div className="Email">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="youremail@woodhousing.com" id="email" onChange={handleChange} value={data.email} required />
                </div>
                <div className="Password">
                <label htmlFor="password">Password:</label>
                <input type="password" name="pass"  placeholder="Password" id="pass" onChange={handleChange} value={data.pass} required />
                </div>
                <div className="SingUpSubmit">
                <button className="SingUpSubmit-btn" type="submit" name="submit" value="Register">Sign Up</button>
                 </div>
            </form>
        </div>
        </div>
    )
}
export default Register;
