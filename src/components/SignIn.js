import "./SignUp.css"
//esdgdfg
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {logIn,addToken,setUserRole} from "../reducers/users/actions"
function SignIn(){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const[requiredField,setRequiredField] = useState("")
    const [errMsg, setErrMsg] = useState()
    const dispatch = useDispatch();

    const data = {
        "username":username,
        "password":password,
    }

    function submit1(){
        if(username.length<1 || password.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
        axios.post("http://localhost:8080/login",data)
        .then(response=>{
            console.log(response.data);
            const token = response.data.access_token
            var decoded = jwt_decode(token);
            console.log(decoded.roles[0]);
            const logIn_action = logIn (
            {user:decoded.sub})
            const token_action = addToken (token)
            const userRole_action = setUserRole(decoded.roles[0])
            dispatch(logIn_action)
            dispatch(token_action)
            dispatch(userRole_action)
            //dispatch(logIn(response.data))
            navigate("/")
        })
        .catch(err=>{setErrMsg(err.response.data)})
    }
    }
    
    return(
        <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
        <div className="wrapper wrapper--w680">
            <div className="card1 card-1">
                <div className="card-heading1"></div>
                <div className="card-body1">
                    <h2 className="title1">Sing In</h2>
                    <form method="POST">
                        <div className="input-group">
                            <input className="input--style-1" type="text" placeholder={requiredField.length>1?requiredField:"User Name"} name="username" onChange={(e) => {
              setUserName(e.target.value.trim())}}/>
                        </div>
                        <div class="input-group">
                            <div class="rs-select2 js-select-simple select--no-search">
                            <input className="input--style-1 js-datepicker" type="password" placeholder={requiredField.length>1?requiredField:"Password"} name="password" onChange={(e) => {
              setPassword(e.target.value.trim());
            }}/>
                            </div>
                        </div>
                        <div class="p-t-20">
                            <button class="btn1 btn--radius1 btn--green" type="button" onClick={submit1}>Submit</button>
                        </div>
                        <div>
                            {errMsg}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SignIn;