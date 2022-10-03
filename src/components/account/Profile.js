import { Fragment } from "react";
import pic from "../../assets/icons/user-circle.svg";
import Modal from "../../common/Modal";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userEmail, setUserEmail] = useState("Email van gebruiker");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    getUserCredentials();
    if (currentUser !== null) {
      if (
        currentUser.auth &&
        currentUser.auth.currentUser &&
        currentUser.auth.currentUser.email
      ) {
        setUserEmail(currentUser.auth.currentUser.email);
      }
    }

    if (editMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    //eslint-disable-next-line
  }, [editMode, currentUser, userEmail, userName]);

  const getUserCredentials = () => {
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().email === userEmail) {
          setUserName(doc.data().name);
          if (doc.data().imgUrl) {
            setImageUrl(doc.data().imgUrl);
          }
        }
      });
    });
  };

  const closeEditModalHandler = () => {
    setEditMode(false);
  };

  return (
    <Fragment>
      <div className="profile-container">
        <div className="profile-container__pic-wrapper">
          <img
            src={imageUrl ? imageUrl : pic}
            alt="user-pic"
            className="profile-container__user-img"
          />
        </div>
        <div className="profile-container__message">
          <h1>Welkom en succes met de cursus {userName}! </h1>
        </div>
        <div className="profile-container__user-credentials">
          <p>Name: {userName} </p>
          <p>Email: {userEmail} </p>
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      </div>

      {editMode && (
        <Modal
          editAccount={editMode}
          onCloseModal={closeEditModalHandler}
          userValues={{ name: userName, email: userEmail, imageUrl }}
        />
      )}
    </Fragment>
  );
}

export default Profile;
