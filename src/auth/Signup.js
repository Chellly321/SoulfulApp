import Input from "../common/Input";
import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import moment from "moment";

const override = {
  display: "block",
  margin: "2rem auto auto auto",
  borderColor: "#f3dcc6",
};

function Signup({ onCancelAuth }) {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const { register } = useAuth();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const handleSignupUser = () => {
    const { name, email, password, dateOfBirth } = inputValues;

    const usersData = {
      name,
      email,
      dateOfBirth: moment(startDate).format("DD/MM/YYYY"),
      active: true,
      createdAt: moment(Date.now()).format("MMM"),
    };

    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      toast.error("Voer uw wachtwoord in.");
    } else {
      register(email, password)
        .then((res) => {
          setLoading(false);
          const usersRef = collection(db, "users");
          setDoc(doc(usersRef), usersData);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
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
              inputType="text"
              inputPlaceholder="Naam..."
              lableText="Naam"
              inputName="name"
              value={inputValues.name}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputType="Email"
              inputPlaceholder="Email..."
              lableText="Email"
              inputName="email"
              value={inputValues.email}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputType="Wachtwoord"
              inputPlaceholder="Wachtwoord..."
              lableText="Wachtwoord"
              inputName="password"
              value={inputValues.email}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="date-picker-wrapper">
            <label htmlFor="">Geboortedatum</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
            />
          </div>
        </div>
        <div className="checkbox-container">
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
          <button onClick={handleSignupUser} disabled={loading}>
            Aanmelden
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
