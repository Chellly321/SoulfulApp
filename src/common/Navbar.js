import logo from "../assets/soulful-logo.svg";
import accountIcon from "../assets/icons/account-icon.svg";
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { onSnapshot, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function Navbar({ navBg }) {
  const [mobileNav, setMobileNav] = useState("0");
  const [modal, setModal] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const { currentUser, logout } = useAuth();

  const navData = currentUser
    ? [
        { id: 1, title: "Home", linkTo: "/" },
        { id: 2, title: "Over mij", linkTo: "/about" },
        { id: 3, title: "Contact", linkTo: "/contact" },
        { id: 4, title: "Cursus", linkTo: "/courses" },
        { id: 5, title: "Oefeningen overzicht", linkTo: "/ExerciseOverview" },
      ]
    : [
        { id: 1, title: "Home", linkTo: "/" },
        { id: 2, title: "Over mij", linkTo: "/about" },
        { id: 3, title: "Contact", linkTo: "/contact" },
        { id: 4, title: "Oefeningen overzicht", linkTo: "/ExerciseOverview" },
      ];

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      setMobileNav("0");
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [modal]);

  const getUserRef = () => {
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().email === currentUser.auth.currentUser.email) {
          setDocRef(doc.ref);
        }
      });
    });
  };

  const handleLogoutUser = () => {
    const email = currentUser.auth.currentUser.email;
    if (email === "admin@soulful.com") {
      logout();
      history.push("/");
    } else if (!docRef) {
      logout();
      history.push("/");
    } else {
      updateDoc(docRef, {
        active: false,
      })
        .then(() => {
          logout();
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderList = () => {
    if (location.pathname !== "/dashboard") {
      return (
        <ul className="list-container">
          {navData.map((nav) => (
            <NavLink
              exact
              to={nav.linkTo}
              activeClassName="active-item"
              className="nav-link"
              key={nav.id}
            >
              {nav.title}
            </NavLink>
          ))}
        </ul>
      );
    }
  };

  const renderAccount = () => {
    if (location.pathname === "/dashboard") {
      return (
        <Link to="/admin" className="link-style">
          <div className="nav-container__account">
            My Account
            <span>
              <img src={accountIcon} alt="user-icon" />
            </span>
          </div>
        </Link>
      );
    } else {
      return (
        <div className="nav-container__account">
          {currentUser === null ? (
            <div className="login" onClick={() => setModal(true)}>
              Login
            </div>
          ) : (
            <div
              className="login"
              onClick={handleLogoutUser}
              onMouseEnter={getUserRef}
            >
              Logout
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div className="nav-container" style={{ backgroundColor: navBg }}>
        <div className="nav-container__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="mobile-nav" onClick={() => setMobileNav("250px")}>
          <div />
          <div />
          <div />
        </div>
        <div className="sidenav" style={{ width: mobileNav }}>
          <div className="close" onClick={() => setMobileNav(0)} />
          {renderList()}
          <div className="mobile-account-container">{renderAccount()}</div>
        </div>

        <div className="list-wrapper">{renderList()}</div>
        <div className="account-container">{renderAccount()}</div>
      </div>

      {modal && <Modal onCloseModal={() => setModal(false)} />}
    </Fragment>
  );
}

export default Navbar;
