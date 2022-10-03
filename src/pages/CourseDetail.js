import { Fragment } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Theory from "../components/account/Theory";
import SelectedModule from "../components/account/SelectedModule";
import VideoContent from "../components/account/VideoContent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function CourseDetail() {
  const [selectedCourse, setSelectedCourse] = useState([]);
  const params = useParams();
  const { id } = params;

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

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
    });
  };

  useEffect(() => {
    if (courseData.length > 0) {
      const courseArray = [];
      courseData.forEach((data) => {
        if (data.id === id) {
          courseArray.push({
            text: data.content,
            module: data.price,
            theory: data.theory,
            video: data.videoURL,
          });
        }
      });
      setSelectedCourse(courseArray);
    }
  }, [id, courseData]);

  return (
    <Fragment>
      <Navbar />
      <div style={{ marginTop: "2rem", height: "3rem" }} />
      <SelectedModule selectedModule={selectedCourse} />
      <Theory selectedModule={selectedCourse} />
      <VideoContent selectedModule={selectedCourse} />
      <Footer />
    </Fragment>
  );
}

export default CourseDetail;
