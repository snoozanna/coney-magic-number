import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
