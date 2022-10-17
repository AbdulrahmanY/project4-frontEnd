import axios from "axios";
import { useState, useEffect } from "react";
import AddReview from "./AddReview";
import "./Reviews.css"
function Reviews({id}){
    const [allreviews, setAllReviews] = useState();
    const game_id = id;
    

    useEffect(() => {
        //   const config ={
        //       headers:{Authorization: `Bearer ${state.token}`}
        //   }
        axios.get('http://localhost:8080/review/game/'+id)
          .then(function (response) {
            setAllReviews(response.data)
            //console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }, [allreviews]);
    return(
        <div className="div-body">

        <h2>Comments</h2><br/>

  <section class="comments">
   
     
  
                
                
       
        {
           allreviews?allreviews.map((e)=>{
                return(
                    
                    <article class="comment">
                    <a class="comment-img">
                      <img src={e.user.profileImage} alt="" width="50" height="50"/>
                    </a>
                    <div class="comment-body">
                      <div class="text">
                        <p>{e.comment}</p>
                      </div>
                      <p class="attribution">by <a className="a-user">{e.user.username}</a></p>
                    </div>
                  </article>
                    
                )
            }):"null"
        }
        
        </section>
        <br/>
        <AddReview game_id={game_id} />
    		</div>
		
    )
}
export default Reviews;