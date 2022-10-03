import Input from "../../common/Input";
import { Fragment, useState } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

function Subscribe() {
  const [inputValues, setInputValues] = useState({ name: "", email: "", description:"" });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const onSubscription = () => {
    const subscriberData = inputValues;
    const subscribersRef = collection(db, "subscribers");
    setDoc(doc(subscribersRef), subscriberData)
      .then(() => {
        toast.success(
          "Thanks for your subscription! We will keep you updating with new stuff"
        );
      })
      .catch(() => {
        toast.error("Something went wrong, please try again later.");
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

      <div className="contact-container">
        <h1>Schrijf je in voor de nieuwsbrief en ben altijd op de hoogte! </h1>

        <div className="contact-container__input-wrapper">
          <div className="contact-container__input">
            <Input
              inputType="text"
              inputPlaceholder="Naam..."
              lableText="Naam"
              inputName="name"
              value={inputValues.name}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="contact-container__input">
            <Input
              inputType="Email"
              inputPlaceholder="Email..."
              lableText="Email"
              inputName="email"
              value={inputValues.email}
              onInputChange={onChangeHandler}
            />

          </div>
          <div className="contact-container__input">
            <div>
              <button onClick={onSubscription}>Inschrijven</button>
            </div>
        </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Subscribe;
