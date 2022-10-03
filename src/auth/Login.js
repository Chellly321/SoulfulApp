import Input from "../common/Input";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
import { collection, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const override = {
  display: "block",
  margin: "2rem auto auto auto",
  borderColor: "#f3dcc6",
};

function Login({ onCancelAuth, onForgotPassword }) {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [docRef, setDocRef] = useState(null);

  const { login } = useAuth();
  const history = useHistory();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const getUserRef = () => {
    const { email } = inputValues;
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().email === email) {
          setDocRef(doc.ref);
        }
      });
    });
  };

  const handleLoginUser = () => {
    setLoading(true);
    const { email, password } = inputValues;
    if (!email || !password) {
      setLoading(false);
      toast.error("Helaas, wachtwoord en/of email zijn incorrect. Probeer het opnieuw!");
    } else {
      login(email, password)
        .then((res) => {
          if (email === "admin@soulful.com") {
            history.push("/admin");
          } else {
            updateDoc(docRef, {
              active: true,
            })
              .then(() => {
                setLoading(false);
                history.push("/account");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    }
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
      <div className="auth-container">
        <div className="auth-container__input-wrapper">
          <div className="auth-container__input">
            <Input
              inputType="email"
              inputPlaceholder="Email..."
              lableText="Email"
              inputName="email"
              value={inputValues.name}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputType="password"
              inputPlaceholder="Huidig wachtwoord..."
              lableText="Huidig wachtwoord"
              inputName="password"
              value={inputValues.email}
              onInputChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="checkbox-container">
          <div
            className="checkbox-container__input-wrapper"
            onClick={() => onForgotPassword()}
          >
            <label htmlFor="input">Wachtwoord vergeten.</label>
          </div>
          <div className="checkbox-container__input-wrapper">
            <input type="checkbox" />
            <label htmlFor="input">Onthoud mij.</label>
          </div>
        </div>
        <BarLoader
          color="#8b6743"
          loading={loading}
          cssOverride={override}
          size={150}
          height={5}
          width={200}
        />
        <div className="auth-btn-group">
          <button onClick={() => onCancelAuth()}>Cancel</button>
          <button
            onClick={handleLoginUser}
            disabled={loading}
            onMouseEnter={getUserRef}
          >
            Login
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
