import UserList from "../../common/UserList";
import { Fragment } from "react";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";


function Users() {
  const [adminEmail, setAdminEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { currentUser } = useAuth();


  useEffect(() => {
    getUserCredentials();
    if (currentUser !== null) {
      if (
        currentUser.auth &&
        currentUser.auth.currentUser &&
        currentUser.auth.currentUser.email
      ) {
        setAdminEmail(currentUser.auth.currentUser.email);
      }
    }
    //eslint-disable-next-line
  }, [currentUser, adminEmail]);

  const getUserCredentials = () => {
    setLoaded(false);
    const docData = [];
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const usersData = { ...doc.data(), id: doc.id };
        docData.push(usersData);
      });
      setUsers(docData);
      setLoaded(true);
    });
  };


  return (
    <Fragment>
      {users.length > 0 && loaded ? (
        users.map((user, index) => (
          <UserList
            key={index}
            userListBg={index % 2 === 0 ? "#FAF2EA" : "white"}
            userImg={user.imgUrl}
            userName={user.name}
            dateOfBirth={user.dateOfBirth}
            emailAddress={user.email}
            moduleNumber={user.course}
            userId={user.id}
            updateUsers={getUserCredentials}
          />
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>
          {loaded && users.length === 0
            ? "Er zijn geen gebruikers in de database"
            : "Even geduld alsjeblieft... "}
        </h3>
      )}
    </Fragment>
  );
}

export default Users;
