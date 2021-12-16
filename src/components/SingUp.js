import "./SignUp.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {logIn} from "../reducers/users/actions"
function SingUp (){
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errMsg, setErrMsg] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[requiredField,setRequiredField] = useState("")

    const data = {
        "name":name,
        "username":username,
        "password":password,
        "email":email
    }

    function submit(){
        if(username.length<1 || password.length<1 || email.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
        axios.post("http://localhost:8080/users",data)
        .then(response=>{
            console.log(response.data);
            dispatch(logIn(response.data))
            navigate("/")
        })
        .catch(err=>{setErrMsg(err.response.data)})
    }
    }

    return(
        <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
        <div className="wrapper wrapper--w680">
            <div className="card card-1">
                <div className="card-heading"></div>
                <div className="card-body">
                    <h2 className="title">Registration Info</h2>
                    <form method="POST">
                        <div className="input-group">
                            <input className="input--style-1" type="text" placeholder={requiredField.length>1?requiredField:"Name"} name="name"  onChange={(e) => {
              setName(e.target.value.trim());
            }}/>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <input className="input--style-1 js-datepicker" type="text" placeholder={requiredField.length>1?requiredField:"User Name"} name="username" onChange={(e) => {
              setUserName(e.target.value.trim());
            }}/>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <div class="rs-select2 js-select-simple select--no-search">
                                    <input className="input--style-1 js-datepicker" type="password" placeholder={requiredField.length>1?requiredField:"Password"} name="password" onChange={(e) => {
              setPassword(e.target.value.trim());
            }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="rs-select2 js-select-simple select--no-search">
                            <input className="input--style-1 js-datepicker" type="text" placeholder={requiredField.length>1?requiredField:"Email"} name="email" onChange={(e) => {
              setEmail(e.target.value.trim());
            }}/>
                            </div>
                        </div>
                        <div class="p-t-20">
                            <button class="btn btn--radius btn--green" type="button" onClick={submit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SingUp;