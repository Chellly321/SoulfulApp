import { Fragment } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase/config";

function SubscriberList({ id, name, email, getSubscribers, index }) {
  const onDeleteSubscriber = (id) => {
    deleteDoc(doc(db, "subscribers", id))
      .then(() => {
        toast.success("Aanmelding verwijderd!");
        getSubscribers();
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
        <div>{name}</div>
        <div>{email}</div>
        <button onClick={() => onDeleteSubscriber(id)}>Verwijderen</button>
      </div>
    </Fragment>
  );
}

export default SubscriberList;
