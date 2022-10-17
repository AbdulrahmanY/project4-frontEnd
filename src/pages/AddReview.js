import "./AddReview.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function AddReview({game_id}){
    const [user1, setUser1] = useState();
    const [comment, setComment] = useState();
    //console.log(game_id)

      const state = useSelector((state) => {  
    return {
        user:state.usersReducer.user,
        token:state.usersReducer.token,
        userIsLogedIn: state.usersReducer
    };
  });
  //console.log(state.user.user);

  const data = {
    "review":{"comment":comment},
    "id_User":user1,
    "id_Game":game_id
}
  function addComment(){
    // const config ={
    //     headers:{Authorization: `Bearer ${state.token}`}
    // }
    axios.post("http://localhost:8080/review",data)
        .then(response=>{
            console.log(response.data);
            
           
           
            //dispatch(logIn(response.data))
        })
        .catch(err=>{console.log(err.response.data)})
  }

  useEffect(() => {
      const config ={
          headers:{Authorization: `Bearer ${state.token}`}
      }
    axios.get('http://localhost:8080/users/'+state.user.user,config)
      .then(function (response) {
        setUser1(response.data.id_User)
        console.log(response.data.id_User);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);
    
    return(
        <>
        {state.userIsLogedIn.isLogedIn && <section className="app1">
    <div class="container1">
      <div class="row">
        <div class="col-6">
          <div class="comment1">
          </div>
          </div>
          </div>
      <div class="row">
        <div class="col-6">
      <textarea type="text" class="input1" placeholder="Write a comment" onChange={(e) => {
              setComment(e.target.value.trim());}}></textarea>
              <button class='primaryContained float-right' type="button" onClick={addComment}>Add Comment</button>
              
        </div>
      </div>
    </div>
  </section>}
        
  </>
    )
}
export default AddReview;