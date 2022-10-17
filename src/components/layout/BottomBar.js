import { NavLink } from "react-router-dom";
import { IoGameController, IoTrendingUp, IoHeart } from "react-icons/io5";

// styles
import styles from "./BottomBar.module.css";

const BottomBar = () => {
  const activeStyle = {
    color: "#fff",
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <IoGameController className={styles.icon} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SingUp"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            
            <span>SingUp</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SignIn"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            
            <span>Sign In</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomBar;
