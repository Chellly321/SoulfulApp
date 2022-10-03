import logo from "../assets/footer-logo.svg";
import fbIcon from "../assets/icons/fb-icon.svg";
import instaIcon from "../assets/icons/insta-icon.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div>
        <img src={logo} alt="souful-logo" className="footer-logo" />
      </div>
      <div className="footer-container__menu">
        <ul>
          <Link to="/contact" className="link-style">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="footer-container__menu">
        <ul>
          <Link to="/about" className="link-style">
            <li>Over mij</li>
          </Link>
        </ul>
      </div>
      <div className="footer-container__icons">
        <ul>
          <li>
            <a
              href="https://m.facebook.com/100063626047873/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={fbIcon} alt="fb-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/soulfulmama_nl?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noreferrer"
            >
              <img src={instaIcon} alt="insta-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
