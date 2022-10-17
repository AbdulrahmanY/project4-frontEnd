import "./UserProfile.css"
import { useParams } from "react-router";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {changeUsername} from "../reducers/users/actions"
function UserProfile(){

    const { username } = useParams();

    const [user, setUser] = useState();
    const [name, setName] = useState("");
    const [editeUsername, setEditeUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userEdite, setUserEdite] = useState(false);
    const [hideEdite, setHideEdite] = useState(true);
    const [errMsg, setErrMsg] = useState()
    const [usernameParam, setUserNameParam] = useState(username)
    const[requiredField,setRequiredField] = useState("")
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    
    console.log(userEdite)
    const state = useSelector((state) => {  
        return {
            user:state.usersReducer.user,
            token:state.usersReducer.token,
        };
      });

      const data = {
        "name":name,
        "username":editeUsername,
        "email":email
    }
    

      function editBt(){
          setUserEdite(true)
          setHideEdite(false)
      }
      function submitBtn(){
        if(name.length<1 || editeUsername.length<1 || email.length<1){
            setRequiredField("This Field is Requierd")
        }
        
        
        else{
            const config ={
                headers:{Authorization: `Bearer ${state.token}`}
            }

            axios.put('http://localhost:8080/users/user/'+user.id_User,data,config)
              .then(function (response) {
                
                console.log(response.data);
                setHideEdite(true)
                setUserEdite(false)
                const changeUserNmae_action = changeUsername (
                    {user:editeUsername})
                dispatch(changeUserNmae_action)
                setUserNameParam(editeUsername)
                
                
              })
              .catch(err=>{setErrMsg(err.response.data)})
            }   
      }

      const uploadImage = async e =>{
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset', 'ProfileImages')
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dzekdqzpl/image/upload",{ //codingshiksha
            method:'POST',
            body:data
        })
         
         const file = await res.json()
        console.log(file.secure_url);
        setLoading(false)
        console.log(file.secure_url);
        setProfileImage(file.secure_url)
        console.log(profileImage);
        const data0 = {
            "profileImage":file.secure_url
        }
        const config ={
            headers:{Authorization: `Bearer ${state.token}`}
        }

         axios.put('http://localhost:8080/users/user/image/'+user.id_User,data0,config)
          .then(function (response) {
            setProfileImage (file.secure_url)
             console.log(response.data);  
             console.log(profileImage);     
              
            
          })
          .catch(err=>{setErrMsg(err.response.data)})
      }
    useEffect(() => {
        const config ={
        headers:{Authorization: `Bearer ${state.token}`}
    }
        axios.get('http://localhost:8080/users/'+usernameParam,config)
          .then(function (response) {
            setUser(response.data)
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }, []);

    return(
        <>
            <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={user?user.profileImage:"null"} alt=""/>
                            <div class="file btn btn-lg btn-primary" id="div-changeImage">
                                Change Photo
                                <input type="file" name="file" onChange={uploadImage}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h3>
                                        
                                    </h3>
                                    
                                    <div className="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {userEdite&&<p>{errMsg}</p>}
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Name:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{user?user.name:"null"}</p>
                                            </div>
                                        </div>
                                        {userEdite&&<div class="row">
                                            <div class="col-md-6">
                                            <input className="input--style-1 js-datepicker" type="text" placeholder={requiredField.length>1?requiredField:"Enter a New Name"} onChange={(e) => {
                                     setName(e.target.value.trim());
                                            }}/>
                                            </div>
                                        </div>}
                                        
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Name:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{user?user.username:"null"}</p>
                                            </div>
                                        </div>
                                        {userEdite&&<div class="row">
                                            <div class="col-md-6">
                                            <input className="input--style-1 js-datepicker" type="text" placeholder={requiredField.length>1?requiredField:"Enter a New User Name"} onChange={(e) => {
                                     setEditeUserName(e.target.value.trim());
                                            }}/>
                                            </div>
                                        </div>}
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{user?user.email:"null"}</p>
                                            </div>
                                        </div>
                                        {userEdite&&<div class="row">
                                            <div class="col-md-6">
                                            <input className="input--style-1 js-datepicker" type="text" placeholder={requiredField.length>1?requiredField:"Enter a New Email"} onChange={(e) => {
                                     setEmail(e.target.value.trim());
                                            }}/>
                                            </div>
                                        </div>}
                                        {userEdite&&<div class="row">  <input type="button" value="Submit" className="profile-edit-btn1" onClick={submitBtn}/></div>}
                            </div>
                        </div>
                    </div>

                        </div>
                    </div>{hideEdite&&<div className="col-md-2">
                        <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={editBt}/>
                    </div>}
                </div>
                
            </form>           
        </div>
        </>
    )
}
export default UserProfile;