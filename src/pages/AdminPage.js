import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./AdminPage.css"
function AdminPage(){
    const [allUsers, setAllUsers] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [gameName, setGamename] = useState("");
    const [realeseData, setRealeseData] = useState("");
    const [develper, setDevelper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [genreSelcted, setGenreSelected] = useState("");
    const [newGenreName, setNewGenreName] = useState("");
    const [usersBtn, setUsersBtn] = useState(false);
    const [gamesBtn, setGamesBtn] = useState(false);
    const [genreBtn, setGenreBtn] = useState(false);
    const [genreAddForm, setGenreAddForm] = useState(false);
    const [genreUpdateForm, setGenreUpdateForm] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [addGameForm, setAddGameForm] = useState(false);
    const [pcChose, setPcShose] = useState(true);
    const [psChose, setPsShose] = useState(true);
    const [xboxChose, setXboxChose] = useState(true);
    const [loading, setLoading] = useState(false);
    const [gameImage, setGameImage] = useState("");
    const[requiredField,setRequiredField] = useState("")
    const[genreName,setGenreName] = useState("")
    const state = useSelector((state) => {  
        return {
            user:state.usersReducer.user,
            token:state.usersReducer.token,
            userRole:state.usersReducer.userRole,
        };
      });

      function userbtn(){
          setUsersBtn(true)
          setGamesBtn(false)
          setGenreBtn(false)
          setAddGameForm(false)
          setGenreAddForm(false)
          setGenreUpdateForm(false)
      }

      function gamebtn(){
        setUsersBtn(false)
        setGamesBtn(true)
        setGenreBtn(false)
        setAddGameForm(false)
        setGenreAddForm(false)
        setGenreUpdateForm(false)
    }

    function genrebtn(){
        setUsersBtn(false)
        setGamesBtn(false)
        setGenreBtn(true)
        setAddGameForm(false)
        setGenreAddForm(false)
        setGenreUpdateForm(false)
    }
    function addGameBtn(){
        setUsersBtn(false)
        setGamesBtn(false)
        setGenreBtn(false)
        setAddGameForm(true)
        setGenreAddForm(false)
    }
    function selectOnChange (e){
        // input2=e.target.value
        setGenreSelected(e.target.value)
        console.log(e.target.value);
      }

      const OnChangePC = () => {
        setIsChecked1(!isChecked1);
        setPcShose(!isChecked1)
        console.log(pcChose);
      };
      const OnChangePS = () => {
        setIsChecked2(!isChecked2);
        setPsShose(!isChecked2)
        console.log(psChose);
      };
      const OnChangeXBOX = () => {
        setIsChecked3(!isChecked3);
        setXboxChose(!isChecked3)
        console.log(xboxChose);
      };

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
        setGameImage(file.secure_url)
        console.log(gameImage);
      }

      function addGame(){
        const data = {
             
    "name":gameName,
    "pc":pcChose,
    "ps":psChose,
    "xbox":xboxChose,
    "release_data":realeseData,
    "img":gameImage,
    "developer":develper,
    "publisher":publisher,
    "description":description,
    "genre":[
        {
            "id_Genre":genreSelcted
        }
    ]
        }
        if(gameName.length<1 || realeseData.length<1 || develper.length<1 || publisher.length<1 || description.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
            const config ={
                headers:{Authorization: `Bearer ${state.token}`}
            }
            axios.post("http://localhost:8080/games",data,config)
        .then(response=>{
          axios.get('http://localhost:8080/games')
      .then(function (response) {
        setAllGames(response.data)
        // console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
            console.log(response.data);
            setGenreUpdateForm(false)
      setUsersBtn(false)
      setGamesBtn(true)
      setGenreBtn(false)
      setAddGameForm(false)
      setGenreAddForm(false)
        })
        .catch(err=>{console.log(err.response.data)})
        }
      }
      function addGenreBtn(){
        setGenreAddForm(true)
        setUsersBtn(false)
        setGamesBtn(false)
        setGenreBtn(false)
        setAddGameForm(false)
      }
      function addNewGenre(){
        if(newGenreName.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
            const data = {
                "name":newGenreName,
            }
            const config ={
                headers:{Authorization: `Bearer ${state.token}`}
            }
            axios.post("http://localhost:8080/genres",data,config)
        .then(response=>{
            console.log(response.data);
            axios.get('http://localhost:8080/genres',config)
          .then(function (response) {
            setAllGenres(response.data)
            setGenreSelected(response.data[0].id_Genre)
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        })
        .catch(err=>{console.log(err.response.data)})


        setUsersBtn(false)
        setGamesBtn(false)
        setGenreBtn(true)
        setAddGameForm(false)
        setGenreAddForm(false)
        }
      }

      function UpdateGenreBtn(x){
        setGenreName(x)
        setUsersBtn(false)
        setGamesBtn(false)
        setGenreBtn(false)
        setAddGameForm(false)
        setGenreAddForm(false)
        setGenreUpdateForm(true)
      }

      function UpdateGenre(){
        if(newGenreName.length<1){
          setRequiredField("This Field is Requierd")
      }
      else{

        const data = {
          "name":newGenreName,
      }
      const config ={
          headers:{Authorization: `Bearer ${state.token}`}
      }

      axios.put("http://localhost:8080/genres/"+genreName,data,config)
        .then(response=>{
            console.log(response.data);
            axios.get('http://localhost:8080/genres',config)
          .then(function (response) {
            setAllGenres(response.data)
            setGenreSelected(response.data[0].id_Genre)
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          console.log(genreName);
      setGenreUpdateForm(false)
      setUsersBtn(false)
      setGamesBtn(false)
      setGenreBtn(true)
      setAddGameForm(false)
      setGenreAddForm(false)
        })
        .catch(err=>{console.log(err.response.data)})

      }
      
      }

    useEffect(() => {
          const config ={
              headers:{Authorization: `Bearer ${state.token}`}
          }
        axios.get('http://localhost:8080/users',config)
          .then(function (response) {
            setAllUsers(response.data)
            // console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })

          axios.get('http://localhost:8080/games')
      .then(function (response) {
        setAllGames(response.data)
        // console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      axios.get('http://localhost:8080/genres',config)
          .then(function (response) {
            setAllGenres(response.data)
            setGenreSelected(response.data[0].id_Genre)
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }, []);
    return(
        <>
            <div className="sidenav">
            <input className="btn-admin" type="button" value="Users" onClick={userbtn}/>
            
          <input className="btn-admin" type="button" value="Games" onClick={gamebtn}/>

          <input className="btn-admin" type="button" value="Genre" onClick={genrebtn}/>

          </div>

            {usersBtn&&
                <table>
                <tr>
                    <th><h4>Name:</h4></th>
                    <th><h4>Email:</h4></th>
                </tr>
            
          
          {usersBtn&&

            allUsers.map((e)=>{
                
                return (
                    <>
                        
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.role.name=="USER"&&<input className="btn-delete" type="button" value="Delete" onClick={()=>{
                                const config ={
                                    headers:{Authorization: `Bearer ${state.token}`}
                                }
                                axios.delete('http://localhost:8080/users/'+e.id_User,config)
                                .then(function (response) {
                                  console.log(response.data);
                                  axios.get('http://localhost:8080/users',config)
                                        .then(function (response) {
                                            setAllUsers(response.data)
                                            // console.log(response.data);
                                        })
                                        .catch(function (error) {
                                            // handle error
                                            console.log(error);
                                        })

                                })
                                .catch(function (error) {
                                  // handle error
                                  console.log(error);
                                })
                        }}/>}</td>
                            </tr>
                    </>
                    )
                })
          }
          </table>
}
        {gamesBtn&&
            <table className="table-game">
            <tr>
                <th><h4>Name:</h4></th>
                <th><h4>Publisher:</h4></th>
                <th><input className="btn-add-game" type="button" value="Add a New Game" onClick={addGameBtn}/></th>
            </tr>

          {gamesBtn&&
            allGames.map((e)=>{
                return (
                    <>
                     <tr>
                                <td>{e.name}</td>
                                <td>{e.publisher}</td>
                                <td><input className="btn-delete" type="button" value="Delete" onClick={()=>{
                                const config ={
                                    headers:{Authorization: `Bearer ${state.token}`}
                                }
                                axios.delete('http://localhost:8080/games/'+e.id_Game,config)
                                .then(function (response) {
                                  console.log(response.data);
                                  axios.get('http://localhost:8080/games',config)
                                        .then(function (response) {
                                            setAllGames(response.data)
                                            // console.log(response.data);
                                        })
                                        .catch(function (error) {
                                            // handle error
                                            console.log(error);
                                        })

                                })
                                .catch(function (error) {
                                  // handle error
                                  console.log(error);
                                })
                        }}/></td>
                        </tr>
                        
                    </>
                    )
                })
          }
           </table>
        }
        
        {addGameForm&&
            <form className="form-addGame">
              <br/>
                <label>Enter Game Name:</label><br/>
                <input className="input-newGame" type="text" placeholder={requiredField.length>1?requiredField:"Gmae Name"} onChange={(e) => {setGamename(e.target.value.trim()); }}/>
                <br/>
                <label>Enter Release Data:</label><br/>
                <input className="input-newGame" type="text" placeholder={requiredField.length>1?requiredField:"Relese Data"} onChange={(e) => {setRealeseData(e.target.value.trim()); }}/>
                <br/>
                <label>Enter The Developer:</label><br/>
                <input className="input-newGame" type="text" placeholder={requiredField.length>1?requiredField:"Devlper"} onChange={(e) => {setDevelper(e.target.value.trim()); }}/>
                <br/>
                <label>Enter The Publisher:</label><br/>
                <input className="input-newGame" type="text" placeholder={requiredField.length>1?requiredField:"Publisher"} onChange={(e) => {setPublisher(e.target.value.trim()); }}/>
                <br/>
                <label>Enter Description:</label><br/>
                <input className="input-newGame" type="text" placeholder={requiredField.length>1?requiredField:"Description"} onChange={(e) => {setDescription(e.target.value.trim()); }}/>
                <br/>
                <label>Choose a Genre for The Game</label><br/>
                <select  onChange={selectOnChange}>
                    
                {allGenres.map((e)=>{
                    return(
                        
                        <option value={e.id_Genre}>{e.name}</option>
                    
                    )
                })
                }
                </select>
                <p>PlatForm</p>
                <label for="vehicle1">PC</label>
                <input type="checkbox"  name="pc"  checked={isChecked1} onChange={OnChangePC}/>
                
                <label for="vehicle1">Playstation</label>
                <input type="checkbox"  name="Playstation" checked={isChecked2} onChange={OnChangePS}/>
                
                <label for="vehicle1">Xbox</label>
                <input type="checkbox"  name="Xbox" checked={isChecked3} onChange={OnChangeXBOX}/>
                
                <label>Chose Photo:</label>
                <input type="file" name="file" onChange={uploadImage}/>
                <br/>
                <br/>
                <input className="btn-add-game" type="button" value="Add The Game" onClick={addGame}/>
                
            </form>
        }
            {genreBtn&&
                <table>
                <tr>
                    <th><h4>Name:</h4></th>
                    <th><input className="btn-add-game" type="button" value="Add a New Genre" onClick={addGenreBtn}/></th>
                </tr>

                {allGenres.map((e)=>{
                    return(
                        
                        <>

                        <tr>
                                <td>{e.name}</td>
                                <td><input className="btn-add-game" type="button" value="Update Genre" onClick={()=>{UpdateGenreBtn(e.id_Genre)}}/></td>
                                </tr>
                        
                        </>
                    
                    )
                })
                }
                </table>
            }
                {genreAddForm&&
            <form>
                <label>Enter The Genre</label>
                <input type="text" placeholder={requiredField.length>1?requiredField:"Genre Name"} onChange={(e) => {setNewGenreName(e.target.value.trim()); }}/>
                <input className="btn-add-game" type="button" value="Add a New Genre" onClick={addNewGenre}/>

            </form>
                }

                {genreUpdateForm&&
                  <form>
                  <label>Enter The Genre</label>
                  <input type="text" placeholder={requiredField.length>1?requiredField:"Genre Name"} onChange={(e) => {setNewGenreName(e.target.value.trim()); }}/>
                  <input className="btn-add-game" type="button" value="Udate Genre"  onClick={UpdateGenre}/>
  
              </form>
                }
        </>
    )
}
export default AdminPage;