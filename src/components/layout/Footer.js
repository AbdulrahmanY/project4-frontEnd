import { AiFillHeart } from "react-icons/ai";
// styles
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="text-muted">
          © {currentYear} Gametis, all rights reserved.
        </p>
        <p className={styles.created}>
          Created 
          
          by <a className="a-footer" href="https://www.linkedin.com/in/abdulrahman-saddeek/">Abdulrahman</a>  
        </p>
      </div>
    </footer>
  );
};

export default Footer;
