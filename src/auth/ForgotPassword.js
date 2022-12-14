import Input from "../common/Input";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ForgotPassword({ onCancelAuth }) {
  const [inputValues, setInputValues] = useState({ email: "" });

  const { forgotPassword } = useAuth();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const handleForgotPassword = () => {
    const { email } = inputValues;
    forgotPassword(email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth-container">
      <p className="auth-container__text">
        Vul je gebruikersnaam of e-mailadres in. Je ontvangt een e-mailbericht
        met instructies hoe je je wachtwoord opnieuw kunt instellen.
      </p>
      <div className="auth-container__input-wrapper">
        <div className="auth-container__input">
          <Input
            inputType="Email"
            inputPlaceholder="Voer emailaddres in..."
            lableText="Email"
            inputName="email"
            value={inputValues.email}
            onInputChange={onChangeHandler}
          />
        </div>
      </div>

      <div className="auth-btn-group">
        <button onClick={() => onCancelAuth()}>Cancel</button>
        <button onClick={handleForgotPassword}> Nieuw wachtwoord</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
