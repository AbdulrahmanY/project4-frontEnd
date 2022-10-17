import { NavLink } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {logOut} from '../layout/../../reducers/users/actions'
// styles
import styles from "./Header.module.css";

const Header = () => {
  const activeStyle = {
    color: "#fff",
  };

  const dispatch = useDispatch();
  const state = useSelector((state)=>{
    console.log(state.usersReducer.isLogedIn)
    return{
      user:state.usersReducer.user,
      userIsLogedIn: state.usersReducer,
      userRole:state.usersReducer.userRole,
    }
  });

  const logOutUser = ()=>{
    dispatch(logOut())
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <NavLink to="/">
          <IoGameController className={styles.logo} />
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            
              {!state.userIsLogedIn.isLogedIn && <li> <NavLink
                to="SingUp"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Sign Up
              </NavLink>
            </li>}
              
              {!state.userIsLogedIn.isLogedIn && <li>
              <NavLink
                to="SignIn"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Sign In
              </NavLink>
            </li>}

            {state.userIsLogedIn.isLogedIn &&state.userRole=="USER" && <li><NavLink to={"User/"+state.user.user}>My Profile</NavLink></li>}

            {state.userIsLogedIn.isLogedIn &&state.userRole=="ADMIN" && <li><NavLink to={"AdminPage/"+state.user.user}>Admin Profile</NavLink></li>}

            {state.userIsLogedIn.isLogedIn && <li onClick={logOutUser}><NavLink to= "/">Logout</NavLink></li>}

            
            
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
