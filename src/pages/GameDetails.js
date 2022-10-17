import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { useParams } from "react-router";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./GameDetails.css"
import Reviews from "./Reviews";
function GameDetails(){

    const { id } = useParams();
    const [games, setGame] = useState([]);
    const [genreName, setGenreName] = useState();

    useEffect(() => {
        axios.get('http://localhost:8080/games/'+id)
          .then(function (response) {
            setGame(response.data)
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }, []);

    return(
        <>
            <section className="game_details">
      {games && (
        <article className="article">
          <img className="thumbnail1" src={games.img} />
          
          <h1 className="title">About {games.name}</h1>


          {games.description?games.description.split(/(\r\n|\r|\n)/gi).map((paragraph, idx) => (
            <p key={idx} style={{ margin: "20px 0", fontSize: "15px" }}>
              {paragraph}
            </p>
          )):"null"}
          
          <h3>Additional Information</h3>
          <ul className="info_list">
            <li>
              <span className="text-muted">Title</span>
              <p>{games.name}</p>
            </li>
            <li>
              <span className="text-muted">Developer</span>
              <p>{games.developer}</p>
            </li>
            <li>
              <span className="text-muted">Publisher</span>
              <p>{games.publisher}</p>
            </li>
            <li>
              <span className="text-muted">Release Date</span>
              <p>{games.release_data}</p>
              
            </li>
            <li>
              <span className="text-muted">Genre</span>
              <div className="div-genre">
              {games.genre?games.genre.map((e)=>{ 
                return(
                    <div>
                    <p className="p-genre">{e.name}</p>
                    </div>
                )
              })
        :"null"}
                </div>
       
            </li>
            <li>
              <span className="text-muted">Platform</span>
              <div className="platform">
              {games.pc == true && <p>PC</p>}
              {games.ps == true && <p>, PS</p>}
              {games.xbox == true && <p>, Xbox</p>}
              </div>
            </li>
          </ul>         
        </article>
      )}
      <br/>
      <hr/>
    </section> 
    <br/>   
    <Reviews id={id}/>
        </>
    )
}
export default GameDetails;