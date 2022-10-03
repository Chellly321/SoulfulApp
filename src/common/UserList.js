import UserIcon from "../assets/icons/user-circle.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { ref, deleteObject } from "firebase/storage";


function UserList({
  userListBg,
  userImg,
  userName,
  dateOfBirth,
  emailAddress,
  moduleNumber,
  userId,
  updateUsers,
}) {
  const deleteUser = (id) => {
    deleteDoc(doc(db, "users", id))
      .then(() => {
        toast.success("Gebruiker is verwijderd!");
        updateUsers();
        if (userImg) {
          const imageRef = ref(storage, `${userImg}`);
          deleteObject(imageRef)
            .then((res) => {
              console.log("Verwijderd");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        className="user-list-container"
        style={{ backgroundColor: userListBg }}
      >
        <div className="user-list-container__image-wrapper">
          <img
            src={userImg ? userImg : UserIcon}
            alt="user-pic"
            className="user-list-container__user-img"
          />
        </div>
        <div className="user-list-container__user-credentials">
          <p>Naam: {userName}</p>
          <p>Geboortedatum: {dateOfBirth}</p>
          <p>Email: {emailAddress}</p>
        </div>
        <div className="user-list-container__course-progress">
          <p>Course progress:</p>
          <p>{moduleNumber}</p>
        </div>
        <div className="user-list-container__course-progress">
          <button onClick={() => deleteUser(userId)}>Account verwijderen</button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserList;
