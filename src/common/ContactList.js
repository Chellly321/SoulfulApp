import { Fragment } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase/config";

function ContactList({ id, name, email, description, getContacts, index }) {
  const onDeleteContact = (id) => {
    deleteDoc(doc(db, "contacts", id))
      .then(() => {
        toast.success("Student is verwijderd!");
        getContacts();
      })
      .catch(() => {
        toast.error("Er is iets misgegaan, probeer het later nog eens.");
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
        className="contacts-container"
        key={id}
        style={{ backgroundColor: index % 2 === 0 ? "#FAF2EA" : "white" }}
      >
        <div>
          {name}
          <br />
          {email}
        </div>
        <div>{description}</div>
        <button onClick={() => onDeleteContact(id)}>Verwijderd</button>
      </div>
    </Fragment>
  );
}

export default ContactList;
