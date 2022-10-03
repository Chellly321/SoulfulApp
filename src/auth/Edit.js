import Input from "../common/Input";
import { Fragment, useState, useEffect } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { collection, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const override = {
  display: "block",
  margin: "2rem auto auto auto",
  borderColor: "#f3dcc6",
};

function Edit({ onCancelAuth, userEditableValues }) {
  const { name, email } = userEditableValues;
  const [progresspercent, setProgresspercent] = useState(0);
  const [file, setFile] = useState(null);
  const [docRef, setDocRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [inputValues, setInputValues] = useState({
    name,
    email,
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    getDocRef();
    //eslint-disable-next-line
  }, []);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      [e.target.name]: value,
    });
  };

  const onImageChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const getDocRef = () => {
    const usersRef = collection(db, "users");
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().email === userEditableValues.email) {
          setDocRef(doc.ref);
        }
      });
    });
  };

  const handleUpdateUser = () => {
    const { email, currentPassword, newPassword, name } = inputValues;
    const user = getAuth().currentUser;
    const cred = EmailAuthProvider.credential(
      userEditableValues.email,
      currentPassword
    );

    if (name !== userEditableValues.name) {
      setLoading(true);
      if (docRef !== null) {
        updateDoc(docRef, {
          name,
        })
          .then(() => {
            toast.success("Naam is correct gewijzigd!`");
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.message);
            setLoading(false);
          });
      }
    }

    if (email !== userEditableValues.email || newPassword !== "") {
      setLoading(true);
      reauthenticateWithCredential(user, cred)
        .then(() => {
          if (newPassword !== "") {
            updatePassword(user, newPassword)
              .then(() => {
                toast.success("Wachtwoord is correct gewijzigd!`");
                setLoading(false);
                if (email !== userEditableValues.email) {
                  updateEmail(user, email)
                    .then(() => {
                      updateDoc(docRef, {
                        email,
                      })
                        .then(() => {
                          toast.success("Email is gewijzigd`");
                          setLoading(false);
                        })
                        .catch((err) => {
                          toast.error(err.message);
                          setLoading(false);
                        });
                    })
                    .catch((err) => {
                      toast.error(err.message);
                      setLoading(false);
                    });
                }
              })
              .catch((err) => {
                toast.error(err.message);
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          toast.error("Voer het juiste wachtwoord in om je gegevens te wijzigen!");
          setLoading(false);
        });
    }

    if (file) {
      const storageRef = ref(storage, `soulful/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setLoading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploading(true);
          setProgresspercent(progress);
        },
        (error) => {
          toast.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(docRef, {
              imgUrl: downloadURL,
            })
              .then(() => {
                setLoading(false);
                toast.success("Je afbeelding is gewijzigd!");
                const { imageUrl } = userEditableValues;
                if (imageUrl) {
                  const imageRef = ref(storage, `${imageUrl}`);
                  deleteObject(imageRef)
                    .then(() => {
                      setLoading(false);
                    })
                    .catch((error) => {
                      console.log(error);
                      setLoading(false);
                    });
                }
              })
              .catch((err) => {
                console.log(err.message);
                setLoading(false);
              });
          });
        }
      );
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
              inputDefaultValue={inputValues.name}
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
              inputDefaultValue={inputValues.email}
              inputType="email"
              inputPlaceholder="Email..."
              lableText="Email"
              inputName="email"
              value={inputValues.email}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputDefaultValue={inputValues.password}
              inputType="wachtwoord"
              inputPlaceholder="Huidig wachtwoord..."
              lableText="Huidig wachtwoord"
              inputName="currentPassword"
              value={inputValues.currentPassword}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputDefaultValue={inputValues.password}
              inputType="password"
              inputPlaceholder="Nieuw wachtwoord..."
              lableText="Nieuw wachtwoord"
              inputName="newPassword"
              value={inputValues.newPassword}
              onInputChange={onChangeHandler}
            />
          </div>
          <div className="auth-container__input">
            <Input
              inputDefaultValue={inputValues.file}
              inputType="file"
              inputPlaceholder="Afbeelding veranderen"
              lableText="Afbeelding uploaden"
              inputName="file"
              value={inputValues.file}
              onInputChange={onImageChangeHandler}
            />
          </div>
        </div>
        <div>
          {uploading && (
            <p className="upload-pic">
              Uploading pic... <span>{progresspercent}</span>
            </p>
          )}
          <BarLoader
            color="#8b6743"
            loading={loading}
            cssOverride={override}
            size={150}
            height={5}
            width={200}
          />
        </div>

        <div className="auth-btn-group">
          <button onClick={() => onCancelAuth()}>Cancel</button>
          <button onClick={() => handleUpdateUser()}>Update</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Edit;
