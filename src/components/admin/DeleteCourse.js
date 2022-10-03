import React, { useState, useEffect, Fragment } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

function DeleteCourse({ editCourse }) {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [editCourseData, setEditCourseData] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (courseData.length > 0 && selectedCourseId !== "") {
      courseData.forEach((course) => {
        if (course.id === selectedCourseId) {
          setVideoURL(course.videoURL);
          setEditCourseData(course);
        }
      });
    }
    //eslint-disable-next-line
  }, [selectedCourseId]);

  const getCourses = () => {
    let docData = [];
    let courses = {};
    const coursesRef = collection(db, "courses");
    onSnapshot(coursesRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        courses = { ...doc.data(), id: doc.id };
        docData.push(courses);
      });
      setCourseData(docData);
      setSelectedCourseId(docData[0].id);
    });
  };

  const onSelectCourse = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const onDeleteCourse = (e) => {
    const videoRef = ref(storage, `${videoURL}`);
    deleteObject(videoRef)
        .then(() => {
          deleteDoc(doc(db, "courses", selectedCourseId))
              .then(() => {
                toast.success("Cursus is verwijderd!");
              })
              .catch((err) => {
                toast.error(err.message);
              });
        })
        .catch((err) => {
          toast.error(err.message);
        });
  };

  console.log(courseData);

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
        <div className="content-container__view-modules">
          <div className="content-container__select-module">
            <select onChange={onSelectCourse}>
              {courseData.length > 0 &&
                  courseData.map(({ id, content, price }) => (
                      <option key={id} value={id}>
                        {price.slice(0, 15)}
                      </option>
                  ))}
            </select>
          </div>
          <div>
            <button
                className="content-container__view-btn"
                onClick={onDeleteCourse}
            >
              Verwijderen
            </button>
            <button
                className="content-container__view-btn"
                onClick={() => editCourse(editCourseData)}
            >
              Aanpassen
            </button>
          </div>
        </div>
      </Fragment>
  );
}

export default DeleteCourse;
