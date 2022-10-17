import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import "../pages/Home.css" 
import { Link } from "react-router-dom";
import { AiFillWindows, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allGames, setAllGames] = useState([]);



//   const state = useSelector((state) => {  
//     return {
//         user:state.usersReducer.user,
//         token:state.usersReducer.token
//     };
//   });

  useEffect(() => {
    //   const config ={
    //       headers:{Authorization: `Bearer ${state.token}`}
    //   }
    axios.get('http://localhost:8080/games')
      .then(function (response) {
        setAllGames(response.data)
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

  return (
    <>
      

      <section className="games_content">
          <div className="grid">
        {
            allGames.map((e)=>{
                return (
                    <div className="card">
                    <Link to={`/games/${e.id_Game}`} className="card_header">
                      <img className="thumbnail" src={e.img} alt="test" />
                    </Link>
                    <div className="card_body">
                      <Link to={`/games/${e.id_Game}`} className="title">
                        {e.name}
                      </Link>
                      <p className={`"description" text-muted`}>
                        {e.description.substr(0, 70)}...
                      </p>
                      {e.pc&&<span  className="badge"><img className="platform-icon" src="https://www.shareicon.net/data/512x512/2015/08/03/79323_windows_512x512.png"/></span>}
                      {e.ps&&<span  className="badge"><img className="platform-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/PlayStation_Icon.png"/></span>}
                      {e.xbox&&<span  className="badge"><img className="platform-icon" src="https://www.pngrepo.com/png/201348/512/xbox.png"/></span>}
                      <div className="card_footer">
                        <div>
                            {e.genre.map((g)=>{
                                return (
                                    <span className="badge">{g.name}</span>
                                )
                            })}
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
        }
        </div>
      </section>
    </>
  );
};

export default Home;
