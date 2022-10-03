import headerImg from "../../assets/images/header-img.svg";
import navLink from "react-router-dom/es/NavLink";
import courses from "../../pages/Courses";

function Header() {
  return (
    <div className="header-container">
      <img src={headerImg} alt="header-img" />
    </div>
  );
}

export default Header;
