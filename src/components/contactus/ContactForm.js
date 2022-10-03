import Input from "../../common/Input";
import { Fragment, useState } from "react";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";

function ContactForm() {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const onSubmitForm = () => {
    const contactData = inputValues;
    const contactsRef = collection(db, "contacts");
    setDoc(doc(contactsRef), contactData)
      .then(() => {
        toast.success(
          "Je bericht is ontvangen, Gytha neemt zo spoedig mogelijk contact met je op."
        );
      })
      .catch(() => {
        toast.error("Oeps, er is iets misgegaan. Probeer het later nog eens.");
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
      <div className="contact-form-container">
        <div className="contact-form-container__wrapper">
          <h1>
            Heb je vragen? <br /> Neem dan gerust contact met me op!
          </h1>
          <div className="contact-form-container__input-wrapper">
            <div className="contact-form-container__input">
              <Input
                inputType="text"
                inputPlaceholder="Naam..."
                lableText="Naam"
                inputName="name"
                value={inputValues.name}
                onInputChange={onChangeHandler}
                borderColor="#B08050"
              />
            </div>
            <div className="contact-form-container__input">
              <Input
                inputType="Email"
                inputPlaceholder="Email..."
                lableText="Email"
                inputName="email"
                value={inputValues.email}
                onInputChange={onChangeHandler}
                borderColor="#B08050"
              />
            </div>
            <div className="form-container__textarea">
              <label htmlFor="text-area">Je bericht:</label>
              <textarea
                  name="description"
                  placeholder="Typ hier je bericht..."
                  onChange={onChangeHandler} />
            </div>
            <div className="form-container__btn">
              <button onClick={onSubmitForm}>Verzenden</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactForm;
