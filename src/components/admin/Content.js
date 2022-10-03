import Input from "../../common/Input";
import uploadIcon from "../../assets/icons/upload-icon.svg";
import folderIcon from "../../assets/icons/folder-icon.svg";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import { Fragment, useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import DeleteCourse from "./DeleteCourse";

function Content() {
  const [inputValues, setInputValues] = useState({
    module: "",
    theory: "",
    content: "",
  });
  const [progresspercent, setProgresspercent] = useState(0);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCourseData, setSelectedCourseData] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [edit, setEdit] = useState(0);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    if (edit !== 0) {
      setInputValues({
        ...inputValues,
        module: selectedCourseData.module,
        theory: selectedCourseData.theory,
        content: selectedCourseData.content,
      });
      setSelectedCourseId(selectedCourseData.id);
      setVideoURL(selectedCourseData.videoURL);
    }
    // eslint-disable-next-line
  }, [selectedCourseData, edit]);

  console.log(selectedCourseData);

  const onUploadFileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onChangePriceHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      module: value,
    });
  };
  const onChangeTheoryHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      theory: value,
    });
  };
  const onChangeContentHandler = (e) => {
    const value = e.target.value;
    setInputValues({
      ...inputValues,
      content: value,
    });
  };

  const uploadCourse = () => {
    if (!file) {
      toast.error("Voeg een bestand toe!");
      return;
    }
    const coursesRef = collection(db, "courses");
    const storageRef = ref(storage, `soulful/videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const courseData = {
              ...inputValues,
              videoURL: downloadURL,
            };
            setDoc(doc(coursesRef), courseData)
              .then(() => {
                toast.success("Cursus is succesvol toegevoegd!");
                setUploading(false);
                setFile(null);
              })
              .catch(() => {
                toast.error(
                  "Oeps, er is iets misgegaan. Probeer het later nog eens."
                );
              });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    );
  };

  const updateCourse = () => {
    const coursesRef = doc(db, "courses", selectedCourseId);
    if (file) {
      const storageRef = ref(storage, `soulful/videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              const courseData = {
                ...inputValues,
                videoURL: downloadURL,
              };
              updateDoc(coursesRef, courseData)
                .then(() => {
                  toast.success("Cursus is succesvol geupdate!");
                  setUploading(false);
                  setFile(null);
                  deleteObject(videoURL);
                })
                .catch((err) => {
                  toast.error(
                    "Oeps, er is iets misgegaan. Probeer het later nog eens."
                  );
                });
            })
            .catch((err) => {
              toast.error(err.message);
            });
        }
      );
    } else {
      const coursesIdRef = doc(db, "courses", selectedCourseId);

      updateDoc(coursesIdRef, {
        module: inputValues.module,
        content: inputValues.content,
        theory: inputValues.theory,
      })
        .then(() => {
          toast.success("Cursus is succesvol geupdate!");
          setUploading(false);
          setFile(null);
        })
        .catch((err) => {
          toast.error("Oeps, er is iets misgegaan. Probeer het later nog eens.");
          console.log(err.message);
        });
    }
  };

  const { module, theory, content } = inputValues;

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

      <div className="content-container">
        <DeleteCourse
          editCourse={(data) => {
            setSelectedCourseData(data);
            setEdit(edit + 1);
          }}
        />
        <p className="add-course-text">Nieuwe cursus toevoegen</p>
        {edit !== 0 && (
          <div className="add-btn-container">
            <button
              className="add-new-course"
              onClick={() => {
                setEdit(0);
                setInputValues({
                  module: "",
                  theory: "",
                  content: "",
                });
              }}
            >
              Toevoegen
            </button>
          </div>
        )}
        <div className="content-container__search-form">
          <div className="content-container__input-wrapper">
            <Input
              inputPlaceholder="Cursus titel..."
              borderColor="#B08050"
              lableText="Name:"
              onInputChange={onChangePriceHandler}
              inputValue={module}
            />
            <Input
              inputPlaceholder="Theorie van de cursus.."
              borderColor="#B08050"
              lableText="Theorie:"
              onInputChange={onChangeTheoryHandler}
              inputValue={theory}
            />
            <Input
              inputPlaceholder="Cursus beschrijving..."
              borderColor="#B08050"
              lableText="Cursus beschrijving:"
              onInputChange={onChangeContentHandler}
              inputValue={content}
            />
          </div>
        </div>
        {uploading && (
          <p className="add-course-text">
            Uploading... <span>{progresspercent}</span>
          </p>
        )}
        <div className="content-container__upload-btn">
          {edit !== 0 ? (
            <button onClick={updateCourse}>Update</button>
          ) : (
            <button onClick={uploadCourse}>Uploaden</button>
          )}
        </div>
        <div className="content-container__browse-file">
          <div>
            <img
              src={uploadIcon}
              alt="upload-icon"
              className="content-container__upload-icon"
            />
          </div>
          <div>Bestand uploaden</div>
          {file && file.name}

          <div>
            <button
              className="content-container__icon-wrapper"
              onClick={() => document.getElementById("upload-file").click()}
            >
              <span>
                <img
                  src={folderIcon}
                  alt="folder-icon"
                  className="content-container__folder-icon"
                />
                <input
                  type="file"
                  onChange={onUploadFileHandler}
                  style={{ display: "none" }}
                  id="upload-file"
                />
              </span>
              <span>Upload een bestand</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Content;
